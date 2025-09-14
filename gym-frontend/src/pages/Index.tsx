import { useState } from "react";
import { Landing } from "./Landing";
import { LoginForm } from "@/components/gym/LoginForm";
import { MemberDashboard } from "./MemberDashboard";
import { Header } from "@/components/gym/Header";
import { Sidebar } from "@/components/gym/Sidebar";
import { Dashboard } from "@/components/gym/Dashboard";
import { MemberManagement } from "@/components/gym/MemberManagement";
import { PaymentManagement } from "@/components/gym/PaymentManagement";
import { AttendanceTracking } from "@/components/gym/AttendanceTracking";
import { Analytics } from "@/components/gym/Analytics";
import { Schedule } from "@/components/gym/Schedule";
import { Settings } from "@/components/gym/Settings";

interface User {
  name: string;
  email: string;
  role: string;
}

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
  subscriptionEndDate: string;
  subscriptionStatus: 'ACTIVE' | 'EXPIRING' | 'EXPIRED';
  lastPaymentDate: string;
}

interface Payment {
  id: number;
  amount: string;
  date: string;
  memberId: string;
  memberName?: string;
  membershipType?: string;
  paymentMethod: 'CASH' | 'CARD' | 'BANK_TRANSFER';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState("dashboard");
  const [showLogin, setShowLogin] = useState(false);

