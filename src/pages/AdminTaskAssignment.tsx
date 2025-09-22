"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Plus,
  Search,
  CalendarIcon,
  Clock,
  Flag,
  MoreHorizontal,
  Edit,
  Copy,
  Send,
  Users,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Circle,
  Play,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface Employee {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  department: string
  workload: number // percentage
}

interface TaskTemplate {
  id: string
  title: string
  description: string
  estimatedHours: number
  priority: "low" | "medium" | "high" | "urgent"
  tags: string[]
  project: string
}

interface AssignedTask {
  id: string
  title: string
  description: string
  assignedTo: Employee
  status: "todo" | "in-progress" | "completed" | "blocked"
  priority: "low" | "medium" | "high" | "urgent"
  dueDate: string
  estimatedHours: number
  actualHours: number
  tags: string[]
  project: string
  createdAt: string
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    avatar: "/professional-man-developer.png",
    role: "Senior Developer",
    department: "Engineering",
    workload: 85,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@company.com",
    avatar: "/professional-woman-developer.png",
    role: "Frontend Developer",
    department: "Engineering",
    workload: 70,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@company.com",
    avatar: "/professional-designer.png",
    role: "UI/UX Designer",
    department: "Design",
    workload: 60,
  },
]

const mockTaskTemplates: TaskTemplate[] = [
  {
    id: "1",
    title: "Code Review",
    description: "Review pull request and provide feedback",
    estimatedHours: 2,
    priority: "medium",
    tags: ["Review", "Quality"],
    project: "General",
  },
  {
    id: "2",
    title: "Bug Fix",
    description: "Investigate and fix reported bug",
    estimatedHours: 4,
    priority: "high",
    tags: ["Bug", "Maintenance"],
    project: "General",
  },
  {
    id: "3",
    title: "Feature Implementation",
    description: "Implement new feature according to specifications",
    estimatedHours: 8,
    priority: "medium",
    tags: ["Feature", "Development"],
    project: "General",
  },
]

const mockAssignedTasks: AssignedTask[] = [
  {
    id: "1",
    title: "Implement user authentication",
    description: "Create login/logout functionality with JWT tokens",
    assignedTo: mockEmployees[0],
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-15",
    estimatedHours: 8,
    actualHours: 5,
    tags: ["Backend", "Security"],
    project: "User Management",
    createdAt: "2024-01-08",
  },
  {
    id: "2",
    title: "Design mobile interface",
    description: "Create responsive design for mobile devices",
    assignedTo: mockEmployees[2],
    status: "todo",
    priority: "medium",
    dueDate: "2024-01-20",
    estimatedHours: 12,
    actualHours: 0,
    tags: ["Design", "Mobile"],
    project: "UI/UX",
    createdAt: "2024-01-09",
  },
]

const priorityConfig = {
  low: { color: "text-green-600", bg: "bg-green-100", label: "Low" },
  medium: { color: "text-yellow-600", bg: "bg-yellow-100", label: "Medium" },
  high: { color: "text-orange-600", bg: "bg-orange-100", label: "High" },
  urgent: { color: "text-red-600", bg: "bg-red-100", label: "Urgent" },
}

const statusConfig = {
  todo: { icon: Circle, color: "text-muted-foreground", bg: "bg-muted", label: "To Do" },
  "in-progress": { icon: Play, color: "text-blue-600", bg: "bg-blue-100", label: "In Progress" },
  completed: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100", label: "Completed" },
  blocked: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-100", label: "Blocked" },
}

