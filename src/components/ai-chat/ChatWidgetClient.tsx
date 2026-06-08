"use client";

import { MessageCircle, X, Send } from "lucide-react";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";

import { useChat } from "@ai-sdk/react";
import { Button } from "@heroui/react";

export default function ChatWidgetClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat();

  const isLoading = status === "submitted" || status === "streaming";

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim() || isLoading) return;

      const currentInput = input;
      setInput("");
      try {
        await sendMessage({ text: currentInput });
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    },
    [input, isLoading, sendMessage],
  );

  const isRateLimited =
    error?.message?.includes("429") || (error as any)?.status === 429;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border border-divider bg-white dark:bg-zinc-900 shadow-2xl transition-all text-foreground">
          {/* Header */}
          <div className="flex items-center justify-between bg-teal-600 px-4 py-3 text-white">
            <h3 className="text-sm font-semibold">Ask about Amr</h3>
            <button
              onClick={toggleChat}
              aria-label="Close"
              className="rounded-full p-1 hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.length === 0 && !isLoading && (
              <div className="flex h-full items-center justify-center text-center text-sm text-default-500 px-4">
                Ask me anything about Amr's experience, projects, or skills 🙂
              </div>
            )}
            {messages.map((m) => {
              const content =
                m.parts
                  ?.filter((p) => p.type === "text")
                  .map((p) => p.text)
                  .join("") || "";

              if (!content && m.role === "assistant" && isLoading) return null;

              return (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${m.role === "user"
                        ? "bg-teal-600 text-white"
                        : "bg-default-100 text-default-900"
                      }`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 bg-default-100 rounded-2xl px-4 py-3">
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-default-400 [animation-delay:-0.3s]"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-default-400 [animation-delay:-0.15s]"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-default-400"></div>
                </div>
              </div>
            )}
            {error && (
              <div className="text-center text-xs text-danger px-4">
                {isRateLimited
                  ? "You've reached the daily limit. Come back tomorrow! 👋"
                  : "Something went wrong. Please try again."}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-divider p-3 bg-zinc-50 dark:bg-zinc-800/50"
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question..."
                className="flex-1 bg-transparent text-sm focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <Button
                isIconOnly
                type="submit"
                variant="primary"
                className="bg-teal-600 text-white min-w-8 w-8 h-8"
                isDisabled={isLoading || !input?.trim()}
              >
                <Send size={16} />
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        isIconOnly
        onClick={toggleChat}
        aria-label="Open AI assistant"
        className="h-14 w-14 rounded-full bg-teal-600 text-white shadow-lg hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
    </div>
  );
}
