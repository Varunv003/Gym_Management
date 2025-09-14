import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Bell, Shield, CreditCard, Users, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Settings = () => {
  const { toast } = useToast();
  
  const [gymSettings, setGymSettings] = useState({
    name: "PowerFit Gym",
    address: "123 Fitness Avenue, New York, NY 10001",
    phone: "(555) 123-4567",
    email: "info@powerfitgym.com",
    website: "www.powerfitgym.com",
    timezone: "America/New_York",
    currency: "USD"
  });

  const [membershipSettings, setMembershipSettings] = useState({
    basicPrice: 50,
    premiumPrice: 75,
    vipPrice: 120,
    signupFee: 25,
    freezeFee: 10,
    autoRenewal: true,
    proRating: true,
    gracePeriod: 7
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    paymentReminders: true,
    expirationWarnings: true,
    lowAttendanceAlerts: true,
    capacityAlerts: true
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
    auditLog: true
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure gym preferences and system settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-primary" />
                <span>Gym Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gym-name">Gym Name</Label>
                  <Input
                    id="gym-name"
                    value={gymSettings.name}
                    onChange={(e) => setGymSettings(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={gymSettings.phone}
                    onChange={(e) => setGymSettings(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={gymSettings.address}
                  onChange={(e) => setGymSettings(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={gymSettings.email}
                    onChange={(e) => setGymSettings(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={gymSettings.website}
                    onChange={(e) => setGymSettings(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={gymSettings.timezone}
                    onChange={(e) => setGymSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    value={gymSettings.currency}
                    onChange={(e) => setGymSettings(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                  </select>
                </div>
              </div>

              <Button onClick={() => handleSave("General")} className="bg-gradient-primary hover:opacity-90 transition-smooth">
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Membership Settings */}
        <TabsContent value="membership">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Membership Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-4">Membership Prices</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basic-price">Basic Plan</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="basic-price"
                        type="number"
                        value={membershipSettings.basicPrice}
                        onChange={(e) => setMembershipSettings(prev => ({ ...prev, basicPrice: parseInt(e.target.value) }))}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="premium-price">Premium Plan</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="premium-price"
                        type="number"
                        value={membershipSettings.premiumPrice}
                        onChange={(e) => setMembershipSettings(prev => ({ ...prev, premiumPrice: parseInt(e.target.value) }))}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vip-price">VIP Plan</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="vip-price"
                        type="number"
                        value={membershipSettings.vipPrice}
                        onChange={(e) => setMembershipSettings(prev => ({ ...prev, vipPrice: parseInt(e.target.value) }))}
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-4">Additional Fees</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-fee">Signup Fee</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="signup-fee"
                        type="number"
                        value={membershipSettings.signupFee}
                        onChange={(e) => setMembershipSettings(prev => ({ ...prev, signupFee: parseInt(e.target.value) }))}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="freeze-fee">Freeze Fee</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="freeze-fee"
                        type="number"
                        value={membershipSettings.freezeFee}
                        onChange={(e) => setMembershipSettings(prev => ({ ...prev, freezeFee: parseInt(e.target.value) }))}
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-4">Membership Policies</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-renewal">Auto Renewal</Label>
                      <p className="text-sm text-muted-foreground">Automatically renew memberships</p>
                    </div>
                    <Switch
                      id="auto-renewal"
                      checked={membershipSettings.autoRenewal}
                      onCheckedChange={(checked) => setMembershipSettings(prev => ({ ...prev, autoRenewal: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pro-rating">Pro-rating</Label>
                      <p className="text-sm text-muted-foreground">Enable pro-rated billing</p>
                    </div>
                    <Switch
                      id="pro-rating"
                      checked={membershipSettings.proRating}
                      onCheckedChange={(checked) => setMembershipSettings(prev => ({ ...prev, proRating: checked }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grace-period">Grace Period (days)</Label>
                    <Input
                      id="grace-period"
                      type="number"
                      value={membershipSettings.gracePeriod}
                      onChange={(e) => setMembershipSettings(prev => ({ ...prev, gracePeriod: parseInt(e.target.value) }))}
                      className="w-32"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("Membership")} className="bg-gradient-primary hover:opacity-90 transition-smooth">
                Save Membership Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <Label htmlFor={key}>{key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}</Label>
                    <p className="text-sm text-muted-foreground">
                      {key === 'emailAlerts' && 'Receive email notifications for important events'}
                      {key === 'smsAlerts' && 'Receive SMS notifications for urgent matters'}
                      {key === 'paymentReminders' && 'Send payment reminders to members'}
                      {key === 'expirationWarnings' && 'Warn members about membership expiration'}
                      {key === 'lowAttendanceAlerts' && 'Alert when member attendance is low'}
                      {key === 'capacityAlerts' && 'Notify when class capacity is reached'}
                    </p>
                  </div>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [key]: checked }))}
                  />
                </div>
              ))}
              
              <Button onClick={() => handleSave("Notification")} className="bg-gradient-primary hover:opacity-90 transition-smooth">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Security Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch
                  id="two-factor"
                  checked={security.twoFactorAuth}
                  onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, twoFactorAuth: checked }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={security.sessionTimeout}
                  onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                  className="w-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                <Input
                  id="password-expiry"
                  type="number"
                  value={security.passwordExpiry}
                  onChange={(e) => setSecurity(prev => ({ ...prev, passwordExpiry: parseInt(e.target.value) }))}
                  className="w-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-attempts">Max Login Attempts</Label>
                <Input
                  id="login-attempts"
                  type="number"
                  value={security.loginAttempts}
                  onChange={(e) => setSecurity(prev => ({ ...prev, loginAttempts: parseInt(e.target.value) }))}
                  className="w-32"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="audit-log">Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">Log all system activities</p>
                </div>
                <Switch
                  id="audit-log"
                  checked={security.auditLog}
                  onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, auditLog: checked }))}
                />
              </div>

              <Button onClick={() => handleSave("Security")} className="bg-gradient-primary hover:opacity-90 transition-smooth">
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <span>Billing Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Payment Methods</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Credit Card Processing</p>
                          <p className="text-sm text-muted-foreground">Stripe Integration</p>
                        </div>
                      </div>
                      <Badge className="bg-success/10 text-success">Active</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Billing Cycle</h4>
                  <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Tax Settings</h4>
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                    <Input
                      id="tax-rate"
                      type="number"
                      step="0.01"
                      placeholder="8.25"
                      className="w-32"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("Billing")} className="bg-gradient-primary hover:opacity-90 transition-smooth">
                Save Billing Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};