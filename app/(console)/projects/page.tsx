import type { Metadata } from "next";
import ProjectsScreen from "@/components/screens/ProjectsScreen";

export const metadata: Metadata = { title: "Pokédex — Jack Chen" };

export default function ProjectsPage() {
  return <ProjectsScreen />;
}