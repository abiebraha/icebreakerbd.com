import { useRef } from "react";
import { BaseFormData } from "@/components/tools/AIToolForm";
import AIToolForm from "@/components/tools/AIToolForm";

export default function SalesScriptGenerator() {
  const lastGeneratedContent = useRef<string>("");

  const handleSubmit = async (data: BaseFormData) => {
    try {
      const response = await fetch("/api/tools/generate-sales-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          websiteUrl: data.context,
          productDescription: data.context,
          customInstructions: data.customInstructions,
          email: data.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate sales script");
      }

      const text = await response.text();
      const result = JSON.parse(text);
      if (!result.success) {
        throw new Error(result.error || 'Failed to generate sales script');
      }
      lastGeneratedContent.current = result.content;
    } catch (error) {
      console.error("Error generating sales script:", error);
      throw error;
    }
  };

  return (
    <AIToolForm
      onSubmit={handleSubmit}
      title={
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="text-slate-900">Sales Script</span>
          <br />
          <span className="text-[#0066CC]">Generator</span>
        </h1>
      }
      description="Create effective sales scripts tailored to your specific needs with AI assistance"
      contextLabel="Sales Scenario"
      contextPlaceholder="Describe your product/service, target audience, and specific sales situation"
      instructionsPlaceholder="Add specific instructions for script structure, key points to cover, or preferred closing techniques..."
    />
  );
}
