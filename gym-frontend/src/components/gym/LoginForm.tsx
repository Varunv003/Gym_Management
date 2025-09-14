import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string; role: string }) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [adminCredentials, setAdminCredentials] = useState({
    email: "admin@example.com",
    password: "admin123"
  });
  
  const [userCredentials, setUserCredentials] = useState({
    email: "user@example.com", 
    password: "user123"
  });

  const { toast } = useToast();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate admin credentials
    if (adminCredentials.email === "admin@example.com" && adminCredentials.password === "admin123") {
      onLogin({ ...adminCredentials, role: "ADMIN" });
      toast({
        title: "Welcome Admin!",
        description: "Successfully logged in to GymPro Dashboard",
      });
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your email and password",
        variant: "destructive",
      });
    }
  };

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate user credentials
    if (userCredentials.email === "user@example.com" && userCredentials.password === "user123") {
      onLogin({ ...userCredentials, role: "USER" });
      toast({
        title: "Welcome!",
        description: "Successfully logged in to your account",
      });
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your email and password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md animate-slide-up">
        <Card className="bg-card shadow-card border-border">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to GymPro</CardTitle>
            <CardDescription>
              Sign in to your gym management dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="admin" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="user">User</TabsTrigger>
              </TabsList>
              
              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={adminCredentials.email}
                      onChange={(e) => setAdminCredentials(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={adminCredentials.password}
                      onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 transition-smooth">
                    Sign In as Admin
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="user">
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={userCredentials.email}
                      onChange={(e) => setUserCredentials(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-password">Password</Label>
                    <Input
                      id="user-password"
                      type="password"
                      value={userCredentials.password}
                      onChange={(e) => setUserCredentials(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 transition-smooth">
                    Sign In
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};