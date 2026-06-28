"use client";

import { MessageCircle, X, Send, Square } from "lucide-react";

import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useCallback } from "react";

import { useChat } from "@ai-sdk/react";
import { Button } from "@heroui/react";

import { useFilter } from "@/contexts/filter";

import { MessageBubble, ThinkingIndicator } from "./message-bubble";

export default function ChatWidgetClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { isFilterBarVisible } = useFilter();

  const copyToClipboard = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleEdit = useCallback((text: string) => {
    setInput(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const getApiEndpoint = () => {
    if (process.env.NEXT_PUBLIC_CHAT_API_URL) {
      return process.env.NEXT_PUBLIC_CHAT_API_URL;
    }
    if (typeof globalThis.window === "undefined") return "/api/chat";
    const hostname = globalThis.window.location.hostname;
    // Check if running on external hosting domains (GitHub Pages, Firebase, etc.)
    if (
      hostname.includes("github.io") ||
      hostname.includes("web.app") ||
      hostname.includes("firebaseapp.com") ||
      hostname === "amrabed.com"
    ) {
      return "https://amrabed.vercel.app/api/chat";
    }
    return "/api/chat";
  };

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: getApiEndpoint() }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [input, adjustHeight]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, adjustHeight]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
      try {
        await sendMessage({ text: currentInput });
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    },
    [input, isLoading, sendMessage],
  );

  const isRateLimited =
    error?.message?.includes("429") ||
    (error as unknown as { status?: number })?.status === 429;

  const getErrorMessage = () => {
    if (!error) return "";
    if (isRateLimited) {
      return "You've reached the daily limit. Come back tomorrow! 👋";
    }
    try {
      const parsed = JSON.parse(error.message);
      return parsed.error || parsed.message || error.message;
    } catch {
      return error.message || "Something went wrong. Please try again.";
    }
  };

  return (
    <div
      className={`chat-widget fixed ${isFilterBarVisible ? "bottom-20" : "bottom-6"} right-4 sm:right-6 z-50 flex flex-col items-end transition-all duration-300`}
    >
      {isOpen && (
        <div className="mb-2 sm:mb-4 flex h-[400px] sm:h-[500px] w-[calc(100vw-32px)] sm:w-[360px] flex-col overflow-hidden rounded-2xl border border-indigo-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-2xl text-foreground transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-purple-500 px-4 py-3.5 text-white">
            <h3 className="text-sm font-semibold">Miro — Amr's Assistant</h3>
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
                Hi! I'm Miro. Ask me anything about Amr's experience, projects,
                or skills 🙂
              </div>
            )}
            {messages.map((m, index) => (
              <MessageBubble
                key={m.id}
                message={m}
                isLoading={isLoading}
                isLast={index === messages.length - 1}
                onEdit={handleEdit}
                onCopy={copyToClipboard}
                copiedId={copiedId}
              />
            ))}
            {status === "submitted" &&
              messages[messages.length - 1]?.role !== "assistant" && (
                <ThinkingIndicator />
              )}
            {error && (
              <div className="text-center text-xs text-danger px-4">
                {getErrorMessage()}
              </div>
            )}
            {isLoading && (
              <div className="flex justify-center sticky bottom-0 pt-2 pb-1 z-20">
                <button
                  type="button"
                  onClick={stop}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md hover:shadow-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 transition-all duration-200"
                >
                  <Square
                    size={8}
                    fill="currentColor"
                    className="text-red-500"
                  />
                  Stop Generating
                </button>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-divider p-3 bg-zinc-50 dark:bg-zinc-800/30"
          >
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question..."
                rows={1}
                className="flex-1 bg-transparent text-sm focus:outline-none resize-none overflow-y-auto max-h-24 py-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              {isLoading ? (
                <Button
                  isIconOnly
                  type="button"
                  onClick={stop}
                  className="bg-red-500 hover:bg-red-600 text-white min-w-8 w-8 h-8 shadow-md hover:scale-105 transition-transform"
                >
                  <Square size={10} fill="currentColor" />
                </Button>
              ) : (
                <Button
                  isIconOnly
                  type="submit"
                  className="bg-gradient-to-tr from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-purple-500 text-white min-w-8 w-8 h-8 shadow-md hover:scale-105 transition-transform"
                  isDisabled={!input?.trim()}
                >
                  <Send size={14} />
                </Button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        isIconOnly
        onClick={toggleChat}
        aria-label="Open AI assistant"
        className="h-14 w-14 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-purple-500 text-white shadow-xl hover:scale-110 hover:shadow-indigo-500/30 transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
    </div>
  );
}
