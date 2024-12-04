import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingCardProps {
  step: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  perSdr?: boolean;
}

export default function PricingCard({
  step,
  title,
  price,
  description,
  features,
  ctaText,
  perSdr = false,
}: PricingCardProps) {
  return (
    <Card className="w-full transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
            {step}
          </span>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </div>
        <div className="mb-4">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-slate-600 ml-1">/month{perSdr ? " per SDR" : ""}</span>
        </div>
        <p className="text-slate-600">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full" size="lg">
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
}
