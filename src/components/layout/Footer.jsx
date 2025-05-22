
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border-t border-border/40 bg-background/95 py-8"
    >
      <div className="container flex flex-col items-center justify-center text-center px-4">
        <p className="text-sm text-muted-foreground mb-2">
          &copy; {currentYear} <span className="font-semibold gradient-text">HACKERPRO'S TIKTOK DOWNLOADER.</span>
        </p>
        <p className="text-xs text-muted-foreground mb-3 max-w-md">
          Disclaimer: This website is not affiliated with TikTok or its parent company, ByteDance Ltd. All trademarks and logos belong to their respective owners. Please respect content creators' rights and download videos responsibly.
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> by HackerPro
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
