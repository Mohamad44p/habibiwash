"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-background/95 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <Image
                src="/Logo1.png"
                alt="HabibiWash"
                width={150}
                height={150}
                className="rounded-full"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium car care services delivered with exceptional quality and
              attention to detail. Your satisfaction is our priority.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["Home", "About", "Services", "Book Online", "Blog", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                123 Detailing Street, Dubai, UAE
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                (971) 123-4567
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                info@habibiwash.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
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

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HabibiWash. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
