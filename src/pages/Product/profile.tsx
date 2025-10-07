import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // 🔹 Uncomment when backend is ready
    /*
    axios.get("/api/product-manager/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
    */

    // 🔹 Dummy data fallback
    setProfile({
      id: "PM001",
      name: "John Doe",
      email: "john.doe@company.com",
      role: "Product Manager",
      department: "Product Development",
    });
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Avatar className="w-20 h-20 mb-4">
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-500">{profile.email}</p>
          <Badge className="mt-2">{profile.role}</Badge>
          <p className="mt-2 text-sm">Department: {profile.department}</p>
          <Button className="mt-4">Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
