import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: number;
  amount: string;
  date: string;
  memberId: string;
  memberName?: string;
}

interface PaymentManagementProps {
  payments: Payment[];
  members: Array<{ id: number; name: string }>;
  onAddPayment: (payment: Omit<Payment, 'id'>) => void;
  onUpdatePayment: (id: number, payment: Partial<Payment>) => void;
  onDeletePayment: (id: number) => void;
}

export const PaymentManagement = ({ 
  payments, 
  members, 
  onAddPayment, 
  onUpdatePayment, 
  onDeletePayment 
}: PaymentManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [newPayment, setNewPayment] = useState({
    amount: "",
    date: new Date().toISOString().split('T')[0],
    memberId: ""
  });

  const { toast } = useToast();

  // Add member names to payments
  const paymentsWithMemberNames = payments.map(payment => ({
    ...payment,
    memberName: members.find(m => m.id.toString() === payment.memberId)?.name || 'Unknown Member'
  }));

  const filteredPayments = paymentsWithMemberNames.filter(payment =>
    payment.memberName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.amount.includes(searchTerm)
  );

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPayment(newPayment);
    setNewPayment({
      amount: "",
      date: new Date().toISOString().split('T')[0],
      memberId: ""
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Payment Added",
      description: "New payment has been successfully recorded.",
    });
  };

  const handleUpdatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPayment) {
      onUpdatePayment(editingPayment.id, editingPayment);
      setEditingPayment(null);
      toast({
        title: "Payment Updated",
        description: "Payment information has been successfully updated.",
      });
    }
  };

  const handleDeletePayment = (id: number) => {
    onDeletePayment(id);
    toast({
      title: "Payment Deleted",
      description: "Payment has been successfully removed.",
      variant: "destructive",
    });
  };

  const totalRevenue = payments.reduce((sum, payment) => sum + parseFloat(payment.amount || "0"), 0);

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Payment Management</h1>
          <p className="text-muted-foreground">Track and manage gym payments and revenue</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 transition-smooth">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Record New Payment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddPayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="memberId">Member</Label>
                <select
                  id="memberId"
                  value={newPayment.memberId}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, memberId: e.target.value }))}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                  required
                >
                  <option value="">Select a member</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id.toString()}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, amount: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Payment Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newPayment.date}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 transition-smooth">
                Record Payment
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Revenue Summary */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-success" />
            <span>Revenue Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-success">
            ${totalRevenue.toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">Total payments received</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search payments..."
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
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.memberName}</TableCell>
                  <TableCell>
                    <span className="text-success font-semibold">
                      ${parseFloat(payment.amount).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className="bg-success/10 text-success border-success/20">
                      Completed
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingPayment(payment)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePayment(payment.id)}
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

      {/* Edit Payment Dialog */}
      <Dialog open={!!editingPayment} onOpenChange={() => setEditingPayment(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Payment</DialogTitle>
          </DialogHeader>
          {editingPayment && (
            <form onSubmit={handleUpdatePayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-memberId">Member</Label>
                <select
                  id="edit-memberId"
                  value={editingPayment.memberId}
                  onChange={(e) => setEditingPayment(prev => prev ? ({ ...prev, memberId: e.target.value }) : null)}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                  required
                >
                  {members.map((member) => (
                    <option key={member.id} value={member.id.toString()}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-amount">Amount</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  step="0.01"
                  value={editingPayment.amount}
                  onChange={(e) => setEditingPayment(prev => prev ? ({ ...prev, amount: e.target.value }) : null)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-date">Payment Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editingPayment.date}
                  onChange={(e) => setEditingPayment(prev => prev ? ({ ...prev, date: e.target.value }) : null)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 transition-smooth">
                Update Payment
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};