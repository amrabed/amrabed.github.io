"use client";

import { MessageCircle, X, Send } from "lucide-react";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";

import { useChat } from "@ai-sdk/react";
import { Button } from "@heroui/react";

export default function ChatWidgetClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const getApiEndpoint = () => {
    if (typeof window === "undefined") return "/api/chat";
    const hostname = window.location.hostname;
    // Check if running on GitHub Pages domains
    if (hostname.includes("github.io") || hostname === "amrabed.com") {
      return "https://amr-abed.web.app/api/chat";
    }
    return "/api/chat";
  };

  const { messages, sendMessage, status, error } = useChat({
    api: getApiEndpoint(),
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
    (error as Record<string, unknown>)?.status === 429;

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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border border-indigo-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-2xl text-foreground transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-purple-500 px-4 py-3.5 text-white">
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
            {messages.map((m, index) => {
              const isLast = index === messages.length - 1;
              const showTypingIndicator =
                isLast && m.role === "assistant" && isLoading;

              return (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm text-left [&_p]:text-left [&_div]:text-left [&_ul]:text-left [&_ol]:text-left [&_li]:text-left ${
                      m.role === "user"
                        ? "bg-gradient-to-tr from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-purple-500 text-white"
                        : "bg-slate-100 dark:bg-zinc-800/80 border border-slate-200/50 dark:border-zinc-700/50 text-foreground"
                    }`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none text-left [&_p]:text-left [&_div]:text-left [&_ul]:text-left [&_ol]:text-left [&_li]:text-left">
                      {m.parts?.map((part, i) => {
                        if (part.type === "text") {
                          if (m.role === "user") {
                            return (
                              <div key={i} className="whitespace-pre-wrap text-left break-words">
                                {part.text}
                              </div>
                            );
                          }
                          return (
                            <ReactMarkdown
                              key={i}
                              components={{
                                a: ({ href, children }) => {
                                  const isHash = href?.startsWith("#");
                                  return (
                                    <a
                                      href={href}
                                      target={isHash ? undefined : "_blank"}
                                      rel={isHash ? undefined : "noopener noreferrer"}
                                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold transition-colors"
                                    >
                                      {children}
                                    </a>
                                  );
                                },
                                p: ({ children }) => (
                                  <p className="mb-2 last:mb-0 leading-relaxed text-left">
                                    {children}
                                  </p>
                                ),
                                ul: ({ children }) => (
                                  <ul className="list-disc pl-4 mb-2 space-y-1 text-left">
                                    {children}
                                  </ul>
                                ),
                                ol: ({ children }) => (
                                  <ol className="list-decimal pl-4 mb-2 space-y-1 text-left">
                                    {children}
                                  </ol>
                                ),
                                li: ({ children }) => (
                                  <li className="mb-0.5 text-left">{children}</li>
                                ),
                                strong: ({ children }) => (
                                  <strong className="font-bold text-indigo-950 dark:text-white">
                                    {children}
                                  </strong>
                                ),
                              }}
                            >
                              {part.text}
                            </ReactMarkdown>
                          );
                        }
                        if (part.type === "reasoning") {
                          return (
                            <div
                              key={i}
                              className="mb-2 italic text-default-500 border-l-2 border-default-300 pl-2 text-xs"
                            >
                              Thinking: {part.text}
                            </div>
                          );
                        }
                        return null;
                      })}
                      {showTypingIndicator && (
                        <div className="flex items-center gap-1.5 mt-3">
                          <span className="text-xs text-indigo-500/80 dark:text-indigo-300/80 font-medium animate-pulse">
                            Generating...
                          </span>
                          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 dark:bg-indigo-400 [animation-delay:-0.3s]"></div>
                          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 dark:bg-indigo-400 [animation-delay:-0.15s]"></div>
                          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 dark:bg-indigo-400"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {status === "submitted" &&
              messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-800/80 border border-slate-200/50 dark:border-zinc-700/50 rounded-2xl px-4 py-3 shadow-sm">
                    <span className="text-xs text-default-500 font-medium mr-1">
                      Thinking
                    </span>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 dark:bg-indigo-400 [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 dark:bg-indigo-400 [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 dark:bg-indigo-400"></div>
                  </div>
                </div>
              )}
            {error && (
              <div className="text-center text-xs text-danger px-4">
                {getErrorMessage()}
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
              <Button
                isIconOnly
                type="submit"
                className="bg-gradient-to-tr from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-purple-500 text-white min-w-8 w-8 h-8 shadow-md hover:scale-105 transition-transform"
                isDisabled={isLoading || !input?.trim()}
              >
                <Send size={14} />
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
        className="h-14 w-14 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-purple-500 text-white shadow-xl hover:scale-110 hover:shadow-indigo-500/30 transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
    </div>
  );
}
