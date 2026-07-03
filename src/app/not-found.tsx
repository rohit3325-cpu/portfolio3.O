"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <p className="font-mono text-sm text-accent">404 / not_found</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          This page didn&rsquo;t ship.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          Whatever you were looking for either moved, was renamed, or never made it past the
          planning stage. Let&rsquo;s get you back to the parts that did ship.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </motion.div>
    </section>
  );
}
