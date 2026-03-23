"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from "framer-motion";
import {
  EnvelopeIcon,
  MapPinIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
  CheckCircleIcon,
  PaperPlaneTiltIcon,
  PhoneIcon,
} from "@phosphor-icons/react";
import { personalInfo } from "@/lib/data/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Paper plane SVG with fold animation
function PaperPlane({ isAnimating }: { isAnimating: boolean }) {
  return (
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      className="text-accent-green"
      initial={{ scale: 0.8 }}
      animate={isAnimating ? {
        scale: [0.8, 1.2, 0.5],
        x: [0, 200, 400],
        y: [0, -100, -200],
        rotate: [0, 30, 60, 90],
        opacity: [1, 1, 0]
      } : { scale: 0.8 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <motion.path
        d="M10 60 L60 30 L110 60 L60 90 Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M60 30 L60 90"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 2"
      />
      <motion.path
        d="M30 60 L60 45 L90 60"
        fill="currentColor"
        fillOpacity="0.4"
        stroke="currentColor"
        strokeWidth="1"
      />
    </motion.svg>
  );
}

// Animated trail particles
function TrailParticle({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-accent-gold/30"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1, 0], opacity: [0, 0.5, 0] }}
      transition={{ duration: 1, delay, repeat: Infinity }}
    />
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnimating(true);

    // Create mailto link
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;

    // Animate paper plane flying
    controls.start({
      x: [0, 50, 150, 300],
      y: [0, -30, -60, -150],
      rotate: [0, 15, 30, 45],
      scale: [1, 1.1, 0.8, 0.5],
      opacity: [1, 1, 1, 0],
      transition: { duration: 1.5, ease: "easeOut" }
    });

    // Open mailto
    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 500);

    // Show success animation
    setTimeout(() => {
      setIsAnimating(false);
      setIsSent(true);
      controls.start({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-block mb-6"
        >
          <div className="relative w-24 h-24 mx-auto">
            {/* Paper plane with flight animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={isAnimating ? {
                x: [0, 100, 200],
                y: [0, -50, -150],
                rotate: [0, 45, 90],
                scale: [1, 0.8, 0.5],
                opacity: [1, 1, 0]
              } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <motion.div
                className="text-accent-green"
                animate={isAnimating ? {} : {
                  y: [0, -5, 0],
                  rotate: [0, -2, 2, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <PaperPlaneTiltIcon size={48} weight="fill" />
              </motion.div>

              {/* Trail particles during animation */}
              {isAnimating && (
                <>
                  <TrailParticle delay={0} />
                  <TrailParticle delay={0.2} />
                  <TrailParticle delay={0.4} />
                </>
              )}
            </motion.div>

            {/* Success checkmark */}
            <AnimatePresence>
              {isSent && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-accent-green/20 rounded-full"
                    />
                    <CheckCircleIcon size={48} weight="fill" className="text-accent-green relative z-10" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <span className="inline-block text-sm font-medium tracking-wider uppercase text-accent-green mb-4">
          Contact
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          <span className="bg-linear-to-r from-accent-green via-accent-gold to-accent-copper bg-clip-text text-transparent">
            Send a Message
          </span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Write your message, fold it into a paper plane, and send it my way!
        </p>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
        {/* Contact Form - Paper Plane Design */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 relative overflow-hidden">
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-size-[8px_8px]" />
            </div>

            {/* Folded corner effect */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-br from-accent-warm to-accent-gold/30 clip-path-triangle" />

            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-background/50 border-accent-gold/20 focus:border-accent-green"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-background/50 border-accent-gold/20 focus:border-accent-green"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  className="bg-background/50 border-accent-gold/20 focus:border-accent-green"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="bg-background/50 border-accent-gold/20 focus:border-accent-green resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto bg-accent-green hover:bg-accent-emerald group"
                disabled={isAnimating}
              >
                <PaperPlaneTiltIcon className="mr-2 size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                Send Message
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold">Contact Information</h2>

            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent-green/10 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-accent-green/10 group-hover:bg-accent-green/20 transition-colors">
                  <EnvelopeIcon className="size-5 text-accent-green" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{personalInfo.email}</p>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent-gold/10 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-accent-gold/10 group-hover:bg-accent-gold/20 transition-colors">
                  <PhoneIcon className="size-5 text-accent-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{personalInfo.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3 rounded-lg">
                <div className="p-2 rounded-lg bg-accent-copper/10">
                  <MapPinIcon className="size-5 text-accent-copper" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">Connect With Me</h2>
            <div className="flex gap-4">
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-accent-warm/50 hover:bg-accent-green/20 hover:text-accent-green transition-all"
              >
                <LinkedinLogoIcon className="size-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-accent-warm/50 hover:bg-accent-gold/20 hover:text-accent-gold transition-all"
              >
                <GithubLogoIcon className="size-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-3 rounded-lg bg-accent-warm/50 hover:bg-accent-copper/20 hover:text-accent-copper transition-all"
              >
                <EnvelopeIcon className="size-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
