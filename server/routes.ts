import type { Express } from "express";

export function registerRoutes(app: Express) {
  app.post('/api/contact', (req, res) => {
    try {
      const { name, email, company, teamSize, improvementArea, additionalInfo } = req.body;
      
      // Validate required fields
      if (!name || !email || !company || !teamSize || !improvementArea) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      // Log the submission for now
      console.log('Contact form submission:', {
        name,
        email,
        company,
        teamSize,
        improvementArea,
        additionalInfo
      });
      
      res.status(200).json({ 
        success: true, 
        message: 'Message received successfully' 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to process contact form submission' 
      });
    }
  });
}
