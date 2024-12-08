import type { Express } from "express";
import sgMail from '@sendgrid/mail';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function sendEmailTranscript(to: string, toolName: string, input: any, output: string) {
  const msg = {
    to,
    from: 'info@icebreakerbd.com',
    subject: `Your ${toolName} Generation Results`,
    text: `
Here are your ${toolName} results:

Input:
${JSON.stringify(input, null, 2)}

Generated Content:
${output}
    `,
    html: `
      <h2>Your ${toolName} Results</h2>
      <h3>Input:</h3>
      <pre>${JSON.stringify(input, null, 2)}</pre>
      <h3>Generated Content:</h3>
      <div>${output.replace(/\n/g, '<br/>')}</div>
    `,
  };

  await sgMail.send(msg);
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

      // Log the submission
      console.log('Contact form submission:', {
        name,
        email,
        company,
        teamSize,
        improvementArea,
        additionalInfo
      });

      // Send email notification if SendGrid is configured
      if (SENDGRID_API_KEY) {
        try {
          const msg = {
            to: 'info@icebreakerbd.com', // Your email address
            from: 'info@icebreakerbd.com', // Your verified sender
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
            `,
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

  // AI Tool Routes
  app.post('/api/tools/generate-cold-email', async (req, res) => {
    try {
      const { websiteUrl, productDescription, customInstructions, email } = req.body;

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
            content: "You are an expert cold email writer. Write a compelling cold email that is professional, persuasive, and personalized. Focus on the product or service value proposition and create interest in scheduling a meeting."
          },
          {
            role: "user",
            content: `Write a cold email based on the following information:
${websiteUrl ? `\nWebsite URL: ${websiteUrl}` : ''}
${productDescription ? `\nProduct Description: ${productDescription}` : ''}
${customInstructions ? `\nCustom Instructions: ${customInstructions}` : ''}`
          }
        ],
      });

      const generatedContent = completion.choices[0].message.content || '';

      // Send email transcript if we have content and an email
      if (generatedContent && email) {
        await sendEmailTranscript(email, "Cold Email", { context, customInstructions }, generatedContent);
      }

      res.json({ content: generatedContent });
    } catch (error) {
      console.error('Error generating cold email:', error);
      res.status(500).json({ message: 'Failed to generate cold email' });
    }
  });

  app.post('/api/tools/generate-sales-script', async (req, res) => {
    try {
      const { context, customInstructions, email } = req.body;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert sales script writer. Create effective, persuasive sales scripts that convert prospects into customers."
          },
          {
            role: "user",
            content: `Write a sales script with the following context:\n${context}\n\nCustom instructions:\n${customInstructions}`
          }
        ],
      });

      const generatedContent = completion.choices[0].message.content || '';

      // Send email transcript if we have content and an email
      if (generatedContent && email) {
        await sendEmailTranscript(email, "Sales Script", { context, customInstructions }, generatedContent);
      }

      res.json({ content: generatedContent });
    } catch (error) {
      console.error('Error generating sales script:', error);
      res.status(500).json({ message: 'Failed to generate sales script' });
    }
  });

  app.post('/api/tools/generate-linkedin-post', async (req, res) => {
    try {
      const { context, customInstructions, email } = req.body;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert LinkedIn content writer. Create engaging, professional posts that drive engagement and establish thought leadership."
          },
          {
            role: "user",
            content: `Write a LinkedIn post with the following context:\n${context}\n\nCustom instructions:\n${customInstructions}`
          }
        ],
      });

      const generatedContent = completion.choices[0].message.content || '';

      // Send email transcript if we have content and an email
      if (generatedContent && email) {
        await sendEmailTranscript(email, "LinkedIn Post", { context, customInstructions }, generatedContent);
      }

      res.json({ content: generatedContent });
    } catch (error) {
      console.error('Error generating LinkedIn post:', error);
      res.status(500).json({ message: 'Failed to generate LinkedIn post' });
    }
  });
}
