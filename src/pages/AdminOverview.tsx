"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Code,
  GitBranch,
  Bug,
  Calendar,
  DollarSign,
  Target,
  Award,
  Coffee,
  Zap,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"

export function AdminOverview() {
  const stats = [
    {
      title: "Total Employees",
      value: "124",
      change: "+12%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Present Today",
      value: "98",
      change: "79%",
      icon: CheckCircle,
      trend: "neutral",
    },
    {
      title: "Avg. Work Hours",
      value: "7.8h",
      change: "+0.3h",
      icon: Clock,
      trend: "up",
    },
    {
      title: "Late Arrivals",
      value: "8",
      change: "-15%",
      icon: AlertTriangle,
      trend: "down",
    },
  ]

  const recentActivity = [
    { employee: "Sarah Chen", action: "Checked in", time: "9:15 AM", status: "on-time" },
    { employee: "Mike Johnson", action: "Checked out", time: "6:30 PM", status: "completed" },
    { employee: "Alex Rodriguez", action: "Late arrival", time: "10:45 AM", status: "late" },
    { employee: "Emma Wilson", action: "Work from home", time: "9:00 AM", status: "remote" },
    { employee: "David Kim", action: "Checked in", time: "8:45 AM", status: "early" },
  ]

  const departmentStats = [
    { name: "Engineering", present: 45, total: 52, percentage: 87 },
    { name: "Design", present: 12, total: 15, percentage: 80 },
    { name: "Product", present: 18, total: 22, percentage: 82 },
    { name: "Marketing", present: 23, total: 28, percentage: 82 },
    { name: "Sales", present: 15, total: 18, percentage: 83 },
  ]

  const projectStats = [
    { name: "E-commerce Platform", progress: 85, status: "on-track", team: 8, deadline: "Dec 15" },
    { name: "Mobile App Redesign", progress: 62, status: "at-risk", team: 5, deadline: "Jan 20" },
    { name: "API Migration", progress: 94, status: "ahead", team: 4, deadline: "Nov 30" },
    { name: "Analytics Dashboard", progress: 38, status: "on-track", team: 6, deadline: "Feb 10" },
  ]

  const performanceMetrics = [
    { title: "Code Reviews", value: "156", change: "+23%", icon: GitBranch, trend: "up" },
    { title: "Bugs Fixed", value: "89", change: "+12%", icon: Bug, trend: "up" },
    { title: "Lines of Code", value: "45.2K", change: "+8%", icon: Code, trend: "up" },
    { title: "Sprint Velocity", value: "78", change: "+15%", icon: Zap, trend: "up" },
  ]

  const resourceAllocation = [
    { category: "Development", allocated: 65, available: 75, percentage: 87 },
    { category: "Testing", allocated: 12, available: 15, percentage: 80 },
    { category: "DevOps", allocated: 8, available: 10, percentage: 80 },
    { category: "Design", allocated: 10, available: 12, percentage: 83 },
  ]

  const wellnessMetrics = [
    { title: "Avg. Overtime", value: "2.3h", status: "good", icon: Clock },
    { title: "Break Compliance", value: "94%", status: "excellent", icon: Coffee },
    { title: "Stress Level", value: "Low", status: "good", icon: Activity },
    { title: "Satisfaction", value: "4.2/5", status: "good", icon: Award },
  ]

  return (
    <div className="space-y-6 p-4">
      {/* Quick Actions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Calendar className="w-5 h-5" />
              <span className="text-xs">Schedule Meeting</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Users className="w-5 h-5" />
              <span className="text-xs">Add Employee</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Target className="w-5 h-5" />
              <span className="text-xs">Set Goals</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <DollarSign className="w-5 h-5" />
              <span className="text-xs">Payroll</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp
                  className={`h-3 w-3 ${
                    stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : "text-gray-500"
                  }`}
                />
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : "text-gray-500"
                  }
                >
                  {stat.change}
                </span>
                <span>from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">{metric.change}</span>
                <span>this month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.employee}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        activity.status === "late"
                          ? "destructive"
                          : activity.status === "early"
                            ? "default"
                            : activity.status === "remote"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {activity.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Department Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{dept.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {dept.present}/{dept.total} ({dept.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Wellness Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Team Wellness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wellnessMetrics.map((metric) => (
                <div key={metric.title} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <metric.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{metric.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        metric.status === "excellent"
                          ? "default"
                          : metric.status === "good"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {metric.value}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Tracking and Resource Allocation Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Projects</CardTitle>
            <Button variant="outline" size="sm">
              <PieChart className="w-4 h-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectStats.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{project.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {project.team} members • Due {project.deadline}
                      </p>
                    </div>
                    <Badge
                      variant={
                        project.status === "ahead"
                          ? "default"
                          : project.status === "at-risk"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">{project.progress}% complete</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resource Allocation */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Resource Allocation</CardTitle>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Optimize
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resourceAllocation.map((resource) => (
                <div key={resource.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{resource.category}</span>
                    <span className="text-sm text-muted-foreground">
                      {resource.allocated}/{resource.available} ({resource.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        resource.percentage > 90
                          ? "bg-red-500"
                          : resource.percentage > 75
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${resource.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
