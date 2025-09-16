"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Clock,
  GitCommit,
  Bug,
  CheckCircle,
  TrendingUp,
  Users,
  Code,
  Coffee,
  Target,
  Award,
} from "lucide-react"

// Mock data for demonstration
const mockData = {
  attendance: {
    thisMonth: 22,
    totalDays: 24,
    percentage: 92,
    status: "Present",
    checkInTime: "09:15 AM",
  },
  performance: {
    tasksCompleted: 28,
    codeReviews: 15,
    bugsFixed: 8,
    linesOfCode: 2847,
  },
  projects: [
    { name: "E-commerce Platform", progress: 85, status: "On Track" },
    { name: "Mobile App Redesign", progress: 60, status: "In Progress" },
    { name: "API Integration", progress: 95, status: "Almost Done" },
  ],
  recentActivity: [
    { action: "Completed task: User Authentication", time: "2 hours ago", type: "task" },
    { action: "Code review approved", time: "4 hours ago", type: "review" },
    { action: "Fixed bug: Payment gateway issue", time: "1 day ago", type: "bug" },
    { action: "Deployed feature: Dark mode toggle", time: "2 days ago", type: "deploy" },
  ],
}

export function Dashboard() {
  return (
    <div className="space-y-6 w-full p-4">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Good morning, John! 👋</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your work today.</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-primary">
          <Calendar className="w-4 h-4 mr-2" />
          Mark Attendance
        </Button>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockData.attendance.percentage}%</div>
            <p className="text-xs text-muted-foreground">
              {mockData.attendance.thisMonth}/{mockData.attendance.totalDays} days this month
            </p>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs text-primary">
                <CheckCircle className="w-3 h-3 mr-1" />
                {mockData.attendance.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ring">{mockData.performance.tasksCompleted}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs text-ring border-ring">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending Up
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Code Reviews</CardTitle>
            <GitCommit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">{mockData.performance.codeReviews}</div>
            <p className="text-xs text-muted-foreground">5 pending reviews</p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs text-chart-1 border-chart-1">
                <Users className="w-3 h-3 mr-1 text-chart-1" />
                Team Player
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bugs Fixed</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{mockData.performance.bugsFixed}</div>
            <p className="text-xs text-muted-foreground">2 critical, 6 minor</p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs text-chart-2 border-chart-2">
                <Award className="w-3 h-3 mr-1" />
                Bug Hunter
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Projects */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Active Projects
            </CardTitle>
            <CardDescription>Your current project assignments and progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.projects.map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{project.name}</h4>
                  <Badge
                    variant={project.progress >= 90 ? "default" : project.progress >= 70 ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Schedule & Quick Actions */}
        <div className="space-y-6">
          {/* Today's Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Today's Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Check-in Time</span>
                <span className="font-medium">{mockData.attendance.checkInTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hours Worked</span>
                <span className="font-medium">7h 45m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Break Time</span>
                <span className="font-medium flex items-center gap-1">
                  <Coffee className="w-3 h-3" />
                  45m
                </span>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                <Clock className="w-4 h-4 mr-2" />
                Check Out
              </Button>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
              <CardDescription>Your performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Lines of Code</span>
                <span className="font-medium">{mockData.performance.linesOfCode.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Commits</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">PR Reviews</span>
                <span className="font-medium">{mockData.performance.codeReviews}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Issues Closed</span>
                <span className="font-medium">12</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest work updates and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
