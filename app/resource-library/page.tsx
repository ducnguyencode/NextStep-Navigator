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
  ExternalLink,
  Search,
  Filter,
  BookOpen,
  FileText,
  CheckSquare,
  Video,
  Clock,
  User,
  Calendar,
  FileDown,
  Heart,
} from "lucide-react";

interface Resource {
  id: number;
  title: string;
  description: string;
  link: string;
  tags: string[];
  author?: string;
  readTime?: string;
  pages?: string;
  items?: string;
  duration?: string;
  speaker?: string;
  date?: string;
}

interface ResourceData {
  articles: Resource[];
  ebooks: Resource[];
  checklists: Resource[];
  webinars: Resource[];
}

type ResourceType = keyof ResourceData;

const resourceTypeConfig = {
  articles: {
    title: "Articles",
    icon: FileText,
    color: "bg-blue-500",
    description: "In-depth articles and career insights",
  },
  ebooks: {
    title: "eBooks",
    icon: BookOpen,
    color: "bg-green-500",
    description: "Comprehensive guides and resources",
  },
  checklists: {
    title: "Checklists",
    icon: CheckSquare,
    color: "bg-purple-500",
    description: "Actionable checklists and templates",
  },
  webinars: {
    title: "Webinars",
    icon: Video,
    color: "bg-red-500",
    description: "Expert-led sessions and workshops",
  },
};

