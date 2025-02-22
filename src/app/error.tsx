"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertCircle,
  RefreshCcw,
  Home,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-3xl"
          />
        </div>
      </motion.div>

      <div className="max-w-2xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="relative"
        >
          {/* Card Background Effects */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                background: [
                  "rgba(var(--primary-rgb), 0.1)",
                  "rgba(var(--primary-rgb), 0.2)",
                  "rgba(var(--primary-rgb), 0.1)",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl blur-3xl"
            />
          </div>

          <div className="relative bg-card/50 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <div className="relative z-10 space-y-8">
              {/* Error Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all duration-300 px-4 py-1.5 text-sm font-medium shadow-lg hover:shadow-red-500/20"
                >
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⚠️
                  </motion.span>
                  <span className="ml-2">Error Encountered</span>
                </Badge>
              </motion.div>

              <div className="relative">
                <motion.div
                  className="w-32 h-32 mx-auto"
                  initial={{ rotate: 180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-full blur-xl" />
                  <div className="relative bg-gradient-to-br from-background to-card rounded-full p-6 border border-red-500/20 shadow-lg">
                    <AlertCircle className="w-full h-full text-red-500" />
                  </div>
                </motion.div>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-red-500/20"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2 + i * 0.2, opacity: [0, 0.5, 0] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.4,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 text-center"
              >
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-red-500 via-primary to-primary/60 bg-clip-text text-transparent">
                    Oops! Something Went Wrong
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  {error.message ||
                    "We encountered an unexpected error. Don't worry, we're on it!"}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  onClick={reset}
                  size="lg"
                  className="relative group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative flex items-center gap-2">
                    <RefreshCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                    Try Again
                    <motion.span
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                </Button>

                <Link href="/" className="contents">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    <motion.span
                      className="relative flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <ChevronLeft className="h-4 w-4 group-hover:translate-x-[-5px] transition-transform" />
                      Return Home
                      <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>

              <AnimatePresence>
                {error.digest && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                  >
                    <code className="px-3 py-1.5 bg-primary/5 rounded-full text-xs text-muted-foreground font-mono">
                      Error Digest: {error.digest}
                    </code>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
