import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock, Users, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClassSchedule {
  id: number;
  name: string;
  instructor: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  room: string;
  type: 'cardio' | 'strength' | 'yoga' | 'hiit' | 'dance';
  days: string[];
}

export const Schedule = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("monday");
  const { toast } = useToast();

  const [classes, setClasses] = useState<ClassSchedule[]>([
    {
      id: 1,
      name: "Morning Yoga",
      instructor: "Sarah Johnson",
      time: "08:00",
      duration: 60,
      capacity: 20,
      enrolled: 15,
      room: "Studio A",
      type: "yoga",
      days: ["monday", "wednesday", "friday"]
    },
    {
      id: 2,
      name: "HIIT Training",
      instructor: "Mike Rodriguez",
      time: "18:00",
      duration: 45,
      capacity: 15,
      enrolled: 12,
      room: "Fitness Floor",
      type: "hiit",
      days: ["tuesday", "thursday"]
    },
    {
      id: 3,
      name: "Strength Building",
      instructor: "Alex Morgan",
      time: "10:00",
      duration: 90,
      capacity: 12,
      enrolled: 8,
      room: "Weight Room",
      type: "strength",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
    },
    {
      id: 4,
      name: "Zumba Dance",
      instructor: "Maria Garcia",
      time: "19:30",
      duration: 60,
      capacity: 25,
      enrolled: 22,
      room: "Studio B",
      type: "dance",
      days: ["monday", "wednesday", "friday"]
    },
    {
      id: 5,
      name: "Cardio Blast",
      instructor: "John Smith",
      time: "07:00",
      duration: 45,
      capacity: 20,
      enrolled: 18,
      room: "Cardio Zone",
      type: "cardio",
      days: ["tuesday", "thursday", "saturday"]
    }
  ]);

  const [newClass, setNewClass] = useState({
    name: "",
    instructor: "",
    time: "",
    duration: 60,
    capacity: 20,
    room: "",
    type: "cardio" as ClassSchedule['type'],
    days: [] as string[]
  });

  const daysOfWeek = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" }
  ];

  const classTypes = {
    cardio: { color: "bg-primary text-primary-foreground", label: "Cardio" },
    strength: { color: "bg-accent text-accent-foreground", label: "Strength" },
    yoga: { color: "bg-success text-success-foreground", label: "Yoga" },
    hiit: { color: "bg-destructive text-destructive-foreground", label: "HIIT" },
    dance: { color: "bg-warning text-warning-foreground", label: "Dance" }
  };

  const filteredClasses = classes
    .filter(cls => cls.days.includes(selectedDay))
    .sort((a, b) => a.time.localeCompare(b.time));

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    const classData: ClassSchedule = {
      ...newClass,
      id: Math.max(...classes.map(c => c.id), 0) + 1,
      enrolled: 0
    };
    setClasses(prev => [...prev, classData]);
    setNewClass({
      name: "",
      instructor: "",
      time: "",
      duration: 60,
      capacity: 20,
      room: "",
      type: "cardio",
      days: []
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Class Added",
      description: "New class has been successfully scheduled.",
    });
  };

  const getUtilization = (enrolled: number, capacity: number) => {
    return (enrolled / capacity) * 100;
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Class Schedule</h1>
          <p className="text-muted-foreground">Manage gym classes and training sessions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 transition-smooth">
              <Plus className="mr-2 h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Class</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddClass} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Class Name</Label>
                <Input
                  id="name"
                  value={newClass.name}
                  onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={newClass.instructor}
                  onChange={(e) => setNewClass(prev => ({ ...prev, instructor: e.target.value }))}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newClass.time}
                    onChange={(e) => setNewClass(prev => ({ ...prev, time: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newClass.duration}
                    onChange={(e) => setNewClass(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newClass.capacity}
                    onChange={(e) => setNewClass(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Room</Label>
                  <Input
                    id="room"
                    value={newClass.room}
                    onChange={(e) => setNewClass(prev => ({ ...prev, room: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Class Type</Label>
                <select
                  id="type"
                  value={newClass.type}
                  onChange={(e) => setNewClass(prev => ({ ...prev, type: e.target.value as ClassSchedule['type'] }))}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                  required
                >
                  {Object.entries(classTypes).map(([value, { label }]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Days</Label>
                <div className="grid grid-cols-2 gap-2">
                  {daysOfWeek.map((day) => (
                    <label key={day.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newClass.days.includes(day.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewClass(prev => ({ ...prev, days: [...prev.days, day.id] }));
                          } else {
                            setNewClass(prev => ({ ...prev, days: prev.days.filter(d => d !== day.id) }));
                          }
                        }}
                        className="rounded border-border"
                      />
                      <span className="text-sm">{day.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 transition-smooth">
                Schedule Class
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Day Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {daysOfWeek.map((day) => (
          <Button
            key={day.id}
            variant={selectedDay === day.id ? "default" : "outline"}
            onClick={() => setSelectedDay(day.id)}
            className={selectedDay === day.id ? "bg-gradient-primary" : ""}
          >
            {day.label}
          </Button>
        ))}
      </div>

      {/* Schedule Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Today's Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{filteredClasses.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Enrolled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">
              {filteredClasses.reduce((sum, cls) => sum + cls.enrolled, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              {filteredClasses.length > 0 ? 
                Math.round(filteredClasses.reduce((sum, cls) => sum + getUtilization(cls.enrolled, cls.capacity), 0) / filteredClasses.length) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Schedule */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>{daysOfWeek.find(d => d.id === selectedDay)?.label} Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClasses.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No classes scheduled for this day</p>
            ) : (
              filteredClasses.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">{cls.time}</div>
                      <div className="text-sm text-muted-foreground">{cls.duration}min</div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground">{cls.name}</h4>
                        <Badge className={classTypes[cls.type].color}>
                          {classTypes[cls.type].label}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {cls.instructor}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {cls.room}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {cls.enrolled}/{cls.capacity} enrolled
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getUtilization(cls.enrolled, cls.capacity).toFixed(0)}% capacity
                    </div>
                    <div className="mt-2">
                      <Badge className={getUtilization(cls.enrolled, cls.capacity) > 80 ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}>
                        {getUtilization(cls.enrolled, cls.capacity) > 80 ? "Almost Full" : "Available"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};