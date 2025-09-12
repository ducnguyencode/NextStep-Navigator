import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MultimediaContent {
  id: string;
  title: string;
  description: string;
  youtubeId?: string;
  audioUrl?: string;
  duration: string;
  category: string;
  userType: string[];
  tags: string[];
  speaker: string;
  speakerTitle: string;
  transcript: string;
}

interface MultimediaData {
  videos: MultimediaContent[];
  podcasts: MultimediaContent[];
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "motivation", label: "Motivation" },
  { value: "job-roles", label: "Job Roles" },
  { value: "internships", label: "Internships" },
  { value: "career-change", label: "Career Change" },
  { value: "professional-development", label: "Professional Development" },
  { value: "entrepreneurship", label: "Entrepreneurship" },
  { value: "academic-success", label: "Academic Success" },
];

const userTypes = [
  { value: "all", label: "All User Types" },
  { value: "student", label: "Students" },
  { value: "graduate", label: "Graduates" },
  { value: "professional", label: "Professionals" },
];

export default function MultimediaGuidance() {
  const [data, setData] = useState<MultimediaData>({
    videos: [],
    podcasts: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUserType, setSelectedUserType] = useState("all");
  const [activeTab, setActiveTab] = useState("videos");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/multimedia-content.json");
        const multimediaData = await response.json();
        setData(multimediaData);
      } catch (error) {
        console.error("Error loading multimedia content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterContent = (content: MultimediaContent[]) => {
    return content.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.speaker.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesUserType =
        selectedUserType === "all" || item.userType.includes(selectedUserType);

      return matchesSearch && matchesCategory && matchesUserType;
    });
  };

  const filteredVideos = filterContent(data.videos);
  const filteredPodcasts = filterContent(data.podcasts);

  const ContentCard = ({
    item,
    type,
  }: {
    item: MultimediaContent;
    type: "video" | "podcast";
  }) => (
    <Card className="p-4 md:p-6 brutalist-shadow border-4 border-foreground bg-card hover:scale-102 transition-all duration-200">
      <div className="space-y-4">
        {/* Thumbnail/Preview */}
        <div className="aspect-video bg-secondary border-2 border-foreground flex items-center justify-center">
          {type === "video" ? (
            <div className="text-4xl md:text-6xl">📹</div>
          ) : (
            <div className="text-4xl md:text-6xl">🎧</div>
          )}
        </div>

        {/* Content Info */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-accent text-accent-foreground font-bold border-2 border-foreground">
              {item.category.replace("-", " ").toUpperCase()}
            </Badge>
            <Badge
              variant="outline"
              className="font-bold border-2 border-foreground"
            >
              {item.duration}
            </Badge>
          </div>

          <h3 className="text-lg md:text-xl font-black text-foreground line-clamp-2">
            {item.title}
          </h3>

          <p className="text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed">
            {item.description}
          </p>

          <div className="space-y-2">
            <p className="text-sm font-bold text-foreground">{item.speaker}</p>
            <p className="text-xs text-muted-foreground">{item.speakerTitle}</p>
          </div>

          <div className="flex flex-wrap gap-1">
            {item.userType.map((type) => (
              <Badge
                key={type}
                variant="secondary"
                className="text-xs font-semibold"
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 brutalist-shadow-sm font-bold border-2 border-foreground bg-primary hover:bg-primary/90">
                {type === "video" ? "Watch Video" : "Listen"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] brutalist-shadow border-4 border-foreground">
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl font-black text-foreground">
                  {item.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Video/Audio Player */}
                <div className="aspect-video bg-secondary border-2 border-foreground">
                  {type === "video" && item.youtubeId ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${item.youtubeId}`}
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : type === "podcast" && item.audioUrl ? (
                    <div className="flex items-center justify-center h-full">
                      <audio controls className="w-full max-w-md">
                        <source src={item.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      Content preview not available
                    </div>
                  )}
                </div>

                {/* Speaker Info */}
                <div className="p-4 bg-secondary border-2 border-foreground">
                  <h4 className="font-black text-foreground mb-2">
                    About the Speaker
                  </h4>
                  <p className="font-bold">{item.speaker}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.speakerTitle}
                  </p>
                </div>

                {/* Transcript */}
                <div className="space-y-2">
                  <h4 className="font-black text-foreground">
                    Transcript Preview
                  </h4>
                  <ScrollArea className="h-32 p-4 bg-secondary border-2 border-foreground">
                    <p className="text-sm leading-relaxed">{item.transcript}</p>
                  </ScrollArea>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-bounce">📹</div>
          <p className="text-xl font-bold">Loading multimedia content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-foreground bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="brutalist-shadow-sm font-bold border-2 bg-transparent"
              >
                ← Back
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary brutalist-shadow-sm flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-black text-primary-foreground">
                    📹
                  </span>
                </div>
                <span className="text-lg md:text-xl font-black text-foreground">
                  MULTIMEDIA GUIDANCE
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 md:py-12 px-4 bg-secondary">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-foreground mb-4 animate-bounce-in">
            LEARN FROM THE PROS
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-bold mb-8 animate-slide-up">
            Watch videos and listen to podcasts from industry professionals
            sharing real insights and career advice.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 px-4 border-b-4 border-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <Input
                placeholder="Search videos, podcasts, or speakers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-2 border-foreground font-semibold brutalist-shadow-sm"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="border-2 border-foreground font-bold brutalist-shadow-sm">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="font-semibold"
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* User Type Filter */}
            <Select
              value={selectedUserType}
              onValueChange={setSelectedUserType}
            >
              <SelectTrigger className="border-2 border-foreground font-bold brutalist-shadow-sm">
                <SelectValue placeholder="User Type" />
              </SelectTrigger>
              <SelectContent>
                {userTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="font-semibold"
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-2 border-2 border-foreground brutalist-shadow-sm">
              <TabsTrigger
                value="videos"
                className="font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                Videos ({filteredVideos.length})
              </TabsTrigger>
              <TabsTrigger
                value="podcasts"
                className="font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                Podcasts ({filteredPodcasts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="videos" className="space-y-6">
              {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video, index) => (
                    <div
                      key={video.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ContentCard item={video} type="video" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-black text-foreground mb-2">
                    No Videos Found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="podcasts" className="space-y-6">
              {filteredPodcasts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPodcasts.map((podcast, index) => (
                    <div
                      key={podcast.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ContentCard item={podcast} type="podcast" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-black text-foreground mb-2">
                    No Podcasts Found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
