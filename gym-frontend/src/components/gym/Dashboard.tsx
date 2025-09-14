import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, TrendingUp, AlertTriangle, Calendar } from "lucide-react";

interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  monthlyRevenue: number;
  expiringMemberships: number;
}

interface ExpiringMember {
  id: number;
  name: string;
  membershipType: string;
  subscriptionEndDate: string;
}

interface DashboardProps {
  stats: DashboardStats;
  expiringMembers: ExpiringMember[];
}

export const Dashboard = ({ stats, expiringMembers }: DashboardProps) => {
  const statCards = [
    {
      title: "Total Members",
      value: stats.totalMembers,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active Members", 
      value: stats.activeMembers,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Monthly Revenue",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Expiring Soon",
      value: stats.expiringMemberships,
      icon: AlertTriangle,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your gym management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="bg-gradient-card border-border shadow-card transition-smooth hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{card.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Expiring Memberships Alert */}
      {expiringMembers.length > 0 && (
        <Card className="bg-gradient-card border-border shadow-card border-l-4 border-l-warning">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-warning">
              <Calendar className="h-5 w-5" />
              <span>Memberships Expiring Soon</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expiringMembers.slice(0, 5).map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">{member.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {member.membershipType} Membership
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-warning">
                      Expires: {new Date(member.subscriptionEndDate).toLocaleDateString()}
                    </div>
                    <Badge className="bg-warning/10 text-warning border-warning/20 mt-1">
                      {Math.ceil((new Date(member.subscriptionEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                    </Badge>
                  </div>
                </div>
              ))}
              {expiringMembers.length > 5 && (
                <p className="text-sm text-muted-foreground text-center">
                  And {expiringMembers.length - 5} more members...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">New member joined: John Doe</span>
                <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-foreground">Payment received from Jane Smith</span>
                <span className="text-xs text-muted-foreground ml-auto">4 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm text-foreground">Membership updated: Mike Wilson</span>
                <span className="text-xs text-muted-foreground ml-auto">6 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/20 transition-smooth text-left">
                <Users className="h-6 w-6 text-primary mb-2" />
                <div className="text-sm font-medium text-foreground">Add Member</div>
              </button>
              <button className="p-4 bg-accent/10 hover:bg-accent/20 rounded-lg border border-accent/20 transition-smooth text-left">
                <DollarSign className="h-6 w-6 text-accent mb-2" />
                <div className="text-sm font-medium text-foreground">Record Payment</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};