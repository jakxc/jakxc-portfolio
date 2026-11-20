import GameBoy from "@/components/Gameboy";
import Footer from "@/components/Footer";

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GameBoy>{children}</GameBoy>
      <Footer />
    </>
  )
}