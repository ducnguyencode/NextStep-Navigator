import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  MapPin,
  DollarSign,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface StudyAbroadData {
  title: string;
  description: string;
  sections: Array<{
    id: string;
    title: string;
    steps: Array<{
      step: string;
      description: string;
      details: string[];
    }>;
  }>;
  scholarships: Array<{
    name: string;
    country: string;
    description: string;
    coverage: string;
  }>;
  tips: string[];
}

export default function StudyAbroadPage() {
  const [studyAbroadData, setStudyAbroadData] =
    useState<StudyAbroadData | null>(null);
  const [activeSection, setActiveSection] = useState<string>("planning");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/study-abroad.json");
        const data = await response.json();
        setStudyAbroadData(data);
      } catch (error) {
        console.error("Error loading study abroad data:", error);
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
          <p className="text-lg font-bold">
            Loading Study Abroad Guidelines...
          </p>
        </div>
      </div>
    );
  }

  if (!studyAbroadData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-bold">Failed to load study abroad data</p>
        </div>
      </div>
    );
  }

  const activeSectionData = studyAbroadData.sections.find(
    (s) => s.id === activeSection
  );

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
              <Globe className="w-8 h-8 text-orange-400" />
              <h1 className="text-3xl md:text-5xl font-black text-black">
                {studyAbroadData.title}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              {studyAbroadData.description}
            </p>
          </div>
        </div>
      </header>

      {/* Section Navigation */}
      <section className="bg-gray-50 border-b-4 border-black p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {studyAbroadData.sections.map((section) => (
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

            <div className="space-y-8">
              {activeSectionData.steps.map((step, index) => (
                <div key={index} className="bg-white border-4 border-black p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-400 border-2 border-black w-10 h-10 flex items-center justify-center font-black text-black flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-black mb-3">
                        {step.step}
                      </h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <div
                            key={detailIndex}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Scholarships Section */}
      <section className="bg-gray-50 border-t-4 border-black p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black text-black mb-6 text-center flex items-center justify-center gap-2">
            <Award className="w-6 h-6 text-orange-400" />
            POPULAR SCHOLARSHIPS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyAbroadData.scholarships.map((scholarship, index) => (
              <div key={index} className="bg-white border-4 border-black p-6">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-black text-black">
                      {scholarship.name}
                    </h3>
                    <p className="text-sm font-bold text-gray-600">
                      {scholarship.country}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{scholarship.description}</p>
                <div className="bg-green-100 border-2 border-green-300 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-bold text-green-800">Coverage:</span>
                  </div>
                  <p className="text-green-700">{scholarship.coverage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-orange-400 border-t-4 border-black p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-black mb-6 text-center flex items-center justify-center gap-2">
            <Clock className="w-6 h-6" />
            EXPERT TIPS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyAbroadData.tips.map((tip, index) => (
              <div key={index} className="bg-white border-2 border-black p-4">
                <p className="text-gray-800 font-medium">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            READY TO START YOUR JOURNEY?
          </h2>
          <p className="text-lg mb-6 text-gray-300">
            Connect with our counselors for personalized guidance on your study
            abroad plans.
          </p>
          <Link
            to="/feedback"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-400 text-black border-2 border-orange-400 font-bold hover:bg-orange-500 transition-colors"
          >
            Get Counseling Support
          </Link>
        </div>
      </section>
    </div>
  );
}
