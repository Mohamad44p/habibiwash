"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-2"
          : "bg-background/5 backdrop-blur-sm py-4"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo2.png"
              alt="ChainSwitch"
              width={65}
              height={65}
              className={`rounded-full object-cover transition-all duration-300 ${
                isScrolled
                  ? "lg:w-[65px] lg:h-[65px] md:w-[45px] md:h-[45px] w-[45px] h-[45px]"
                  : "lg:w-[85px] lg:h-[85px] md:w-[55px] md:h-[55px] w-[55px] h-[55px]"
              }`}
            />
          </Link>
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-colors hover:text-primary
                  ${
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                  after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                  after:h-[2px] after:w-full after:scale-x-0 after:bg-primary
                  after:transition-transform hover:after:scale-x-100
                  ${pathname === item.href ? "after:scale-x-100" : ""}
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/booking">
              <Button size="sm" className="font-medium">
                Schedule Online
              </Button>
            </Link>
          </div>
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-3 py-3 border-t animate-in slide-in-from-top duration-300">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pt-2">
              <ThemeToggle />
              <Link href="/booking" className="flex-1">
                <Button size="sm" className="w-full font-medium">
                  Schedule Online
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
