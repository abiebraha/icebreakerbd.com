import { useRef } from "react";
import { BaseFormData } from "@/components/tools/AIToolForm";
import AIToolForm from "@/components/tools/AIToolForm";

export default function ColdEmailGenerator() {
  const lastGeneratedContent = useRef<string>("");

  const handleSubmit = async (data: BaseFormData) => {
    try {
      const response = await fetch("/api/tools/generate-cold-email", {
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
        throw new Error("Failed to generate cold email");
      }

      const result = await response.json();
      lastGeneratedContent.current = result.content;
    } catch (error) {
      console.error("Error generating cold email:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <AIToolForm
          onSubmit={handleSubmit}
          title={
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-slate-900">Cold Email</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">Generator</span>
            </h1>
          }
          description="Generate personalized cold emails with custom instructions and web-enriched content"
          contextLabel="Prospect Information"
          contextPlaceholder="Enter information about your prospect (company name, target person, industry, pain points, etc.)"
          instructionsPlaceholder="Add specific instructions for email tone, style, or any particular points you want to emphasize..."
        />
      </div>
    </div>
  );
}
