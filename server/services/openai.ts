import OpenAI from "openai";
import sgMail from "@sendgrid/mail";

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
