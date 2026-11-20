import type { Metadata } from "next";
import Contact from "@/components/screens/ContactScreen";

export const metadata: Metadata = {
  title: "Visit Us — Jack Chen",
};

export default function ContactPage() {
  return <Contact />;
}
