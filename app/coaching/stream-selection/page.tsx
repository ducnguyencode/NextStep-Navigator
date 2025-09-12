import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Users,
  GraduationCap,
} from "lucide-react";

interface StreamData {
  title: string;
  description: string;
  sections: Array<{
    id: string;
    title: string;
    description: string;
    subjects: string[];
    careerPaths: string[];
    eligibility: string;
    pros: string[];
    cons: string[];
  }>;
  decisionFactors: Array<{
    factor: string;
    description: string;
  }>;
  tips: string[];
}

export default function StreamSelectionPage() {
  const [streamData, setStreamData] = useState<StreamData | null>(null);
  const [selectedStream, setSelectedStream] = useState<string>("science");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/stream-selection.json");
        const data = await response.json();
        setStreamData(data);
      } catch (error) {
        console.error("Error loading stream selection data:", error);
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
          <p className="text-lg font-bold">Loading Stream Selection Guide...</p>
        </div>
      </div>
    );
  }

  if (!streamData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-bold">
            Failed to load stream selection data
          </p>
        </div>
      </div>
    );
  }

  const selectedStreamData = streamData.sections.find(
    (s) => s.id === selectedStream
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
              <GraduationCap className="w-8 h-8 text-orange-400" />
              <h1 className="text-3xl md:text-5xl font-black text-black">
                {streamData.title}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              {streamData.description}
            </p>
          </div>
        </div>
      </header>

      {/* Stream Selection Tabs */}
      <section className="bg-gray-50 border-b-4 border-black p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {streamData.sections.map((stream) => (
              <button
                key={stream.id}
                onClick={() => setSelectedStream(stream.id)}
                className={`px-6 py-3 border-2 border-black font-bold transition-colors ${
                  selectedStream === stream.id
                    ? "bg-orange-400 text-black"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {stream.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Stream Details */}
      {selectedStreamData && (
        <main className="p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Stream Overview */}
            <div className="bg-white border-4 border-black p-6 mb-8">
              <h2 className="text-2xl font-black text-black mb-4">
                {selectedStreamData.title}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {selectedStreamData.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subjects */}
                <div>
                  <h3 className="text-xl font-black text-black mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-orange-400" />
                    Core Subjects
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStreamData.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 border border-blue-300 font-bold text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Eligibility */}
                <div>
                  <h3 className="text-xl font-black text-black mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-400" />
                    Eligibility
                  </h3>
                  <p className="text-gray-700 bg-gray-50 border-2 border-gray-300 p-3">
                    {selectedStreamData.eligibility}
                  </p>
                </div>
              </div>
            </div>

            {/* Career Paths */}
            <div className="bg-white border-4 border-black p-6 mb-8">
              <h3 className="text-xl font-black text-black mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                Career Opportunities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedStreamData.careerPaths.map((career, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border-2 border-gray-300 p-4 hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-bold text-gray-800">{career}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Pros */}
              <div className="bg-white border-4 border-black p-6">
                <h3 className="text-xl font-black text-black mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Advantages
                </h3>
                <ul className="space-y-3">
                  {selectedStreamData.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-white border-4 border-black p-6">
                <h3 className="text-xl font-black text-black mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Challenges
                </h3>
                <ul className="space-y-3">
                  {selectedStreamData.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Decision Factors */}
      <section className="bg-gray-50 border-t-4 border-black p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black text-black mb-6 text-center">
            KEY DECISION FACTORS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streamData.decisionFactors.map((factor, index) => (
              <div key={index} className="bg-white border-4 border-black p-6">
                <h3 className="text-lg font-black text-black mb-3">
                  {factor.factor}
                </h3>
                <p className="text-gray-700">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-orange-400 border-t-4 border-black p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-black mb-6 text-center flex items-center justify-center gap-2">
            <Lightbulb className="w-6 h-6" />
            EXPERT TIPS
          </h2>
          <div className="space-y-4">
            {streamData.tips.map((tip, index) => (
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
            STILL CONFUSED ABOUT YOUR CHOICE?
          </h2>
          <p className="text-lg mb-6 text-gray-300">
            Take our Interest-Based Quiz to discover streams that match your
            personality and interests.
          </p>
          <Link
            to="/interest-quiz"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-400 text-black border-2 border-orange-400 font-bold hover:bg-orange-500 transition-colors"
          >
            Take Interest Quiz
          </Link>
        </div>
      </section>
    </div>
  );
}
