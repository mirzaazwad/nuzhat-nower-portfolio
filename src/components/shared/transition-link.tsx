"use client";

import Link from "next/link";
import { useTransition } from "./transition-context";
import { ComponentProps } from "react";

export function TransitionLink({ href, children, onClick, ...props }: ComponentProps<typeof Link>) {
  const { startTransition } = useTransition();

  const handleTransitionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only intercept standard clicks (not cmd+click or middle click)
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      startTransition(href.toString());
      onClick?.(e);
    }
  };

  return (
    <Link href={href} onClick={handleTransitionClick} {...props}>
      {children}
    </Link>
  );
}
