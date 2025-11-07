"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  
  return (
    <section id="hero" className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
              Empowering Refugees Through Community
            </h1>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              Refugees Helping Refugees (RHR) serves refugees of Western New York, fostering growth, self-determination,
              and self-reliance by making them agents of their own advancement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("programs")}
                className="bg-primary hover:bg-primary/90 cursor-pointer"
              >
                Learn More
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/donations/donate-to-rhr/">Donate Now</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RHR%20Photo-g7KwG0bUZj6HR0fcazSkicnfKsjcFw.jpeg"
              alt="Refugees learning together in a classroom setting"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
