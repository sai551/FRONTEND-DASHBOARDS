import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function OmAssetRequests() {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    assetName: "",
    reason: "",
  });

  // Load dummy data on first render
  useEffect(() => {
    const dummy = [
      {
        id: 1,
        employeeId: "EMP001",
        assetName: "Laptop Dell XPS 13",
        reason: "Need for software development",
        requestDate: new Date().toISOString(),
        status: "Pending",
      },
      {
        id: 2,
        employeeId: "EMP002",
        assetName: "Office Chair",
        reason: "Current chair broken",
        requestDate: new Date().toISOString(),
        status: "Approved",
      },
      {
        id: 3,
        employeeId: "EMP003",
        assetName: "Monitor 27-inch",
        reason: "Need for better productivity",
        requestDate: new Date().toISOString(),
        status: "Rejected",
      },
    ];
    setRequests(dummy);
  }, []);

  // Submit new request
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: requests.length + 1,
      employeeId: formData.employeeId,
      assetName: formData.assetName,
      reason: formData.reason,
      requestDate: new Date().toISOString(),
      status: "Pending",
    };
    setRequests([...requests, newRequest]);
    setFormData({ employeeId: "", assetName: "", reason: "" });
  };

  // Update status
  const updateStatus = (id, status) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status } : req
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Asset Requests</h1>
        <p className="text-muted-foreground mt-2">
          Handle employee requests for new assets and equipment allocations.
        </p>
      </div>

      {/* New Request Form */}
      <Card>
        <CardHeader>
          <CardTitle>New Asset Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Employee ID"
              value={formData.employeeId}
              onChange={(e) =>
                setFormData({ ...formData, employeeId: e.target.value })
              }
              required
            />
            <Input
              placeholder="Asset Name"
              value={formData.assetName}
              onChange={(e) =>
                setFormData({ ...formData, assetName: e.target.value })
              }
              required
            />
            <Textarea
              placeholder="Reason for request"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              required
            />
            <Button type="submit">Submit Request</Button>
          </form>
        </CardContent>
      </Card>

      {/* Requests List */}
      <Card>
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <p className="text-muted-foreground">No requests found.</p>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="flex justify-between items-center border p-3 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">
                      {req.assetName} ({req.employeeId})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {req.reason}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Requested on:{" "}
                      {new Date(req.requestDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        req.status === "Pending"
                          ? "outline"
                          : req.status === "Approved"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {req.status}
                    </Badge>
                    {req.status === "Pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateStatus(req.id, "Approved")}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateStatus(req.id, "Rejected")}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
