"use client"

import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react"
import { ContactModal } from "@/components/contact-modal"

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-purple-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <div className="space-y-2 text-white/90">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+15855637747" className="hover:text-white transition-colors">
                  (585) 563-7747
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:rhr@rhrroc.org" className="hover:text-white transition-colors">
                  rhr@rhrroc.org
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <a
                  href="https://maps.google.com/?q=228+South+Plymouth+Rochester+NY+14608"
                  target="_blank"
                  className="hover:text-white transition-colors"
                  rel="noreferrer"
                >
                  228 South Plymouth
                  <br />
                  Rochester, NY 14608
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection("impact")}
                className="block text-left text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("programs")}
                className="block text-left text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Programs
              </button>
              <button
                onClick={() => scrollToSection("volunteer")}
                className="block text-left text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Volunteer
              </button>
              <ContactModal>
                <button className="block text-left text-white/90 hover:text-white transition-colors cursor-pointer">
                  Contact
                </button>
              </ContactModal>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Get Involved</h3>
            <div className="space-y-2">
              <a
                href="https://www.zeffy.com/en-US/donation-form/donate-to-refugees-helping-refugees"
                className="block text-white/90 hover:text-white transition-colors cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate
              </a>
              <button
                onClick={() => scrollToSection("volunteer")}
                className="block text-left text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Volunteer
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="space-y-3">
              <a
                href="https://www.facebook.com/RefugeesHelpingRefugees/"
                target="_blank"
                className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors cursor-pointer"
                rel="noreferrer"
              >
                <Facebook size={20} />
                <span>@RefugeesHelpingRefugees</span>
              </a>
              <a
                href="https://www.instagram.com/refugeeshelpingrefugees/"
                target="_blank"
                className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors cursor-pointer"
                rel="noreferrer"
              >
                <Instagram size={20} />
                <span>@refugeeshelpingrefugees</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/90">
          <p>&copy; 2025 Refugees Helping Refugees. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
