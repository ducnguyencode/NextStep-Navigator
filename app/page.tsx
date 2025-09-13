import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type UserType = "student" | "graduate" | "professional" | null;

interface UserData {
  name: string;
  email: string;
  contact: string;
  type: UserType;
}

interface VisitorStats {
  count: number;
  currentTime: string;
  location: string;
}

const userTypeConfig = {
  student: {
    greeting: "Welcome, Future Engineer!",
    menu: [
      "Career Bank",
      "Interest Quiz",
      "Success Stories",
      "Resource Library",
      "Multimedia Guidance",
      "Coaching",
      "Bookmarks",
    ],
    cards: [
      {
        title: "Career Bank",
        description: "Explore different career paths and opportunities",
        icon: "🎯",
        link: "/career-bank",
      },
      {
        title: "Interest Quiz",
        description: "Discover your interests and matching career streams",
        icon: "🧠",
        link: "/interest-quiz",
      },
      {
        title: "Coaching & Guidance",
        description: "Get expert guidance on stream selection and study abroad",
        icon: "🎓",
        link: "/coaching",
      },
      {
        title: "Success Stories",
        description: "Read inspiring career journeys from professionals",
        icon: "⭐",
        link: "/success-stories",
      },
      {
        title: "Resource Library",
        description: "Access study materials and career guides",
        icon: "📚",
        link: "/resource-library",
      },
      {
        title: "Multimedia Guidance",
        description: "Watch videos and listen to career advice",
        icon: "🎥",
        link: "/multimedia-guidance",
      },
      {
        title: "Bookmarks",
        description: "Your saved resources and favorites",
        icon: "📌",
        link: "/bookmarks",
      },
    ],
  },
  graduate: {
    greeting: "Welcome, Young Professional!",
    menu: [
      "Career Bank",
      "Interest Quiz",
      "Success Stories",
      "Resource Library",
      "Multimedia Guidance",
      "Coaching",
      "Bookmarks",
    ],
    cards: [
      {
        title: "Career Bank",
        description: "Find job opportunities that match your skills",
        icon: "💼",
        link: "/career-bank",
      },
      {
        title: "Interest Quiz",
        description: "Assess your career interests and get recommendations",
        icon: "🧠",
        link: "/interest-quiz",
      },
      {
        title: "Coaching & Guidance",
        description: "Master interviews, resumes, and study abroad planning",
        icon: "🎯",
        link: "/coaching",
      },
      {
        title: "Success Stories",
        description: "Learn from successful professionals in your field",
        icon: "⭐",
        link: "/success-stories",
      },
      {
        title: "Resource Library",
        description: "Access professional development resources",
        icon: "📖",
        link: "/resource-library",
      },
      {
        title: "Multimedia Guidance",
        description: "Professional insights through videos and podcasts",
        icon: "🎥",
        link: "/multimedia-guidance",
      },
      {
        title: "Bookmarks",
        description: "Your saved career resources",
        icon: "📌",
        link: "/bookmarks",
      },
    ],
  },
  professional: {
    greeting: "Welcome, Career Explorer!",
    menu: [
      "Career Bank",
      "Interest Quiz",
      "Success Stories",
      "Resource Library",
      "Multimedia Guidance",
      "Coaching",
      "Bookmarks",
    ],
    cards: [
      {
        title: "Career Bank",
        description: "Explore new career opportunities and transitions",
        icon: "🔄",
        link: "/career-bank",
      },
      {
        title: "Interest Quiz",
        description: "Reassess your career direction and find new paths",
        icon: "🧠",
        link: "/interest-quiz",
      },
      {
        title: "Coaching & Guidance",
        description:
          "Advanced interview techniques and career transition advice",
        icon: "💡",
        link: "/coaching",
      },
      {
        title: "Success Stories",
        description: "Career change success stories and inspiration",
        icon: "⭐",
        link: "/success-stories",
      },
      {
        title: "Resource Library",
        description: "Advanced professional development materials",
        icon: "📚",
        link: "/resource-library",
      },
      {
        title: "Multimedia Guidance",
        description: "Expert career advice and industry insights",
        icon: "🎥",
        link: "/multimedia-guidance",
      },
      {
        title: "Bookmarks",
        description: "Your curated professional resources",
        icon: "📌",
        link: "/bookmarks",
      },
    ],
  },
};

