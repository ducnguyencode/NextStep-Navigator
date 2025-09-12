import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  BookOpen,
  Briefcase,
  GraduationCap,
} from "lucide-react";

interface Interest {
  id: string;
  name: string;
  description: string;
}

interface QuizOption {
  text: string;
  weight: Record<string, number>;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

interface Stream {
  name: string;
  description: string;
  careers: string[];
  education: string[];
  skills: string[];
}

interface QuizData {
  questions: QuizQuestion[];
  streams: Record<string, Stream>;
}

interface Answer {
  questionId: number;
  selectedOption: QuizOption;
}

interface StreamScore {
  streamId: string;
  stream: Stream;
  score: number;
  percentage: number;
}

export default function InterestQuizPage() {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<string>("");
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<StreamScore[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInterests = async () => {
      try {
        const response = await fetch("/data/interests.json");
        const data = await response.json();
        setInterests(data.interests);
      } catch (error) {
        console.error("Failed to load interests:", error);
      }
    };
    loadInterests();
  }, []);

  const handleInterestSelect = async (interestId: string) => {
    setSelectedInterest(interestId);
    setLoading(true);

    try {
      const response = await fetch("/data/quiz-questions.json");
      const data = await response.json();

      if (data[interestId]) {
        setQuizData(data[interestId]);
        setCurrentQuestion(0);
        setAnswers([]);
        setSelectedOption(null);
        setShowResults(false);
      }
    } catch (error) {
      console.error("Failed to load quiz data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null || !quizData) return;

    const newAnswer: Answer = {
      questionId: quizData.questions[currentQuestion].id,
      selectedOption:
        quizData.questions[currentQuestion].options[selectedOption],
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      // Calculate recommendations
      calculateRecommendations(updatedAnswers);
    }
  };

  const calculateRecommendations = (allAnswers: Answer[]) => {
    if (!quizData) return;

    const streamScores: Record<string, number> = {};

    // Initialize scores
    Object.keys(quizData.streams).forEach((streamId) => {
      streamScores[streamId] = 0;
    });

    // Calculate scores based on answers
    allAnswers.forEach((answer) => {
      Object.entries(answer.selectedOption.weight).forEach(
        ([streamId, weight]) => {
          if (streamScores.hasOwnProperty(streamId)) {
            streamScores[streamId] += weight;
          }
        }
      );
    });

    // Convert to sorted recommendations
    const maxScore = Math.max(...Object.values(streamScores));
    const sortedRecommendations: StreamScore[] = Object.entries(streamScores)
      .map(([streamId, score]) => ({
        streamId,
        stream: quizData.streams[streamId],
        score,
        percentage: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // Top 3 recommendations

    setRecommendations(sortedRecommendations);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setSelectedInterest("");
    setQuizData(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResults(false);
    setRecommendations([]);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption(null);
    }
  };

  const selectedInterestData = interests.find((i) => i.id === selectedInterest);
  const progress = quizData
    ? ((currentQuestion + (selectedOption !== null ? 1 : 0)) /
        quizData.questions.length) *
      100
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-foreground bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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

            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-black text-accent">
                INTEREST-BASED QUIZ
              </h1>
            </div>

            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="brutalist-shadow-sm font-bold border-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Interest Selection */}
        {!selectedInterest && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 animate-bounce-in">
                DISCOVER YOUR PATH
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-semibold mb-8">
                Choose an interest area to take a personalized quiz and get
                stream recommendations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {interests.map((interest, index) => (
                <Card
                  key={interest.id}
                  onClick={() => handleInterestSelect(interest.id)}
                  className="p-4 md:p-6 brutalist-shadow border-4 border-foreground bg-card hover:scale-105 transition-all duration-200 cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-lg md:text-xl font-black text-foreground text-balance">
                      {interest.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground font-semibold leading-relaxed">
                      {interest.description}
                    </p>
                    <Button className="w-full brutalist-shadow-sm font-bold border-2 border-foreground bg-accent hover:bg-accent/90">
                      Take Quiz
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quiz Section */}
        {selectedInterest && !showResults && quizData && (
          <div className="max-w-3xl mx-auto">
            {/* Quiz Header */}
            <div className="text-center mb-6 md:mb-8">
              <Badge className="mb-4 text-sm md:text-base font-bold bg-accent text-accent-foreground">
                {selectedInterestData?.name}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-black text-foreground mb-4">
                Question {currentQuestion + 1} of {quizData.questions.length}
              </h2>
              <Progress
                value={progress}
                className="w-full h-3 md:h-4 brutalist-shadow-sm"
              />
            </div>

            {/* Question Card */}
            <Card className="p-6 md:p-8 brutalist-shadow border-4 border-foreground bg-card mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8 text-balance">
                {quizData.questions[currentQuestion].question}
              </h3>

              <div className="space-y-3 md:space-y-4">
                {quizData.questions[currentQuestion].options.map(
                  (option, index) => (
                    <div
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`p-4 md:p-6 border-2 border-foreground cursor-pointer transition-all duration-200 ${
                        selectedOption === index
                          ? "bg-accent text-accent-foreground brutalist-shadow"
                          : "bg-secondary hover:bg-secondary/80 brutalist-shadow-sm"
                      }`}
                    >
                      <p className="font-semibold text-sm md:text-base leading-relaxed">
                        {option.text}
                      </p>
                    </div>
                  )
                )}
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="brutalist-shadow-sm font-bold border-2 bg-transparent disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={resetQuiz}
                variant="outline"
                className="brutalist-shadow-sm font-bold border-2 bg-transparent"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Quiz
              </Button>

              <Button
                onClick={handleNext}
                disabled={selectedOption === null}
                className="brutalist-shadow font-bold border-2 border-foreground bg-primary hover:bg-primary/90 disabled:opacity-50"
              >
                {currentQuestion === quizData.questions.length - 1
                  ? "Get Results"
                  : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && recommendations.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <div className="flex justify-center mb-4">
                <Trophy className="w-12 h-12 md:w-16 md:h-16 text-accent" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 animate-bounce-in">
                YOUR RECOMMENDATIONS
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-semibold">
                Based on your answers, here are the best matching streams for
                you
              </p>
            </div>

            <div className="space-y-6 md:space-y-8 mb-8">
              {recommendations.map((rec, index) => (
                <Card
                  key={rec.streamId}
                  className="p-6 md:p-8 brutalist-shadow border-4 border-foreground bg-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Stream Info */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                        <h3 className="text-xl md:text-2xl font-black text-foreground">
                          #{index + 1} {rec.stream.name}
                        </h3>
                        <Badge className="w-fit bg-accent text-accent-foreground font-bold">
                          {rec.percentage}% Match
                        </Badge>
                      </div>

                      <p className="text-sm md:text-base text-muted-foreground font-semibold mb-6 leading-relaxed">
                        {rec.stream.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {/* Careers */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Briefcase className="w-4 h-4 text-accent" />
                            <h4 className="font-bold text-foreground">
                              Career Options
                            </h4>
                          </div>
                          <ul className="space-y-1">
                            {rec.stream.careers
                              .slice(0, 4)
                              .map((career, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm font-semibold text-muted-foreground"
                                >
                                  • {career}
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* Education */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <GraduationCap className="w-4 h-4 text-accent" />
                            <h4 className="font-bold text-foreground">
                              Education Path
                            </h4>
                          </div>
                          <ul className="space-y-1">
                            {rec.stream.education
                              .slice(0, 4)
                              .map((edu, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm font-semibold text-muted-foreground"
                                >
                                  • {edu}
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* Skills */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-4 h-4 text-accent" />
                            <h4 className="font-bold text-foreground">
                              Key Skills
                            </h4>
                          </div>
                          <ul className="space-y-1">
                            {rec.stream.skills.slice(0, 4).map((skill, idx) => (
                              <li
                                key={idx}
                                className="text-sm font-semibold text-muted-foreground"
                              >
                                • {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Match Percentage Visual */}
                    <div className="flex lg:flex-col items-center lg:items-end gap-4">
                      <div className="text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-foreground bg-accent flex items-center justify-center brutalist-shadow-sm">
                          <span className="text-lg md:text-xl font-black text-accent-foreground">
                            {rec.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={resetQuiz}
                variant="outline"
                className="brutalist-shadow-sm font-bold border-2 bg-transparent"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Take Another Quiz
              </Button>

              <Button
                onClick={() => (window.location.href = "/career-bank")}
                className="brutalist-shadow font-bold border-2 border-foreground bg-primary hover:bg-primary/90"
              >
                Explore Career Bank
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-foreground border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg font-bold text-muted-foreground">
              Loading quiz...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
