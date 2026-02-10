import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Github, Linkedin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { sendContactEmail } from "@/lib/email";
import { useState } from "react";

const contactSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [isSending, setIsSending] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSending(true);
    try {
      await sendContactEmail({
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } catch (err) {
      toast({
        title: "Failed to send",
        description: err instanceof Error ? err.message : "Something went wrong. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-primary font-mono mb-4">04. What's Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>

        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          I'm currently open to new opportunities and always excited to discuss
          interesting projects. Whether you have a question or just want to say hi,
          feel free to reach out!
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-left">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="What's this about?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your message here..." rows={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full gap-2 glow-effect" disabled={isSending}>
                <Send size={18} />
                {isSending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-center gap-8 mt-12"
        >
          <a
            href="mailto:gazmorabdiu@gmail.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Mail size={18} />
            <span className="text-sm">gazmorabdiu@gmail.com</span>
          </a>
          <span className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={18} />
            <span className="text-sm">Pristina, Kosovo</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center gap-6 mt-8"
        >
          <a
            href="https://github.com/gazmorabdiu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-300"
          >
            <Github size={22} />
          </a>
          <a
            href="https://linkedin.com/in/gazmorabdiu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-300"
          >
            <Linkedin size={22} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
