import { ApplicationLayoutProps } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Nuzhat Nower",
  description: "Thoughts, insights, and updates from Nuzhat Nower.",
};

export default function BlogLayout({ children }: ApplicationLayoutProps) {
  return <>{children}</>;
}
