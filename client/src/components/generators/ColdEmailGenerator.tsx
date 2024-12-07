import { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar } from '../ui/avatar';
import { Textarea } from '../ui/textarea';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function ColdEmailGenerator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: `I'll help you generate personalized cold emails following this exact template:

{Highlight a solution found on the sellers website, keep it to one sentence maximum}. {Derisk the offer in a maximum 3 words}.

{Very soft CTA}?

P.S. {Use their LinkedIn profile or other information to highlight something not related to the pitch that shows personal interest}.

Guidelines:
- Keep subject lines lowercase and max 4 words
- Use professional but conversational tone
- Incorporate personalized LinkedIn details
- Focus on clear, straightforward messages
- Maintain plain text aesthetic
- Review mentioned websites for specific solutions
- Keep language neutral when discussing pain points`
    }
  ]);
  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { 
      role: 'user' as const, 
      content: `Generate a cold email using this information:
LinkedIn Profile: ${linkedinUrl}
Company Website: ${websiteUrl}
Additional Context: ${input}

Remember to follow the exact template structure, keep it conversational but professional, and include specific details from their LinkedIn profile and website.`
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          email: email,
          type: 'cold_email'
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error sending your message.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, i) => (
            message.role !== 'system' && (
              <div
                key={i}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <Avatar className="w-8 h-8">
                  {message.role === 'user' ? '👤' : '🤖'}
                </Avatar>
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            )
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t flex flex-col gap-2">
        {showEmailInput && (
          <div className="flex gap-2 mb-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for notifications (optional)"
              className="flex-1"
            />
            <Button 
              onClick={() => setShowEmailInput(false)}
              variant="outline"
              size="sm"
            >
              Skip
            </Button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="space-y-4">
            <Input
              type="url"
              placeholder="LinkedIn Profile URL of the prospect"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              disabled={loading}
              className="w-full"
            />
            <Input
              type="url"
              placeholder="Company Website URL"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              disabled={loading}
              className="w-full"
            />
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Additional context about the prospect and your offering..."
              disabled={loading}
              className="flex-1 min-h-[100px]"
            />
          </div>
          <Button type="submit" disabled={loading || !input.trim()}>
            {loading ? 'Generating...' : 'Generate Cold Email'}
          </Button>
        </form>
      </div>
    </Card>
  );
}
