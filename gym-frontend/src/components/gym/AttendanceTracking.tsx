import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Search, UserCheck, TrendingUp, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AttendanceRecord {
  id: number;
  memberId: number;
  memberName: string;
  checkIn: string;
  checkOut?: string;
  date: string;
  duration?: number;
}

interface AttendanceProps {
  members: Array<{ id: number; name: string; membershipType: string }>;
}

export const AttendanceTracking = ({ members }: AttendanceProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  // Mock attendance data
  const [attendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: 1,
      memberId: 1,
      memberName: "John Doe",
      checkIn: "08:30",
      checkOut: "10:15",
      date: "2024-12-14",
      duration: 105
    },
    {
      id: 2,
      memberId: 2,
      memberName: "Jane Smith",
      checkIn: "07:00",
      checkOut: "08:45",
      date: "2024-12-14",
      duration: 105
    },
    {
      id: 3,
      memberId: 3,
      memberName: "Mike Wilson",
      checkIn: "18:30",
      date: "2024-12-14"
    },
    {
      id: 4,
      memberId: 1,
      memberName: "John Doe",
      checkIn: "09:00",
      checkOut: "11:30",
      date: "2024-12-13",
      duration: 150
    }
  ]);

  const todayRecords = attendanceRecords.filter(record => record.date === selectedDate);
  const filteredRecords = todayRecords.filter(record =>
    record.memberName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalCheckins: todayRecords.length,
    activeMembers: todayRecords.filter(r => !r.checkOut).length,
    avgDuration: Math.round(
      todayRecords.filter(r => r.duration).reduce((sum, r) => sum + (r.duration || 0), 0) / 
      todayRecords.filter(r => r.duration).length || 0
    ),
    peakHour: "08:00 - 10:00"
  };

  const handleCheckIn = (memberId: number) => {
    toast({
      title: "Check-in Successful",
      description: "Member has been checked in successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Tracking</h1>
          <p className="text-muted-foreground">Monitor member check-ins and gym usage patterns</p>
        </div>
        <div className="flex items-center space-x-4">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <UserCheck className="w-4 h-4 mr-2" />
              Today's Check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.totalCheckins}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Currently Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{stats.activeMembers}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Avg Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{stats.avgDuration}m</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Peak Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-warning">{stats.peakHour}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Check-in */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle>Quick Check-in</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {members.slice(0, 6).map((member) => (
              <Button
                key={member.id}
                variant="outline"
                onClick={() => handleCheckIn(member.id)}
                className="justify-start"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                {member.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Attendance Records - {new Date(selectedDate).toLocaleDateString()}</CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.memberName}</TableCell>
                  <TableCell>{record.checkIn}</TableCell>
                  <TableCell>{record.checkOut || "-"}</TableCell>
                  <TableCell>
                    {record.duration ? `${record.duration}m` : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge className={record.checkOut ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}>
                      {record.checkOut ? "Completed" : "Active"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};