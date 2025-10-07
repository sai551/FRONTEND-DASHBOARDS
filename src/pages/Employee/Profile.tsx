import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Briefcase, Edit } from "lucide-react";

import profileImage from "@/assets/image.jpg"; // Profile picture

export default function Profile() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-foreground mb-4">My Profile</h1>

      {/* Profile Info */}
      <Card className="shadow-md">
        <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <Avatar className="h-28 w-28">
              <AvatarImage src={profileImage} alt="Profile" />
              <AvatarFallback>HR</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="mt-3">
              Change Photo
            </Button>
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">EMPLOYEE</h2>
            <p className="text-muted-foreground">EMPLOYEE</p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />emp@company.com
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" /> +91 98765 43210
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> Hyderabad
            </div>
          </div>

          {/* Edit Button */}
          <div className="self-center md:self-start">
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Full Name</p>
              <Input value="EMP" readOnly />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Date of Birth</p>
              <Input value="20th March 2020" readOnly />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Gender</p>
              <Input value="Male" readOnly />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Employee ID</p>
              <Input value="EMP-1025" readOnly />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Department</p>
              <Input value="EMPLOYEE" readOnly />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Joining Date</p>
              <Input value="12th August 2020" readOnly />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-xl font-bold text-foreground">15</p>
            <p className="text-muted-foreground text-sm">Projects Managed</p>
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">250+</p>
            <p className="text-muted-foreground text-sm">Candidates Hired</p>
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">96%</p>
            <p className="text-muted-foreground text-sm">Performance Rating</p>
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">5</p>
            <p className="text-muted-foreground text-sm">Years in Company</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
