import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, Award } from "lucide-react";

interface AnalyticsProps {
  members: Array<{ id: number; name: string; membershipType: string; joinDate: string }>;
  payments: Array<{ id: number; amount: string; date: string; memberId: string }>;
}

export const Analytics = ({ members, payments }: AnalyticsProps) => {
  // Calculate analytics data
  const totalRevenue = payments.reduce((sum, payment) => sum + parseFloat(payment.amount || "0"), 0);
  const thisMonthRevenue = payments
    .filter(p => new Date(p.date).getMonth() === new Date().getMonth())
    .reduce((sum, payment) => sum + parseFloat(payment.amount || "0"), 0);
  
  const lastMonthRevenue = payments
    .filter(p => new Date(p.date).getMonth() === new Date().getMonth() - 1)
    .reduce((sum, payment) => sum + parseFloat(payment.amount || "0"), 0);

  const revenueGrowth = lastMonthRevenue > 0 ? 
    ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100) : 0;

  const membershipDistribution = {
    BASIC: members.filter(m => m.membershipType === 'BASIC').length,
    PREMIUM: members.filter(m => m.membershipType === 'PREMIUM').length,
    VIP: members.filter(m => m.membershipType === 'VIP').length
  };

  const newMembersThisMonth = members.filter(m => 
    new Date(m.joinDate).getMonth() === new Date().getMonth()
  ).length;

  const avgRevenuePerMember = members.length > 0 ? totalRevenue / members.length : 0;

  const monthlyData = [
    { month: "Jan", revenue: 12400, members: 65 },
    { month: "Feb", revenue: 15600, members: 72 },
    { month: "Mar", revenue: 18200, members: 78 },
    { month: "Apr", revenue: 21800, members: 85 },
    { month: "May", revenue: 19500, members: 82 },
    { month: "Jun", revenue: 23400, members: 91 },
  ];

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
        <p className="text-muted-foreground">Detailed insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">${totalRevenue.toLocaleString()}</div>
            <div className="flex items-center mt-2">
              {revenueGrowth >= 0 ? <TrendingUp className="w-4 h-4 text-success mr-1" /> : <TrendingDown className="w-4 h-4 text-destructive mr-1" />}
              <span className={`text-sm ${revenueGrowth >= 0 ? 'text-success' : 'text-destructive'}`}>
                {Math.abs(revenueGrowth).toFixed(1)}% vs last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Total Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{members.length}</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-sm text-success">+{newMembersThisMonth} this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">${thisMonthRevenue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-2">December 2024</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Avg Revenue/Member
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">${avgRevenuePerMember.toFixed(0)}</div>
            <div className="text-sm text-muted-foreground mt-2">Per member</div>
          </CardContent>
        </Card>
      </div>

      {/* Membership Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Membership Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-primary text-primary-foreground">VIP</Badge>
                  <span className="text-sm text-muted-foreground">{membershipDistribution.VIP} members</span>
                </div>
                <span className="font-medium">{((membershipDistribution.VIP / members.length) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(membershipDistribution.VIP / members.length) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-accent text-accent-foreground">Premium</Badge>
                  <span className="text-sm text-muted-foreground">{membershipDistribution.PREMIUM} members</span>
                </div>
                <span className="font-medium">{((membershipDistribution.PREMIUM / members.length) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(membershipDistribution.PREMIUM / members.length) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-secondary text-secondary-foreground">Basic</Badge>
                  <span className="text-sm text-muted-foreground">{membershipDistribution.BASIC} members</span>
                </div>
                <span className="font-medium">{((membershipDistribution.BASIC / members.length) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(membershipDistribution.BASIC / members.length) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.slice(-6).map((data, index) => (
                <div key={data.month} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">{data.month}</div>
                    <div className="text-sm text-muted-foreground">{data.members} members</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-success">${data.revenue.toLocaleString()}</div>
                    {index > 0 && (
                      <div className="text-sm text-muted-foreground">
                        {data.revenue > monthlyData[monthlyData.length - 6 + index - 1].revenue ? '+' : ''}
                        {((data.revenue - monthlyData[monthlyData.length - 6 + index - 1].revenue) / monthlyData[monthlyData.length - 6 + index - 1].revenue * 100).toFixed(1)}%
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Best Performing Month</h4>
              <p className="text-2xl font-bold text-success">June</p>
              <p className="text-sm text-muted-foreground">$23,400 revenue, 91 members</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Member Retention</h4>
              <p className="text-2xl font-bold text-primary">87%</p>
              <p className="text-sm text-muted-foreground">Above industry average</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Peak Hours</h4>
              <p className="text-2xl font-bold text-accent">6-8 PM</p>
              <p className="text-sm text-muted-foreground">Highest gym utilization</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};