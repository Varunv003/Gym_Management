import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Calendar, 
  TrendingUp, 
  Award, 
  LogOut,
  Edit,
  CreditCard,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MemberUser {
  id: number;
  name: string;
  email: string;
  membershipType: 'BASIC' | 'PREMIUM' | 'VIP';
  joinDate: string;
  phone: string;
  emergencyContact: string;
}

interface MemberDashboardProps {
  user: MemberUser;
  onLogout: () => void;
}

export const MemberDashboard = ({ user, onLogout }: MemberDashboardProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock member data
  const memberStats = {
    totalWorkouts: 45,
    thisMonth: 12,
    currentStreak: 5,
    personalBests: 8
  };

  const upcomingClasses = [
    { id: 1, name: "Morning Yoga", time: "8:00 AM", date: "Tomorrow", trainer: "Sarah J." },
    { id: 2, name: "HIIT Training", time: "6:00 PM", date: "Dec 15", trainer: "Mike R." },
    { id: 3, name: "Strength Training", time: "10:00 AM", date: "Dec 16", trainer: "Alex M." }
  ];

  const recentWorkouts = [
    { id: 1, type: "Cardio", duration: "45 min", date: "Today", calories: 320 },
    { id: 2, type: "Strength", duration: "60 min", date: "Yesterday", calories: 280 },
    { id: 3, type: "Yoga", duration: "30 min", date: "Dec 12", calories: 150 }
  ];

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'VIP': return 'bg-primary text-primary-foreground';
      case 'PREMIUM': return 'bg-accent text-accent-foreground';
      case 'BASIC': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">PowerFit Member Portal</h1>
                <p className="text-muted-foreground">Welcome back, {user.name}!</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 border-b border-border">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "profile", label: "Profile", icon: User },
            { id: "workouts", label: "Workouts", icon: Activity },
            { id: "classes", label: "Classes", icon: Calendar }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-smooth ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-slide-up">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Total Workouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">{memberStats.totalWorkouts}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{memberStats.thisMonth}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Current Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent">{memberStats.currentStreak} days</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Personal Bests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">{memberStats.personalBests}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span>Recent Workouts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentWorkouts.map((workout) => (
                    <div key={workout.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">{workout.type}</div>
                        <div className="text-sm text-muted-foreground">{workout.date} • {workout.duration}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-success">{workout.calories} cal</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Upcoming Classes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingClasses.map((class_) => (
                    <div key={class_.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">{class_.name}</div>
                        <div className="text-sm text-muted-foreground">{class_.date} • {class_.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">with {class_.trainer}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6 animate-slide-up">
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Member Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                    <Badge className={getMembershipColor(user.membershipType)}>
                      {user.membershipType} Member
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                      <p className="text-foreground">{user.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                      <p className="text-foreground">{new Date(user.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                      <p className="text-foreground">{user.emergencyContact}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Membership Status</label>
                      <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                    </div>
                  </div>
                </div>

                <Button className="bg-gradient-primary hover:opacity-90 transition-smooth">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Workouts Tab */}
        {activeTab === "workouts" && (
          <div className="space-y-6 animate-slide-up">
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>Workout Progress</CardTitle>
                <CardDescription>Track your fitness journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Monthly Goal</span>
                      <span>{memberStats.thisMonth}/20 workouts</span>
                    </div>
                    <Progress value={(memberStats.thisMonth / 20) * 100} className="h-2" />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    {recentWorkouts.map((workout) => (
                      <Card key={workout.id} className="bg-background">
                        <CardContent className="p-4">
                          <div className="font-medium text-foreground">{workout.type}</div>
                          <div className="text-sm text-muted-foreground">{workout.date}</div>
                          <div className="text-sm text-success">{workout.calories} calories</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Classes Tab */}
        {activeTab === "classes" && (
          <div className="space-y-6 animate-slide-up">
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>Your Classes</CardTitle>
                <CardDescription>Manage your class bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((class_) => (
                    <div key={class_.id} className="flex items-center justify-between p-4 bg-background rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{class_.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {class_.date} at {class_.time} with {class_.trainer}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};