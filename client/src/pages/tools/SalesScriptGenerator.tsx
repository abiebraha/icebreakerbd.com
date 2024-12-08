import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function SalesScriptGenerator() {
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
      const response = await fetch("/api/tools/generate-sales-script", {
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
        description: "Your sales script has been generated. Check your email for the transcript.",
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
    <div className="min-h-screen bg-white">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Sales Script Generator
            </h1>
            <p className="text-xl text-slate-600">
              Create effective sales scripts that convert prospects into customers.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="website-url" className="text-sm font-medium text-slate-900">
                Website URL
              </label>
              <Input
                type="url"
                id="website-url"
                name="website-url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="Enter website URL (e.g., example.com or www.example.com)..."
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="product-description" className="text-sm font-medium text-slate-900">
                Product Description
              </label>
              <Textarea
                id="product-description"
                name="product-description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Describe the product/service, target customers, and key pain points it solves..."
                className="min-h-[8rem] w-full resize-y"
              />
              <p className="text-sm text-slate-500">
                Provide either a website URL or product description
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="custom-instructions" className="text-sm font-medium text-slate-900">
                Custom Instructions
              </label>
              <Textarea
                id="custom-instructions"
                name="custom-instructions"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Add seller's full name, preferred meeting days/times, and any specific instructions for the script..."
                className="min-h-[6rem] w-full resize-y"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-900">
                Email (optional)
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to receive the generated content..."
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#123e74] hover:bg-[#1a4e8f]"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Sales Script"}
            </Button>
          </form>

          {generatedContent && (
            <motion.div
              className="mt-8 p-6 bg-white rounded-lg border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Generated Sales Script
              </h2>
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
