"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaTiktok } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-background/95 border-t">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 sm:space-y-6">
            <Link
              href="/"
              className="block sm:inline-block text-center sm:text-left"
            >
              <Image
                src="/habibi.png"
                alt="HabibiWash"
                width={120}
                height={120}
                className="rounded-full mx-auto sm:mx-0"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium car care services delivered with exceptional quality and
              attention to detail. Your satisfaction is our priority.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/share/1A664ar7RZ/?mibextid=wwXIfr"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@habibiwash99?_t=ZP-8tzwbf9Sbyp&_r=1"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaTiktok className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/habibiwash99?igsh=aTkzYmVndWMxb3Zo"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-8 sm:gap-0">
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {[
                  "Home",
                  "About",
                  "Services",
                  "Book Online",
                  "Blog",
                  "Contact",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 mt-2">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  +1 (945)-309-0185
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  habibiwash99@gmail.com
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HabibiWash. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link
                href="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
