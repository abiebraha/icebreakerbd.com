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

export function ColdCallGenerator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'Welcome! I\'ll help you create effective cold calling scripts. Please provide details about your target prospect and key talking points.'
    }
  ]);
  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');
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
      content: `Generate a cold calling script with the following context: ${input}`
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
          type: 'cold_call'
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
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your target prospect, product/service benefits, and key objection handling points..."
            disabled={loading}
            className="flex-1 min-h-[100px]"
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            {loading ? 'Generating...' : 'Generate Call Script'}
          </Button>
        </form>
      </div>
    </Card>
  );
}
