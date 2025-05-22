
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Home, Mail, DownloadCloud } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-4 py-3 text-lg rounded-md transition-colors duration-200 ease-in-out ${
      isActive ? 'bg-primary/20 text-primary font-semibold' : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
    }`;

  const NavLinks = ({ onLinkClick }) => (
    <>
      <NavLink to="/" className={navLinkClasses} onClick={onLinkClick}>
        <Home className="mr-3 h-5 w-5" /> Home
      </NavLink>
      <NavLink to="/contact" className={navLinkClasses} onClick={onLinkClick}>
        <Mail className="mr-3 h-5 w-5" /> Contact
      </NavLink>
    </>
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
      className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg shadow-md"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -10 }}
            className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg"
          >
            <DownloadCloud className="h-8 w-8 text-primary-foreground" />
          </motion.div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold gradient-text">
              HACKERPRO'S TIKTOK DOWNLOADER
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Your favorite TikToks, saved forever.</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          <NavLinks onLinkClick={() => {}} />
          <ThemeToggle />
        </div>
        
        <p className="text-xs text-muted-foreground hidden lg:block ml-auto mr-4">
          Made by HACKERPRO
        </p>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-primary/10 hover:text-primary">
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-card border-l-primary/20 p-0">
              <SheetHeader className="p-6 border-b border-border">
                <SheetTitle className="gradient-text text-2xl">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 p-4">
                <NavLinks onLinkClick={() => setIsOpen(false)} />
              </nav>
              <div className="absolute bottom-4 left-0 right-0 p-4 text-center text-xs text-muted-foreground">
                Made by HACKERPRO
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
