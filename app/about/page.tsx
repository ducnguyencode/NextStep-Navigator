import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AboutUs() {
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
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="brutalist-shadow-sm font-bold border-2 bg-transparent"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-4 md:mb-6 animate-bounce-in text-balance">
            ABOUT US
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-accent font-bold mb-8 md:mb-12 animate-slide-up">
            Empowering careers, one journey at a time
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-8 md:py-16 px-4 bg-secondary">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                OUR MISSION
              </h2>
              <p className="text-base md:text-lg font-semibold text-muted-foreground leading-relaxed mb-6">
                Career Passport is dedicated to bridging the gap between
                education and professional success. We believe every individual
                deserves personalized guidance to navigate their unique career
                journey, whether they're a high school student exploring
                possibilities, a graduate entering the workforce, or a
                professional seeking new directions.
              </p>
              <p className="text-base md:text-lg font-semibold text-muted-foreground leading-relaxed">
                Our platform combines cutting-edge technology with human
                expertise to provide comprehensive career development resources,
                interactive tools, and personalized recommendations that adapt
                to each user's goals and aspirations.
              </p>
            </div>
            <Card className="p-6 md:p-8 brutalist-shadow border-4 border-foreground bg-accent">
              <div className="text-center">
                <div className="text-6xl md:text-8xl font-black text-accent-foreground mb-4">
                  🎯
                </div>
                <h3 className="text-xl md:text-2xl font-black text-accent-foreground mb-4">
                  GUIDING YOUR SUCCESS
                </h3>
                <p className="text-sm md:text-base font-bold text-accent-foreground/90">
                  From student to professional, we're with you every step of the
                  way
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-8 md:mb-12">
            OUR VALUES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: "🎓",
                title: "EDUCATION FIRST",
                description:
                  "We believe in the power of continuous learning and skill development",
              },
              {
                icon: "🤝",
                title: "PERSONALIZED SUPPORT",
                description:
                  "Every career journey is unique, and our guidance reflects that individuality",
              },
              {
                icon: "💡",
                title: "INNOVATION",
                description:
                  "We leverage technology to create engaging and effective career development tools",
              },
              {
                icon: "🌟",
                title: "EXCELLENCE",
                description:
                  "We strive for the highest quality in everything we do for our users",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="p-6 brutalist-shadow border-4 border-foreground bg-card text-center animate-slide-up hover:scale-105 transition-all duration-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-black text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-sm font-semibold text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Story Section */}
      <section className="py-8 md:py-16 px-4 bg-secondary">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-8 md:mb-12">
              OUR STORY
            </h2>

            <Card className="p-6 md:p-8 brutalist-shadow border-4 border-foreground">
              <div className="space-y-6">
                <p className="text-base md:text-lg font-semibold text-muted-foreground leading-relaxed">
                  Founded in 2020 by a team of educators, career counselors, and
                  technology experts, Career Passport emerged from a simple
                  observation: traditional career guidance wasn't keeping pace
                  with the rapidly evolving job market.
                </p>

                <p className="text-base md:text-lg font-semibold text-muted-foreground leading-relaxed">
                  Our founders, having witnessed countless students and
                  professionals struggle to navigate career decisions without
                  adequate support, envisioned a platform that would democratize
                  access to high-quality career guidance. They wanted to create
                  something that would be available 24/7, personalized to
                  individual needs, and constantly updated with the latest
                  industry insights.
                </p>

                <p className="text-base md:text-lg font-semibold text-muted-foreground leading-relaxed">
                  Today, Career Passport serves thousands of users across
                  different career stages, providing them with the tools,
                  resources, and guidance they need to make informed decisions
                  about their professional futures. We're proud to be part of
                  their success stories.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-8 md:mb-12">
            OUR IMPACT
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { number: "10K+", label: "USERS GUIDED" },
              { number: "500+", label: "CAREER PATHS" },
              { number: "95%", label: "SUCCESS RATE" },
              { number: "24/7", label: "SUPPORT" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="p-4 md:p-6 brutalist-shadow border-4 border-foreground bg-accent text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-2xl md:text-4xl font-black text-accent-foreground mb-2">
                  {stat.number}
                </div>
                <p className="text-xs md:text-sm font-bold text-accent-foreground/90">
                  {stat.label}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 md:py-16 px-4 bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-8 md:mb-12">
            LEADERSHIP TEAM
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "CEO & Founder",
                bio: "Former university career counselor with 15+ years of experience in student development",
                expertise: "Career Development, Educational Psychology",
              },
              {
                name: "Michael Chen",
                role: "CTO & Co-Founder",
                bio: "Tech industry veteran who transitioned from software engineering to education technology",
                expertise: "EdTech, AI/ML, Platform Development",
              },
              {
                name: "Emily Rodriguez",
                role: "Head of Content",
                bio: "Career coach and content strategist specializing in professional development resources",
                expertise:
                  "Content Strategy, Career Coaching, Industry Research",
              },
            ].map((member, index) => (
              <Card
                key={index}
                className="p-6 brutalist-shadow border-4 border-foreground bg-card animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-accent brutalist-shadow-sm mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-black text-accent-foreground">
                      👤
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-bold text-accent mb-3">
                    {member.role}
                  </p>
                </div>
                <p className="text-xs font-semibold text-muted-foreground leading-relaxed mb-3">
                  {member.bio}
                </p>
                <div className="text-xs font-bold text-accent">
                  Expertise: {member.expertise}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-2xl mx-auto p-6 md:p-8 brutalist-shadow border-4 border-foreground bg-accent">
            <h2 className="text-2xl md:text-3xl font-black text-accent-foreground mb-4">
              READY TO START YOUR JOURNEY?
            </h2>
            <p className="text-sm md:text-base font-bold text-accent-foreground/90 mb-6">
              Join thousands of users who have transformed their careers with
              Career Passport
            </p>
            <Button
              onClick={() => (window.location.href = "/")}
              className="text-lg font-black py-4 px-8 brutalist-shadow border-4 border-foreground bg-background text-foreground hover:bg-secondary hover:scale-105 transition-all duration-200"
            >
              GET STARTED TODAY
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