export default function ResourceLibrary() {
  const [resources, setResources] = useState<ResourceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<ResourceType>("articles");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("resource-bookmarks");
    if (savedBookmarks) {
      setBookmarks(new Set(JSON.parse(savedBookmarks)));
    }
  }, []);

  const saveBookmarks = (newBookmarks: Set<string>) => {
    localStorage.setItem(
      "resource-bookmarks",
      JSON.stringify(Array.from(newBookmarks))
    );
  };

  const toggleBookmark = (
    resourceId: number,
    resourceTitle: string,
    resourceType: ResourceType
  ) => {
    const bookmarkId = `resource-${resourceType}-${resourceId}`;
    const newBookmarks = new Set(bookmarks);

    if (newBookmarks.has(bookmarkId)) {
      newBookmarks.delete(bookmarkId);
    } else {
      newBookmarks.add(bookmarkId);
      const bookmarkData = {
        id: bookmarkId,
        type: "resource",
        title: resourceTitle,
        url: `/resource-library#${resourceType}-${resourceId}`,
        dateAdded: new Date().toISOString(),
        resourceType: resourceType,
      };
      const existingBookmarks = JSON.parse(
        localStorage.getItem("bookmark-data") || "[]"
      );
      const updatedBookmarks = existingBookmarks.filter(
        (b: any) => b.id !== bookmarkId
      );
      updatedBookmarks.push(bookmarkData);
      localStorage.setItem("bookmark-data", JSON.stringify(updatedBookmarks));
    }

    setBookmarks(newBookmarks);
    saveBookmarks(newBookmarks);
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("/data/resources.json");
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error("Failed to load resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const filteredResources =
    resources?.[activeType]?.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || resource.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    }) || [];

  const allTags = resources
    ? Array.from(new Set(resources[activeType]?.flatMap((r) => r.tags) || []))
    : [];

  const getResourceIcon = (type: ResourceType) => {
    const IconComponent = resourceTypeConfig[type].icon;
    return <IconComponent className="w-5 h-5" />;
  };

  const getResourceMeta = (resource: Resource, type: ResourceType) => {
    switch (type) {
      case "articles":
        return (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {resource.author && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{resource.author}</span>
              </div>
            )}
            {resource.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{resource.readTime}</span>
              </div>
            )}
          </div>
        );
      case "ebooks":
        return (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {resource.author && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{resource.author}</span>
              </div>
            )}
            {resource.pages && (
              <div className="flex items-center gap-1">
                <FileDown className="w-4 h-4" />
                <span>{resource.pages}</span>
              </div>
            )}
          </div>
        );
      case "checklists":
        return (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {resource.items && (
              <div className="flex items-center gap-1">
                <CheckSquare className="w-4 h-4" />
                <span>{resource.items}</span>
              </div>
            )}
          </div>
        );
      case "webinars":
        return (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {resource.speaker && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{resource.speaker}</span>
              </div>
            )}
            {resource.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{resource.duration}</span>
              </div>
            )}
            {resource.date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{resource.date}</span>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-bold text-foreground">
            Loading Resources...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-foreground bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="brutalist-shadow-sm font-bold border-2 bg-transparent"
              >
                ← Back
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-foreground">
                  RESOURCE LIBRARY
                </h1>
                <p className="text-sm md:text-base font-semibold text-muted-foreground">
                  Your comprehensive career development toolkit
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Resource Type Tabs */}
        <div className="mb-6 md:mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {(Object.keys(resourceTypeConfig) as ResourceType[]).map((type) => {
              const config = resourceTypeConfig[type];
              const IconComponent = config.icon;
              const isActive = activeType === type;

              return (
                <Button
                  key={type}
                  onClick={() => {
                    setActiveType(type);
                    setSelectedTag(null);
                    setSearchTerm("");
                  }}
                  className={`p-4 md:p-6 h-auto flex flex-col items-center gap-2 md:gap-3 brutalist-shadow-sm border-2 font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-accent text-accent-foreground border-foreground"
                      : "bg-card text-card-foreground border-foreground hover:bg-secondary"
                  }`}
                >
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${config.color} flex items-center justify-center text-white`}
                  >
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm md:text-base font-black">
                      {config.title}
                    </div>
                    <div className="text-xs text-muted-foreground hidden md:block">
                      {config.description}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-6 md:mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={`Search ${resourceTypeConfig[
                  activeType
                ].title.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-foreground text-base font-semibold"
              />
            </div>
            <Button
              onClick={() => setSelectedTag(null)}
              variant={selectedTag ? "outline" : "default"}
              className="brutalist-shadow-sm font-bold border-2 bg-transparent"
            >
              <Filter className="w-4 h-4 mr-2" />
              All Tags
            </Button>
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`cursor-pointer border-2 border-foreground font-bold transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-accent text-accent-foreground"
                    : "bg-card text-card-foreground hover:bg-secondary"
                }`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredResources.map((resource) => (
            <Card
              key={resource.id}
              className="p-4 md:p-6 brutalist-shadow border-4 border-foreground bg-card hover:scale-102 transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Resource Header */}
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${resourceTypeConfig[activeType].color} flex items-center justify-center text-white flex-shrink-0`}
                  >
                    {getResourceIcon(activeType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-black text-foreground line-clamp-2 flex-1 mr-2">
                        {resource.title}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(
                            resource.id,
                            resource.title,
                            activeType
                          );
                        }}
                        className="p-1 h-8 w-8 hover:bg-accent/20 flex-shrink-0"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            bookmarks.has(
                              `resource-${activeType}-${resource.id}`
                            )
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground hover:text-red-500"
                          }`}
                        />
                      </Button>
                    </div>
                    {getResourceMeta(resource, activeType)}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm font-semibold text-muted-foreground line-clamp-3 leading-relaxed">
                  {resource.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {resource.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-bold border border-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {resource.tags.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-xs font-bold border border-foreground"
                    >
                      +{resource.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 brutalist-shadow-sm font-bold border-2 bg-transparent text-sm"
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl border-4 border-foreground brutalist-shadow">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-black text-foreground pr-8">
                          {resource.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-full ${resourceTypeConfig[activeType].color} flex items-center justify-center text-white`}
                          >
                            {getResourceIcon(activeType)}
                          </div>
                          <div>
                            <div className="font-bold text-foreground">
                              {resourceTypeConfig[activeType].title}
                            </div>
                            {getResourceMeta(resource, activeType)}
                          </div>
                        </div>

                        <p className="text-base font-semibold text-muted-foreground leading-relaxed">
                          {resource.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {resource.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="font-bold border border-foreground"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button
                          onClick={() => window.open(resource.link, "_blank")}
                          className="w-full brutalist-shadow-sm font-bold border-2 border-foreground bg-accent hover:bg-accent/90"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Access Resource
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    onClick={() => window.open(resource.link, "_blank")}
                    className="brutalist-shadow-sm font-bold border-2 border-foreground bg-accent hover:bg-accent/90 px-3"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-black text-foreground mb-2">
              No Resources Found
            </h3>
            <p className="text-muted-foreground font-semibold mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedTag(null);
              }}
              variant="outline"
              className="brutalist-shadow-sm font-bold border-2 bg-transparent"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
