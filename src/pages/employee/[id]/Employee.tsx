"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Mail, Phone, MapPin, Calendar, CheckCircle, XCircle, AlertTriangle, ArrowLeft, Edit } from "lucide-react"
import { NavLink } from "react-router-dom"

interface EmployeeDetailProps {
  employeeId: string
}

export function EmployeeDetail({ employeeId }: EmployeeDetailProps) {
  // Mock data - in real app this would be fetched based on employeeId
  const employee = {
    id: employeeId,
    name: "Sarah Chen",
    role: "Senior Frontend Developer",
    department: "Engineering",
    email: "sarah.chen@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "March 15, 2022",
    status: "active",
    avatar: "/professional-woman-developer.png",
  }

  const attendanceStats = {
    thisMonth: { present: 18, late: 2, absent: 1, total: 21 },
    thisWeek: { present: 4, late: 1, absent: 0, total: 5 },
    avgHours: 7.8,
    punctuality: 85,
  }

  const recentAttendance = [
    { date: "2024-01-15", checkIn: "9:15 AM", checkOut: "6:30 PM", hours: "8h 15m", status: "present" },
    { date: "2024-01-14", checkIn: "10:45 AM", checkOut: "7:00 PM", hours: "8h 15m", status: "late" },
    { date: "2024-01-13", checkIn: "9:00 AM", checkOut: "6:15 PM", hours: "8h 15m", status: "present" },
    { date: "2024-01-12", checkIn: "8:45 AM", checkOut: "6:00 PM", hours: "8h 15m", status: "present" },
    { date: "2024-01-11", checkIn: "-", checkOut: "-", hours: "-", status: "absent" },
  ]

  const performanceMetrics = [
    { label: "Tasks Completed", value: 47, target: 50, percentage: 94 },
    { label: "Code Reviews", value: 23, target: 25, percentage: 92 },
    { label: "Bug Fixes", value: 12, target: 15, percentage: 80 },
    { label: "Team Collaboration", value: 18, target: 20, percentage: 90 },
  ]

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <NavLink to="/employees">
          <Button variant="ghost" size="icon" className="border rounded-xl shadow-sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </NavLink>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Employee Details</h1>
          <p className="text-muted-foreground">Detailed view and management</p>
        </div>
        <Button className="flex items-center gap-2">
          <Edit className="w-4 h-4" />
          Edit Employee
        </Button>
      </div>

      {/* Employee Info Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
              <AvatarFallback className="text-lg">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{employee.name}</h2>
                <p className="text-muted-foreground">{employee.role}</p>
                <Badge className="mt-2" variant={employee.status === "active" ? "default" : "secondary"}>
                  {employee.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{employee.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined {employee.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-6">
          {/* Attendance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {attendanceStats.thisMonth.present}/{attendanceStats.thisMonth.total}
                </div>
                <p className="text-xs text-muted-foreground">Days Present</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Late Arrivals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{attendanceStats.thisMonth.late}</div>
                <p className="text-xs text-muted-foreground">This Month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{attendanceStats.avgHours}h</div>
                <p className="text-xs text-muted-foreground">Per Day</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Punctuality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{attendanceStats.punctuality}%</div>
                <p className="text-xs text-muted-foreground">On Time Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAttendance.map((record, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8">
                        {record.status === "present" && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {record.status === "late" && <AlertTriangle className="w-5 h-5 text-orange-500" />}
                        {record.status === "absent" && <XCircle className="w-5 h-5 text-red-500" />}
                      </div>
                      <div>
                        <p className="font-medium">{record.date}</p>
                        <p className="text-sm text-muted-foreground">
                          {record.checkIn} - {record.checkOut}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{record.hours}</p>
                      <Badge
                        variant={
                          record.status === "present" ? "default" : record.status === "late" ? "destructive" : "outline"
                        }
                      >
                        {record.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <p className="text-sm text-muted-foreground">Current month performance overview</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {metric.value}/{metric.target} ({metric.percentage}%)
                    </span>
                  </div>
                  <Progress value={metric.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Employee ID</label>
                  <p className="text-sm">{employee.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <p className="text-sm">{employee.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Join Date</label>
                  <p className="text-sm">{employee.joinDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <p className="text-sm capitalize">{employee.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
