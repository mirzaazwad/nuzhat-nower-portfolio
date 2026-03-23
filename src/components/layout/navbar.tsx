"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X, LinkedinLogo, GithubLogo } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { personalInfo, navigation } from "@/lib/data/content";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading font-bold text-lg bg-linear-to-r from-accent-green via-accent-gold to-accent-copper bg-clip-text text-transparent"
        >
          {personalInfo.name}
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors hover:text-accent-green",
                  pathname === item.href
                    ? "text-accent-green"
                    : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden">
            <Button variant="ghost" size="icon-sm">
              <List className="size-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-6 pt-8">
              <nav>
                <ul className="flex flex-col gap-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-4 py-2 text-sm font-medium transition-colors hover:bg-muted rounded-md",
                          pathname === item.href
                            ? "bg-muted text-accent-green"
                            : "text-muted-foreground",
                        )}
                      >
                        {item.name}
                      </Link>
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
                  <LinkedinLogo className="size-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent-gold transition-colors"
                >
                  <GithubLogo className="size-5" />
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
