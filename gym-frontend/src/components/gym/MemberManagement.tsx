import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Member {
  id: number;
  name: string;
  email: string;
  dob: string;
  phone: string;
  address: string;
  membershipType: 'BASIC' | 'PREMIUM' | 'VIP';
  payment: string;
  joinDate: string;
}

interface MemberManagementProps {
  members: Member[];
  onAddMember: (member: Omit<Member, 'id' | 'joinDate'>) => void;
  onUpdateMember: (id: number, member: Partial<Member>) => void;
  onDeleteMember: (id: number) => void;
}

export const MemberManagement = ({ members, onAddMember, onUpdateMember, onDeleteMember }: MemberManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [newMember, setNewMember] = useState<{
    name: string;
    email: string;
    dob: string;
    phone: string;
    address: string;
    membershipType: 'BASIC' | 'PREMIUM' | 'VIP';
    payment: string;
  }>({
    name: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
    membershipType: "BASIC",
    payment: ""
  });

  const { toast } = useToast();

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMember(newMember);
    setNewMember({
      name: "",
      email: "",
      dob: "",
      phone: "",
      address: "",
      membershipType: "BASIC",
      payment: ""
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Member Added",
      description: "New member has been successfully added.",
    });
  };

  const handleUpdateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      onUpdateMember(editingMember.id, editingMember);
      setEditingMember(null);
      toast({
        title: "Member Updated",
        description: "Member information has been successfully updated.",
      });
    }
  };

  const handleDeleteMember = (id: number) => {
    onDeleteMember(id);
    toast({
      title: "Member Deleted",
      description: "Member has been successfully removed.",
      variant: "destructive",
    });
  };

  const getMembershipBadgeColor = (type: string) => {
    switch (type) {
      case 'VIP': return 'bg-primary text-primary-foreground';
      case 'PREMIUM': return 'bg-accent text-accent-foreground';
      case 'BASIC': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Member Management</h1>
          <p className="text-muted-foreground">Manage your gym members and their memberships</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 transition-smooth">
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={newMember.dob}
                  onChange={(e) => setNewMember(prev => ({ ...prev, dob: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newMember.phone}
                  onChange={(e) => setNewMember(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newMember.address}
                  onChange={(e) => setNewMember(prev => ({ ...prev, address: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="membershipType">Membership Type</Label>
                <Select value={newMember.membershipType} onValueChange={(value: 'BASIC' | 'PREMIUM' | 'VIP') => setNewMember(prev => ({ ...prev, membershipType: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BASIC">Basic</SelectItem>
                    <SelectItem value="PREMIUM">Premium</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment">Payment Amount</Label>
                <Input
                  id="payment"
                  value={newMember.payment}
                  onChange={(e) => setNewMember(prev => ({ ...prev, payment: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 transition-smooth">
                Add Member
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>
                    <Badge className={getMembershipBadgeColor(member.membershipType)}>
                      {member.membershipType}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingMember(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Member Dialog */}
      <Dialog open={!!editingMember} onOpenChange={() => setEditingMember(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>
          {editingMember && (
            <form onSubmit={handleUpdateMember} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingMember.email}
                  onChange={(e) => setEditingMember(prev => prev ? ({ ...prev, email: e.target.value }) : null)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editingMember.phone}
                  onChange={(e) => setEditingMember(prev => prev ? ({ ...prev, phone: e.target.value }) : null)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-membershipType">Membership Type</Label>
                <Select 
                  value={editingMember.membershipType} 
                  onValueChange={(value: 'BASIC' | 'PREMIUM' | 'VIP') => 
                    setEditingMember(prev => prev ? ({ ...prev, membershipType: value }) : null)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BASIC">Basic</SelectItem>
                    <SelectItem value="PREMIUM">Premium</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 transition-smooth">
                Update Member
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};