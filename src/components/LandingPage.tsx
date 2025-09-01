import { useEffect, useState } from 'react';
import { FloatingNavbar } from './FloatingNavbar';
import { HeroSection } from './HeroSection';
import { InfiniteReviews } from './InfiniteReviews';
import { RecentSitesList } from './RecentSitesList';
import { SettingsPanel } from './SettingsPanel';
import { Button } from './ui/button';
import { Shield, Zap, Users, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  const [showRecentSites, setShowRecentSites] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <FloatingNavbar 
        onShowRecentSites={() => setShowRecentSites(true)}
        onShowSettings={() => setShowSettings(true)}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Automated Accessibility Monitoring
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Continuous ADA/WCAG compliance monitoring designed for SMBs who can't afford enterprise solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Real-time Scanning",
                description: "AI-powered continuous monitoring of your digital assets for compliance violations"
              },
              {
                icon: Zap,
                title: "Instant Fixes",
                description: "Get actionable recommendations with step-by-step implementation guidance"
              },
              {
                icon: Users,
                title: "SMB Focused",
                description: "Affordable accessibility solutions designed specifically for small and medium businesses"
              },
              {
                icon: TrendingUp,
                title: "Compliance Tracking",
                description: "Track your progress and maintain ongoing ADA/WCAG compliance effortlessly"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-card border hover:shadow-elegant transition-all duration-300">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InfiniteReviews />
      
      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Accessibility Journey Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of SMBs ensuring their digital presence is accessible to everyone. 
            No enterprise budget required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Panels */}
      {showRecentSites && (
        <RecentSitesList onClose={() => setShowRecentSites(false)} />
      )}
      
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default LandingPage;