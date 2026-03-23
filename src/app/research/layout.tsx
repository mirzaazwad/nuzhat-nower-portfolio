import { ApplicationLayoutProps } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research | Nuzhat Nower",
  description: "Academic publications and research work by Nuzhat Nower.",
};

export default function ResearchLayout({ children }: ApplicationLayoutProps) {
  return <>{children}</>;
}
