import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { url } from "inspector";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (no actual backend)
    console.log("Contact form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
            CONTACT US
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-accent font-bold mb-8 md:mb-12 animate-slide-up">
            Get in touch with our career guidance team
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-8 md:py-16 px-4 bg-secondary">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Information */}
            <div className="space-y-6 md:space-y-8">
              <Card className="p-6 md:p-8 brutalist-shadow border-4 border-foreground">
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6">
                  GET IN TOUCH
                </h2>

                <div className="space-y-6">
                  {/* Office Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent brutalist-shadow-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-black text-accent-foreground">
                        📍
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-foreground mb-2">
                        Office Address
                      </h3>
                      <p className="text-sm md:text-base font-semibold text-muted-foreground leading-relaxed">
                      35/6 D5 Street , Ward 25
                        <br />
                         Binh Thanh District
                        <br />
                        Ho Chi Minh 72308
                        <br />
                        Vietnam
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent brutalist-shadow-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-black text-accent-foreground">
                        📞
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-foreground mb-2">
                        Phone
                      </h3>
                      <p className="text-sm md:text-base font-semibold text-muted-foreground">
                        +84 (0) 123 456 789
                        <br />
                        +84 (0) 987 654 321
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent brutalist-shadow-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-black text-accent-foreground">
                        ✉️
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-foreground mb-2">
                        Email
                      </h3>
                      <p className="text-sm md:text-base font-semibold text-muted-foreground">
                      huynhducnguyenht@careerpassport.com
                        <br />
                      nhuttran12102000@careerpassport.com
                      </p>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent brutalist-shadow-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-black text-accent-foreground">
                        🕒
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-foreground mb-2">
                        Office Hours
                      </h3>
                      <p className="text-sm md:text-base font-semibold text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Google Maps */}
              <Card className="p-4 md:p-6 brutalist-shadow border-4 border-foreground">
                <h3 className="text-xl md:text-2xl font-black text-foreground mb-4">
                  FIND US ON MAP
                </h3>
                <div className="w-full h-64 md:h-80 bg-muted border-2 border-foreground brutalist-shadow-sm overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4868.2078431769605!2d106.71161967591799!3d10.806685889343976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ed00409f09%3A0x11f7708a5c77d777!2zQXB0ZWNoIENvbXB1dGVyIEVkdWNhdGlvbiAtIEjhu4cgVGjhu5FuZyDEkMOgbyB04bqhbyBM4bqtcCBUcsOsbmggVmnDqm4gUXXhu5FjIHThur8gQXB0ZWNo!5e1!3m2!1sen!2sus!4v1757684440313!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Career Passport Office Location"
                  ></iframe>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="p-6 md:p-8 brutalist-shadow border-4 border-foreground">
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6">
                  SEND MESSAGE
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-base font-bold text-foreground"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border-2 border-foreground text-base p-3 font-semibold"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-base font-bold text-foreground"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-2 border-foreground text-base p-3 font-semibold"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-base font-bold text-foreground"
                    >
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="border-2 border-foreground text-base p-3 font-semibold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-base font-bold text-foreground"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="border-2 border-foreground text-base p-3 font-semibold min-h-32 resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-lg font-black py-4 brutalist-shadow border-4 border-foreground bg-accent hover:bg-accent/90 hover:scale-105 transition-all duration-200"
                  >
                    SEND MESSAGE
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-8 md:mb-12">
            MEET OUR TEAM
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "DR.Chen",
                role: "Career Development Director",
                email: "huynhducnguyenht@careerpassport.com",
                phone: "+84 123 456 789",
                image: "dist/images/photo-1507003211169-0a1dd7228f2d.jpg",
              },
              {
                name: "Mr.Smith",
                role: "Career Counsellor",
                email: "KhangNguyen@careerpassport.com",
                phone: "+84 123 456 854",
                image: "dist/images/photo-1472099645785-5658abf4ff4e.jpg",
              },
              {
                name: "Mr.Patten",
                role: "Professional Development Coach",
                email: "apten@careerpassport.com",
                phone: "+84 123 445 789",
                image:"dist/images/photo-1580489944761-15a19d654956.jpg",
              },
              {
                name: "Mr.khan",
                role: "Career Counsellor",
                email: "KhoaNguyen@careerpassport.com",
                phone: "+84 123 456 789",
                image: "dist/images/photo-1500648767791-00dcc994a43e.jpg",
              },
            ].map((member, index) => (
              <Card
                key={index}
                className="p-6 brutalist-shadow border-4 border-foreground bg-card text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                 <div className="w-20 h-20 bg-accent brutalist-shadow sm:mx-auto mb-4 flex items-center justify-center rounded-full overflow-hidden">
        
        
{member.image ? (
            <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover" 
            />
        ) : (
           
            <span className="text-2xl font-black text-accent-foreground">👤</span>
        )}
        
    </div>

    <h3 className="text-lg font-black text-foreground mb-2">
        {member.name}
    </h3>
    <p className="text-sm font-bold text-accent mb-4">
        {member.role}
    </p>
    <div className="space-y-2 text-xs font-semibold text-muted-foreground">
        <p>{member.email}</p>
        <p>{member.phone}</p>
    </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
