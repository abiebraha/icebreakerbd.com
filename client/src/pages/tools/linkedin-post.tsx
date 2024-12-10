import { useRef } from "react";
import { BaseFormData } from "@/components/tools/AIToolForm";
import AIToolForm from "@/components/tools/AIToolForm";

export default function LinkedInPostGenerator() {
  const lastGeneratedContent = useRef<string>("");

  const handleSubmit = async (data: BaseFormData) => {
    try {
      const response = await fetch("/api/tools/generate-linkedin-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context: data.context,
          customInstructions: data.customInstructions,
          email: data.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate LinkedIn post");
      }

      const result = await response.json();
      lastGeneratedContent.current = result.content;
    } catch (error) {
      console.error("Error generating LinkedIn post:", error);
      throw error;
    }
  };

  return (
    <AIToolForm
      onSubmit={handleSubmit}
      title={
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="text-slate-900">LinkedIn Post</span>
          <br />
          <span className="text-[#0066CC]">Generator</span>
        </h1>
      }
      description="Create engaging LinkedIn posts with AI-powered content generation"
      contextLabel="Post Topic"
      contextPlaceholder="Describe the topic, key message, or story you want to share"
      instructionsPlaceholder="Add specific instructions for post style, tone, hashtags, or call-to-action preferences..."
    />
  );
}
