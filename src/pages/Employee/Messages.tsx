// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { MessageSquare, Send, Search, Plus } from "lucide-react";

// export default function Messages() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl md:text-3xl font-bold text-foreground">Team Chat</h1>
//         <Button className="gap-2">
//           <Plus className="h-4 w-4" />
//           New Chat
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Chat List */}
//         <Card className="lg:col-span-1">
//           <CardHeader>
//             <CardTitle>Conversations</CardTitle>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input placeholder="Search chats..." className="pl-10" />
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
//               <Avatar className="h-10 w-10">
//                 <AvatarFallback>SM</AvatarFallback>
//               </Avatar>
//               <div className="flex-1">
//                 <p className="font-medium">Vijay B</p>
//                 <p className="text-sm text-muted-foreground">Project update ready</p>
//               </div>
//               <Badge className="bg-primary text-primary-foreground">2</Badge>
//             </div>

//             <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
//               <Avatar className="h-10 w-10">
//                 <AvatarFallback>DEV</AvatarFallback>
//               </Avatar>
//               <div className="flex-1">
//                 <p className="font-medium">Dev Team</p>
//                 <p className="text-sm text-muted-foreground">Code review needed</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Chat Window */}
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <div className="flex items-center space-x-3">
//               <Avatar className="h-8 w-8">
//                 <AvatarFallback>SM</AvatarFallback>
//               </Avatar>
//               <div>
//                 <CardTitle className="text-lg">Vijay B</CardTitle>
//                 <CardDescription>Project Manager • Online</CardDescription>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="h-96 border rounded-lg p-4 space-y-4 overflow-y-auto">
//               {/* Messages would go here */}
//               <div className="flex space-x-3">
//                 <Avatar className="h-8 w-8">
//                   <AvatarFallback>SM</AvatarFallback>
//                 </Avatar>
//                 <div className="bg-muted p-3 rounded-lg max-w-xs">
//                   <p className="text-sm">Hi John! Could you review the latest API documentation when you get a chance?</p>
//                   <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
//                 </div>
//               </div>

//               <div className="flex space-x-3 justify-end">
//                 <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
//                   <p className="text-sm">Sure! I'll take a look this afternoon and provide feedback by EOD.</p>
//                   <p className="text-xs opacity-70 mt-1">10:35 AM</p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex space-x-2">
//               <Input placeholder="Type a message..." className="flex-1" />
//               <Button size="icon">
//                 <Send className="h-4 w-4" />
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }