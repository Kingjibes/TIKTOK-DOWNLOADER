
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Send, MessageSquare, Users, Linkedin, Github } from 'lucide-react'; // Added Linkedin and Github

const contactDetails = [
  {
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    platform: 'WhatsApp Channel',
    value: 'HackerPro Updates',
    link: 'https://whatsapp.com/channel/0029Vb3wqli8V0tfOrWXwk2K',
    cta: 'Join Channel',
  },
  {
    icon: <Send className="h-6 w-6 text-primary" />,
    platform: 'Telegram Channel',
    value: 'CipherTech Insights',
    link: 'https://t.me/ciphertech2',
    cta: 'View Channel',
  },
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    platform: 'WhatsApp Direct',
    value: '+233 55 748 8116',
    link: 'https://wa.me/+233557488116',
    cta: 'Message Me',
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    platform: 'Telegram Direct',
    value: '@HACK_ERPRO',
    link: 'https://t.me/HACK_ERPRO', // Corrected Telegram personal link
    cta: 'Chat Now',
  },
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    platform: 'Email',
    value: 'heroapp682@gmail.com', // Placeholder email
    link: 'mailto:heroapp682@gmail.com',
    cta: 'Send Email',
  },
    {
    icon: <Github className="h-6 w-6 text-primary" />,
    platform: 'GitHub',
    value: 'HackerPro-GH', // Placeholder, replace with actual username
    link: 'https://github.com/HackerPro-GH', // Placeholder, replace with actual link
    cta: 'View Profile',
  },
  {
    icon: <Linkedin className="h-6 w-6 text-primary" />,
    platform: 'LinkedIn',
    value: 'HackerPro LinkedIn', // Placeholder, replace with actual name
    link: 'https://www.linkedin.com/in/hackerpro-profile', // Placeholder, replace with actual link
    cta: 'Connect',
  }
];

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions, ideas, or just want to connect? Here's how you can reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
        </p>
        <img  alt="Illustration of diverse communication methods" className="mx-auto mt-8 rounded-lg shadow-xl shadow-primary/15 w-full max-w-lg h-auto object-cover opacity-90" style={{aspectRatio: '16/9'}} src="https://images.unsplash.com/photo-1614680376408-81e91ffe3db7" />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {contactDetails.map((detail, index) => (
          <motion.div
            key={detail.platform}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col overflow-hidden bg-card/70 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:shadow-primary/20 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  {detail.icon}
                </div>
                <div>
                  <CardTitle className="text-xl gradient-text">{detail.platform}</CardTitle>
                  <CardDescription className="text-sm">{detail.value}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground transition-transform transform hover:scale-105">
                  <a href={detail.link} target="_blank" rel="noopener noreferrer">
                    {detail.cta}
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
       <Card className="mt-12 w-full shadow-2xl bg-card/80 backdrop-blur-md border-primary/30 overflow-hidden">
        <CardHeader className="text-center p-8 bg-gradient-to-br from-primary/10 via-background to-background">
           <CardTitle className="text-3xl md:text-4xl font-extrabold gradient-text">
            Let's Collaborate
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm md:text-base mt-2 max-w-xl mx-auto">
            I'm passionate about technology and always excited to explore new challenges. If you have a project in mind or think we could create something great together, don't hesitate to reach out!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 text-center">
          <img  alt="Abstract network or collaboration graphic" className="mx-auto mb-6 rounded-lg shadow-lg w-full max-w-md h-auto object-cover opacity-80" style={{aspectRatio: '16/9'}} src="https://images.unsplash.com/photo-1604869515882-4d10fa4b0492" />
          <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-8 py-6 transform hover:scale-105 transition-transform" onClick={() => window.location.href = 'mailto:heroapp682@gmail.com'}>
            Start a Conversation
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactPage;