export function AdminTaskAssignment() {
  const [employees] = useState<Employee[]>(mockEmployees)
  const [taskTemplates] = useState<TaskTemplate[]>(mockTaskTemplates)
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>(mockAssignedTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium" as "low" | "medium" | "high" | "urgent",
    dueDate: new Date(),
    estimatedHours: 4,
    tags: "",
    project: "",
  })

  const filteredTasks = assignedTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEmployee = selectedEmployee === "all" || task.assignedTo.id === selectedEmployee
    return matchesSearch && matchesEmployee
  })

  const createTask = () => {
    const assignedEmployee = employees.find((emp) => emp.id === newTask.assignedTo)
    if (!assignedEmployee) return

    const task: AssignedTask = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      assignedTo: assignedEmployee,
      status: "todo",
      priority: newTask.priority,
      dueDate: format(newTask.dueDate, "yyyy-MM-dd"),
      estimatedHours: newTask.estimatedHours,
      actualHours: 0,
      tags: newTask.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      project: newTask.project,
      createdAt: format(new Date(), "yyyy-MM-dd"),
    }

    setAssignedTasks([...assignedTasks, task])
    setIsCreateDialogOpen(false)
    setNewTask({
      title: "",
      description: "",
      assignedTo: "",
      priority: "medium",
      dueDate: new Date(),
      estimatedHours: 4,
      tags: "",
      project: "",
    })
  }

  const TaskCard = ({ task }: { task: AssignedTask }) => {
    const StatusIcon = statusConfig[task.status].icon
    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "completed"

    return (
      <Card className={cn("transition-all hover:shadow-md", isOverdue && "border-red-200")}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-base">{task.title}</CardTitle>
              <CardDescription className="text-sm mt-1">{task.project}</CardDescription>
            </div>
            <Badge
              variant="secondary"
              className={cn(priorityConfig[task.priority].bg, priorityConfig[task.priority].color)}
            >
              <Flag className="w-3 h-3 mr-1" />
              {priorityConfig[task.priority].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{task.description}</p>

          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={task.assignedTo.avatar || "/placeholder.svg"} alt={task.assignedTo.name} />
              <AvatarFallback>
                {task.assignedTo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{task.assignedTo.name}</p>
              <p className="text-xs text-muted-foreground">{task.assignedTo.role}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{task.estimatedHours}h estimated</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span className={cn(isOverdue && "text-red-600 font-medium")}>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <StatusIcon className={cn("w-4 h-4", statusConfig[task.status].color)} />
              <Badge variant="outline" className={statusConfig[task.status].bg}>
                {statusConfig[task.status].label}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const applyTemplate = (template: TaskTemplate) => {
    setNewTask({
      ...newTask,
      title: template.title,
      description: template.description,
      estimatedHours: template.estimatedHours,
      priority: template.priority,
      tags: template.tags.join(", "),
      project: template.project,
    })
  }

  return (
    <div className="space-y-6 mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold">Task Assignment</h1>
          <p className="text-muted-foreground">Create and assign tasks to your team members</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Assign a new task to a team member. You can use templates or create from scratch.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="create" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create">Create Task</TabsTrigger>
                <TabsTrigger value="templates">Use Template</TabsTrigger>
              </TabsList>

              <TabsContent value="templates" className="space-y-4">
                <div className="grid gap-3">
                  {taskTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className="cursor-pointer hover:shadow-md transition-all"
                      onClick={() => applyTemplate(template)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{template.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                            <div className="flex gap-2 mt-2">
                              {template.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={priorityConfig[template.priority].bg}>
                              {priorityConfig[template.priority].label}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{template.estimatedHours}h</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="create" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                      id="title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      placeholder="Enter task title..."
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="Describe the task in detail..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="assignee">Assign To</Label>
                      <Select
                        value={newTask.assignedTo}
                        onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map((employee) => (
                            <SelectItem key={employee.id} value={employee.id}>
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                                  <AvatarFallback className="text-xs">
                                    {employee.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{employee.name}</p>
                                  <p className="text-xs text-muted-foreground">{employee.role}</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newTask.priority}
                        onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Due Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="justify-start text-left font-normal bg-transparent">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(newTask.dueDate, "PPP")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={newTask.dueDate}
                            onSelect={(date) => date && setNewTask({ ...newTask, dueDate: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="hours">Estimated Hours</Label>
                      <Input
                        id="hours"
                        type="number"
                        value={newTask.estimatedHours}
                        onChange={(e) =>
                          setNewTask({ ...newTask, estimatedHours: Number.parseInt(e.target.value) || 0 })
                        }
                        min="1"
                        max="40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="project">Project</Label>
                      <Input
                        id="project"
                        value={newTask.project}
                        onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                        placeholder="Project name..."
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={newTask.tags}
                        onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                        placeholder="Frontend, Bug, Urgent..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createTask} disabled={!newTask.title || !newTask.assignedTo}>
                    <Send className="w-4 h-4 mr-2" />
                    Create & Assign
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Active Tasks</span>
            </div>
            <p className="text-2xl font-bold mt-2">{assignedTasks.filter((t) => t.status !== "completed").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <p className="text-2xl font-bold mt-2">{assignedTasks.filter((t) => t.status === "completed").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium">Overdue</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {assignedTasks.filter((t) => new Date(t.dueDate) < new Date() && t.status !== "completed").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Avg. Workload</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {Math.round(employees.reduce((acc, emp) => acc + emp.workload, 0) / employees.length)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by employee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Employees</SelectItem>
            {employees.map((employee) => (
              <SelectItem key={employee.id} value={employee.id}>
                {employee.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tasks */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-muted-foreground">Create your first task to get started.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
