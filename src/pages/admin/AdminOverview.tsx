"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

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

  return (
    <div className="space-y-6 p-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <p className="text-sm font-medium text-primary">{activity.employee}</p>
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
                <div key={dept.name} className="space-y-2 text-primary/80">
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
      </div>
    </div>
  )
}
