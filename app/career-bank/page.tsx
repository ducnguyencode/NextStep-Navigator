import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, X, Filter, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Career {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  skills: string[];
  educationalPath: string;
  salaryRange: string;
  industry: string;
  image: string;
}

const industries = [
  "Technology",
  "Healthcare",
  "Business",
  "Education",
  "Arts",
  "Government",
];

const sortOptions = [
  { value: "salary-high", label: "Salary (High → Low)" },
  { value: "salary-low", label: "Salary (Low → High)" },
  { value: "title-az", label: "Title (A–Z)" },
  { value: "title-za", label: "Title (Z–A)" },
];

export default function CareerBankPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("title-az");
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("career-bookmarks");
    if (savedBookmarks) {
      setBookmarks(new Set(JSON.parse(savedBookmarks)));
    }
  }, []);

  const saveBookmarks = (newBookmarks: Set<string>) => {
    localStorage.setItem(
      "career-bookmarks",
      JSON.stringify(Array.from(newBookmarks))
    );
  };

  const toggleBookmark = (careerId: number, careerTitle: string) => {
    const bookmarkId = `career-${careerId}`;
    const newBookmarks = new Set(bookmarks);

    if (newBookmarks.has(bookmarkId)) {
      newBookmarks.delete(bookmarkId);
    } else {
      newBookmarks.add(bookmarkId);
      const bookmarkData = {
        id: bookmarkId,
        type: "career",
        title: careerTitle,
        url: `/career-bank#${careerId}`,
        dateAdded: new Date().toISOString(),
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
    const loadCareers = async () => {
      try {
        const response = await fetch("/data/careers.json");
        if (!response.ok) throw new Error("Failed to load careers data");
        const data = await response.json();
        setCareers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load careers");
      } finally {
        setLoading(false);
      }
    };

    loadCareers();
  }, []);

  const filteredAndSortedCareers = useMemo(() => {
    const filtered = careers.filter((career) => {
      const matchesSearch =
        career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesIndustry =
        selectedIndustries.length === 0 ||
        selectedIndustries.includes(career.industry);

      return matchesSearch && matchesIndustry;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "salary-high":
          return (
            extractSalaryMax(b.salaryRange) - extractSalaryMax(a.salaryRange)
          );
        case "salary-low":
          return (
            extractSalaryMax(a.salaryRange) - extractSalaryMax(b.salaryRange)
          );
        case "title-az":
          return a.title.localeCompare(b.title);
        case "title-za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [careers, searchQuery, selectedIndustries, sortBy]);

  const extractSalaryMax = (salaryRange: string): number => {
    const match = salaryRange.match(/\$(\d+)k–\$(\d+)k/);
    return match ? Number.parseInt(match[2]) : 0;
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedIndustries([]);
    setSortBy("title-az");
  };

  const activeFilterCount = selectedIndustries.length + (searchQuery ? 1 : 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xl font-bold text-foreground">
            Loading Career Bank...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 brutalist-shadow border-4 border-foreground max-w-md text-center">
          <h2 className="text-2xl font-black text-foreground mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="brutalist-shadow-sm font-bold border-2"
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-foreground bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Logo */}
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

            {/* Greeting */}
            <div className="text-center md:flex-1">
              <span className="text-base md:text-lg font-bold text-accent">
                Welcome to Career Bank!
              </span>
            </div>

            {/* Navigation - Horizontal scroll on mobile */}
            <Link to="/">
              <Button
                variant="outline"
                className="brutalist-shadow-sm font-bold border-2 bg-transparent flex items-center gap-2 text-sm md:text-base"
              >
                <ArrowLeft className="w-4 h-4" />
                Back Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Controls Panel */}
          <div className="lg:w-80 space-y-4 md:space-y-6">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full brutalist-shadow-sm font-bold border-2 flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
            </div>

            {/* Filter Panel */}
            <div
              className={`space-y-4 md:space-y-6 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <Card className="p-4 md:p-6 brutalist-shadow border-4 border-foreground">
                <h2 className="text-xl md:text-2xl font-black text-foreground mb-4 md:mb-6">
                  SEARCH & FILTER
                </h2>

                {/* Search */}
                <div className="space-y-2 mb-4 md:mb-6">
                  <Label
                    htmlFor="search"
                    className="text-sm font-bold text-foreground"
                  >
                    Search by title or skills
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="e.g., JavaScript, Nursing..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-2 border-foreground font-semibold text-sm md:text-base"
                    />
                  </div>
                </div>

                {/* Industry Filter */}
                <div className="space-y-3 mb-4 md:mb-6">
                  <Label className="text-sm font-bold text-foreground">
                    Industry
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                    {industries.map((industry) => (
                      <div
                        key={industry}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={industry}
                          checked={selectedIndustries.includes(industry)}
                          onCheckedChange={() => toggleIndustry(industry)}
                          className="border-2 border-foreground"
                        />
                        <Label
                          htmlFor={industry}
                          className="text-xs md:text-sm font-semibold cursor-pointer"
                        >
                          {industry}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="space-y-2 mb-4 md:mb-6">
                  <Label className="text-sm font-bold text-foreground">
                    Sort by
                  </Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="border-2 border-foreground font-semibold text-sm md:text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Active Filters */}
                {(selectedIndustries.length > 0 || searchQuery) && (
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-foreground">
                      Active Filters
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {searchQuery && (
                        <Badge
                          variant="secondary"
                          className="brutalist-shadow-sm border-2 border-foreground text-xs"
                        >
                          Search: {searchQuery}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() => setSearchQuery("")}
                          />
                        </Badge>
                      )}
                      {selectedIndustries.map((industry) => (
                        <Badge
                          key={industry}
                          variant="secondary"
                          className="brutalist-shadow-sm border-2 border-foreground text-xs"
                        >
                          {industry}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() => toggleIndustry(industry)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reset Filters */}
                {activeFilterCount > 0 && (
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    className="w-full mt-4 font-bold border-2 border-foreground hover:bg-secondary text-sm md:text-base"
                  >
                    Clear All Filters
                  </Button>
                )}
              </Card>
            </div>
          </div>

          {/* Career Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-2">
              <h1 className="text-2xl md:text-4xl font-black text-foreground">
                CAREER BANK
              </h1>
              <div className="text-sm md:text-lg font-bold text-muted-foreground">
                {filteredAndSortedCareers.length} careers found
              </div>
            </div>

            {/* Empty State */}
            {filteredAndSortedCareers.length === 0 ? (
              <Card className="p-8 md:p-12 brutalist-shadow border-4 border-foreground text-center">
                <div className="space-y-4">
                  <div className="text-4xl md:text-6xl">🔍</div>
                  <h3 className="text-xl md:text-2xl font-black text-foreground mb-2 line-clamp-2">
                    No careers match your filters
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground font-semibold">
                    Try adjusting your search criteria or clearing some filters.
                  </p>
                  <Button
                    onClick={clearFilters}
                    className="brutalist-shadow-sm font-bold border-2 border-foreground bg-accent hover:bg-accent/90"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {filteredAndSortedCareers.map((career) => (
                  <Card
                    key={career.id}
                    className="p-0 brutalist-shadow border-4 border-foreground bg-card hover:scale-102 hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden h-full flex flex-col"
                  >
                    {/* Career Image */}
                    <div className="h-32 md:h-48 bg-secondary border-b-4 border-foreground">
                      <img
                        src={career.image || "/placeholder.svg"}
                        alt={career.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-4 md:p-6 flex-1 flex flex-col">
                      {/* Title */}
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg md:text-xl font-black text-foreground line-clamp-2 flex-1 mr-2">
                          {career.title}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(career.id, career.title);
                          }}
                          className="p-1 h-8 w-8 hover:bg-accent/20"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              bookmarks.has(`career-${career.id}`)
                                ? "fill-red-500 text-red-500"
                                : "text-muted-foreground hover:text-red-500"
                            }`}
                          />
                        </Button>
                      </div>

                      {/* Description */}
                      <p className="text-xs md:text-sm font-semibold text-muted-foreground mb-3 md:mb-4 line-clamp-3 flex-1">
                        {career.description}
                      </p>

                      {/* Skills */}
                      <div className="mb-3 md:mb-4">
                        <div className="flex flex-wrap gap-1">
                          {career.skills.slice(0, 3).map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="text-xs font-bold border-2 border-foreground"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {career.skills.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs font-bold border-2 border-foreground"
                            >
                              +{career.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Education & Salary */}
                      <div className="space-y-1 md:space-y-2 mb-3 md:mb-4">
                        <div className="text-xs font-bold text-muted-foreground">
                          📚 {career.educationalPath}
                        </div>
                        <div className="text-sm font-black text-accent">
                          💰 {career.salaryRange}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full brutalist-shadow-sm font-bold border-2 border-foreground bg-accent hover:bg-accent/90 text-sm md:text-base"
                            onClick={() => setSelectedCareer(career)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl brutalist-shadow border-4 border-foreground mx-4">
                          <DialogHeader>
                            <DialogTitle className="text-xl md:text-2xl font-black text-foreground">
                              {selectedCareer?.title}
                            </DialogTitle>
                          </DialogHeader>
                          {selectedCareer && (
                            <div className="space-y-4 md:space-y-6 max-h-[70vh] overflow-y-auto">
                              <img
                                src={selectedCareer.image || "/placeholder.svg"}
                                alt={selectedCareer.title}
                                className="w-full h-32 md:h-48 object-cover border-2 border-foreground"
                              />

                              <div className="space-y-3 md:space-y-4">
                                <div>
                                  <h4 className="font-black text-foreground mb-2">
                                    Description
                                  </h4>
                                  <p className="text-sm font-semibold text-muted-foreground leading-relaxed">
                                    {selectedCareer.fullDescription}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-black text-foreground mb-2">
                                    Required Skills
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedCareer.skills.map((skill) => (
                                      <Badge
                                        key={skill}
                                        variant="outline"
                                        className="font-bold border-2 border-foreground text-xs"
                                      >
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-black text-foreground mb-2">
                                    Educational Path
                                  </h4>
                                  <p className="text-sm font-semibold text-muted-foreground">
                                    📚 {selectedCareer.educationalPath}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-black text-foreground mb-2">
                                    Salary Range
                                  </h4>
                                  <p className="text-base md:text-lg font-black text-accent">
                                    💰 {selectedCareer.salaryRange}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-black text-foreground mb-2">
                                    Industry
                                  </h4>
                                  <Badge className="font-bold bg-primary text-primary-foreground">
                                    {selectedCareer.industry}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
