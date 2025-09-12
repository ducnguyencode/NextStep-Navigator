import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface Bookmark {
  id: string;
  title: string;
  type: "career" | "resource" | "story" | "multimedia";
  category?: string;
  description: string;
  url?: string;
  notes: string;
  dateAdded: string;
  tags: string[];
}

export default function BookmarkingSystem() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newBookmark, setNewBookmark] = useState<Partial<Bookmark>>({
    title: "",
    type: "career",
    category: "",
    description: "",
    url: "",
    notes: "",
    tags: [],
  });

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("careerPassportBookmarks");
    if (savedBookmarks) {
      const parsed = JSON.parse(savedBookmarks);
      setBookmarks(parsed);
      setFilteredBookmarks(parsed);
    }
  }, []);

  // Save bookmarks to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem("careerPassportBookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Filter bookmarks based on search and type filter
  useEffect(() => {
    let filtered = bookmarks;

    if (searchTerm) {
      filtered = filtered.filter(
        (bookmark) =>
          bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bookmark.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          bookmark.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bookmark.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((bookmark) => bookmark.type === filterType);
    }

    setFilteredBookmarks(filtered);
  }, [bookmarks, searchTerm, filterType]);

  const addBookmark = () => {
    if (!newBookmark.title || !newBookmark.description) return;

    const bookmark: Bookmark = {
      id: Date.now().toString(),
      title: newBookmark.title!,
      type: newBookmark.type as "career" | "resource" | "story" | "multimedia",
      category: newBookmark.category || "",
      description: newBookmark.description!,
      url: newBookmark.url || "",
      notes: newBookmark.notes || "",
      dateAdded: new Date().toISOString().split("T")[0],
      tags: newBookmark.tags || [],
    };

    setBookmarks((prev) => [...prev, bookmark]);
    setNewBookmark({
      title: "",
      type: "career",
      category: "",
      description: "",
      url: "",
      notes: "",
      tags: [],
    });
    setIsAddModalOpen(false);
  };

  const updateBookmark = (updatedBookmark: Bookmark) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === updatedBookmark.id ? updatedBookmark : b))
    );
    setIsEditModalOpen(false);
    setSelectedBookmark(null);
  };

  const deleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    setSelectedBookmark(null);
  };

  const exportBookmarks = () => {
    const exportData = filteredBookmarks.map((bookmark) => ({
      title: bookmark.title,
      type: bookmark.type,
      category: bookmark.category,
      description: bookmark.description,
      url: bookmark.url,
      notes: bookmark.notes,
      dateAdded: bookmark.dateAdded,
      tags: bookmark.tags.join(", "),
    }));

    const csvContent = [
      "Title,Type,Category,Description,URL,Notes,Date Added,Tags",
      ...exportData.map(
        (row) =>
          `"${row.title}","${row.type}","${row.category}","${row.description}","${row.url}","${row.notes}","${row.dateAdded}","${row.tags}"`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `career-bookmarks-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareBookmarks = (platform: string) => {
    const shareText = `Check out my career bookmarks from Career Passport! I've saved ${filteredBookmarks.length} resources for my professional development.`;
    const shareUrl = window.location.origin;

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}&quote=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}&summary=${encodeURIComponent(shareText)}`,
    };

    window.open(
      urls[platform as keyof typeof urls],
      "_blank",
      "width=600,height=400"
    );
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      career: "💼",
      resource: "📚",
      story: "⭐",
      multimedia: "🎥",
    };
    return icons[type as keyof typeof icons] || "📌";
  };

  const getTypeColor = (type: string) => {
    const colors = {
      career: "bg-blue-100 text-blue-800 border-blue-300",
      resource: "bg-green-100 text-green-800 border-green-300",
      story: "bg-purple-100 text-purple-800 border-purple-300",
      multimedia: "bg-orange-100 text-orange-800 border-orange-300",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-300"
    );
  };

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
                    📌
                  </span>
                </div>
                <span className="text-lg md:text-xl font-black text-foreground">
                  MY BOOKMARKS
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="brutalist-shadow-sm font-bold border-2 border-foreground bg-accent hover:bg-accent/90">
                    + Add Bookmark
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md mx-auto border-4 border-foreground brutalist-shadow">
                  <DialogHeader>
                    <DialogTitle className="font-black text-xl">
                      Add New Bookmark
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="font-bold">Title</Label>
                      <Input
                        value={newBookmark.title || ""}
                        onChange={(e) =>
                          setNewBookmark((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="border-2 border-foreground"
                        placeholder="Enter bookmark title"
                      />
                    </div>
                    <div>
                      <Label className="font-bold">Type</Label>
                      <Select
                        value={newBookmark.type}
                        onValueChange={(value) =>
                          setNewBookmark((prev) => ({
                            ...prev,
                            type: value as any,
                          }))
                        }
                      >
                        <SelectTrigger className="border-2 border-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="career">💼 Career</SelectItem>
                          <SelectItem value="resource">📚 Resource</SelectItem>
                          <SelectItem value="story">⭐ Story</SelectItem>
                          <SelectItem value="multimedia">
                            🎥 Multimedia
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="font-bold">Description</Label>
                      <Textarea
                        value={newBookmark.description || ""}
                        onChange={(e) =>
                          setNewBookmark((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="border-2 border-foreground"
                        placeholder="Brief description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="font-bold">URL (Optional)</Label>
                      <Input
                        value={newBookmark.url || ""}
                        onChange={(e) =>
                          setNewBookmark((prev) => ({
                            ...prev,
                            url: e.target.value,
                          }))
                        }
                        className="border-2 border-foreground"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <Label className="font-bold">Notes</Label>
                      <Textarea
                        value={newBookmark.notes || ""}
                        onChange={(e) =>
                          setNewBookmark((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                        className="border-2 border-foreground"
                        placeholder="Personal notes about this bookmark"
                        rows={2}
                      />
                    </div>
                    <Button
                      onClick={addBookmark}
                      className="w-full brutalist-shadow-sm font-bold border-2 border-foreground bg-accent hover:bg-accent/90"
                      disabled={!newBookmark.title || !newBookmark.description}
                    >
                      Add Bookmark
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                onClick={exportBookmarks}
                variant="outline"
                className="brutalist-shadow-sm font-bold border-2 bg-transparent"
                disabled={filteredBookmarks.length === 0}
              >
                📥 Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Input
                placeholder="Search bookmarks, notes, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-2 border-foreground text-lg p-4 font-semibold"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 border-2 border-foreground">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="career">💼 Careers</SelectItem>
                <SelectItem value="resource">📚 Resources</SelectItem>
                <SelectItem value="story">⭐ Stories</SelectItem>
                <SelectItem value="multimedia">🎥 Multimedia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm font-bold">
            <span className="px-3 py-1 bg-secondary border-2 border-foreground brutalist-shadow-sm">
              Total: {bookmarks.length}
            </span>
            <span className="px-3 py-1 bg-secondary border-2 border-foreground brutalist-shadow-sm">
              Filtered: {filteredBookmarks.length}
            </span>
          </div>
        </div>

        {/* Bookmarks Grid */}
        {filteredBookmarks.length === 0 ? (
          <Card className="p-8 text-center border-4 border-foreground brutalist-shadow">
            <div className="text-6xl mb-4">📌</div>
            <h3 className="text-xl font-black mb-2">No Bookmarks Found</h3>
            <p className="text-muted-foreground font-semibold mb-4">
              {bookmarks.length === 0
                ? "Start building your career resource collection by adding your first bookmark!"
                : "Try adjusting your search or filter criteria."}
            </p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="brutalist-shadow-sm font-bold border-2 border-foreground bg-accent hover:bg-accent/90"
            >
              Add Your First Bookmark
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookmarks.map((bookmark) => (
              <Card
                key={bookmark.id}
                className="p-6 border-4 border-foreground brutalist-shadow hover:scale-102 transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedBookmark(bookmark)}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {getTypeIcon(bookmark.type)}
                      </span>
                      <Badge
                        className={`font-bold border-2 ${getTypeColor(
                          bookmark.type
                        )}`}
                      >
                        {bookmark.type.toUpperCase()}
                      </Badge>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {bookmark.dateAdded}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-lg mb-2 line-clamp-2">
                      {bookmark.title}
                    </h3>
                    <p className="text-sm font-semibold text-muted-foreground line-clamp-3">
                      {bookmark.description}
                    </p>
                  </div>

                  {bookmark.notes && (
                    <div className="p-3 bg-secondary border-2 border-foreground">
                      <p className="text-xs font-semibold line-clamp-2">
                        📝 {bookmark.notes}
                      </p>
                    </div>
                  )}

                  {bookmark.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {bookmark.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs font-bold border-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {bookmark.tags.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs font-bold border-foreground"
                        >
                          +{bookmark.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Share Section */}
        {filteredBookmarks.length > 0 && (
          <Card className="mt-8 p-6 border-4 border-foreground brutalist-shadow">
            <h3 className="font-black text-xl mb-4">Share Your Bookmarks</h3>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => shareBookmarks("twitter")}
                className="brutalist-shadow-sm font-bold border-2 border-foreground bg-blue-500 hover:bg-blue-600 text-white"
              >
                🐦 Twitter
              </Button>
              <Button
                onClick={() => shareBookmarks("facebook")}
                className="brutalist-shadow-sm font-bold border-2 border-foreground bg-blue-600 hover:bg-blue-700 text-white"
              >
                📘 Facebook
              </Button>
              <Button
                onClick={() => shareBookmarks("linkedin")}
                className="brutalist-shadow-sm font-bold border-2 border-foreground bg-blue-700 hover:bg-blue-800 text-white"
              >
                💼 LinkedIn
              </Button>
            </div>
          </Card>
        )}
      </main>

      {/* Bookmark Detail Modal */}
      {selectedBookmark && (
        <Dialog
          open={!!selectedBookmark}
          onOpenChange={() => setSelectedBookmark(null)}
        >
          <DialogContent className="max-w-2xl mx-auto border-4 border-foreground brutalist-shadow max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-black text-xl flex items-center gap-2">
                <span className="text-2xl">
                  {getTypeIcon(selectedBookmark.type)}
                </span>
                {selectedBookmark.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Badge
                  className={`font-bold border-2 ${getTypeColor(
                    selectedBookmark.type
                  )}`}
                >
                  {selectedBookmark.type.toUpperCase()}
                </Badge>
                <span className="text-sm font-semibold text-muted-foreground">
                  Added: {selectedBookmark.dateAdded}
                </span>
              </div>

              <div>
                <h4 className="font-bold mb-2">Description</h4>
                <p className="font-semibold text-muted-foreground">
                  {selectedBookmark.description}
                </p>
              </div>

              {selectedBookmark.url && (
                <div>
                  <h4 className="font-bold mb-2">URL</h4>
                  <a
                    href={selectedBookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-semibold hover:underline break-all"
                  >
                    {selectedBookmark.url}
                  </a>
                </div>
              )}

              {selectedBookmark.notes && (
                <div>
                  <h4 className="font-bold mb-2">Personal Notes</h4>
                  <div className="p-4 bg-secondary border-2 border-foreground">
                    <p className="font-semibold whitespace-pre-wrap">
                      {selectedBookmark.notes}
                    </p>
                  </div>
                </div>
              )}

              {selectedBookmark.tags.length > 0 && (
                <div>
                  <h4 className="font-bold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBookmark.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="font-bold border-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => {
                    setNewBookmark(selectedBookmark);
                    setIsEditModalOpen(true);
                  }}
                  className="brutalist-shadow-sm font-bold border-2 border-foreground bg-accent hover:bg-accent/90"
                >
                  ✏️ Edit
                </Button>
                <Button
                  onClick={() => deleteBookmark(selectedBookmark.id)}
                  variant="destructive"
                  className="brutalist-shadow-sm font-bold border-2 border-foreground"
                >
                  🗑️ Delete
                </Button>
                {selectedBookmark.url && (
                  <Button
                    onClick={() => window.open(selectedBookmark.url, "_blank")}
                    variant="outline"
                    className="brutalist-shadow-sm font-bold border-2 bg-transparent"
                  >
                    🔗 Visit
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedBookmark && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-md mx-auto border-4 border-foreground brutalist-shadow">
            <DialogHeader>
              <DialogTitle className="font-black text-xl">
                Edit Bookmark
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="font-bold">Title</Label>
                <Input
                  value={newBookmark.title || ""}
                  onChange={(e) =>
                    setNewBookmark((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="border-2 border-foreground"
                />
              </div>
              <div>
                <Label className="font-bold">Type</Label>
                <Select
                  value={newBookmark.type}
                  onValueChange={(value) =>
                    setNewBookmark((prev) => ({ ...prev, type: value as any }))
                  }
                >
                  <SelectTrigger className="border-2 border-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="career">💼 Career</SelectItem>
                    <SelectItem value="resource">📚 Resource</SelectItem>
                    <SelectItem value="story">⭐ Story</SelectItem>
                    <SelectItem value="multimedia">🎥 Multimedia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-bold">Description</Label>
                <Textarea
                  value={newBookmark.description || ""}
                  onChange={(e) =>
                    setNewBookmark((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="border-2 border-foreground"
                  rows={3}
                />
              </div>
              <div>
                <Label className="font-bold">URL</Label>
                <Input
                  value={newBookmark.url || ""}
                  onChange={(e) =>
                    setNewBookmark((prev) => ({ ...prev, url: e.target.value }))
                  }
                  className="border-2 border-foreground"
                />
              </div>
              <div>
                <Label className="font-bold">Notes</Label>
                <Textarea
                  value={newBookmark.notes || ""}
                  onChange={(e) =>
                    setNewBookmark((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  className="border-2 border-foreground"
                  rows={3}
                />
              </div>
              <Button
                onClick={() =>
                  updateBookmark({
                    ...selectedBookmark,
                    ...newBookmark,
                  } as Bookmark)
                }
                className="w-full brutalist-shadow-sm font-bold border-2 border-foreground bg-accent hover:bg-accent/90"
              >
                Update Bookmark
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
