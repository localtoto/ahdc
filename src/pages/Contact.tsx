import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EmailJS Configuration
  // Get these values from https://www.emailjs.com/
  // See EMAILJS_SETUP.md for detailed setup instructions
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL || "owner@ahdc.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if EmailJS is configured
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        console.warn("EmailJS not configured. Please set up environment variables. See EMAILJS_SETUP.md for instructions.");
        console.warn("Service ID:", EMAILJS_SERVICE_ID);
        console.warn("Template ID:", EMAILJS_TEMPLATE_ID);
        console.warn("Public Key:", EMAILJS_PUBLIC_KEY ? "Set" : "Not set");
        toast({
          title: "Configuration Required",
          description: "EmailJS is not configured. Please set up environment variables. See console for details.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Log configuration for debugging
      console.log("EmailJS Configuration:");
      console.log("Service ID:", EMAILJS_SERVICE_ID);
      console.log("Template ID:", EMAILJS_TEMPLATE_ID);
      console.log("Public Key:", EMAILJS_PUBLIC_KEY ? EMAILJS_PUBLIC_KEY.substring(0, 10) + "..." : "Not set");

      // Prepare email template parameters
      // IMPORTANT: These variable names MUST match EXACTLY with your EmailJS template variables
      // Check your EmailJS template: https://dashboard.emailjs.com/admin/template
      const templateParams = {
        from_name: formData.name || "Not provided",
        from_email: formData.email || "Not provided",
        phone: formData.phone || "Not provided",
        message: formData.message || "Not provided",
        reply_to: formData.email || "Not provided",
        // Note: to_email should be set in EmailJS template settings, not as a variable
      };

      console.log("Template Params being sent:", templateParams);

      // Initialize EmailJS (if not already done)
      if (EMAILJS_PUBLIC_KEY) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      }

      // Send email using EmailJS
      // Using sendForm is more reliable than send for form data
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("EmailJS Response:", response);

      // Success
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you soon.",
        variant: "default",
      });

      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      console.error("Error details:", {
        status: error?.status,
        text: error?.text,
        message: error?.message,
      });

      // Provide more specific error messages
      let errorMessage = "Something went wrong. Please try again or contact us directly.";
      
      if (error?.status === 412) {
        errorMessage = "Template validation failed (412). This usually means your EmailJS template variables don't match. Please check: 1) Template includes variables: {{from_name}}, {{from_email}}, {{phone}}, {{message}}, {{reply_to}} 2) 'To Email' is set to priyanshupratap5622@gmail.com in template settings 3) Template is saved and active. See EMAILJS_TROUBLESHOOTING.md for details.";
      } else if (error?.status === 400) {
        errorMessage = "Invalid request (400). Please verify your Service ID, Template ID, and Public Key are correct.";
      } else if (error?.status === 403) {
        errorMessage = "Access denied (403). Please check your EmailJS Public Key and service permissions.";
      } else if (error?.status === 404) {
        errorMessage = "Service or Template not found (404). Please verify your Service ID and Template ID are correct.";
      } else if (error?.text) {
        errorMessage = `Error: ${error.text}. Check console for more details.`;
      } else if (error?.message) {
        errorMessage = `Error: ${error.message}. Check console for more details.`;
      }

      toast({
        title: "Failed to Send Message",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our team to start your real estate journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="glass-card shadow-card animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll respond promptly</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your property needs..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="cta" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Company Info */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <Card className="glass-card shadow-card">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>Visit us or reach out directly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Visit Our Office</h3>
                    <p className="text-muted-foreground">
                      123 Luxury Boulevard<br />
                      Beverly Hills, CA 90210<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-muted-foreground">
                      +1 (555) 123-4567<br />
                      Mon-Fri: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-muted-foreground">
                      info@ahdc.com<br />
                      support@ahdc.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong bg-primary/90 text-primary-foreground animate-pulse-glow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Ready to Find Your Dream Home?</h3>
                <p className="mb-4 opacity-90">
                  Our experienced agents are here to guide you through every step of your real estate journey.
                </p>
                <Button variant="secondary" className="w-full hover:scale-105 transition-transform">
                  Schedule a Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
