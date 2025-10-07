import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { CalendarCheck, CalendarX, Clock } from "lucide-react";

// ========================== COMPONENT =============================

const Attendance = () => {
  const COLORS = ["#10B981", "#EF4444", "#F59E0B"];

  // =================== STATE ===================
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    present: 0,
    absent: 0,
    late: 0,
  });
  const [monthlyAttendance, setMonthlyAttendance] = useState<any[]>([]);
  const [statusDistribution, setStatusDistribution] = useState<any[]>([]);

  // =================== API CALL ===================
  useEffect(() => {
    async function fetchAttendance() {
      try {
        // TODO: Replace with real API endpoint for employee attendance
        // Example: const res = await axios.get("/api/employee/attendance");
        // setSummary(res.data.summary);
        // setMonthlyAttendance(res.data.monthlyTrend);
        // setStatusDistribution(res.data.status);

        // Mock delay + mock data
        setTimeout(() => {
          setSummary({ present: 270, absent: 20, late: 10 });
          setMonthlyAttendance([
            { month: "Jan", present: 22, absent: 2, late: 1 },
            { month: "Feb", present: 20, absent: 4, late: 2 },
            { month: "Mar", present: 24, absent: 1, late: 1 },
            { month: "Apr", present: 23, absent: 2, late: 0 },
            { month: "May", present: 21, absent: 3, late: 2 },
            { month: "Jun", present: 25, absent: 0, late: 1 },
          ]);
          setStatusDistribution([
            { name: "Present", value: 85 },
            { name: "Absent", value: 10 },
            { name: "Late", value: 5 },
          ]);
          setLoading(false);
        }, 1500);
      } catch (err) {
        console.error("Failed to fetch attendance", err);
        setLoading(false);
      }
    }

    fetchAttendance();
  }, []);

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Attendance</h1>
        <p className="text-muted-foreground mt-1">
          View your attendance summary and trends
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <>
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-28 w-full rounded-xl" />
          </>
        ) : (
          <>
            {/* Present */}
            <Card className="shadow-custom-md">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-success rounded-2xl">
                    <CalendarCheck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Present Days
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {summary.present}
                    </p>
                    <Badge variant="secondary" className="mt-1">
                      Till this month
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Absent */}
            <Card className="shadow-custom-md">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-warning rounded-2xl">
                    <CalendarX className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Absent Days
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {summary.absent}
                    </p>
                    <Badge variant="secondary" className="mt-1">
                      Till this month
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Late */}
            <Card className="shadow-custom-md">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-info rounded-2xl">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Late Arrivals
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {summary.late}
                    </p>
                    <Badge variant="secondary" className="mt-1">
                      Till this month
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Attendance Trend */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Monthly Attendance Trend</CardTitle>
            <CardDescription>Your attendance history</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-72 w-full rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyAttendance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="present"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="absent"
                    stroke="#EF4444"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="late"
                    stroke="#F59E0B"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Today’s attendance status</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-72 w-full rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;
