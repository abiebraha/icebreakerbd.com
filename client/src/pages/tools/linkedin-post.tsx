import { useRef } from "react";
import { BaseFormData } from "@/components/tools/AIToolForm";
import AIToolForm from "@/components/tools/AIToolForm";

export default function LinkedInPostGenerator() {
  const lastGeneratedContent = useRef<string>("");

  const handleSubmit = async (data: BaseFormData) => {
    try {
      console.log('Submitting LinkedIn post generation request:', {
        contextLength: data.context?.length,
        hasCustomInstructions: !!data.customInstructions,
        hasEmail: !!data.email
      });

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

      console.log('Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error details:', {
          status: response.status,
          text: errorText
        });
        throw new Error(`Failed to generate LinkedIn post: ${errorText}`);
      }

      const responseText = await response.text();
      console.log('Response text received:', {
        length: responseText.length,
        preview: responseText.substring(0, 100)
      });

      let result;
      try {
        result = JSON.parse(responseText);
        console.log('Parsed JSON result:', {
          success: result.success,
          hasContent: !!result.content,
          contentLength: result.content?.length
        });
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        console.error('Raw response text:', responseText);
        throw new Error('Invalid JSON response from server');
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to generate LinkedIn post');
      }

      lastGeneratedContent.current = result.content;
      console.log('Content saved successfully');
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
