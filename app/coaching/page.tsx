import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Globe,
  Users,
  FileText,
  ChevronRight,
  Star,
  Clock,
  Target,
} from "lucide-react";

export default function CoachingPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const coachingSections = [
    {
      id: "stream-selection",
      title: "Stream Selection Guide",
      description: "Choose the right academic path after 10th grade",
      icon: BookOpen,
      category: "academic",
      targetAudience: "Students",
      duration: "15-20 min read",
      difficulty: "Beginner",
      href: "/coaching/stream-selection",
    },
    {
      id: "study-abroad",
      title: "Study Abroad Guidelines",
      description: "Complete guide for international education",
      icon: Globe,
      category: "academic",
      targetAudience: "Students & Graduates",
      duration: "25-30 min read",
      difficulty: "Intermediate",
      href: "/coaching/study-abroad",
    },
    {
      id: "interview-tips",
      title: "Interview Mastery",
      description: "Excel in job interviews and advance your career",
      icon: Users,
      category: "professional",
      targetAudience: "Graduates & Professionals",
      duration: "20-25 min read",
      difficulty: "Intermediate",
      href: "/coaching/interview-tips",
    },
    {
      id: "resume-guidelines",
      title: "Resume Guidelines",
      description: "Create compelling resumes that get noticed",
      icon: FileText,
      category: "professional",
      targetAudience: "Graduates & Professionals",
      duration: "15-20 min read",
      difficulty: "Beginner",
      href: "/coaching/resume-guidelines",
    },
  ];

  const categories = [
    { id: "all", label: "All Guides", count: coachingSections.length },
    {
      id: "academic",
      label: "Academic",
      count: coachingSections.filter((s) => s.category === "academic").length,
    },
    {
      id: "professional",
      label: "Professional",
      count: coachingSections.filter((s) => s.category === "professional")
        .length,
    },
  ];

  const filteredSections =
    selectedCategory === "all"
      ? coachingSections
      : coachingSections.filter(
          (section) => section.category === selectedCategory
        );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-300";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b-4 border-black p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-2 border-black font-bold hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-black text-black mb-4">
              ADMISSION & COACHING
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Expert guidance for academic decisions, career transitions, and
              professional growth
            </p>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-orange-400 border-b-4 border-black p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-6 h-6 text-black" />
                <span className="text-2xl font-black text-black">4</span>
              </div>
              <p className="font-bold text-black">Comprehensive Guides</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-6 h-6 text-black" />
                <span className="text-2xl font-black text-black">75+</span>
              </div>
              <p className="font-bold text-black">Minutes of Content</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-6 h-6 text-black" />
                <span className="text-2xl font-black text-black">100%</span>
              </div>
              <p className="font-bold text-black">Expert Curated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="bg-gray-50 border-b-4 border-black p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 border-2 border-black font-bold transition-colors ${
                  selectedCategory === category.id
                    ? "bg-orange-400 text-black"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching Sections */}
      <main className="p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Link
                  key={section.id}
                  to={section.href}
                  className="group bg-white border-4 border-black p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-400 border-2 border-black p-3 group-hover:bg-orange-500 transition-colors">
                      <IconComponent className="w-6 h-6 text-black" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-black text-black group-hover:text-orange-600 transition-colors">
                          {section.title}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" />
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {section.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 border border-blue-300 text-sm font-bold">
                          {section.targetAudience}
                        </span>
                        <span
                          className={`px-3 py-1 text-sm font-bold border ${getDifficultyColor(
                            section.difficulty
                          )}`}
                        >
                          {section.difficulty}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{section.duration}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* Call to Action */}
      <section className="bg-black text-white p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            NEED PERSONALIZED GUIDANCE?
          </h2>
          <p className="text-lg mb-6 text-gray-300">
            Our coaching guides provide comprehensive information, but every
            journey is unique.
          </p>
          <Link
            to="/feedback"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-400 text-black border-2 border-orange-400 font-bold hover:bg-orange-500 transition-colors"
          >
            Get Personal Consultation
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
