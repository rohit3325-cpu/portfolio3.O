"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Send, Bot } from "lucide-react";
import { assistantEntries, findAssistantAnswer } from "./assistant-data";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const GREETING =
  "Hi, I'm a lightweight assistant trained on Rohit's real project and experience data — not a live model. Ask me something, or pick a question below.";

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: GREETING }]);
  const [input, setInput] = useState("");
  const [typedLength, setTypedLength] = useState(GREETING.length);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typedLength]);

  function pushAssistantMessage(text: string) {
    setMessages((prev) => [...prev, { role: "assistant", text }]);
    setTypedLength(0);
    let i = 0;
    const interval = setInterval(() => {
      i += 2;
      setTypedLength(i);
      if (i >= text.length) clearInterval(interval);
    }, 14);
  }

  function handleAsk(question: string) {
    if (!question.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    const answer = findAssistantAnswer(question);
    setTimeout(() => pushAssistantMessage(answer), 350);
  }

  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close assistant" : "Ask the assistant about my work"}
        className="fixed bottom-6 right-6 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent-2 text-white shadow-lg shadow-accent/30 sm:bottom-8 sm:right-8"
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass fixed bottom-24 right-6 z-40 flex h-[min(32rem,70vh)] w-[min(24rem,90vw)] flex-col overflow-hidden rounded-2xl shadow-2xl sm:right-8"
            role="dialog"
            aria-label="Project assistant"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3.5">
              <Bot className="h-4 w-4 text-accent" />
              <p className="text-sm font-medium">Ask about my work</p>
            </div>

            <div
              ref={scrollRef}
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => {
                const isLastAssistant = i === messages.length - 1 && m.role === "assistant";
                const display = isLastAssistant ? m.text.slice(0, typedLength) : m.text;
                return (
                  <div
                    key={i}
                    className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "assistant"
                        ? "bg-card text-white/90"
                        : "ml-auto bg-accent text-white"
                    }`}
                  >
                    {display}
                  </div>
                );
              })}

              {lastMessage?.role === "assistant" && typedLength >= lastMessage.text.length && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {assistantEntries.slice(0, 4).map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => handleAsk(entry.question)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-border-hover hover:text-white"
                    >
                      {entry.question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAsk(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 rounded-full bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-opacity hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