export default function CareerPassportLanding() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    contact: "",
    type: null,
  });
  const [showContent, setShowContent] = useState(false);
  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    count: 0,
    currentTime: "",
    location: "Loading location...",
  });

  useEffect(() => {
    // Simulate visitor counter
    const storedCount = localStorage.getItem("visitorCount");
    const currentCount = storedCount
      ? Number.parseInt(storedCount) + 1
      : Math.floor(Math.random() * 1000) + 500;
    localStorage.setItem("visitorCount", currentCount.toString());

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Use reverse geocoding API or show coordinates
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
            .then((response) => response.json())
            .then((data) => {
              setVisitorStats((prev) => ({
                ...prev,
                location: `${data.city || "Unknown City"}, ${
                  data.countryName || "Unknown Country"
                }`,
              }));
            })
            .catch(() => {
              setVisitorStats((prev) => ({
                ...prev,
                location: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`,
              }));
            });
        },
        () => {
          setVisitorStats((prev) => ({
            ...prev,
            location: "Location unavailable",
          }));
        }
      );
    }

    // Update time every second
    const updateTime = () => {
      const now = new Date();
      setVisitorStats((prev) => ({
        ...prev,
        count: currentCount,
        currentTime: now.toLocaleString(),
      }));
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.name && userData.type) {
      setShowContent(true);
    }
  };

  const resetForm = () => {
    setUserData({ name: "", email: "", contact: "", type: null });
    setShowContent(false);
  };

  const handleMenuClick = (item: string) => {
    if (item === "Career Bank") {
      window.location.href = "/career-bank";
    }
    if (item === "Interest Quiz") {
      window.location.href = "/interest-quiz";
    }
    if (item === "Success Stories") {
      window.location.href = "/success-stories";
    }
    if (item === "Resource Library") {
      window.location.href = "/resource-library";
    }
    if (item === "Multimedia Guidance") {
      window.location.href = "/multimedia-guidance";
    }
    if (item === "Coaching") {
      window.location.href = "/coaching";
    }
    if (item === "Bookmarks") {
      window.location.href = "/bookmarks";
    }
    if (item === "Feedback") {
      window.location.href = "/feedback";
    }
    if (item === "About Us") {
      window.location.href = "/about";
    }
    if (item === "Contact Us") {
      window.location.href = "/contact";
    }
  };

  const handleCardClick = (title: string) => {
    const card = userTypeConfig[userData.type || ""].cards.find(
      (c) => c.title === title
    );
    if (card) {
      window.location.href = card.link;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-foreground bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Logo - Full width on mobile */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary brutalist-shadow-sm flex items-center justify-center">
                <span className="text-xl md:text-2xl font-black text-primary-foreground">
                  CP
                </span>
              </div>
              <span className="text-lg md:text-xl font-black text-foreground">
                CAREER PASSPORT
              </span>
            </div>

            {/* Dynamic Greeting - Hidden on mobile when no content */}
            {showContent && userData.name && userData.type && (
              <div className="text-center md:flex-1 animate-slide-up">
                <span className="text-base md:text-lg font-bold text-accent">
                  {userTypeConfig[userData.type].greeting.replace(
                    "Welcome,",
                    `Welcome, ${userData.name}!`
                  )}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="brutalist-shadow-sm font-bold border-2 bg-transparent text-sm md:text-base hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Login
              </Button>
              <Button className="brutalist-shadow-sm font-bold border-2 border-foreground bg-primary hover:bg-primary/90 text-sm md:text-base">
                Sign Up
              </Button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-secondary border-2 border-foreground brutalist-shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs md:text-sm font-bold">
              <div className="flex items-center gap-4">
                <span className="text-accent">
                  👥 Visitors: {visitorStats.count.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                  📍 {visitorStats.location}
                </span>
              </div>
              <div className="text-muted-foreground">
                🕒 {visitorStats.currentTime}
              </div>
            </div>
          </div>

          {/* Menu - Horizontal scroll on mobile */}
          <nav className="flex gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 mt-4">
            <Button
              onClick={() => (window.location.href = "/about")}
              variant="outline"
              className="brutalist-shadow-sm font-bold border-2 bg-transparent whitespace-nowrap text-sm md:text-base cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              About Us
            </Button>
            <Button
              onClick={() => (window.location.href = "/contact")}
              variant="outline"
              className="brutalist-shadow-sm font-bold border-2 bg-transparent whitespace-nowrap text-sm md:text-base cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Contact Us
            </Button>
            <Button
              onClick={() => handleMenuClick("Feedback")}
              variant="outline"
              className="brutalist-shadow-sm font-bold border-2 bg-transparent whitespace-nowrap text-sm md:text-base cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Feedback
            </Button>
            <Button
              onClick={() => handleMenuClick("Career Bank")}
              variant="outline"
              className="brutalist-shadow-sm font-bold border-2 bg-transparent whitespace-nowrap text-sm md:text-base cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Career Bank
            </Button>
            <Button
              onClick={() => handleMenuClick("Success Stories")}
              variant="outline"
              className="brutalist-shadow-sm font-bold border-2 bg-transparent whitespace-nowrap text-sm md:text-base cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Stories
            </Button>
            <Button
              onClick={() => handleMenuClick("Resource Library")}
              variant="outline"
              className="brutalist-shadow-sm font-bold border-2 bg-transparent whitespace-nowrap text-sm md:text-base cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Resources
            </Button>
            <Button
              onClick={() => handleMenuClick("Multimedia Guidance")}
              variant="outline"
              className="brutalist-shadow-sm font-bold border-2 bg-transparent whitespace-nowrap text-sm md:text-base cursor-pointer hover:bg-accent hover:text-background transition-colors"
            >
              Library
            </Button>
            <Button
              onClick={() => handleMenuClick("Bookmarks")}
              variant="outline"
              className="brutalist-shadow-sm font-bold border-2 bg-transparent whitespace-nowrap text-sm md:text-base cursor-pointer hover:bg-accent hover:text-background transition-colors"
            >
              📌 Bookmarks
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-foreground mb-4 md:mb-6 animate-bounce-in text-balance">
            CAREER PASSPORT
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-accent font-bold mb-8 md:mb-12 animate-slide-up px-4">
            Your Guided Path from Student to Professional.
          </p>

          {/* User Selection Form */}
          {!showContent && (
            <Card className="max-w-2xl mx-auto p-4 md:p-8 brutalist-shadow border-4 border-foreground animate-slide-up">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-base md:text-lg font-bold text-foreground"
                  >
                    What's your name?
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    className="border-2 border-foreground text-base md:text-lg p-3 md:p-4 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-base md:text-lg font-bold text-foreground"
                  >
                    What's your email?
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    className="border-2 border-foreground text-base md:text-lg p-3 md:p-4 font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contact"
                    className="text-base md:text-lg font-bold text-foreground"
                  >
                    What's your contact?
                  </Label>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="Enter your contact"
                    value={userData.contact}
                    onChange={(e) =>
                      setUserData({ ...userData, contact: e.target.value })
                    }
                    className="border-2 border-foreground text-base md:text-lg p-3 md:p-4 font-semibold"
                  />
                </div>

                <div className="space-y-3 md:space-y-4">
                  <Label className="text-base md:text-lg font-bold text-foreground">
                    Choose your current status:
                  </Label>
                  <RadioGroup
                    value={userData.type || ""}
                    onValueChange={(value) =>
                      setUserData({ ...userData, type: value as UserType })
                    }
                    className="space-y-3 md:space-y-4"
                  >
                    <div className="flex items-center space-x-3 p-3 md:p-4 border-2 border-foreground brutalist-shadow-sm bg-card hover:bg-secondary transition-colors">
                      <RadioGroupItem
                        value="student"
                        id="student"
                        className="border-2 border-foreground"
                      />
                      <Label
                        htmlFor="student"
                        className="text-sm md:text-lg font-bold cursor-pointer flex items-center gap-2"
                      >
                        🎓 Student (Grades 8–12)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 md:p-4 border-2 border-foreground brutalist-shadow-sm bg-card hover:bg-secondary transition-colors">
                      <RadioGroupItem
                        value="graduate"
                        id="graduate"
                        className="border-2 border-foreground"
                      />
                      <Label
                        htmlFor="graduate"
                        className="text-sm md:text-lg font-bold cursor-pointer flex items-center gap-2"
                      >
                        🎓 Graduate (UG/PG)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 md:p-4 border-2 border-foreground brutalist-shadow-sm bg-card hover:bg-secondary transition-colors">
                      <RadioGroupItem
                        value="professional"
                        id="professional"
                        className="border-2 border-foreground"
                      />
                      <Label
                        htmlFor="professional"
                        className="text-sm md:text-lg font-bold cursor-pointer flex items-center gap-2"
                      >
                        💼 Working Professional / Career Changer
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="w-full text-lg md:text-xl font-black py-4 md:py-6 brutalist-shadow border-4 border-foreground bg-accent hover:bg-accent/90 hover:scale-105 transition-all duration-200"
                  disabled={!userData.name || !userData.type}
                >
                  EXPLORE NOW
                </Button>
              </form>
            </Card>
          )}

          {/* Reset Button */}
          {showContent && (
            <Button
              onClick={resetForm}
              variant="outline"
              className="mb-6 md:mb-8 brutalist-shadow-sm font-bold border-2 bg-transparent"
            >
              ← Back to Selection
            </Button>
          )}
        </div>
      </section>

      {/* Dynamic Content Section */}
      {showContent && userData.type && (
        <section className="py-8 md:py-16 px-4 bg-secondary">
          <div className="container mx-auto">
            {/* Dynamic Menu */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-black text-foreground mb-6 md:mb-8">
                YOUR PERSONALIZED DASHBOARD
              </h2>
              <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-2 md:gap-4">
                {userTypeConfig[userData.type].menu.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => handleMenuClick(item)}
                    className="brutalist-shadow-sm font-bold border-2 border-foreground bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200 cursor-pointer text-sm md:text-base"
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {userTypeConfig[userData.type].cards.map((card, index) => (
                <Card
                  key={index}
                  onClick={() => handleCardClick(card.title)}
                  className="p-4 md:p-6 brutalist-shadow border-4 border-foreground bg-card hover:scale-105 transition-all duration-200 cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center space-y-3 md:space-y-4">
                    <div className="text-3xl md:text-4xl">{card.icon}</div>
                    <h3 className="text-lg md:text-xl font-black text-foreground">
                      {card.title}
                    </h3>
                    <p className="text-xs md:text-sm font-semibold text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(card.title);
                      }}
                      className="w-full brutalist-shadow-sm font-bold border-2 border-foreground bg-accent hover:bg-accent/90 text-sm md:text-base"
                    >
                      Get Started
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 md:py-12 px-4 border-t-4 border-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Logo */}
            <div className="space-y-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="w-8 h-8 bg-background text-foreground flex items-center justify-center font-black">
                  CP
                </div>
                <span className="font-black">CAREER PASSPORT</span>
              </div>
              <p className="text-sm font-semibold">
                Your guided path from student to professional.
              </p>

              <div className="space-y-3">
                <h4 className="font-black text-lg">OUR PARTNERS</h4>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <div className="bg-background p-1 rounded border border-background">
                    <img
                      src="/images/aptech-alt-logo.png"
                      alt="Aptech - Unleash your potential"
                      className="w-12 h-6 object-contain"
                    />
                  </div>
                  <div className="bg-background p-1 rounded border border-background">
                    <img
                      src="/images/techviz-logo.png"
                      alt="TechViz 6 - Global AI-Based Tech Competition"
                      className="w-16 h-6 object-contain"
                    />
                  </div>
                  <div className="bg-background p-1 rounded border border-background">
                    <img
                      src="/images/aptech-logo.png"
                      alt="Aptech Computer Education"
                      className="w-12 h-6 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 text-center sm:text-left">
              <h4 className="font-black text-lg">QUICK LINKS</h4>
              <ul className="space-y-2 text-sm font-semibold">
                <li>
                  <button
                    onClick={() => (window.location.href = "/about")}
                    className="hover:text-accent transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => (window.location.href = "/contact")}
                    className="hover:text-accent transition-colors cursor-pointer"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleMenuClick("Feedback")}
                    className="hover:text-accent transition-colors cursor-pointer"
                  >
                    Feedback
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4 text-center sm:text-left">
              <h4 className="font-black text-lg">RESOURCES</h4>
              <ul className="space-y-2 text-sm font-semibold">
                <li>
                  <button
                    onClick={() => handleMenuClick("Resource Library")}
                    className="hover:text-accent transition-colors cursor-pointer"
                  >
                    Career Library
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => (window.location.href = "/coaching")}
                    className="hover:text-accent transition-colors cursor-pointer"
                  >
                    Coaching & Guidance
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Study Materials
                  </a>
                </li>
                <li>
                  <button
                    onClick={() =>
                      (window.location.href = "/coaching/resume-guidelines")
                    }
                    className="hover:text-accent transition-colors cursor-pointer"
                  >
                    Resume Templates
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      (window.location.href = "/coaching/interview-tips")
                    }
                    className="hover:text-accent transition-colors cursor-pointer"
                  >
                    Interview Prep
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleMenuClick("Bookmarks")}
                    className="hover:text-accent transition-colors cursor-pointer"
                  >
                    My Bookmarks
                  </button>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="space-y-4 text-center sm:text-left">
              <h4 className="font-black text-lg">CONNECT</h4>
              <div className="flex gap-4 justify-center sm:justify-start">
                <div className="w-10 h-10 bg-background text-foreground flex items-center justify-center font-black cursor-pointer hover:bg-accent hover:text-background transition-colors">
                  f
                </div>
                <div className="w-10 h-10 bg-background text-foreground flex items-center justify-center font-black cursor-pointer hover:bg-accent hover:text-background transition-colors">
                  t
                </div>
                <div className="w-10 h-10 bg-background text-foreground flex items-center justify-center font-black cursor-pointer hover:bg-accent hover:text-background transition-colors">
                  in
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
            <p className="text-xs md:text-sm font-semibold">
              © 2024 Career Passport. All rights reserved. Built with passion
              for your success.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
