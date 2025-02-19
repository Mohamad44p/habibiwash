"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Book Online", href: "/booking" },
  { name: "Ceramic Coating", href: "/ceramic-coating" },
  { name: "Car Detailing", href: "/car-detailing" },
  { name: "Get a Quote", href: "/quote" },
  { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-background/5 backdrop-blur-2xl"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo2.png"
              alt="ChainSwitch"
              width={85}
              height={85}
              className="rounded-full object-cover"
            />
          </Link>
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/booking">
              <Button size="sm">Schedule Online</Button>
            </Link>
          </div>
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-4 py-4 border-t">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
            <Link href="/booking">
              <Button size="sm" className="w-full">
                Schedule Online
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
