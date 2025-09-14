import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Users, TrendingUp, Award, MapPin, Phone, Mail } from "lucide-react";

interface LandingProps {
  onLoginClick: () => void;
}

export const Landing = ({ onLoginClick }: LandingProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                <Dumbbell className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Transform Your
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Body & Mind
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Join PowerFit Gym and discover your strongest self. State-of-the-art equipment, 
              expert trainers, and a community that motivates you every step of the way.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button
              size="lg"
              onClick={onLoginClick}
              className="bg-gradient-primary hover:opacity-90 transition-smooth text-lg px-8 py-4 h-auto shadow-primary"
            >
              Member Login
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose PowerFit?
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to achieve your fitness goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-border shadow-card hover:shadow-primary transition-smooth">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Premium Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  State-of-the-art equipment from top brands. Everything you need for strength, 
                  cardio, and functional training.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card hover:shadow-primary transition-smooth">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Expert Trainers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Certified personal trainers who create customized workout plans 
                  tailored to your specific goals and fitness level.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card hover:shadow-primary transition-smooth">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Advanced analytics and progress tracking to help you monitor 
                  your fitness journey and celebrate your achievements.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20 px-4 bg-gradient-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Membership Plans
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the perfect plan for your fitness journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border shadow-card hover:shadow-primary transition-smooth">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Basic</CardTitle>
                <div className="text-4xl font-bold text-success mb-2">$50</div>
                <CardDescription>per month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Access to gym equipment</li>
                  <li>• Locker room access</li>
                  <li>• Basic fitness assessment</li>
                  <li>• Mobile app access</li>
                </ul>
                <Button className="w-full bg-gradient-primary hover:opacity-90 transition-smooth">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-card hover:shadow-primary transition-smooth relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-glow">
                  Most Popular
                </div>
              </div>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl mb-2">Premium</CardTitle>
                <div className="text-4xl font-bold text-success mb-2">$75</div>
                <CardDescription>per month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li>• All Basic features</li>
                  <li>• Group fitness classes</li>
                  <li>• Personal trainer session (2/month)</li>
                  <li>• Nutrition consultation</li>
                  <li>• Priority booking</li>
                </ul>
                <Button className="w-full bg-gradient-primary hover:opacity-90 transition-smooth">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-card hover:shadow-primary transition-smooth">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-primary mr-2" />
                  <CardTitle className="text-2xl">VIP</CardTitle>
                </div>
                <div className="text-4xl font-bold text-success mb-2">$120</div>
                <CardDescription>per month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li>• All Premium features</li>
                  <li>• Unlimited personal training</li>
                  <li>• VIP locker room</li>
                  <li>• Massage therapy</li>
                  <li>• Guest privileges</li>
                  <li>• Exclusive member events</li>
                </ul>
                <Button className="w-full bg-gradient-primary hover:opacity-90 transition-smooth">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Visit PowerFit Today
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-2">
              <MapPin className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-semibold text-foreground">Location</h3>
              <p className="text-muted-foreground">
                123 Fitness Avenue<br />
                New York, NY 10001
              </p>
            </div>
            
            <div className="space-y-2">
              <Phone className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-semibold text-foreground">Phone</h3>
              <p className="text-muted-foreground">
                (555) 123-4567
              </p>
            </div>
            
            <div className="space-y-2">
              <Mail className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-semibold text-foreground">Email</h3>
              <p className="text-muted-foreground">
                info@powerfitgym.com
              </p>
            </div>
          </div>

          <Button
            size="lg"
            onClick={onLoginClick}
            className="bg-gradient-primary hover:opacity-90 transition-smooth text-lg px-8 py-4 h-auto shadow-primary"
          >
            Access Your Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">PowerFit</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 PowerFit Gym. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};