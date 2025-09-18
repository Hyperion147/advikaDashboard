"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Clock, CalendarIcon, MapPin, CheckCircle, XCircle, AlertCircle, Coffee, Home, Building } from "lucide-react"

// Mock attendance data
const attendanceHistory = [
  { date: "2024-01-15", status: "present", checkIn: "09:15", checkOut: "18:30", location: "Office" },
  { date: "2024-01-14", status: "present", checkIn: "09:00", checkOut: "18:15", location: "Remote" },
  { date: "2024-01-13", status: "late", checkIn: "09:45", checkOut: "18:45", location: "Office" },
  { date: "2024-01-12", status: "absent", checkIn: null, checkOut: null, location: null },
  { date: "2024-01-11", status: "present", checkIn: "08:55", checkOut: "18:00", location: "Office" },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "present":
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case "absent":
      return <XCircle className="w-4 h-4 text-red-500" />
    case "late":
      return <AlertCircle className="w-4 h-4 text-yellow-500" />
    default:
      return <Clock className="w-4 h-4 text-gray-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "present":
      return "bg-green-100 text-green-800 border-green-200"
    case "absent":
      return "bg-red-100 text-red-800 border-red-200"
    case "late":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function AttendanceSetup() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [attendanceType, setAttendanceType] = useState("")
  const [workLocation, setWorkLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [isCheckedIn, setIsCheckedIn] = useState(false)

  const handleCheckIn = () => {
    setIsCheckedIn(true)
    // Here you would typically make an API call to record check-in
  }

  const handleCheckOut = () => {
    setIsCheckedIn(false)
    // Here you would typically make an API call to record check-out
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Attendance Management</h1>
        <p className="text-muted-foreground mt-1">Track your daily attendance and manage work schedules</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 border-dashed border-accent/20 hover:border-accent/40 transition-colors">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Quick Check-in</h3>
            <p className="text-sm text-muted-foreground mb-3">Mark your attendance now</p>
            <Button onClick={handleCheckIn} disabled={isCheckedIn} className="w-full">
              {isCheckedIn ? "Checked In" : "Check In"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed border-muted/20 hover:border-muted/40 transition-colors">
          <CardContent className="p-6 text-center">
            <Coffee className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Break Time</h3>
            <p className="text-sm text-muted-foreground mb-3">Start your break</p>
            <Button variant="outline" className="w-full bg-transparent">
              Start Break
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed border-muted/20 hover:border-muted/40 transition-colors">
          <CardContent className="p-6 text-center">
            <Home className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Work from Home</h3>
            <p className="text-sm text-muted-foreground mb-3">Set remote status</p>
            <Button variant="outline" className="w-full bg-transparent">
              Set Remote
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed border-muted/20 hover:border-muted/40 transition-colors">
          <CardContent className="p-6 text-center">
            <Building className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Office Check-in</h3>
            <p className="text-sm text-muted-foreground mb-3">Mark office presence</p>
            <Button variant="outline" className="w-full bg-transparent">
              At Office
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Mark Attendance
            </CardTitle>
            <CardDescription>Record your daily attendance with details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="attendance-type">Attendance Type</Label>
                <Select value={attendanceType} onValueChange={setAttendanceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select attendance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-day">Full Day</SelectItem>
                    <SelectItem value="half-day">Half Day</SelectItem>
                    <SelectItem value="sick-leave">Sick Leave</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="personal-leave">Personal Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="work-location">Work Location</Label>
                <Select value={workLocation} onValueChange={setWorkLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="remote">Work from Home</SelectItem>
                    <SelectItem value="client-site">Client Site</SelectItem>
                    <SelectItem value="co-working">Co-working Space</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about your attendance..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Attendance
              </Button>
              <Button variant="outline">Save as Draft</Button>
            </div>
          </CardContent>
        </Card>

        {/* Calendar & Current Status */}
        <div className="space-y-6">
          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-accent-foreground" />
                </div>
                <p className="font-semibold">{isCheckedIn ? "Checked In" : "Not Checked In"}</p>
                <p className="text-sm text-muted-foreground">{isCheckedIn ? "Since 09:15 AM" : "Ready to check in"}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Office
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Work Hours</span>
                  <span className="font-medium">7h 45m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Break Time</span>
                  <span className="font-medium">45m</span>
                </div>
              </div>

              {isCheckedIn && (
                <Button variant="outline" className="w-full bg-transparent" onClick={handleCheckOut}>
                  <Clock className="w-4 h-4 mr-2" />
                  Check Out
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Mini Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select date for attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance History</CardTitle>
          <CardDescription>Your attendance record for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceHistory.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <p className="font-medium">
                      {new Date(record.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {record.checkIn && record.checkOut
                        ? `${record.checkIn} - ${record.checkOut}`
                        : record.status === "absent"
                          ? "No attendance recorded"
                          : "Incomplete record"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {record.location && (
                    <Badge variant="outline" className="text-xs">
                      <MapPin className="w-3 h-3 mr-1" />
                      {record.location}
                    </Badge>
                  )}
                  <Badge variant="outline" className={`text-xs ${getStatusColor(record.status)}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
