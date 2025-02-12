import Hero from "@/components/front/Home/Hero"
import Navbar from "@/components/front/Home/Navbar"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
    </main>
  )
}

