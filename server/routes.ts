import type { Express } from "express";
import sgMail from '@sendgrid/mail';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Store the custom instructions for each generator globally
const customInstructions = {
  linkedin: '',
  salesScript: '',
  coldEmail: ''
};

function normalizeUrl(url: string): string {
  if (!url) return url;
  
  // Remove whitespace
  url = url.trim();
  
  // Add https:// if no protocol is specified
  if (!url.match(/^https?:\/\//i)) {
    url = 'https://' + url;
  }
  
  // Remove trailing slash
  return url.replace(/\/$/, '');
}

async function sendEmailTranscript(to: string | null, toolName: string, input: any, output: string) {
  try {
    // Always send to info@icebreakerbd.com
    const messages = [];
    
    // Internal copy
    messages.push({
      to: 'info@icebreakerbd.com',
      from: {
        email: 'info@icebreakerbd.com',
        name: 'IceBreaker AI Tools'
      },
      subject: `New ${toolName} Generation Submission`,
      text: `
Hello!

Here are your ${toolName} generation results from IceBreaker AI Tools.

Input Details:
${Object.entries(input)
  .filter(([key, value]) => value)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Generated Content:
${output}

Thank you for using IceBreaker AI Tools!
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #123e74;">Your ${toolName} Results</h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Input Details:</h3>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${Object.entries(input)
                .filter(([key, value]) => value)
                .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
                .join('')}
            </div>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Generated Content:</h3>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
              ${output.replace(/\n/g, '<br/>')}
            </div>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Thank you for using IceBreaker AI Tools!
          </p>
        </div>
      `
    });

    // Send all messages
    await Promise.all(messages.map(msg => sgMail.send(msg)));
    console.log('Email transcripts sent successfully');
  } catch (error) {
    console.error('Error sending email transcript:', error);
    throw new Error('Failed to send email transcript');
  }
}

export function registerRoutes(app: Express) {
  // Initialize SendGrid with API key if available
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  if (SENDGRID_API_KEY) {
    sgMail.setApiKey(SENDGRID_API_KEY);
  }

  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, company, teamSize, improvementArea, additionalInfo } = req.body;
      
      // Validate required fields
      if (!name || !email || !company || !teamSize || !improvementArea) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      // Send email notification if SendGrid is configured
      if (SENDGRID_API_KEY) {
        try {
          const msg = {
            to: 'info@icebreakerbd.com',
            from: {
              email: 'info@icebreakerbd.com',
              name: 'IceBreaker AI Tools'
            },
            subject: 'New Contact Form Submission',
            text: `
New contact form submission received:

Name: ${name}
Email: ${email}
Company: ${company}
Team Size: ${teamSize}
Area for Improvement: ${improvementArea}
Additional Information: ${additionalInfo || 'None provided'}
            `,
            html: `
<h2>New Contact Form Submission</h2>
<p>You have received a new contact form submission with the following details:</p>
<ul>
  <li><strong>Name:</strong> ${name}</li>
  <li><strong>Email:</strong> ${email}</li>
  <li><strong>Company:</strong> ${company}</li>
  <li><strong>Team Size:</strong> ${teamSize}</li>
  <li><strong>Area for Improvement:</strong> ${improvementArea}</li>
  <li><strong>Additional Information:</strong> ${additionalInfo || 'None provided'}</li>
</ul>
            `
          };

          await sgMail.send(msg);
          console.log('Email notification sent successfully');
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
          // Don't fail the request if email fails
        }
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Message received successfully' 
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to process contact form submission' 
      });
    }
  });

  app.post('/api/tools/generate-cold-email', async (req, res) => {
    try {
      const { websiteUrl: rawWebsiteUrl, productDescription, customInstructions: newInstructions, email } = req.body;
      
      // Update stored custom instructions if provided
      if (newInstructions) {
        customInstructions.coldEmail = newInstructions;
      }
      
      // Use stored instructions if no custom ones provided
      const finalInstructions = newInstructions || customInstructions.coldEmail;
      const websiteUrl = rawWebsiteUrl ? normalizeUrl(rawWebsiteUrl) : '';

      if (!websiteUrl && !productDescription) {
        return res.status(400).json({ 
          success: false,
          error: 'Please provide either a website URL or product description' 
        });
      }

      const contextInfo = productDescription || 'No specific product description provided';
      console.log('Generating cold email with context:', { contextInfo, hasCustomInstructions: !!finalInstructions });

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert cold email writer specializing in creating highly personalized, context-aware messages. Create an email based on the provided context and these requirements:

1. Format Requirements:
- Maximum 75 words
- Plain text format only
- Write at a 10-year-old reading level
- Subject line: maximum 4 words, lowercase
- Structure:
  "{First Name} - Quick question about {Main topic from context}

  {One key insight or observation from the provided context}. {One specific value proposition}.

  {Question based on their specific situation}?

  P.S. {Friendly, contextual closing note}"

2. Key Guidelines:
- Focus entirely on the provided context/description
- Be genuinely curious about their specific situation
- Use their language and terminology
- Keep it conversational and friendly
- Avoid assumptions about their problems
- Make every word count
- Personalize based on the information given

3. Content Rules:
- Draw insights directly from the provided context
- Don't mention generic problems or solutions
- Focus on their specific industry/situation
- Use their own terms and concepts
- Make connections to their actual business
- Stay relevant to their context

${finalInstructions ? `\nCustom Instructions:\n${finalInstructions}` : ''}`
          },
          {
            role: "user",
            content: `Generate a cold email using this context:
${websiteUrl ? `\nWebsite: ${websiteUrl}` : ''}
${contextInfo}`
          }
        ]
      });

      const generatedContent = completion.choices[0].message.content || '';

      // Send email transcript
      try {
        await sendEmailTranscript(email, "Cold Email", { websiteUrl, productDescription, customInstructions: newInstructions }, generatedContent);
      } catch (emailError) {
        console.error('Error sending email transcript:', emailError);
        // Continue with the response even if email fails
      }

      // Set proper headers and send response
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({
        success: true,
        content: generatedContent
      });
    } catch (error) {
      console.error('Error generating cold email:', error);
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate cold email'
      });
    }
  });

  app.post('/api/tools/generate-sales-script', async (req, res) => {
    try {
      const { websiteUrl: rawWebsiteUrl, productDescription, customInstructions: newInstructions, email } = req.body;
      
      // Update stored custom instructions if provided
      if (newInstructions) {
        customInstructions.salesScript = newInstructions;
      }
      
      // Use stored instructions if no custom ones provided
      const finalInstructions = newInstructions || customInstructions.salesScript;
      const websiteUrl = rawWebsiteUrl ? normalizeUrl(rawWebsiteUrl) : '';

      if (!websiteUrl && !productDescription) {
        return res.status(400).json({ 
          message: 'Please provide either a website URL or product description' 
        });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert sales script writer. Create super natural, conversational sales scripts that sound exactly like a friend calling a friend. Follow these exact instructions:

1. Format Requirements:
- Use exactly this structure:
  "Hi [NAME]?

  Yeah its [SELLER FULL NAME]. Are you the person to talk to about {PRODUCT CATEGORY THAT IS BEING SOLD - KEEP THIS LANGUAGE VERRRRY CASUAL AND FRIENDLY AND GENERAL AND HIGH LEVEL} or is that someone else? 

  Reason for the call, we support a lot of {TARGET CUSTOMER TEAMS OR COMPANIES} and we always hear the same issue, {VERY SPECIFIC PAIN POINT THAT THE TARGET MARKET FOR THIS PRODUCT HAS}, and that's where we come in. 

  We {INSERT SOLUTION OF PRODUCT BEING SOLD WHICH IS RELEVANT TO THE PAIN POINT MENTIONED - KEEP CONCISE TO ONE PHRASE}

  How are you guys currently {GETTING OVER THE PAIN POINT MENTIONED}? 

  Cool, would it be crazy to get some time on your calendar to discuss?  

  Does [day] at [time] work for you, or is [day] at [time] better?

  Tell me your email, I'll send you a calendar invite."

2. Style Guidelines:
- Write at a 10-year-old reading level - use extremely simple words
- Sound exactly like how you'd talk to a close friend
- Keep everything super casual and natural
- Use the most basic, everyday language possible
- Avoid any hint of corporate or sales language
- Make it feel like a genuine, helpful conversation

3. Content Rules:
- Research web for industry context and pain points
- Attack specific pain points that really matter
- Keep everything extremely relatable and human
- Use brief, natural phrases that flow easily
- Make every question feel natural to answer
- Focus on having a real conversation

4. Advanced Requirements:
- Replace all text in {} with ultra-casual content
- Leave [NAME], [SELLER FULL NAME], [day], and [time] in brackets
- Browse web for deep industry understanding
- Make pain points extremely specific and relevant
- Keep the flow super natural and conversational
- Sound like you're genuinely trying to help a friend

${finalInstructions ? `\nCustom Instructions:\n${finalInstructions}` : ''}`
          },
          {
            role: "user",
            content: `Write a sales script based on the following information:
${websiteUrl ? `\nWebsite URL: ${websiteUrl}` : ''}
${productDescription ? `\nProduct Description: ${productDescription}` : ''}`
          }
        ]
      });

      const generatedContent = completion.choices[0].message.content || '';

      // Send email transcript
      try {
        await sendEmailTranscript(email, "Sales Script", { websiteUrl, productDescription, customInstructions: newInstructions }, generatedContent);
      } catch (emailError) {
        console.error('Error sending email transcript:', emailError);
        // Continue with the response even if email fails
      }

      // Set proper headers and send response
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({
        success: true,
        content: generatedContent
      });
    } catch (error) {
      console.error('Error generating sales script:', error);
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate sales script'
      });
    }
  });

  app.post('/api/tools/generate-linkedin-post', async (req, res) => {
    console.log('LinkedIn post generation request received:', req.body);
    
    try {
      const { context, customInstructions: newInstructions, email } = req.body;
      
      // Update stored custom instructions if provided
      if (newInstructions) {
        customInstructions.linkedin = newInstructions;
        console.log('Updated custom instructions for LinkedIn generator');
      }
      
      // Use stored instructions if no custom ones provided
      const finalInstructions = newInstructions || customInstructions.linkedin;

      if (!context) {
        console.log('Request rejected: Missing context');
        return res.status(400).json({ 
          success: false,
          error: 'Context is required'
        });
      }

      console.log('Calling OpenAI API for LinkedIn post generation');
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert LinkedIn content writer following these exact instructions:

1. Core Writing Rules:
- Write at a 10-year-old reading level - use extremely simple words and short sentences
- Insert ONE LINE OF SPACE between EVERY SINGLE sentence, no exceptions
- Keep total length under 300 words
- NEVER use phrases like "Imagine this" or "picture this"
- Be super genuine, vulnerable, and personal - share real experiences
- Keep language crisp, easy to read, not high vocabulary or generic
- Avoid unnecessary words, jargon, and complex phrases
- No emojis or excessive punctuation

2. Hook Writing Process:
A. Review topic to identify:
- Key insights that resonate with LinkedIn audience
- Value propositions
- Emotional angles
B. Use powerful copywriting techniques:
- Thought-provoking questions
- Bold claims or contrarian statements
- Shocking statistics or little-known facts
- Story loops creating anticipation
- Pattern interrupts
C. Constraints:
- Keep under 250 characters
- Use conversational, everyday English
- Be bold without being inflammatory
- Let words do the work, no fancy formatting
- Focus on genuine curiosity and emotional resonance

3. Content Structure:
{Hook}

{Main content using storytelling and personal experiences to teach lessons}

{Teaching points using arrows (→) as bullet points, max 3}
→ Problem 1
→ Problem 2
→ Problem 3

vs

→ Solution 1
→ Solution 2
→ Solution 3

{Very soft CTA as a natural question people want to answer}

4. Advanced Requirements:
- Research web for relevant topic information
- Attack specific pain points of the target audience
- Make content extremely relatable and human
- Keep paragraphs short and focused
- Use stories that demonstrate lessons learned
- End with thought-provoking questions that naturally invite responses

${finalInstructions ? `\nCustom Instructions:\n${finalInstructions}` : ''}`
          },
          {
            role: "user",
            content: `Generate a LinkedIn post and 8-12 alternative hooks based on the following context:\n${context}\n\nPlease format the response as follows:\n\nMAIN POST:\n[Complete post with current hook]\n\nALTERNATIVE HOOKS:\n1. [Hook option 1]\n2. [Hook option 2]\n... and so on`
          }
        ]
      });

      const generatedContent = completion.choices[0].message.content || '';
      console.log('OpenAI API response received:', { contentLength: generatedContent.length });

      // Send email transcript
      try {
        console.log('Sending email transcript');
        await sendEmailTranscript(email, "LinkedIn Post", { context, customInstructions: newInstructions }, generatedContent);
        console.log('Email transcript sent successfully');
      } catch (emailError) {
        console.error('Error sending email transcript:', emailError);
        // Continue with the response even if email fails
      }

      const response = {
        success: true,
        content: generatedContent
      };
      
      console.log('Sending successful response:', { contentLength: generatedContent.length });
      res.status(200).json(response);
    } catch (error) {
      console.error('Error generating LinkedIn post:', error);
      const errorResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate LinkedIn post'
      };
      console.log('Sending error response:', errorResponse);
      res.status(500).json(errorResponse);
    }
  });
}
