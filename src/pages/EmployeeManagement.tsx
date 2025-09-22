"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, MoreHorizontal, Mail, Phone, MapPin, Clock } from "lucide-react"
import { NavLink } from "react-router-dom"

export function EmployeeManagement() {
  const employees = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Senior Frontend Developer",
      department: "Engineering",
      email: "sarah.chen@company.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      status: "Active",
      attendance: "Present",
      checkIn: "9:15 AM",
      avatar: "/professional-woman-developer.png",
    },
    {
      id: "2",
      name: "Mike Johnson",
      role: "Backend Developer",
      department: "Engineering",
      email: "mike.johnson@company.com",
      phone: "+1 (555) 234-5678",
      location: "Remote",
      status: "Active",
      attendance: "Present",
      checkIn: "8:45 AM",
      avatar: "/professional-man-developer.png",
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      role: "UX Designer",
      department: "Design",
      email: "alex.rodriguez@company.com",
      phone: "+1 (555) 345-6789",
      location: "New York, NY",
      status: "Active",
      attendance: "Late",
      checkIn: "10:45 AM",
      avatar: "/professional-designer.png",
    },
    {
      id: "4",
      name: "Emma Wilson",
      role: "Product Manager",
      department: "Product",
      email: "emma.wilson@company.com",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      status: "Active",
      attendance: "Remote",
      checkIn: "9:00 AM",
      avatar: "/professional-woman-manager.png",
    },
    {
      id: "5",
      name: "David Kim",
      role: "DevOps Engineer",
      department: "Engineering",
      email: "david.kim@company.com",
      phone: "+1 (555) 567-8901",
      location: "Seattle, WA",
      status: "Active",
      attendance: "Present",
      checkIn: "8:30 AM",
      avatar: "/professional-engineer.png",
    },
    {
      id: "6",
      name: "Lisa Park",
      role: "QA Engineer",
      department: "Engineering",
      email: "lisa.park@company.com",
      phone: "+1 (555) 678-9012",
      location: "Los Angeles, CA",
      status: "Inactive",
      attendance: "Absent",
      checkIn: "-",
      avatar: "/professional-woman-qa-engineer.jpg",
    },
  ]

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold">Employee Management</h1>
          <p className="text-muted-foreground">Manage and monitor all employees</p>
        </div>
        <Button>Add Employee</Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search employees..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                    <AvatarFallback>
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status and Attendance */}
              <div className="flex items-center justify-between">
                <Badge variant={employee.status === "Active" ? "secondary" : "outline"}>{employee.status}</Badge>
                <Badge
                  variant={
                    employee.attendance === "Present"
                      ? "default"
                      : employee.attendance === "Late"
                        ? "destructive"
                        : employee.attendance === "Remote"
                          ? "secondary"
                          : "outline"
                  }
                >
                  {employee.attendance}
                </Badge>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{employee.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Check-in: {employee.checkIn}</span>
                </div>
              </div>

              {/* Department */}
              <div className="pt-2 border-t">
                <span className="text-xs text-muted-foreground">Department</span>
                <p className="text-sm font-medium">{employee.department}</p>
              </div>

              {/* Action Button */}
              <NavLink to={`/employees/${employee.id}`}>
                <Button className="w-full bg-transparent" variant="outline">
                  View Details
                </Button>
              </NavLink>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
