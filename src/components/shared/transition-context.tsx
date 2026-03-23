"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined,
);

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}

/**
 * GreekMeander
 *
 * An SVG strip tiled with patternUnits="userSpaceOnUse" so each cell is
 * always exactly 20 × 16 screen-px regardless of viewport width.
 *
 * One tile (20 × 16):
 *
 *   ████████████████████  y 0–2   top border (full width)
 *       ████              y 2–8   left inner wall  (x 4–8)
 *                   ████  y 2–10  right descender  (x 16–20, flush right)
 *       ████████████████  y 8–10  inner horizontal (x 4–20)
 *   ████████████████████  y14–16  bottom border (full width)
 */
function GreekMeander({ id, fillColor }: { id: string; fillColor: string }) {
  return (
    <svg
      width="100%"
      height="16"
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translateY(-50%)",
        pointerEvents: "none",
      }}
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="20"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width="20" height="2" fill={fillColor} />
          <rect x="4" y="2" width="4" height="6" fill={fillColor} />
          <rect x="16" y="2" width="4" height="8" fill={fillColor} />
          <rect x="4" y="8" width="16" height="2" fill={fillColor} />
          <rect x="0" y="14" width="20" height="2" fill={fillColor} />
        </pattern>
      </defs>
      <rect width="100%" height="16" fill={`url(#${id})`} />
    </svg>
  );
}

