import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function ColdEmailGenerator() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [email, setEmail] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/tools/generate-cold-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          websiteUrl, 
          productDescription,
          customInstructions, 
          email 
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to generate content");
      }

      setGeneratedContent(data.content);
      toast({
        title: "Success!",
        description: "Your cold email has been generated. Check your email for the transcript.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/5 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Cold Email Generator
            </h1>
            <p className="text-xl text-slate-600">
              Create compelling cold emails that convert prospects into meetings.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className={cn("space-y-6", "relative")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Website URL</label>
              <Input
                type="url"
                id="website-url"
                name="website-url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="Enter website URL (e.g., example.com or www.example.com)..."
                className="w-full"
                aria-label="Website URL"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Product Description</label>
              <Textarea
                id="product-description"
                name="product-description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Describe the product/service, including unique value propositions and key benefits..."
                className="min-h-[8rem] w-full resize-y"
                aria-label="Product Description"
              />
              <p className="text-sm text-slate-500">
                Provide either a website URL or product description
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Custom Instructions</label>
              <Textarea
                id="custom-instructions"
                name="custom-instructions"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Add prospect details (name, role, LinkedIn profile) and any specific preferences for tone or approach..."
                className="min-h-[6rem] w-full resize-y"
                aria-label="Custom Instructions"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Email (optional)</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to receive the generated content..."
                className="w-full"
                aria-label="Email Address"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#123e74] hover:bg-[#1a4e8f]"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Cold Email"}
            </Button>
          </motion.form>

          {generatedContent && (
            <motion.div
              className="mt-8 p-6 bg-white rounded-lg border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Generated Cold Email</h2>
              <div className="whitespace-pre-wrap text-slate-600">
                {generatedContent}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
