"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";

const faqData = [
  {
    question: "How long does ceramic coating last?",
    answer: "With proper maintenance, our ceramic coating can last up to 5 years. The exact duration depends on environmental conditions and how well the vehicle is maintained."
  },
  {
    question: "Is ceramic coating worth the investment?",
    answer: "Yes, ceramic coating provides long-term protection and maintains your vehicle's value. It reduces maintenance costs and time spent on washing and waxing over the years."
  },
  {
    question: "How should I maintain my ceramic coated vehicle?",
    answer: "Regular washing with pH-neutral car shampoo, avoiding automatic car washes, and periodic inspections are recommended. We provide detailed care instructions after application."
  },
  {
    question: "Can ceramic coating be removed?",
    answer: "Yes, ceramic coating can be removed through professional polishing if needed, but it's designed to be a long-term solution."
  },
  {
    question: "What preparation is needed before coating?",
    answer: "We perform thorough paint correction, clay bar treatment, and surface decontamination before applying the ceramic coating to ensure optimal bonding and results."
  }
];

export default function CeramicFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4">FAQ</Badge>
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about our ceramic coating service
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-muted">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <span className="font-medium">{item.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="w-5 h-5 text-primary" />
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground pb-4">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