// ─── Timing constants ────────────────────────────────────────────────────────
const ENTER_DURATION_MS = 600; // scroll unrolls up
const NAV_DELAY_MS = 400; // route push fires this far into the entry
const EXIT_DURATION_MS = 500; // scroll rerolls down
const EXIT_SETTLE_MS = 600; // wait for exit to fully clear before cleanup

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const router = useRouter();
  const rawPath = usePathname();
  const pathname = rawPath || "";
  const overlayRef = useRef<HTMLDivElement>(null);

  /**
   * activeRef mirrors isTransitioning but as a ref.
   *
   * Why: the exit useEffect must NOT list `isTransitioning` in its deps —
   * doing so causes it to fire the instant isTransitioning flips true,
   * immediately cancelling the entry animation before it's visible.
   * A ref lets the exit effect read the current transitioning state without
   * being triggered by it.
   */
  const activeRef = useRef(false);

  // ── Phase 1: UNROLL UP to cover the screen, then navigate ────────────────
  useEffect(() => {
    if (isTransitioning && pendingHref) {
      activeRef.current = true;

      if (overlayRef.current) {
        overlayRef.current.style.transform = "translateY(0%)";
      }

      const timer = setTimeout(() => {
        router.push(pendingHref);
      }, NAV_DELAY_MS);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, pendingHref, router]);

  // ── Phase 2: REROLL DOWN off the bottom, revealing the new page ──────────
  // Intentionally depends ONLY on pathname — not on isTransitioning — so it
  // never fires prematurely when the transition begins.
  useEffect(() => {
    if (!overlayRef.current || !activeRef.current) return;

    overlayRef.current.style.transition = `transform ${EXIT_DURATION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`;
    overlayRef.current.style.transform = "translateY(100%)";

    const timer = setTimeout(() => {
      // Restore entry timing while safely hidden below the viewport
      if (overlayRef.current) {
        overlayRef.current.style.transition = `transform ${ENTER_DURATION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`;
      }
      activeRef.current = false;
      setIsTransitioning(false);
      setPendingHref(null);
    }, EXIT_SETTLE_MS);

    return () => clearTimeout(timer);
  }, [pathname]); // ← pathname ONLY — this is intentional, see comment above

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        startTransition: (href: string) => {
          if (pathname === href) return;
          setPendingHref(href);
          setIsTransitioning(true);
        },
      }}
    >
      {/*
       * ══════════════════════════════════════════════════════════════════
       *  GREEK MYTHOLOGY SCROLL OVERLAY — teal theme (#022a30 / #b6cbce)
       *
       *  At rest / entry start : translateY(100%)  — hidden BELOW viewport
       *  Entry  : translateY(100%)  → translateY(0%)  scroll unrolls UP
       *  Exit   : translateY(0%)   → translateY(100%) scroll rerolls DOWN
       *
       *  Both phases end at translateY(100%) so no position teleport is
       *  ever needed.
       * ══════════════════════════════════════════════════════════════════
       */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-100 pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent              0px,
              transparent             13px,
              rgba(182,203,206,0.035) 13px,
              rgba(182,203,206,0.035) 14px
            ),
            repeating-linear-gradient(
              0deg,
              transparent              0px,
              transparent             29px,
              rgba(182,203,206,0.022) 29px,
              rgba(182,203,206,0.022) 30px
            ),
            radial-gradient(
              ellipse 60% 75% at 50% 50%,
              rgba(182,203,206,0.07) 0%,
              transparent 100%
            ),
            linear-gradient(
              to right,
              rgba(0,0,0,0.28)  0%,
              rgba(0,0,0,0.08)  7%,
              transparent       22%,
              transparent       78%,
              rgba(0,0,0,0.08)  93%,
              rgba(0,0,0,0.28) 100%
            ),
            #033d47
          `,
          transform: "translateY(100%)",
          transition: `transform ${ENTER_DURATION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      >
        {/* ── UMBILICUS — TOP ANCHOR ROD ────────────────────────────────
         *  Thin rod the flat top end of the scroll is attached to.
         *  Arrives first as the scroll rises upward from below.
         */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "22px",
            transform: "translateY(-50%)",
            background: `linear-gradient(
              to bottom,
              rgba(182,203,206,0.55)  0%,
              #6a9ca5                 6%,
              #2e6875                28%,
              #163d48                60%,
              #081e26                85%,
              #020e14               100%
            )`,
            borderRadius: "11px",
            boxShadow:
              "0 -6px 24px rgba(0,0,0,0.70), " +
              "0 -2px 6px  rgba(0,0,0,0.40), " +
              "inset 0 2px 4px rgba(182,203,206,0.18)",
          }}
        >
          <GreekMeander id="gk-anchor" fillColor="rgba(182,203,206,0.45)" />

          {([28, 50] as number[]).flatMap((offset) => [
            <div
              key={`al-${offset}`}
              style={{
                position: "absolute",
                left: offset,
                top: 0,
                width: 7,
                height: "100%",
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.50), rgba(182,203,206,0.22), rgba(0,0,0,0.50))",
                borderRadius: "2px",
              }}
            />,
            <div
              key={`ar-${offset}`}
              style={{
                position: "absolute",
                right: offset,
                top: 0,
                width: 7,
                height: "100%",
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.50), rgba(182,203,206,0.22), rgba(0,0,0,0.50))",
                borderRadius: "2px",
              }}
            />,
          ])}
        </div>

        {/* Shadow cast downward from anchor rod onto the scroll surface */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "60px",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Secondary curl crease */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            transform: "translateY(-56px)",
            background:
              "linear-gradient(to right, transparent 0%, rgba(182,203,206,0.08) 18%, rgba(182,203,206,0.06) 82%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Primary peel crease */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            transform: "translateY(-40px)",
            background:
              "linear-gradient(to right, transparent 0%, rgba(182,203,206,0.18) 12%, rgba(182,203,206,0.12) 88%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Shadow cast upward from the roll onto the scroll surface */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "150px",
            background: `linear-gradient(
              to top,
              rgba(0,0,0,0.55)  0%,
              rgba(0,0,0,0.20) 38%,
              rgba(0,0,0,0.05) 68%,
              transparent      100%
            )`,
            pointerEvents: "none",
          }}
        />

        {/* ── MAIN SCROLL ROLL — BOTTOM LEADING EDGE ────────────────────
         *  The heavy wound cylinder leads as the scroll rises upward.
         *  Centred on the overlay's bottom edge (translateY 50%).
         */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "84px",
            transform: "translateY(50%)",
            background: `linear-gradient(
              to bottom,
              rgba(210, 235, 238, 0.60)  0%,
              #8ab8c0                    4%,
              #4a8a95                   15%,
              #2a6070                   32%,
              #153a45                   55%,
              #082028                   76%,
              #021218                   92%,
              #010810                  100%
            )`,
            borderRadius: "42px",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.85), " +
              "0 6px  18px rgba(0,0,0,0.50), " +
              "inset 0 3px 8px rgba(182,203,206,0.12)",
          }}
        >
          <GreekMeander id="gk-roll" fillColor="rgba(182,203,206,0.55)" />

          {([20, 38, 56] as number[]).flatMap((offset) => [
            <div
              key={`rl-${offset}`}
              style={{
                position: "absolute",
                left: offset,
                top: "12px",
                bottom: "12px",
                width: "6px",
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.60), rgba(182,203,206,0.22), rgba(0,0,0,0.60))",
                borderRadius: "3px",
              }}
            />,
            <div
              key={`rr-${offset}`}
              style={{
                position: "absolute",
                right: offset,
                top: "12px",
                bottom: "12px",
                width: "6px",
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.60), rgba(182,203,206,0.22), rgba(0,0,0,0.60))",
                borderRadius: "3px",
              }}
            />,
          ])}

          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "22px",
              background:
                "linear-gradient(to right, rgba(182,203,206,0.22), transparent)",
              borderRadius: "42px 0 0 42px",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "22px",
              background:
                "linear-gradient(to left, rgba(182,203,206,0.22), transparent)",
              borderRadius: "0 42px 42px 0",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {children}
    </TransitionContext.Provider>
  );
}

export function TransitionLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
