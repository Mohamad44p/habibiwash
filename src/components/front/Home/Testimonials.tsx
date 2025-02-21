"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  service: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "BMW M3 Owner",
    comment:
      "Exceptional service! My car looks and feels brand new. The attention to detail is unmatched.",
    rating: 5,
    service: "Ceramic Coating",
  },
  {
    id: 2,
    name: "Sarah Martinez",
    role: "Tesla Model Y Owner",
    comment:
      "Outstanding results! The team's expertise and care for my vehicle exceeded all expectations.",
    rating: 5,
    service: "Premium Detail",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Porsche 911 Owner",
    comment:
      "Incredible transformation! Years of wear vanished, leaving my car in showroom condition.",
    rating: 5,
    service: "Paint Correction",
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Mercedes AMG Owner",
    comment:
      "Meticulous work! Every inch of my car was treated with the utmost care and professionalism.",
    rating: 5,
    service: "Full Detail",
  },
  {
    id: 5,
    name: "David Park",
    role: "Audi RS7 Owner",
    comment:
      "Top-notch protection! The paint protection has kept my car looking flawless for months.",
    rating: 5,
    service: "Paint Protection",
  },
  {
    id: 6,
    name: "Lisa Rodriguez",
    role: "Range Rover Owner",
    comment:
      "Luxurious results! The interior detailing brought new life to my vehicle's cabin.",
    rating: 5,
    service: "Interior Detail",
  },
  {
    id: 7,
    name: "James Mitchell",
    role: "Lexus LC500 Owner",
    comment:
      "Brilliant finish! The ceramic coating has made maintaining my car's appearance effortless.",
    rating: 5,
    service: "Ceramic Coating",
  },
  {
    id: 8,
    name: "Sophie Anderson",
    role: "McLaren Owner",
    comment:
      "Unparalleled quality! Every service has been consistently excellent, truly worth the investment.",
    rating: 5,
    service: "Premium Detail",
  },
  {
    id: 9,
    name: "Robert Zhang",
    role: "Ferrari Owner",
    comment:
      "Flawless results! The paint correction brought out a shine I didn't know my car could have.",
    rating: 5,
    service: "Paint Correction",
  },
  {
    id: 10,
    name: "Nina Patel",
    role: "Lamborghini Owner",
    comment:
      "Exceptional care! From start to finish, the service was impeccable and the results stunning.",
    rating: 5,
    service: "Full Detail",
  },
  {
    id: 11,
    name: "Ethan Lee",
    role: "Porsche Taycan Owner",
    comment:
      "Professional service! The paint protection has kept my car looking showroom-ready.",
    rating: 5,
    service: "Paint Protection",
  },
  {
    id: 12,
    name: "Olivia Brown",
    role: "BMW X5 Owner",
    comment:
      "Spotless interior! The detailing made my car feel brand new and smell fresh.",
    rating: 5,
    service: "Interior Detail",
  },
];

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const getAvatarUrl = (name: string) => {
    return `https://avatar.vercel.sh/${encodeURIComponent(name)}?size=128`;
  };

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoplay) {
      interval = setInterval(nextPage, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, nextPage]);

  const handleManualNavigation = useCallback((index: number) => {
    setCurrentPage(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  }, []);

  const visibleTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="inline-block bg-primary text-primary-foreground rounded-full px-4 py-1 text-sm font-medium mb-4">
            Client Testimonials
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Hear from Our{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Satisfied Clients
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl">
            Discover why our clients trust us with their prized vehicles
          </p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${currentPage}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl opacity-50" />
                  <motion.div
                    className="relative bg-card hover:bg-card/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/20 h-full flex flex-col justify-between"
                    whileHover={{ y: -10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          className="relative w-16 h-16 rounded-full overflow-hidden"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Image
                            src={
                              getAvatarUrl(testimonial.name) ||
                              "/placeholder.svg"
                            }
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-lg">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex gap-1 mb-3">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                  delay: i * 0.1,
                                  type: "spring",
                                  stiffness: 200,
                                }}
                              >
                                <Star className="w-5 h-5 fill-primary text-primary" />
                              </motion.div>
                            )
                          )}
                        </div>
                        <p className="text-muted-foreground text-lg italic">
                          &quot;{testimonial.comment}&quot;
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 hover:bg-primary/20 text-primary"
                      >
                        {testimonial.service}
                      </Badge>
                    </div>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-6 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                handleManualNavigation(
                  (currentPage - 1 + totalPages) % totalPages
                )
              }
              className="rounded-full w-12 h-12 text-primary hover:text-primary-foreground hover:bg-primary"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full ${i === currentPage ? "bg-primary" : "bg-primary/20"}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleManualNavigation(i)}
                style={{ cursor: "pointer" }}
              />
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                handleManualNavigation((currentPage + 1) % totalPages)
              }
              className="rounded-full w-12 h-12 text-primary hover:text-primary-foreground hover:bg-primary"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
