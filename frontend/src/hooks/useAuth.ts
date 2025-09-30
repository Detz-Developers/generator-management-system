import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '@/firebaseConfig';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  shopId?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Get user profile from database
        const profileRef = ref(db, `users/${firebaseUser.uid}`);
        const profileSnap = await get(profileRef);
        
        if (profileSnap.exists()) {
          const profile = profileSnap.val();
          setUserProfile({
            id: firebaseUser.uid,
            ...profile
          });
          
          // If operator, find their shop
          if (profile.role === 'operator') {
            const shopsRef = ref(db, 'shops');
            const shopsSnap = await get(shopsRef);
            
            if (shopsSnap.exists()) {
              const shops = shopsSnap.val();
              const userShop = Object.values(shops).find((shop: any) => 
                shop.operatorId === firebaseUser.uid
              );
              
              if (userShop) {
                setUserProfile(prev => prev ? { ...prev, shopId: (userShop as any).id } : null);
              }
            }
          }
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, userProfile, loading };
}