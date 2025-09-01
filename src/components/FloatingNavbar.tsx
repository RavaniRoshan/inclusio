import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Shield, 
  Settings, 
  History, 
  User, 
  Menu,
  X,
  Chrome
} from 'lucide-react';

interface FloatingNavbarProps {
  onShowRecentSites: () => void;
  onShowSettings: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const FloatingNavbar = ({ 
  onShowRecentSites, 
  onShowSettings, 
  isAuthenticated, 
  setIsAuthenticated 
}: FloatingNavbarProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMorphed, setIsMorphed] = useState(false);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { 
          y: -100, 
          opacity: 0,
          scale: 0.8,
          borderRadius: "24px"
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)"
        }
      );
    }
  }, []);

  const handleMorphNavbar = () => {
    if (navRef.current) {
      setIsMorphed(!isMorphed);
      
      gsap.to(navRef.current, {
        borderRadius: isMorphed ? "24px" : "12px",
        scale: isMorphed ? 1 : 1.05,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (menuRef.current) {
      if (!isMenuOpen) {
        gsap.fromTo(menuRef.current,
          { 
            opacity: 0, 
            y: -20,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)"
          }
        );
      } else {
        gsap.to(menuRef.current, {
          opacity: 0,
          y: -20,
          scale: 0.9,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  };

  const handleGoogleAuth = () => {
    // Simulate Google OAuth
    setIsAuthenticated(!isAuthenticated);
    
    // Add a morphing animation on auth
    if (navRef.current) {
      gsap.to(navRef.current, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-card/95 backdrop-blur-xl border border-border/50 shadow-elegant px-6 py-4"
        style={{ borderRadius: "24px" }}
        onMouseEnter={handleMorphNavbar}
        onMouseLeave={handleMorphNavbar}
      >
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">AccessibilityScan</span>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              SMB Focused
            </Badge>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Features
            </Button>
            <Button variant="ghost" size="sm">
              Pricing
            </Button>
            <Button variant="ghost" size="sm">
              Resources
            </Button>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onShowRecentSites}
                  className="hidden sm:flex items-center gap-2"
                >
                  <History className="h-4 w-4" />
                  Recent Sites
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onShowSettings}
                  className="hidden sm:flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGoogleAuth}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Account</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={handleGoogleAuth}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                <Chrome className="h-4 w-4" />
                Sign in with Google
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            ref={menuRef}
            className="md:hidden absolute top-full left-0 right-0 mt-4 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-elegant"
          >
            <div className="flex flex-col gap-3">
              <Button variant="ghost" className="justify-start">
                Features
              </Button>
              <Button variant="ghost" className="justify-start">
                Pricing
              </Button>
              <Button variant="ghost" className="justify-start">
                Resources
              </Button>
              
              {isAuthenticated && (
                <>
                  <hr className="border-border/50" />
                  <Button
                    variant="ghost"
                    onClick={onShowRecentSites}
                    className="justify-start"
                  >
                    <History className="h-4 w-4 mr-2" />
                    Recent Sites
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={onShowSettings}
                    className="justify-start"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};