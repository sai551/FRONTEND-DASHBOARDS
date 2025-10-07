import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Star, 
  TrendingUp, 
  AlertCircle,
  Filter,
  Download,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

export default function CustomerFeedback() {
  const feedbackMetrics = [
    {
      title: "Overall Rating",
      value: "4.6/5",
      change: "+0.2 this month",
      icon: Star,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Total Reviews",
      value: "1,247",
      change: "+89 this month",
      icon: MessageSquare,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Response Rate",
      value: "94%",
      change: "+3% improvement",
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Pending Reviews",
      value: "12",
      change: "Needs response",
      icon: AlertCircle,
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  const ratingBreakdown = [
    { stars: 5, count: 745, percentage: 60 },
    { stars: 4, count: 312, percentage: 25 },
    { stars: 3, count: 125, percentage: 10 },
    { stars: 2, count: 37, percentage: 3 },
    { stars: 1, count: 28, percentage: 2 }
  ];

  const recentFeedback = [
    {
      customer: "John Anderson",
      rating: 5,
      comment: "Excellent service! The team was professional and resolved my issue quickly.",
      date: "2 hours ago",
      category: "Customer Service",
      responded: true
    },
    {
      customer: "Sarah Mitchell",
      rating: 4,
      comment: "Good experience overall. Would appreciate faster response times.",
      date: "5 hours ago",
      category: "Response Time",
      responded: false
    },
    {
      customer: "Mike Thompson",
      rating: 5,
      comment: "Amazing product quality and great support team. Highly recommended!",
      date: "1 day ago",
      category: "Product Quality",
      responded: true
    },
    {
      customer: "Emma Davis",
      rating: 3,
      comment: "The service was okay but there's room for improvement in communication.",
      date: "2 days ago",
      category: "Communication",
      responded: false
    }
  ];

  const feedbackCategories = [
    { category: "Customer Service", count: 423, trend: "up", satisfaction: 92 },
    { category: "Product Quality", count: 356, trend: "up", satisfaction: 89 },
    { category: "Response Time", count: 234, trend: "down", satisfaction: 78 },
    { category: "Pricing", count: 167, trend: "up", satisfaction: 85 },
    { category: "Communication", count: 67, trend: "down", satisfaction: 74 }
  ];

  const getStarColor = (rating: number) => {
    if (rating >= 4) return "text-success";
    if (rating >= 3) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Feedback</h1>
          <p className="text-muted-foreground mt-1">
            Monitor customer satisfaction and manage feedback responses
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter Reviews
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Feedback Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {feedbackMetrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`font-medium ${metric.color}`}>{metric.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Rating Breakdown
            </CardTitle>
            <CardDescription>
              Distribution of customer ratings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ratingBreakdown.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm">{rating.stars}</span>
                  <Star className="h-3 w-3 fill-current text-yellow-500" />
                </div>
                <div className="flex-1">
                  <Progress value={rating.percentage} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground w-12 text-right">
                  {rating.count}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Feedback
            </CardTitle>
            <CardDescription>
              Latest customer reviews and comments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentFeedback.map((feedback, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{feedback.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-foreground">{feedback.customer}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < feedback.rating 
                                  ? 'fill-current text-yellow-500' 
                                  : 'text-muted-foreground'
                              }`} 
                            />
                          ))}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {feedback.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {feedback.responded ? (
                      <ThumbsUp className="h-4 w-4 text-success" />
                    ) : (
                      <ThumbsDown className="h-4 w-4 text-warning" />
                    )}
                    <span className="text-xs text-muted-foreground">{feedback.date}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">"{feedback.comment}"</p>
                {!feedback.responded && (
                  <Button size="sm" variant="outline">
                    Respond
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Feedback Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Feedback Categories
          </CardTitle>
          <CardDescription>
            Performance by feedback category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {feedbackCategories.map((category) => (
              <div key={category.category} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{category.category}</h4>
                  <TrendingUp 
                    className={`h-4 w-4 ${
                      category.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reviews</span>
                    <span className="font-medium">{category.count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Satisfaction</span>
                    <span className={`font-medium ${getStarColor(category.satisfaction / 20)}`}>
                      {category.satisfaction}%
                    </span>
                  </div>
                  <Progress value={category.satisfaction} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}