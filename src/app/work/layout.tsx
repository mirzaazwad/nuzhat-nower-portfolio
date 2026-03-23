import { ApplicationLayoutProps } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | Nuzhat Nower",
  description:
    "Explore the projects and work of Nuzhat Nower - Project Manager and former developer.",
};

export default function WorkLayout({ children }: ApplicationLayoutProps) {
  return <>{children}</>;
}
