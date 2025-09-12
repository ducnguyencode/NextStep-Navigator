import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  MessageCircle,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Phone,
  UserCheck,
} from "lucide-react";

interface InterviewData {
  title: string;
  description: string;
  sections: Array<{
    id: string;
    title: string;
    tips: Array<{
      category: string;
      title: string;
      description: string;
      details: string[];
    }>;
  }>;
  commonMistakes: string[];
  followUp: string[];
}

export default function InterviewTipsPage() {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(
    null
  );
  const [activeSection, setActiveSection] = useState<string>("preparation");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/interview-tips.json");
        const data = await response.json();
        setInterviewData(data);
      } catch (error) {
        console.error("Error loading interview tips data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-bold">Loading Interview Tips...</p>
        </div>
      </div>
    );
  }

  if (!interviewData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-bold">
            Failed to load interview tips data
          </p>
        </div>
      </div>
    );
  }

  const activeSectionData = interviewData.sections.find(
    (s) => s.id === activeSection
  );

  const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case "communication":
        return MessageCircle;
      case "presentation":
        return UserCheck;
      case "questions":
        return Lightbulb;
      case "research":
        return Briefcase;
      case "technical":
        return CheckCircle;
      case "behavioral":
        return Users;
      default:
        return CheckCircle;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b-4 border-black p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/coaching"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-2 border-black font-bold hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Coaching
            </Link>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-8 h-8 text-orange-400" />
              <h1 className="text-3xl md:text-5xl font-black text-black">
                {interviewData.title}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              {interviewData.description}
            </p>
          </div>
        </div>
      </header>

      {/* Section Navigation */}
      <section className="bg-gray-50 border-b-4 border-black p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {interviewData.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 border-2 border-black font-bold transition-colors ${
                  activeSection === section.id
                    ? "bg-orange-400 text-black"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Section Content */}
      {activeSectionData && (
        <main className="p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-black text-black mb-8 text-center">
              {activeSectionData.title}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {activeSectionData.tips.map((tip, index) => {
                const IconComponent = getIconForCategory(tip.category);
                return (
                  <div
                    key={index}
                    className="bg-white border-4 border-black p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-orange-400 border-2 border-black p-2">
                        <IconComponent className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                          {tip.category}
                        </span>
                        <h3 className="text-lg font-black text-black">
                          {tip.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {tip.description}
                    </p>

                    <div className="space-y-2">
                      {tip.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {/* Interview Types Section */}
      <section className="bg-gray-50 border-t-4 border-black p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black text-black mb-6 text-center">
            INTERVIEW FORMATS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-4 border-black p-6">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-orange-400" />
                <h3 className="text-lg font-black text-black">
                  Phone/Video Interview
                </h3>
              </div>
              <p className="text-gray-700 mb-3">
                Initial screening or remote interview
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Test technology beforehand
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Choose quiet, well-lit location
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Maintain eye contact with camera
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white border-4 border-black p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-orange-400" />
                <h3 className="text-lg font-black text-black">
                  Panel Interview
                </h3>
              </div>
              <p className="text-gray-700 mb-3">
                Interview with multiple interviewers
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Address all panel members
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Ask for names and roles at beginning
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Thank each panel member at end
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="bg-red-50 border-t-4 border-black p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-black mb-6 text-center flex items-center justify-center gap-2">
            <XCircle className="w-6 h-6 text-red-500" />
            COMMON MISTAKES TO AVOID
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviewData.commonMistakes.map((mistake, index) => (
              <div key={index} className="bg-white border-2 border-red-300 p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{mistake}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Follow-up Tips */}
      <section className="bg-green-50 border-t-4 border-black p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-black mb-6 text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            POST-INTERVIEW FOLLOW-UP
          </h2>
          <div className="space-y-4">
            {interviewData.followUp.map((tip, index) => (
              <div
                key={index}
                className="bg-white border-2 border-green-300 p-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            NEED HELP WITH YOUR RESUME?
          </h2>
          <p className="text-lg mb-6 text-gray-300">
            A great resume gets you the interview. Learn how to create one that
            stands out.
          </p>
          <Link
            to="/coaching/resume-guidelines"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-400 text-black border-2 border-orange-400 font-bold hover:bg-orange-500 transition-colors"
          >
            Resume Guidelines
          </Link>
        </div>
      </section>
    </div>
  );
}
