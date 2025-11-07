import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProgramsSection() {
  const programs = [
    {
      title: "ESOL Classes",
      description: "Three levels of English for speakers of other languages taught by certified ESOL teachers",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rhr-pics-1-300x200-F0RA5pK5rO09F3YyNZb9gsyEA277xo.jpeg",
      alt: "Students learning English in a classroom",
    },
    {
      title: "Case Management",
      description:
        "A dynamic process that promotes advocacy, communication and referrals between clients, organizations, and governmental agencies",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rhr-pic-2-240x300-4O2Xw3Ia8sK6mTXRuIRkBpaqrKu9ue.jpeg",
      alt: "Case manager helping a client with paperwork",
    }
  ]

  return (
    <section id="programs" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Our Programs</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            We offer a variety of programs that ensure our clients are able to achieve sustainability as new Americans.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="bg-card hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <Image src={program.image || "/placeholder.svg"} alt={program.alt} fill  className="relative bg-purple-50 py-20 />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{program.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{program.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
