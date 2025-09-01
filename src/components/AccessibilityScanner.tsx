import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye,
  Zap,
  Globe,
  FileText
} from 'lucide-react';

interface ViolationItem {
  id: string;
  severity: 'critical' | 'serious' | 'moderate' | 'minor';
  rule: string;
  description: string;
  element: string;
  wcagLevel: 'A' | 'AA' | 'AAA';
}

interface ScanResult {
  url: string;
  score: number;
  violations: ViolationItem[];
  passed: number;
  timestamp: Date;
}

const AccessibilityScanner = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [results, setResults] = useState<ScanResult | null>(null);
  const { toast } = useToast();

  const mockViolations: ViolationItem[] = [
    {
      id: '1',
      severity: 'critical',
      rule: 'Missing Alt Text',
      description: 'Images must have alternative text for screen readers',
      element: '<img src="hero.jpg">',
      wcagLevel: 'A'
    },
    {
      id: '2',
      severity: 'serious',
      rule: 'Low Color Contrast',
      description: 'Text contrast ratio is below WCAG standards (2.1:1, should be 4.5:1)',
      element: '<p class="light-text">',
      wcagLevel: 'AA'
    },
    {
      id: '3',
      severity: 'moderate',
      rule: 'Missing Form Labels',
      description: 'Form inputs should have associated labels',
      element: '<input type="email">',
      wcagLevel: 'A'
    },
    {
      id: '4',
      severity: 'minor',
      rule: 'Missing Skip Links',
      description: 'Page should include skip navigation links',
      element: '<body>',
      wcagLevel: 'A'
    }
  ];

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleScan = async () => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL to scan",
        variant: "destructive"
      });
      return;
    }

    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (include http:// or https://)",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setResults(null);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Mock results
          const mockResult: ScanResult = {
            url,
            score: 78,
            violations: mockViolations,
            passed: 45,
            timestamp: new Date()
          };
          setResults(mockResult);
          setIsScanning(false);
          toast({
            title: "Scan Complete",
            description: `Found ${mockViolations.length} accessibility issues`,
          });
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-4 w-4" />;
      case 'serious': return <AlertTriangle className="h-4 w-4" />;
      case 'moderate': return <Eye className="h-4 w-4" />;
      case 'minor': return <CheckCircle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-scanner-critical text-white';
      case 'serious': return 'bg-scanner-serious text-white';
      case 'moderate': return 'bg-scanner-moderate text-white';
      case 'minor': return 'bg-scanner-minor text-white';
      default: return 'bg-muted';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-scanner-minor';
    if (score >= 70) return 'text-scanner-moderate';
    if (score >= 50) return 'text-scanner-serious';
    return 'text-scanner-critical';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-gradient-hero">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-scanner">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">WebAid Scanner</h1>
              <p className="text-muted-foreground">WCAG Accessibility Compliance Checker</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Scanner Input */}
        <Card className="mb-8 shadow-card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Scan Website</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
                disabled={isScanning}
              />
              <Button 
                onClick={handleScan}
                disabled={isScanning}
                className="bg-gradient-scanner hover:opacity-90 transition-opacity"
              >
                {isScanning ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-pulse" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Start Scan
                  </>
                )}
              </Button>
            </div>

            {isScanning && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Analyzing accessibility...</span>
                  <span>{Math.round(scanProgress)}%</span>
                </div>
                <Progress value={scanProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Score Overview */}
            <Card className="shadow-card-enhanced">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Accessibility Score</span>
                  <Badge variant="outline" className="text-xs">
                    {results.timestamp.toLocaleString()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getScoreColor(results.score)}`}>
                      {results.score}
                    </div>
                    <div className="text-sm text-muted-foreground">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-scanner-critical">
                      {results.violations.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Issues Found</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-scanner-minor">
                      {results.passed}
                    </div>
                    <div className="text-sm text-muted-foreground">Tests Passed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Violations */}
            <Card className="shadow-card-enhanced">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>WCAG Violations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.violations.map((violation) => (
                    <div key={violation.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getSeverityIcon(violation.severity)}
                          <h3 className="font-semibold">{violation.rule}</h3>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getSeverityColor(violation.severity)}>
                            {violation.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            WCAG {violation.wcagLevel}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2">{violation.description}</p>
                      <div className="bg-muted p-2 rounded text-sm font-mono">
                        {violation.element}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Export */}
            <Card className="shadow-card-enhanced">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Export Report</h3>
                    <p className="text-sm text-muted-foreground">
                      Download detailed accessibility report
                    </p>
                  </div>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AccessibilityScanner;