import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Award,
  Upload,
  Save,
  Settings,
  Clock,
  Star
} from "lucide-react";

export default function TrainerProfile() {
  const trainerData = {
    name: "Trainer",
    email: "Bhuvan P.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Experienced software trainer with 8+ years in web development education. Specialized in React, JavaScript, and modern web technologies.",
    joinDate: "January 2020",
    totalSessions: 245,
    averageRating: 4.8,
    totalTrainees: 180
  };

  const certifications = [
    {
      name: "Certified React Developer",
      issuer: "React Training",
      date: "2023",
      status: "Valid"
    },
    {
      name: "JavaScript Professional",
      issuer: "JavaScript Institute",
      date: "2022",
      status: "Valid"
    },
    {
      name: "Training Excellence Certificate",
      issuer: "Education Council",
      date: "2021",
      status: "Valid"
    }
  ];

  const availability = [
    { day: "Monday", hours: "9:00 AM - 5:00 PM", available: true },
    { day: "Tuesday", hours: "9:00 AM - 5:00 PM", available: true },
    { day: "Wednesday", hours: "9:00 AM - 5:00 PM", available: true },
    { day: "Thursday", hours: "9:00 AM - 5:00 PM", available: true },
    { day: "Friday", hours: "9:00 AM - 3:00 PM", available: true },
    { day: "Saturday", hours: "Not Available", available: false },
    { day: "Sunday", hours: "Not Available", available: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your trainer profile and preferences</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/trainer-profile.jpg" />
                <AvatarFallback className="bg-green-100 text-green-700 text-xl">SJ</AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2">
                <Upload className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{trainerData.name}</h2>
              <p className="text-gray-600 mb-4">{trainerData.bio}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{trainerData.totalSessions}</div>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{trainerData.averageRating}</div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">{trainerData.totalTrainees}</div>
                  <p className="text-sm text-gray-600">Trainees Taught</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-lg font-bold text-yellow-600">4+ Years</div>
                  <p className="text-sm text-gray-600">Experience</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input defaultValue={trainerData.name} />
                </div>
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <Input type="email" defaultValue={trainerData.email} />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input type="tel" defaultValue={trainerData.phone} />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input defaultValue={trainerData.location} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Bio</label>
                <Textarea 
                  defaultValue={trainerData.bio}
                  placeholder="Tell us about your experience and expertise..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Specializations</label>
                  <Input placeholder="React, JavaScript, Web Development..." />
                </div>
                <div>
                  <label className="text-sm font-medium">Years of Experience</label>
                  <Input type="number" placeholder="8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certifications & Credentials
                  </CardTitle>
                  <CardDescription>Manage your professional certifications</CardDescription>
                </div>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Add Certification
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Award className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <p className="text-sm text-gray-600">{cert.issuer} • {cert.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{cert.status}</Badge>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Availability & Schedule
              </CardTitle>
              <CardDescription>Set your available hours for training sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availability.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-20">
                        <span className="font-medium">{schedule.day}</span>
                      </div>
                      <div className="flex-1">
                        <Input 
                          defaultValue={schedule.hours}
                          disabled={!schedule.available}
                          className={!schedule.available ? "bg-gray-200" : ""}
                        />
                      </div>
                    </div>
                    <Button 
                      variant={schedule.available ? "default" : "outline"} 
                      size="sm"
                    >
                      {schedule.available ? "Available" : "Unavailable"}
                    </Button>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Time Preferences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Preferred Start Time</label>
                      <Input type="time" defaultValue="09:00" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Preferred End Time</label>
                      <Input type="time" defaultValue="17:00" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Settings
              </CardTitle>
              <CardDescription>Manage your account preferences and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Password & Security</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Enable Two-Factor Authentication
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Notification Preferences</h4>
                <div className="space-y-3">
                  {[
                    { name: "Email Notifications", description: "Receive email updates about sessions and feedback" },
                    { name: "SMS Reminders", description: "Get text message reminders for upcoming sessions" },
                    { name: "Push Notifications", description: "Browser notifications for real-time updates" }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium">{setting.name}</h5>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Data & Privacy</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Privacy Settings
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}