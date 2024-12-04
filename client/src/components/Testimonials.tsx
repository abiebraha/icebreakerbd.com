import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Sales Director",
    company: "TechCorp Inc.",
    content: "The two-step approach helped us build a high-performing sales team from scratch. Our conversion rates have increased by 150% since implementation.",
    avatar: "/testimonials/sarah.jpg"
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "GrowthMasters",
    content: "The sales system setup was exactly what we needed. It streamlined our processes and gave us the foundation to scale effectively.",
    avatar: "/testimonials/michael.jpg"
  },
  {
    name: "Emma Davis",
    role: "Sales Operations Manager",
    company: "ScaleUp Solutions",
    content: "The fractional sales management has been a game-changer. We got enterprise-level expertise without the enterprise-level cost.",
    avatar: "/testimonials/emma.jpg"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-slate-600">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
