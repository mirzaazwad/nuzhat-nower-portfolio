"use client";
import {
  LinkedinLogoIcon,
  GithubLogoIcon,
  EnvelopeIcon,
} from "@phosphor-icons/react";
import { personalInfo } from "@/lib/data/content";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {personalInfo.name} | All Rights Reserved
          </p>
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent-green transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinLogoIcon className="size-5" />
            </a>
            <a
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent-gold transition-colors"
              aria-label="GitHub"
            >
              <GithubLogoIcon className="size-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-muted-foreground hover:text-accent-copper transition-colors"
              aria-label="Email"
            >
              <EnvelopeIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
