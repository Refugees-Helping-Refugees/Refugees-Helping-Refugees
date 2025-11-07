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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
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
              className="text-gray-700 hover:text-purple-600 transition-colors cursor-pointer font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className="text-gray-700 hover:text-purple-600 transition-colors cursor-pointer font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("programs")}
              className="text-gray-700 hover:text-purple-600 transition-colors cursor-pointer font-medium"
            >
              Programs
            </button>
            <button
              onClick={() => scrollToSection("volunteer")}
              className="text-gray-700 hover:text-purple-600 transition-colors cursor-pointer font-medium"
            >
              Volunteer
            </button>
            <ContactModal>
              <button className="text-gray-700 hover:text-purple-600 transition-colors cursor-pointer font-medium">
                Contact
              </button>
            </ContactModal>
          </nav>
          <Button asChild className="bg-purple-700 hover:bg-purple-800 text-white">
            <a href="/donations/donate-to-rhr/">Donate Now</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
