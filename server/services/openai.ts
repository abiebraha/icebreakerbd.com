import OpenAI from "openai";
import sgMail from "@sendgrid/mail";
import fetch from "node-fetch";

// Initialize OpenAI and SendGrid clients
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY environment variable is not set');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const CHAT_MODEL = "gpt-4o";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

async function analyzeURLContent(url: string): Promise<string> {
  try {
    // Add user agent to avoid blocking
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const content = await response.text();
    
    const analysis = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: [
        {
          role: "system",
          content: `Analyze the webpage content and extract key information following these rules:

For LinkedIn profiles:
- Focus on recent achievements, interests, and activities that can be mentioned naturally
- Look for non-work interests or volunteer work
- Note any shared connections or experiences

For company websites:
- Identify main solutions/products that solve specific problems
- Find unique value propositions
- Look for customer pain points they address
- Note any recent news or achievements

Provide a concise, natural-sounding summary that can be used in casual conversation.`
        },
        {
          role: "user",
          content: `URL: ${url}\n\nContent: ${content}`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(analysis.choices[0].message.content);
    return result.analysis || '';
  } catch (error) {
    console.error('URL analysis error:', error);
    return `Failed to analyze URL: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

export async function handleColdEmailSession(
  messages: ChatMessage[], 
  linkedinUrl?: string, 
  websiteUrl?: string,
  userEmail?: string
) {
  try {
    // Analyze URLs if provided
    let linkedinAnalysis = '';
    let websiteAnalysis = '';
    
    if (linkedinUrl) {
      linkedinAnalysis = await analyzeURLContent(linkedinUrl);
      console.log('LinkedIn analysis completed:', linkedinAnalysis);
    }
    
    if (websiteUrl) {
      websiteAnalysis = await analyzeURLContent(websiteUrl);
      console.log('Website analysis completed:', websiteAnalysis);
    }

    // Add URL analysis and template instructions to the conversation
    const enhancedMessages = [
      ...messages,
      {
        role: "system" as const,
        content: `Generate a cold email using this exact template and information from the URL analysis:

Template:
{Highlight a solution found on the sellers website, keep it to one sentence maximum}. {Derisk the offer in a maximum 3 words}.

{Very soft CTA}?

P.S. {Use their LinkedIn profile or other information to highlight something not related to the pitch that shows personal interest}.

URL Analysis Results:
LinkedIn Profile Analysis: ${linkedinAnalysis}
Company Website Analysis: ${websiteAnalysis}

Requirements:
- Subject line must be lowercase and maximum 4 words
- Keep the tone professional but conversational
- Use neutral language when discussing pain points
- Maintain plain text format without bullet points
- Include specific details from the LinkedIn profile for personalization
- Focus on clear, straightforward messages`
      }
    ];

    // Generate the cold email using GPT-4o
    const response = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: enhancedMessages,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const assistantResponse = response.choices[0].message.content;
    console.log('Generated email:', assistantResponse);

    // Send email notification if email is provided
    if (userEmail) {
      const emailContent = {
        to: process.env.ADMIN_EMAIL || 'your-email@example.com',
        from: 'notifications@yourdomain.com',
        subject: 'New Cold Email Generation Session',
        text: `
New cold email generation session with ${userEmail}

LinkedIn URL: ${linkedinUrl || 'Not provided'}
Website URL: ${websiteUrl || 'Not provided'}

URL Analysis:
LinkedIn: ${linkedinAnalysis}
Website: ${websiteAnalysis}

Chat History:
${messages.map(msg => `${msg.role.toUpperCase()}: ${msg.content}`).join('\n\n')}

Generated Email:
${assistantResponse}
        `,
      };

      await sgMail.send(emailContent);
    }

    return {
      success: true,
      message: assistantResponse,
    };
  } catch (error) {
    console.error('Chat session error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function handleChatSession(messages: ChatMessage[], userEmail?: string) {
  try {
    // Get response from OpenAI
    const response = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: messages,
      temperature: 0.7,
    });

    const assistantResponse = response.choices[0].message.content;

    // Send email notification if email is provided
    if (userEmail) {
      const emailContent = {
        to: process.env.ADMIN_EMAIL || 'your-email@example.com',
        from: 'notifications@yourdomain.com',
        subject: 'New Chat Session Summary',
        text: `
New chat session with ${userEmail}

Chat History:
${messages.map(msg => `${msg.role.toUpperCase()}: ${msg.content}`).join('\n\n')}

Latest Assistant Response:
${assistantResponse}
        `,
      };

      await sgMail.send(emailContent);
    }

    return {
      success: true,
      message: assistantResponse,
    };
  } catch (error) {
    console.error('Chat session error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
