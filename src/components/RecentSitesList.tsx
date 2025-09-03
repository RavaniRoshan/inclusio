import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  X, 
  Globe, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  ExternalLink,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface RecentSitesListProps {
  onClose: () => void;
}

const mockSites = [
  {
    id: 1,
    url: "https://mystore.com",
    name: "My Online Store",
    lastScanned: "2 hours ago",
    score: 92,
    status: "compliant",
    violations: 3,
    scanType: "Full Site"
  },
  {
    id: 2,
    url: "https://company-blog.com",
    name: "Company Blog",
    lastScanned: "1 day ago",
    score: 78,
    status: "warning",
    violations: 12,
    scanType: "Page Scan"
  },
  {
    id: 3,
    url: "https://portfolio.dev",
    name: "Portfolio Site",
    lastScanned: "3 days ago",
    score: 95,
    status: "compliant",
    violations: 1,
    scanType: "Full Site"
  },
  {
    id: 4,
    url: "https://landing-page.co",
    name: "Landing Page",
    lastScanned: "1 week ago",
    score: 65,
    status: "critical",
    violations: 24,
    scanType: "Page Scan"
  }
];

export const RecentSitesList = ({ onClose }: RecentSitesListProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [sites, setSites] = useState(mockSites);

  useEffect(() => {
    // Add delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (panelRef.current) {
        gsap.fromTo(panelRef.current,
          { 
            x: "100%",
            opacity: 0
          },
          { 
            x: "0%",
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          }
        );

        // Animate cards in stagger - only if cards exist
        const cards = panelRef.current.querySelectorAll('.site-card');
        if (cards.length > 0) {
          gsap.fromTo([...cards],
            { 
              x: 50,
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
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: onClose
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant': return <Badge className="bg-green-100 text-green-700">Compliant</Badge>;
      case 'warning': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Warning</Badge>;
      case 'critical': return <Badge variant="destructive">Critical</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleRescan = (siteId: number) => {
    // Simulate rescanning
    const updatedSites = sites.map(site => 
      site.id === siteId 
        ? { ...site, lastScanned: "Scanning...", score: 0 }
        : site
    );
    setSites(updatedSites);

    setTimeout(() => {
      const finalSites = sites.map(site => 
        site.id === siteId 
          ? { ...site, lastScanned: "Just now", score: Math.floor(Math.random() * 30) + 70 }
          : site
      );
      setSites(finalSites);
    }, 2000);
  };

  const handleDelete = (siteId: number) => {
    setSites(sites.filter(site => site.id !== siteId));
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur">
      <div 
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-full max-w-2xl bg-card border-l border-border shadow-2xl overflow-y-auto"
      >
        <CardHeader className="sticky top-0 bg-card/95 backdrop-blur border-b border-border z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Recent Site Scans</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-muted-foreground">
            Manage your recently scanned websites and view their accessibility status
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {sites.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No sites scanned yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by scanning your first website for accessibility compliance
              </p>
              <Button>Scan Your First Site</Button>
            </div>
          ) : (
            sites.map((site) => (
              <Card key={site.id} className="site-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">{site.name}</h3>
                        {getStatusBadge(site.status)}
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">
                        {site.url}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRescan(site.id)}
                        disabled={site.lastScanned === "Scanning..."}
                      >
                        <RefreshCw className={`h-4 w-4 ${site.lastScanned === "Scanning..." ? 'animate-spin' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(site.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {site.lastScanned === "Scanning..." ? "--" : site.score}
                      </div>
                      <div className="text-xs text-muted-foreground">Accessibility Score</div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`text-2xl font-bold mb-1 ${getStatusColor(site.status)}`}>
                        {site.violations}
                      </div>
                      <div className="text-xs text-muted-foreground">Violations</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium mb-1">{site.scanType}</div>
                      <div className="text-xs text-muted-foreground">Scan Type</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">{site.lastScanned}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Last Scan</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {site.status === 'compliant' && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Compliant</span>
                        </div>
                      )}
                      {site.status === 'warning' && (
                        <div className="flex items-center gap-2 text-yellow-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm font-medium">Needs Attention</span>
                        </div>
                      )}
                      {site.status === 'critical' && (
                        <div className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm font-medium">Critical Issues</span>
                        </div>
                      )}
                    </div>
                    
                    <Button variant="outline" size="sm">
                      View Full Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </div>
    </div>
  );
};