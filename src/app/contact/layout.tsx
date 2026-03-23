import { ApplicationLayoutProps } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Nuzhat Nower",
  description: "Contact me if you are interested",
};

export default function ContactLayout({ children }: ApplicationLayoutProps) {
  return <>{children}</>;
}
