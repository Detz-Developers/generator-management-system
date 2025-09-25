"use client";

import GeneratorDetails from "@/components/admin/GeneratorDetails";
import { useRouter } from "next/navigation";

export default function GeneratorDetailsPage() {
  const router = useRouter();
  return (
    <GeneratorDetails
      onNavigate={() => {
        // When user clicks back in details, go to Generators list
        router.push("/admin?page=Generators");
      }}
    />
  );
}
