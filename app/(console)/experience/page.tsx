import type { Metadata } from "next";
import Experience from "@/components/screens/ExperienceScreen";

export const metadata: Metadata = {
  title: "Our Story — Jack Chen",
};

export default function ExperiencePage() {
  return <Experience />;
}
