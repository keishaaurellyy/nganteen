
import ProfileDetailPage from "@/components/buyers/profile-detail";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileDetailPage />
    </Suspense>
  );
}
