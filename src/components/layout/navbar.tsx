"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/shared";
import { useState } from "react";
import {
  ListIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { personalInfo, navigation } from "@/lib/data/content";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading font-bold text-lg text-greek-marble bg-clip-text"
        >
          {personalInfo.name}
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <TransitionLink
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors hover:text-accent-green rounded-lg",
                  pathname === item.href
                    ? "bg-secondary-gold text-greek-olive"
                    : "text-accent-green hover:bg-secondary-gold/5 hover:border hover:border-secondary-gold hover:text-secondary-gold",
                )}
              >
                {item.name}
              </TransitionLink>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <ListIcon className="size-5" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-6 pt-8">
              <nav>
                <ul className="flex flex-col gap-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <TransitionLink
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-4 py-2 text-sm font-medium transition-colors hover:bg-muted rounded-md ",
                          pathname === item.href
                            ? "bg-secondary-gold text-greek-olive"
                            : "text-accent-green hover:bg-secondary-gold/5 hover:border hover:border-secondary-gold hover:text-secondary-gold",
                        )}
                      >
                        {item.name}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex gap-4 px-4">
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent-green transition-colors"
                >
                  <LinkedinLogoIcon className="size-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent-gold transition-colors"
                >
                  <GithubLogoIcon className="size-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
