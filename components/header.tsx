"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/contact-modal"

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="bg-purple-900 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RHR%20Logo%20found%20on%20efrain%20computer.jpg-HgCZ04ffdUJByIxSppUQsKpPszGbGx.jpeg"
              alt="Refugees Helping Refugees Logo"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("programs")}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Programs
            </button>
            <button
              onClick={() => scrollToSection("volunteer")}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Volunteer
            </button>
            <ContactModal>
              <button className="text-foreground hover:text-primary transition-colors cursor-pointer">
                Contact
              </button>
            </ContactModal>
          </nav>

          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href="/donations/donate-to-rhr/">Donate Now</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
