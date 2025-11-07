import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function ImpactSection() {
  const stats = [
    { number: "500+", label: "Refugees Served" },
    { number: "15+", label: "Years of Service" },
    { number: "100+", label: "Active Volunteers" },
    { number: "3", label: "Core Programs" },
  ]

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="relative rounded-lg overflow-hidden mb-16">
          <Image
            src="/images/refugee-children-banner.png"
            alt="Three smiling refugee children representing the community RHR serves"
            width={1200}
            height={400}
            className="w-full h-64 lg:h-80 object-cover"
          />
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Making a Difference</h2>
          <p className="text-xl text-foreground/80 text-pretty max-w-2xl mx-auto">
            Through community support and dedicated programs, we're helping refugees build new lives in Western New
            York.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-card">
              <CardContent className="pt-6">
                <div className=className="relative bg-purple-50 py-20">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