  // Mock member user data
  const memberUser = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    membershipType: 'PREMIUM' as const,
    joinDate: "2024-01-15",
    phone: "1234567890",
    emergencyContact: "Jane Doe - 0987654321"
  };

  // Mock data with subscription tracking
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      dob: "1990-05-15",
      phone: "1234567890",
      address: "123 Main Street",
      membershipType: "PREMIUM",
      payment: "75",
      joinDate: "2024-01-15",
      subscriptionEndDate: "2024-12-20", // Expiring soon
      subscriptionStatus: "EXPIRING",
      lastPaymentDate: "2024-11-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      dob: "1988-09-22",
      phone: "0987654321",
      address: "456 Oak Avenue",
      membershipType: "VIP",
      payment: "120",
      joinDate: "2024-02-01",
      subscriptionEndDate: "2025-02-01",
      subscriptionStatus: "ACTIVE",
      lastPaymentDate: "2024-12-01"
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@example.com",
      dob: "1995-03-10",
      phone: "5551234567",
      address: "789 Pine Road",
      membershipType: "BASIC",
      payment: "50",
      joinDate: "2024-03-01",
      subscriptionEndDate: "2024-12-18", // Expiring soon
      subscriptionStatus: "EXPIRING",
      lastPaymentDate: "2024-11-01"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      dob: "1992-07-08",
      phone: "5559876543",
      address: "321 Elm Street",
      membershipType: "PREMIUM",
      payment: "75",
      joinDate: "2024-06-01",
      subscriptionEndDate: "2025-06-01",
      subscriptionStatus: "ACTIVE",
      lastPaymentDate: "2024-12-01"
    }
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      amount: "75",
      date: "2024-12-01",
      memberId: "1",
      memberName: "John Doe",
      membershipType: "PREMIUM",
      paymentMethod: "CARD",
      status: "COMPLETED"
    },
    {
      id: 2,
      amount: "120",
      date: "2024-12-01",
      memberId: "2",
      memberName: "Jane Smith",
      membershipType: "VIP",
      paymentMethod: "BANK_TRANSFER",
      status: "COMPLETED"
    },
    {
      id: 3,
      amount: "50",
      date: "2024-12-01",
      memberId: "3",
      memberName: "Mike Wilson",
      membershipType: "BASIC",
      paymentMethod: "CASH",
      status: "COMPLETED"
    },
    {
      id: 4,
      amount: "75",
      date: "2024-12-01",
      memberId: "4",
      memberName: "Sarah Johnson",
      membershipType: "PREMIUM",
      paymentMethod: "CARD",
      status: "COMPLETED"
    }
  ]);

  const BASE_URL = "http://localhost:8080"; // Replace with your actual backend URL

  const handleLogin = async (credentials: { email: string; password: string; role: string }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          name: credentials.role === "ADMIN" ? "Admin User" : "Regular User",
          email: credentials.email,
          role: credentials.role,
        });
        setShowLogin(false);
        setCurrentView("dashboard");
        console.log("Login successful:", data);
      } else {
        console.error("Login failed:", response.statusText);
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("dashboard");
    setShowLogin(false);
  };

  const handleAddMember = async (newMember: Omit<Member, 'id' | 'joinDate' | 'subscriptionEndDate' | 'subscriptionStatus' | 'lastPaymentDate'>) => {
    try {
      const response = await fetch("http://localhost:8080/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer <your_token_here>", // Replace <your_token_here> with the actual token
        },
        body: JSON.stringify(newMember),
      });

      if (response.ok) {
        const addedMember = await response.json();
        setMembers((prev) => [...prev, addedMember]);
        alert("Member added successfully!");
      } else {
        console.error("Failed to add member:", response.statusText);
        alert("Failed to add member. Please try again.");
      }
    } catch (error) {
      console.error("Error while adding member:", error);
      alert("An error occurred while adding the member.");
    }
  };
  
  const handleUpdateMember = async (id: number, updatedMember: Partial<Member>) => {
    try {
      const response = await fetch(`http://localhost:8080/api/members/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer <your_token_here>", // Replace <your_token_here> with the actual token
        },
        body: JSON.stringify(updatedMember),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setMembers((prev) =>
          prev.map((member) => (member.id === id ? { ...member, ...updatedData } : member))
        );
        alert("Member updated successfully!");
      } else {
        console.error("Failed to update member:", response.statusText);
        alert("Failed to update member. Please try again.");
      }
    } catch (error) {
      console.error("Error while updating member:", error);
      alert("An error occurred while updating the member.");
    }
  };

  const handleDeleteMember = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/members/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer <your_token_here>", // Replace <your_token_here> with the actual token
        },
      });

      if (response.ok) {
        setMembers((prev) => prev.filter((member) => member.id !== id));
        setPayments((prev) => prev.filter((payment) => payment.memberId !== id.toString()));
        alert("Member deleted successfully!");
      } else {
        console.error("Failed to delete member:", response.statusText);
        alert("Failed to delete member. Please try again.");
      }
    } catch (error) {
      console.error("Error while deleting member:", error);
      alert("An error occurred while deleting the member.");
    }
  };

  const handleAddPayment = async (newPayment: Omit<Payment, 'id' | 'memberName' | 'membershipType'>) => {
    try {
      const response = await fetch(`${BASE_URL}/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer <your_token_here>", // Replace <your_token_here> with the actual token
        },
        body: JSON.stringify({
          amount: newPayment.amount,
          date: newPayment.date,
          memberId: newPayment.memberId,
        }),
      });

      if (response.ok) {
        const addedPayment = await response.json();
        setPayments((prev) => [...prev, addedPayment]);
        alert("Payment added successfully!");
      } else {
        console.error("Failed to add payment:", response.statusText);
        alert("Failed to add payment. Please try again.");
      }
    } catch (error) {
      console.error("Error while adding payment:", error);
      alert("An error occurred while adding the payment.");
    }
  };

  const handleUpdatePayment = async (id: number, updatedPayment: Partial<Payment>) => {
    try {
      const response = await fetch(`${BASE_URL}/api/payments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer <your_token_here>", // Replace <your_token_here> with the actual token
        },
        body: JSON.stringify(updatedPayment),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setPayments((prev) =>
          prev.map((payment) => (payment.id === id ? { ...payment, ...updatedData } : payment))
        );
        alert("Payment updated successfully!");
      } else {
        console.error("Failed to update payment:", response.statusText);
        alert("Failed to update payment. Please try again.");
      }
    } catch (error) {
      console.error("Error while updating payment:", error);
      alert("An error occurred while updating the payment.");
    }
  };

  const handleDeletePayment = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/api/payments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer <your_token_here>", // Replace <your_token_here> with the actual token
        },
      });

      if (response.ok) {
        setPayments((prev) => prev.filter((payment) => payment.id !== id));
        alert("Payment deleted successfully!");
      } else {
        console.error("Failed to delete payment:", response.statusText);
        alert("Failed to delete payment. Please try again.");
      }
    } catch (error) {
      console.error("Error while deleting payment:", error);
      alert("An error occurred while deleting the payment.");
    }
  };

  // Calculate dashboard stats with expiring memberships
  const today = new Date();
  const tenDaysFromNow = new Date(today);
  tenDaysFromNow.setDate(today.getDate() + 10);

  const expiringMembers = members.filter((member) => {
    const endDate = new Date(member.subscriptionEndDate);
    return endDate >= today && endDate <= tenDaysFromNow;
  });

  const dashboardStats = {
    totalMembers: members.length,
    activeMembers: members.filter((m) => m.subscriptionStatus === "ACTIVE").length,
    monthlyRevenue: payments.reduce((sum, payment) => sum + parseFloat(payment.amount || "0"), 0),
    expiringMemberships: expiringMembers.length,
  };

  // Show landing page by default
  if (!showLogin && !user) {
    return <Landing onLoginClick={() => setShowLogin(true)} />;
  }

  // Show login form when login is clicked
  if (showLogin && !user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Show member dashboard for USER role
  if (user?.role === "USER") {
    return <MemberDashboard user={memberUser} onLogout={handleLogout} />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard stats={dashboardStats} expiringMembers={expiringMembers} />;
      case "members":
        return (
          <MemberManagement
            members={members}
            onAddMember={handleAddMember}
            onUpdateMember={handleUpdateMember}
            onDeleteMember={handleDeleteMember}
          />
        );
      case "payments":
        return (
          <PaymentManagement
            payments={payments}
            members={members.map((m) => ({ id: m.id, name: m.name }))}
            onAddPayment={handleAddPayment}
            onUpdatePayment={handleUpdatePayment}
            onDeletePayment={handleDeletePayment}
          />
        );
      case "attendance":
        return (
          <AttendanceTracking
            members={members.map((m) => ({
              id: m.id,
              name: m.name,
              membershipType: m.membershipType,
            }))}
          />
        );
      case "analytics":
        return <Analytics members={members} payments={payments} />;
      case "schedule":
        return <Schedule />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard stats={dashboardStats} expiringMembers={expiringMembers} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <div className="flex">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1">{renderCurrentView()}</main>
      </div>
    </div>
  );
};

export default Index;