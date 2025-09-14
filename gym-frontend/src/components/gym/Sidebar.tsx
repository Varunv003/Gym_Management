import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  CreditCard, 
  UserCheck, 
  BarChart3,
  Settings,
  Calendar
} from "lucide-react";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "members", label: "Members", icon: Users },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ currentView, onViewChange }: SidebarProps) => {
  return (
    <aside className="w-64 bg-sidebar-background border-r border-sidebar-border shadow-card">
      <div className="p-6">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start transition-smooth",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-primary" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};