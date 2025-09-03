import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Shield, 
  Zap, 
  Users, 
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const shaderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      const tl = gsap.timeline();

      // Shader effect animation with null checks
      if (shaderRef.current) {
        gsap.set(shaderRef.current, {
          background: "linear-gradient(45deg, hsl(195 85% 35%), hsl(195 25% 95%), hsl(160 60% 45%))",
          backgroundSize: "400% 400%",
          backgroundPosition: "0% 0%"
        });
        
        gsap.to(shaderRef.current, {
          backgroundPosition: "100% 100%",
          duration: 8,
          ease: "none",
          repeat: -1,
          yoyo: true
        });
      }

      // Hero content animations with null checks
      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { 
            y: 100, 
            opacity: 0,
            scale: 0.8
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)"
          }
        );
      }
      
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { 
            y: 50, 
            opacity: 0 
          },
          { 
            y: 0, 
            opacity: 1,
            duration: 1,
            ease: "power2.out"
          },
          "-=0.8"
        );
      }
      
      if (ctaRef.current?.children) {
        tl.fromTo([...ctaRef.current.children],
          { 
            y: 30, 
            opacity: 0,
            scale: 0.9
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.1
          },
          "-=0.5"
        );
      }
      
      if (featuresRef.current?.children) {
        tl.fromTo([...featuresRef.current.children],
          { 
            x: -30, 
            opacity: 0 
          },
          { 
            x: 0, 
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1
          },
          "-=0.3"
        );
      }

      // Floating animation for hero elements
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: -10,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }

      // Parallax effect on scroll
      const handleScroll = () => {
        if (heroRef.current) {
          const scrollY = window.scrollY;
          gsap.to(heroRef.current, {
            y: scrollY * 0.5,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      };

      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        tl.kill();
      };
    }, 100); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Shader Background */}
      <div 
        ref={shaderRef}
        className="absolute inset-0 opacity-10"
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div ref={heroRef} className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <Badge 
          variant="secondary" 
          className="mb-6 text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20"
        >
          🚀 AI-Powered Accessibility Monitoring
        </Badge>

        {/* Main Title */}
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
        >
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Automated
          </span>
          <br />
          <span className="text-foreground">
            Accessibility
          </span>
          <br />
          <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
            Compliance
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Continuous ADA/WCAG monitoring designed for SMBs. 
          <br className="hidden md:block" />
          Real-time scanning, AI-powered fixes, and actionable guidance.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-elegant group"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 group border-2 hover:bg-primary/5"
          >
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>

        {/* Key Features */}
        <div ref={featuresRef} className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: Shield,
              title: "Real-time Monitoring",
              description: "Continuous scanning of your digital assets"
            },
            {
              icon: Zap,
              title: "Instant Recommendations",
              description: "AI-powered fixes with implementation guides"
            },
            {
              icon: Users,
              title: "SMB Pricing",
              description: "Affordable solutions for growing businesses"
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-4 rounded-xl bg-card/50 backdrop-blur border border-border/50 hover:bg-card/80 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};