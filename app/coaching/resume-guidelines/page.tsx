import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Layout,
  Type,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Award,
} from "lucide-react";

interface ResumeData {
  title: string;
  description: string;
  sections: Array<{
    id: string;
    title: string;
    components?: Array<{
      section: string;
      description: string;
      elements: string[];
      tips: string[];
    }>;
    rules?: Array<{
      aspect: string;
      guideline: string;
      details: string[];
    }>;
    tips?: Array<{
      category: string;
      title: string;
      examples: string[];
    }>;
    formats?: Array<{
      type: string;
      description: string;
      bestFor: string[];
      pros: string[];
    }>;
  }>;
  commonMistakes: string[];
  checklist: string[];
}

export default function ResumeGuidelinesPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [activeSection, setActiveSection] = useState<string>("structure");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/resume-guidelines.json");
        const data = await response.json();
        setResumeData(data);
      } catch (error) {
        console.error("Error loading resume guidelines data:", error);
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
          <p className="text-lg font-bold">Loading Resume Guidelines...</p>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-bold">
            Failed to load resume guidelines data
          </p>
        </div>
      </div>
    );
  }

  const activeSectionData = resumeData.sections.find(
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
              <FileText className="w-8 h-8 text-orange-400" />
              <h1 className="text-3xl md:text-5xl font-black text-black">
                {resumeData.title}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              {resumeData.description}
            </p>
          </div>
        </div>
      </header>

      {/* Section Navigation */}
      <section className="bg-gray-50 border-b-4 border-black p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {resumeData.sections.map((section) => (
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

            {/* Resume Structure Components */}
            {activeSectionData.components && (
              <div className="space-y-8">
                {activeSectionData.components.map((component, index) => (
                  <div
                    key={index}
                    className="bg-white border-4 border-black p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-orange-400 border-2 border-black w-8 h-8 flex items-center justify-center font-black text-black text-sm">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-black text-black">
                        {component.section}
                      </h3>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {component.description}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-black text-black mb-3">
                          Key Elements:
                        </h4>
                        <ul className="space-y-2">
                          {component.elements.map((element, elemIndex) => (
                            <li
                              key={elemIndex}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">
                                {element}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-black text-black mb-3">
                          Pro Tips:
                        </h4>
                        <ul className="space-y-2">
                          {component.tips.map((tip, tipIndex) => (
                            <li
                              key={tipIndex}
                              className="flex items-start gap-2"
                            >
                              <Award className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">
                                {tip}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Formatting Rules */}
            {activeSectionData.rules && (
              <div className="space-y-6">
                {activeSectionData.rules.map((rule, index) => (
                  <div
                    key={index}
                    className="bg-white border-4 border-black p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Layout className="w-6 h-6 text-orange-400" />
                      <div>
                        <h3 className="text-lg font-black text-black">
                          {rule.aspect}
                        </h3>
                        <p className="text-gray-600 font-bold">
                          {rule.guideline}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {rule.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Content Tips */}
            {activeSectionData.tips && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeSectionData.tips.map((tip, index) => (
                  <div
                    key={index}
                    className="bg-white border-4 border-black p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Type className="w-6 h-6 text-orange-400" />
                      <h3 className="text-lg font-black text-black">
                        {tip.title}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {tip.examples.map((example, exampleIndex) => (
                        <div
                          key={exampleIndex}
                          className="bg-gray-50 border-2 border-gray-300 p-3"
                        >
                          <span className="text-gray-800 font-medium">
                            {example}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Resume Types */}
            {activeSectionData.formats && (
              <div className="space-y-6">
                {activeSectionData.formats.map((format, index) => (
                  <div
                    key={index}
                    className="bg-white border-4 border-black p-6"
                  >
                    <h3 className="text-xl font-black text-black mb-3">
                      {format.type}
                    </h3>
                    <p className="text-gray-700 mb-4">{format.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-black text-black mb-3">
                          Best For:
                        </h4>
                        <ul className="space-y-2">
                          {format.bestFor.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-black text-black mb-3">
                          Advantages:
                        </h4>
                        <ul className="space-y-2">
                          {format.pros.map((pro, proIndex) => (
                            <li
                              key={proIndex}
                              className="flex items-start gap-2"
                            >
                              <Award className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">
                                {pro}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      {/* Common Mistakes */}
      <section className="bg-red-50 border-t-4 border-black p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-black mb-6 text-center flex items-center justify-center gap-2">
            <XCircle className="w-6 h-6 text-red-500" />
            COMMON RESUME MISTAKES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.commonMistakes.map((mistake, index) => (
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

      {/* Resume Checklist */}
      <section className="bg-green-50 border-t-4 border-black p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-black mb-6 text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            FINAL CHECKLIST
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.checklist.map((item, index) => (
              <div
                key={index}
                className="bg-white border-2 border-green-300 p-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{item}</span>
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
            READY FOR THE INTERVIEW?
          </h2>
          <p className="text-lg mb-6 text-gray-300">
            Your resume got you noticed. Now ace the interview with our
            comprehensive tips.
          </p>
          <Link
            to="/coaching/interview-tips"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-400 text-black border-2 border-orange-400 font-bold hover:bg-orange-500 transition-colors"
          >
            Interview Tips
          </Link>
        </div>
      </section>
    </div>
  );
}
