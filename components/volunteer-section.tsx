import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function VolunteerSection() {
  return (
    <section id="volunteer" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="/images/refugee-portraits-hq.jpeg"
              alt="Diverse group of refugees showing dignity and humanity"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance text-purple-900">Join Our Volunteer Community</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Refugees Helping Refugees is a largely volunteer-run organization. Because RHR is a nonprofit and receives
              limited funding from grants for operational and programming costs, the organization is able to offer few
              paid positions.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              This makes the need for proactive, empowered, and passionate volunteers essential to our survival. Our
              volunteers are reliable and innovative, and seek to make a positive difference in the refugee and
              Rochester community.
            </p>
            <Button size="lg" asChild className="bg-purple-700 hover:bg-purple-800 text-white">
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSe6YQgyUgzJf319oM_PUYlNNKlHOQbIDWtBHbdhkDUAbLzIyg/viewform"
                target="_blank"
              >
                Sign Up to Volunteer
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
