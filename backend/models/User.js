const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config();

const serviceAccount = require(path.join(__dirname, "../config/serviceAccountKey.json"));

// Initialize Firebase once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const db = admin.database();
const USERS_REF = db.ref("users");

const VALID_ROLES = ["admin", "technician", "shop", "inventory"];

class User {
  constructor(email, password, role) {
    this.email = email;
    this.password = password;
    if (!role || !VALID_ROLES.includes(role)) {
      throw new Error(`Invalid role. Must be one of: ${VALID_ROLES.join(", ")}`);
    }
    this.role = role;
  }

  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    const newUserRef = USERS_REF.push();
    await newUserRef.set({
      email: this.email,
      password: hashedPassword,
      role: this.role,
    });
    return { id: newUserRef.key, email: this.email, role: this.role };
  }

  static async findByEmail(email) {
    const snapshot = await USERS_REF.orderByChild("email").equalTo(email).once("value");
    const userData = snapshot.val();
    if (!userData) return null;
    const key = Object.keys(userData)[0];
    return { id: key, ...userData[key] };
  }

  static async comparePassword(inputPassword, hashedPassword) {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}

module.exports = User;
