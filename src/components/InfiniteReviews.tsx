import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Johnson",
    company: "TechStart Inc.",
    role: "CTO",
    avatar: "/placeholder.svg",
    rating: 5,
    content: "AccessibilityScan helped us achieve WCAG compliance in just 2 weeks. The AI recommendations were spot-on and saved us thousands in consultant fees.",
    badge: "Tech Startup"
  },
  {
    name: "Michael Chen",
    company: "Local Retail Co",
    role: "Owner",
    avatar: "/placeholder.svg", 
    rating: 5,
    content: "As a small business, we couldn't afford enterprise solutions. This platform made accessibility achievable with our limited budget and tech knowledge.",
    badge: "Small Business"
  },
  {
    name: "Emma Rodriguez",
    company: "Creative Agency",
    role: "Design Lead",
    avatar: "/placeholder.svg",
    rating: 5,
    content: "The real-time monitoring caught issues before they became compliance problems. Our clients love knowing their sites are always accessible.",
    badge: "Agency"
  },
  {
    name: "David Park",
    company: "E-commerce Plus",
    role: "Marketing Director",
    avatar: "/placeholder.svg",
    rating: 5,
    content: "Implementation guidance was clear and actionable. Even our junior developers could follow the recommendations and fix accessibility issues.",
    badge: "E-commerce"
  },
  {
    name: "Lisa Williams",
    company: "Health Services LLC",
    role: "Operations Manager",
    avatar: "/placeholder.svg",
    rating: 5,
    content: "ADA compliance used to be our biggest worry. Now it's automated, and we can focus on serving our patients instead of worrying about lawsuits.",
    badge: "Healthcare"
  },
  {
    name: "James Taylor",
    company: "Consulting Firm",
    role: "Partner",
    avatar: "/placeholder.svg",
    rating: 5,
    content: "The continuous monitoring gives us peace of mind. We know our client deliverables meet accessibility standards without manual checking.",
    badge: "Consulting"
  }
];

const ReviewCard = ({ review, index }: { review: typeof reviews[0], index: number }) => {
  return (
    <Card className="min-w-[350px] mx-4 bg-card/80 backdrop-blur border-border/50 hover:bg-card transition-all duration-300 shadow-sm hover:shadow-elegant">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={review.avatar} alt={review.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {review.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-sm">{review.name}</h4>
              <div className="flex">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">{review.role} at {review.company}</p>
            <Badge variant="secondary" className="mt-2 text-xs">
              {review.badge}
            </Badge>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          "{review.content}"
        </p>
      </CardContent>
    </Card>
  );
};

export const InfiniteReviews = () => {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Top row - moving left to right
    if (topRowRef.current) {
      const topRowWidth = topRowRef.current.scrollWidth / 2;
      
      gsap.set(topRowRef.current, { x: 0 });
      
      gsap.to(topRowRef.current, {
        x: -topRowWidth,
        duration: 30,
        ease: "none",
        repeat: -1
      });
    }

    // Bottom row - moving right to left
    if (bottomRowRef.current) {
      const bottomRowWidth = bottomRowRef.current.scrollWidth / 2;
      
      gsap.set(bottomRowRef.current, { x: -bottomRowWidth });
      
      gsap.to(bottomRowRef.current, {
        x: 0,
        duration: 35,
        ease: "none",
        repeat: -1
      });
    }

    // Pause animations on hover
    const handleMouseEnter = (element: HTMLDivElement) => {
      gsap.to(element, { timeScale: 0.1, duration: 0.5 });
    };

    const handleMouseLeave = (element: HTMLDivElement) => {
      gsap.to(element, { timeScale: 1, duration: 0.5 });
    };

    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;

    if (topRow) {
      topRow.addEventListener('mouseenter', () => handleMouseEnter(topRow));
      topRow.addEventListener('mouseleave', () => handleMouseLeave(topRow));
    }

    if (bottomRow) {
      bottomRow.addEventListener('mouseenter', () => handleMouseEnter(bottomRow));
      bottomRow.addEventListener('mouseleave', () => handleMouseLeave(bottomRow));
    }

    return () => {
      if (topRow) {
        topRow.removeEventListener('mouseenter', () => handleMouseEnter(topRow));
        topRow.removeEventListener('mouseleave', () => handleMouseLeave(topRow));
      }
      if (bottomRow) {
        bottomRow.removeEventListener('mouseenter', () => handleMouseEnter(bottomRow));
        bottomRow.removeEventListener('mouseleave', () => handleMouseLeave(bottomRow));
      }
    };
  }, []);

  // Duplicate reviews for infinite scroll
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 overflow-hidden bg-gradient-to-b from-background to-primary/5">
      <div className="mb-16 text-center px-6">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Trusted by SMBs Everywhere
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join hundreds of small and medium businesses making their digital presence accessible to everyone
        </p>
      </div>

      {/* Top Row - Left to Right */}
      <div className="mb-8 overflow-hidden">
        <div 
          ref={topRowRef}
          className="flex"
        >
          {duplicatedReviews.slice(0, 8).map((review, index) => (
            <ReviewCard key={`top-${index}`} review={review} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom Row - Right to Left */}
      <div className="overflow-hidden">
        <div 
          ref={bottomRowRef}
          className="flex"
        >
          {duplicatedReviews.slice(0, 8).map((review, index) => (
            <ReviewCard key={`bottom-${index}`} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};