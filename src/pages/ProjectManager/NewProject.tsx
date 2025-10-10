import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function NewProject() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the project
    alert("Project Created Successfully!");
    navigate("/projectmanager/dashboard"); // ✅ Redirect back to Dashboard
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Project Name</label>
              <Input placeholder="Enter project name" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Client Name</label>
              <Input placeholder="Enter client name" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea placeholder="Project description" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Deadline</label>
              <Input type="date" required />
            </div>

            <Button type="submit" className="w-full">Create Project</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
