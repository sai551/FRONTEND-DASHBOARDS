import { useState } from "react";
import { TrendingUp, Star, CheckCircle } from "lucide-react";

const goalsData = [
  { id: 1, title: "Complete Project X", status: "Completed", progress: 100 },
  { id: 2, title: "Improve coding efficiency", status: "In Progress", progress: 70 },
  { id: 3, title: "Mentor junior team members", status: "Not Started", progress: 0 },
];

const reviewsData = [
  { id: 1, reviewer: "Manager: Bhuvan P", rating: 4.5, feedback: "Great team player with consistent output." },
  { id: 2, reviewer: "Team Lead: Sandeep K", rating: 4.0, feedback: "Shows initiative and attention to detail." },
];

export default function EmployeePerformance() {
  const [goals] = useState(goalsData);
  const [reviews] = useState(reviewsData);

  return (
    <div className="flex flex-col h-full p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-violet-700" /> Performance Overview
        </h1>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-violet-100 p-4 rounded-lg shadow">
          <h2 className="text-sm text-gray-700">Overall Rating</h2>
          <p className="text-3xl font-bold flex items-center gap-2 text-violet-800">
            4.3 <Star className="h-5 w-5 text-yellow-500" />
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-sm text-gray-700">Goals Completed</h2>
          <p className="text-3xl font-bold text-green-700">5/8</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-sm text-gray-700">Last Review Date</h2>
          <p className="text-lg font-bold text-blue-700">25th July, 2025</p>
        </div>
      </div>

      {/* Goals Section */}
      <div className="bg-white border rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-4">Your Goals</h2>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <p className="font-medium">{goal.title}</p>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    goal.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : goal.status === "In Progress"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {goal.status}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    goal.progress === 100
                      ? "bg-green-600"
                      : goal.progress > 0
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white border rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-4">Manager & Lead Reviews</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-3 border rounded-lg flex flex-col gap-2 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{review.reviewer}</p>
                <span className="flex items-center gap-1 text-yellow-600">
                  <Star className="h-4 w-4" /> {review.rating}
                </span>
              </div>
              <p className="text-sm text-gray-700">{review.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <button className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5" /> Request New Review
        </button>
      </div>
    </div>
  );
}
