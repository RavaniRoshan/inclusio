import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  X, 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Globe,
  Mail,
  Phone,
  Settings,
  Save,
  LogOut
} from 'lucide-react';

interface SettingsPanelProps {
  onClose: () => void;
}

export const SettingsPanel = ({ onClose }: SettingsPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState({
    profile: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      company: "Tech Solutions Inc.",
      avatar: "/placeholder.svg"
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      weeklyReports: true,
      instantViolations: true,
      complianceUpdates: false
    },
    scanning: {
      autoScan: true,
      scanFrequency: "daily",
      includeSubdomains: true,
      deepScan: false
    },
    billing: {
      plan: "Professional",
      nextBilling: "March 15, 2024",
      paymentMethod: "**** **** **** 4242"
    }
  });

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(panelRef.current,
        { 
          x: "-100%",
          opacity: 0
        },
        { 
          x: "0%",
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }
      );

      // Animate sections in stagger
      gsap.fromTo(panelRef.current.querySelectorAll('.settings-section'),
        { 
          x: -30,
          opacity: 0
        },
        { 
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.2
        }
      );
    }
  }, []);

  const handleClose = () => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: onClose
      });
    }
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const updateScanningSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      scanning: {
        ...prev.scanning,
        [key]: value
      }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur">
      <div 
        ref={panelRef}
        className="absolute left-0 top-0 h-full w-full max-w-2xl bg-card border-r border-border shadow-2xl overflow-y-auto"
      >
        <CardHeader className="sticky top-0 bg-card/95 backdrop-blur border-b border-border z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <Settings className="h-6 w-6" />
              Account Settings
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-muted-foreground">
            Manage your account preferences and accessibility monitoring settings
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          {/* Profile Section */}
          <Card className="settings-section">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={settings.profile.avatar} alt={settings.profile.name} />
                  <AvatarFallback className="text-lg">
                    {settings.profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={settings.profile.name} />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" value={settings.profile.company} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={settings.profile.email} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={settings.profile.phone} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card className="settings-section">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive accessibility alerts via email</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.emailAlerts}
                    onCheckedChange={(value) => updateNotificationSetting('emailAlerts', value)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get critical violations via SMS</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.smsAlerts}
                    onCheckedChange={(value) => updateNotificationSetting('smsAlerts', value)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly compliance summaries</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.weeklyReports}
                    onCheckedChange={(value) => updateNotificationSetting('weeklyReports', value)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Instant Violations</Label>
                    <p className="text-sm text-muted-foreground">Get notified immediately when violations are found</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.instantViolations}
                    onCheckedChange={(value) => updateNotificationSetting('instantViolations', value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scanning Settings */}
          <Card className="settings-section">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="h-5 w-5" />
                Scanning Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Scan</Label>
                    <p className="text-sm text-muted-foreground">Automatically scan sites on schedule</p>
                  </div>
                  <Switch 
                    checked={settings.scanning.autoScan}
                    onCheckedChange={(value) => updateScanningSetting('autoScan', value)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Include Subdomains</Label>
                    <p className="text-sm text-muted-foreground">Scan all subdomains of your websites</p>
                  </div>
                  <Switch 
                    checked={settings.scanning.includeSubdomains}
                    onCheckedChange={(value) => updateScanningSetting('includeSubdomains', value)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Deep Scan Mode</Label>
                    <p className="text-sm text-muted-foreground">More thorough scanning with advanced checks</p>
                  </div>
                  <Switch 
                    checked={settings.scanning.deepScan}
                    onCheckedChange={(value) => updateScanningSetting('deepScan', value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Section */}
          <Card className="settings-section">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CreditCard className="h-5 w-5" />
                Billing & Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label>Current Plan</Label>
                  <p className="text-lg font-semibold text-primary">{settings.billing.plan}</p>
                </div>
                <div>
                  <Label>Next Billing Date</Label>
                  <p className="text-lg font-semibold">{settings.billing.nextBilling}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label>Payment Method</Label>
                <div className="flex items-center justify-between mt-2">
                  <p className="font-mono">{settings.billing.paymentMethod}</p>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  View Billing History
                </Button>
                <Button variant="outline" className="flex-1">
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="settings-section flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
            <Button className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 text-red-600 hover:text-red-700">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
};