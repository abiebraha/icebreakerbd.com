import type { Express } from "express";
import sgMail from '@sendgrid/mail';
import { handleChatSession } from './services/openai';

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
  // Chat endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, type, linkedinUrl, websiteUrl, email } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid request format - messages array required'
        });
      }

      let result;
      if (type === 'cold_email') {
        result = await handleColdEmailSession(messages, linkedinUrl, websiteUrl, email);
      } else {
        result = await handleChatSession(messages, email);
      }
      
      res.json(result);
    } catch (error) {
      console.error('Chat endpoint error:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    }
  });
}
