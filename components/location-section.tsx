"use client"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/contact-modal"

export function LocationSection() {
  return (
    <section className="py-16 bg-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">Visit Us</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Find us in the heart of Rochester, NY. We're here to serve our community and welcome visitors.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200">
              <h3 className="text-xl font-semibold mb-4 text-purple-900">Our Location</h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start space-x-3">
                  <span className="font-medium text-purple-900">Address:</span>
                  <span>228 South Plymouth, Rochester, NY 14608</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="font-medium text-purple-900">Phone:</span>
                  <a href="tel:+15855637747" className="hover:text-purple-600 transition-colors">
                    (585) 563-7747
                  </a>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="font-medium text-purple-900">Email:</span>
                  <a href="mailto:rhr@rhrroc.org" className="hover:text-purple-600 transition-colors">
                    rhr@rhrroc.org
                  </a>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1 bg-white border-purple-300 text-purple-900 hover:bg-purple-50 cursor-pointer"
                  onClick={() =>
                    window.open("https://maps.google.com/?q=228+South+Plymouth+Ave,+Rochester,+NY+14608", "_blank")
                  }
                >
                  Open in Maps
                </Button>
                <ContactModal>
                  <Button variant="outline" className="flex-1 bg-white border-purple-300 text-purple-900 hover:bg-purple-50 cursor-pointer">
                    Contact Us
                  </Button>
                </ContactModal>
              </div>
            </div>
          </div>
          <div className="h-96 rounded-lg overflow-hidden shadow-sm border border-purple-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2914.8234567890123!2d-77.6109!3d43.1547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d6b3c4d5e6f7a8%3A0x1234567890abcdef!2s228%20South%20Plymouth%20Ave%2C%20Rochester%2C%20NY%2014608!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Refugees Helping Refugees Location"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
