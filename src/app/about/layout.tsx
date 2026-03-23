import { ApplicationLayoutProps } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Nuzhat Nower",
  description: "More about me, my education, work, and hobbies",
};

export default function AboutLayout({ children }: ApplicationLayoutProps) {
  return <>{children}</>;
}
