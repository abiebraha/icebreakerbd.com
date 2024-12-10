import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function LinkedInPostGenerator() {
  const [context, setContext] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [email, setEmail] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [alternativeHooks, setAlternativeHooks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/tools/generate-linkedin-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context, customInstructions, email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to generate content");
      }

      // Parse the response to separate main post and alternative hooks
      const content = data.content;
      const parts = content.split('\n\nALTERNATIVE HOOKS:');
      
      if (parts.length === 2) {
        const mainPost = parts[0].replace('MAIN POST:\n', '').trim();
        const hooks = parts[1]
          .split('\n')
          .filter((line: string) => line.trim().match(/^\d+\./))
          .map((line: string) => line.replace(/^\d+\.\s*/, '').trim());
        
        setGeneratedContent(mainPost);
        setAlternativeHooks(hooks);
      } else {
        setGeneratedContent(content);
        setAlternativeHooks([]);
      }

      toast({
        title: "Success!",
        description: "Your LinkedIn post has been generated with alternative hooks.",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-slate-900">LinkedIn Post</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">Generator</span>
            </h1>
            <p className="text-xl text-slate-600">
              Create engaging LinkedIn content that drives engagement and establishes thought leadership.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="context" className="text-sm font-medium text-slate-900">
                Context
              </label>
              <Textarea
                id="context"
                name="context"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Describe the topic, key message, and target audience..."
                required
                className="min-h-[8rem] w-full resize-y"
              />
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
                placeholder="Any specific content style, tone preferences, or hashtag requirements..."
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
              className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate LinkedIn Post"}
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
                Generated LinkedIn Post
              </h2>
              <div className="whitespace-pre-wrap text-slate-600">
                {generatedContent}
              </div>

              {alternativeHooks.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Alternative Hooks
                  </h3>
                  <div className="space-y-3">
                    {alternativeHooks.map((hook, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-slate-50 rounded-md border border-slate-200"
                      >
                        {hook}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
