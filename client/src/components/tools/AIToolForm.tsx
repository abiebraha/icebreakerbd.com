import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const baseSchema = z.object({
  customInstructions: z.string().min(1, "Custom instructions are required"),
  email: z.string().email("Invalid email address"),
  context: z.string().min(1, "Context is required"),
});

export type BaseFormData = z.infer<typeof baseSchema>;

interface AIToolFormProps {
  onSubmit: (data: BaseFormData) => Promise<void>;
  title: React.ReactNode;
  description: string;
  contextLabel: string;
  contextPlaceholder: string;
  instructionsPlaceholder?: string;
}

type ElementTitle = React.ReactElement<any, string | React.JSXElementConstructor<any>>;

export default function AIToolForm({
  onSubmit,
  title,
  description,
  contextLabel,
  contextPlaceholder,
  instructionsPlaceholder = "Add any specific instructions or preferences...",
}: AIToolFormProps & { title: ElementTitle }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BaseFormData>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      customInstructions: "",
      email: "",
      context: "",
    },
  });

  const handleSubmit = async (values: BaseFormData) => {
    try {
      setIsLoading(true);
      await onSubmit(values);
      toast({
        title: "Success!",
        description: "Your request has been processed. Check your email for the results.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">{title}</h1>
        <p className="text-xl text-slate-600">{description}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email to receive the results"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="context"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{contextLabel}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={contextPlaceholder}
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customInstructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={instructionsPlaceholder}
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white rounded-full transition-all duration-300 hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Generate"}
          </Button>
        </form>
      </Form>
      
      <div className="mt-12 text-center">
        <p className="text-lg text-slate-600 mb-4">Want to learn more about how we can help your business grow?</p>
        <Link href="/schedule-call">
          <Button 
            className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white rounded-full transition-all duration-300 hover:scale-105"
          >
            Schedule a Call
          </Button>
        </Link>
      </div>
    </div>
  );
}
