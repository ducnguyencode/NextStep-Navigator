import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Filter, Quote } from "lucide-react";
// Replaced next/image with standard img tags

interface Story {
  id: number;
  name: string;
  photo: string;
  domain: string;
  currentRole: string;
  journey: string;
  keyMilestones: string[];
  inspiration: string;
  tags: string[];
}

interface StoriesData {
  stories: Story[];
}

const domains = [
  { value: "all", label: "All Domains", icon: "🌟" },
  { value: "engineering", label: "Engineering", icon: "⚙️" },
  { value: "medicine", label: "Medicine", icon: "🏥" },
  { value: "arts", label: "Arts & Creative", icon: "🎨" },
  { value: "business", label: "Business", icon: "💼" },
  { value: "education", label: "Education", icon: "📚" },
  { value: "science", label: "Science & Research", icon: "🔬" },
  { value: "finance", label: "Finance", icon: "💰" },
  { value: "sports", label: "Sports", icon: "🏆" },
];

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("/data/success-stories.json");
        const data: StoriesData = await response.json();
        setStories(data.stories);
        setFilteredStories(data.stories);
      } catch (error) {
        console.error("Error loading success stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    if (selectedDomain === "all") {
      setFilteredStories(stories);
    } else {
      setFilteredStories(
        stories.filter((story) => story.domain === selectedDomain)
      );
    }
  }, [selectedDomain, stories]);

  const handleDomainFilter = (domain: string) => {
    setSelectedDomain(domain);
    setShowMobileFilters(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-bold text-foreground">
            Loading Success Stories...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-foreground bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                size="sm"
                className="brutalist-shadow-sm font-bold border-2 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-primary brutalist-shadow-sm flex items-center justify-center">
                  <span className="text-lg md:text-xl font-black text-primary-foreground">
                    CP
                  </span>
                </div>
                <span className="text-lg md:text-xl font-black text-foreground">
                  SUCCESS STORIES
                </span>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              variant="outline"
              size="sm"
              className="md:hidden brutalist-shadow-sm font-bold border-2 bg-transparent"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 md:py-12 px-4 bg-secondary">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-foreground mb-4 animate-bounce-in text-balance">
            SUCCESS STORIES
          </h1>
          <p className="text-lg md:text-xl text-accent font-bold mb-6 animate-slide-up">
            Get inspired by real journeys from students to professionals
          </p>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold text-muted-foreground">
            <span className="text-2xl">🌟</span>
            <span>{filteredStories.length} inspiring stories to explore</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-80 space-y-4">
            <div className="bg-card border-4 border-foreground brutalist-shadow p-6">
              <h3 className="text-xl font-black text-foreground mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter by Domain
              </h3>
              <div className="space-y-2">
                {domains.map((domain) => (
                  <Button
                    key={domain.value}
                    onClick={() => handleDomainFilter(domain.value)}
                    variant={
                      selectedDomain === domain.value ? "default" : "outline"
                    }
                    className={`w-full justify-start font-bold border-2 ${
                      selectedDomain === domain.value
                        ? "bg-accent text-accent-foreground brutalist-shadow-sm"
                        : "bg-transparent hover:bg-secondary"
                    }`}
                  >
                    <span className="mr-2">{domain.icon}</span>
                    {domain.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-card border-4 border-foreground brutalist-shadow p-6">
              <h3 className="text-lg font-black text-foreground mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Stories</span>
                  <Badge variant="secondary" className="font-bold">
                    {stories.length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Domains Covered</span>
                  <Badge variant="secondary" className="font-bold">
                    {domains.length - 1}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Showing</span>
                  <Badge variant="outline" className="font-bold border-2">
                    {filteredStories.length}
                  </Badge>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filters Dropdown */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 bg-background/95 z-50 p-4">
              <div className="bg-card border-4 border-foreground brutalist-shadow p-6 max-w-md mx-auto mt-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-foreground">
                    Filter by Domain
                  </h3>
                  <Button
                    onClick={() => setShowMobileFilters(false)}
                    variant="outline"
                    size="sm"
                    className="brutalist-shadow-sm font-bold border-2"
                  >
                    ✕
                  </Button>
                </div>
                <div className="space-y-2">
                  {domains.map((domain) => (
                    <Button
                      key={domain.value}
                      onClick={() => handleDomainFilter(domain.value)}
                      variant={
                        selectedDomain === domain.value ? "default" : "outline"
                      }
                      className={`w-full justify-start font-bold border-2 ${
                        selectedDomain === domain.value
                          ? "bg-accent text-accent-foreground"
                          : "bg-transparent"
                      }`}
                    >
                      <span className="mr-2">{domain.icon}</span>
                      {domain.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Stories Grid */}
          <main className="flex-1">
            {filteredStories.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-black text-foreground mb-2">
                  No Stories Found
                </h3>
                <p className="text-muted-foreground font-semibold">
                  Try selecting a different domain to see more stories.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredStories.map((story, index) => (
                  <Card
                    key={story.id}
                    onClick={() => setSelectedStory(story)}
                    className="p-6 brutalist-shadow border-4 border-foreground bg-card hover:scale-105 transition-all duration-200 cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-4">
                      {/* Photo */}
                      <div className="relative w-full h-48 border-2 border-foreground overflow-hidden">
                        <img
                          src={story.photo || "/placeholder.svg"}
                          alt={story.name}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-black text-foreground">
                            {story.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="font-bold text-xs"
                          >
                            {
                              domains.find((d) => d.value === story.domain)
                                ?.icon
                            }{" "}
                            {story.domain}
                          </Badge>
                        </div>

                        <p className="text-sm font-bold text-accent line-clamp-2">
                          {story.currentRole}
                        </p>

                        <p className="text-sm text-muted-foreground font-medium line-clamp-3 leading-relaxed">
                          {story.journey}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {story.tags.slice(0, 2).map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="outline"
                              className="text-xs font-semibold border-2"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {story.tags.length > 2 && (
                            <Badge
                              variant="outline"
                              className="text-xs font-semibold border-2"
                            >
                              +{story.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStory(story);
                          }}
                          className="w-full brutalist-shadow-sm font-bold border-2 border-foreground bg-accent hover:bg-accent/90"
                        >
                          Read Full Story
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Story Detail Modal */}
      <Dialog
        open={!!selectedStory}
        onOpenChange={() => setSelectedStory(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-4 border-foreground brutalist-shadow">
          {selectedStory && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-foreground flex items-center gap-3">
                  <span className="text-3xl">
                    {
                      domains.find((d) => d.value === selectedStory.domain)
                        ?.icon
                    }
                  </span>
                  {selectedStory.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Photo and Basic Info */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-64 h-64 border-2 border-foreground overflow-hidden">
                    <img
                      src={selectedStory.photo || "/placeholder.svg"}
                      alt={selectedStory.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-accent mb-2">
                        Current Role
                      </h3>
                      <p className="text-lg font-bold text-foreground">
                        {selectedStory.currentRole}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-accent mb-2">
                        Domain
                      </h3>
                      <Badge
                        variant="secondary"
                        className="font-bold text-base px-3 py-1"
                      >
                        {
                          domains.find((d) => d.value === selectedStory.domain)
                            ?.label
                        }
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Journey */}
                <div>
                  <h3 className="text-xl font-black text-accent mb-3">
                    The Journey
                  </h3>
                  <p className="text-base text-foreground font-medium leading-relaxed">
                    {selectedStory.journey}
                  </p>
                </div>

                {/* Key Milestones */}
                <div>
                  <h3 className="text-xl font-black text-accent mb-3">
                    Key Milestones
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedStory.keyMilestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border-2 border-foreground bg-secondary"
                      >
                        <div className="w-8 h-8 bg-accent text-accent-foreground flex items-center justify-center font-black text-sm">
                          {index + 1}
                        </div>
                        <span className="font-semibold text-sm">
                          {milestone}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inspiration Quote */}
                <div className="bg-card border-4 border-foreground brutalist-shadow p-6">
                  <div className="flex items-start gap-4">
                    <Quote className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg font-bold text-foreground italic leading-relaxed mb-2">
                        {selectedStory.inspiration}
                      </p>
                      <p className="text-sm font-semibold text-muted-foreground">
                        — {selectedStory.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* All Tags */}
                <div>
                  <h3 className="text-xl font-black text-accent mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStory.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="font-semibold border-2"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
