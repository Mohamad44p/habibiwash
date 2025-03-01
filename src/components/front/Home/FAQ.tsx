"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is HabibiWash?",
    answer:
      "HabibiWash is your premium car washing service that combines traditional hospitality with modern car care techniques. We offer comprehensive cleaning services from basic washes to full detailing packages, ensuring your vehicle receives the best care possible.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Booking an appointment with HabibiWash is easy! You can book directly through our website, or call us. Select your preferred service, choose a convenient time slot, and we'll confirm your booking instantly.",
  },
  {
    question: "Do I need to call to get a quote first?",
    answer:
      "No, all our pricing is transparent and available on our website. You can see exact prices for each service package. However, if you have special requirements or need a custom package, feel free to call us for a personalized quote.",
  },
  {
    question: "Do I need to book online?",
    answer:
      "While online booking is convenient and recommended, it's not mandatory. You can also book by calling us or visiting our location. However, online booking ensures you get your preferred time slot and allows you to view all available options easily.",
  },
  {
    question: "How do I pay?",
    answer:
      "We accept multiple payment methods including credit/debit cards, digital wallets (Apple Pay, Zelle , Venmo), and cash. You can pay when meeting up.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-8 sm:mb-12">
        <Badge className="inline-block bg-black text-white rounded-full px-3 sm:px-4 py-1 text-sm font-medium mb-4 dark:bg-white dark:text-black">
          Support
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 dark:text-white">
          Frequently asked questions
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-400">
          Still have questions? Call or text us at 4696997933
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 dark:border-gray-700"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
            >
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-8 h-8"
              >
                <Plus className="w-5 h-5 text-gray-400 dark:text-gray-500" />
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
                  <p className="text-gray-600 pb-4 dark:text-gray-400">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
