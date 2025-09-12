import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function FeedbackPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setShowSuccessModal(false);
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-foreground bg-card">
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

            {/* Navigation */}
            <nav className="flex gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0">
              <Button
                onClick={() => (window.location.href = "/")}
                variant="outline"
                className="brutalist-shadow-sm font-bold border-2 bg-transparent whitespace-nowrap text-sm md:text-base hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                ← Home
              </Button>
              <Button
                variant="outline"
                className="brutalist-shadow-sm font-bold border-2 bg-transparent whitespace-nowrap text-sm md:text-base"
              >
                About Us
              </Button>
              <Button
                variant="outline"
                className="brutalist-shadow-sm font-bold border-2 bg-transparent whitespace-nowrap text-sm md:text-base"
              >
                Contact Us
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 md:py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4 animate-bounce-in text-balance">
              FEEDBACK
            </h1>
            <p className="text-lg md:text-xl text-accent font-bold animate-slide-up">
              We'd love to hear from you! Share your thoughts and help us
              improve.
            </p>
          </div>

          {/* Feedback Form */}
          <Card className="p-6 md:p-8 brutalist-shadow border-4 border-foreground animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-base md:text-lg font-bold text-foreground"
                >
                  Your Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-2 border-foreground text-base md:text-lg p-3 md:p-4 font-semibold focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-base md:text-lg font-bold text-foreground"
                >
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-2 border-foreground text-base md:text-lg p-3 md:p-4 font-semibold focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-base md:text-lg font-bold text-foreground"
                >
                  Your Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us what you think about Career Passport. What features do you love? What could we improve? Your feedback helps us build a better platform for everyone."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="border-2 border-foreground text-base md:text-lg p-3 md:p-4 font-semibold min-h-32 md:min-h-40 resize-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              {/* Character Count */}
              <div className="text-right">
                <span className="text-sm text-muted-foreground font-semibold">
                  {formData.message.length} characters
                </span>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full text-lg md:text-xl font-black py-4 md:py-6 brutalist-shadow border-4 border-foreground bg-accent hover:bg-accent/90 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "SENDING..." : "SEND FEEDBACK"}
              </Button>
            </form>

            {/* Form Info */}
            <div className="mt-6 p-4 bg-secondary border-2 border-foreground brutalist-shadow-sm">
              <p className="text-sm md:text-base font-semibold text-muted-foreground text-center">
                💡 Your feedback is valuable to us! We read every message and
                use your suggestions to make Career Passport better for
                everyone.
              </p>
            </div>
          </Card>
        </div>
      </main>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="border-4 border-foreground brutalist-shadow bg-card max-w-md mx-auto">
          <DialogHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center brutalist-shadow-sm">
                <CheckCircle className="w-8 h-8 text-accent-foreground" />
              </div>
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-black text-foreground">
              THANK YOU!
            </DialogTitle>
            <DialogDescription className="text-base md:text-lg font-semibold text-muted-foreground">
              Your feedback has been received successfully. We appreciate you
              taking the time to help us improve Career Passport!
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-6">
            <Button
              onClick={resetForm}
              className="w-full font-bold py-3 brutalist-shadow-sm border-2 border-foreground bg-accent hover:bg-accent/90"
            >
              Send Another Feedback
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="w-full font-bold py-3 brutalist-shadow-sm border-2 border-foreground bg-transparent hover:bg-secondary"
            >
              Back to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 md:py-12 px-4 border-t-4 border-foreground mt-16">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-background text-foreground flex items-center justify-center font-black">
              CP
            </div>
            <span className="font-black">CAREER PASSPORT</span>
          </div>
          <p className="text-sm font-semibold mb-4">
            Your guided path from student to professional.
          </p>
          <p className="text-xs md:text-sm font-semibold">
            © 2024 Career Passport. All rights reserved. Built with passion for
            your success.
          </p>
        </div>
      </footer>
    </div>
  );
}
