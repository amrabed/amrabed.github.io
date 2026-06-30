"use client";

import {
  MessageCircle,
  X,
  Send,
  Square,
  Copy,
  Check,
  Pencil,
} from "lucide-react";

import { DefaultChatTransport, UIMessage } from "ai";
import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";

import { useChat } from "@ai-sdk/react";
import { Button } from "@heroui/react";

import { useFilter } from "@/contexts/filter";

const markdownComponents = {
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    const isHash = href?.startsWith("#");
    return (
      <a
        href={href}
        target={isHash ? undefined : "_blank"}
        rel={isHash ? undefined : "noopener noreferrer"}
        className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
      >
        {children}
      </a>
    );
  },
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-2 last:mb-0 leading-relaxed text-left">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc pl-4 mb-2 space-y-1 text-left">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal pl-4 mb-2 space-y-1 text-left">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="mb-0.5 text-left">{children}</li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold text-indigo-950 dark:text-white">
      {children}
    </strong>
  ),
};

const renderMessageContent = (m: UIMessage, messageText: string) => {
  if (m.parts && m.parts.length > 0) {
    return m.parts.map((part, i) => {
      const partKey = `${m.id}-part-${part.type}-${i}`;
      if (part.type === "text") {
        if (m.role === "user") {
          return (
            <div
              key={partKey}
              className="whitespace-pre-wrap text-left break-words"
            >
              {part.text}
            </div>
          );
        }
        return (
          <ReactMarkdown key={partKey} components={markdownComponents}>
            {part.text}
          </ReactMarkdown>
        );
      }
      if (part.type === "reasoning") {
        return (
          <div
            key={partKey}
            className="mb-2 italic text-zinc-500 dark:text-zinc-400 border-l-2 border-zinc-300 dark:border-zinc-700 pl-2 text-xs"
          >
            Thinking: {part.text}
          </div>
        );
      }
      return null;
    });
  }

  if (m.role === "user") {
    return (
      <div className="whitespace-pre-wrap text-left break-words">
        {messageText}
      </div>
    );
  }

  return (
    <ReactMarkdown components={markdownComponents}>{messageText}</ReactMarkdown>
  );
};

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
              aria-label="Close AI assistant"
              className="rounded-full p-1 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={18} aria-hidden="true" />
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
            {messages.map((m, index) => {
              const isLast = index === messages.length - 1;
              const showTypingIndicator =
                isLast && m.role === "assistant" && isLoading;
              const messageText =
                m.parts
                  ?.filter((p) => p.type === "text")
                  .map((p) =>
                    p.type === "text"
                      ? (p as { type: "text"; text: string }).text
                      : "",
                  )
                  .join("") || "";

              return (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label="Double click to select message text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        const textContainer =
                          e.currentTarget.querySelector(".prose") ||
                          e.currentTarget;
                        const selection = globalThis.window?.getSelection();
                        const range = document.createRange();
                        range.selectNodeContents(textContainer);
                        selection?.removeAllRanges();
                        selection?.addRange(range);
                      }
                    }}
                    onDoubleClick={(e) => {
                      const textContainer =
                        e.currentTarget.querySelector(".prose") ||
                        e.currentTarget;
                      const selection = globalThis.window?.getSelection();
                      const range = document.createRange();
                      range.selectNodeContents(textContainer);
                      selection?.removeAllRanges();
                      selection?.addRange(range);
                    }}
                    className={`relative group max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm text-left select-text cursor-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&_p]:text-left [&_div]:text-left [&_ul]:text-left [&_ol]:text-left [&_li]:text-left ${
                      m.role === "user"
                        ? "bg-gradient-to-tr from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-purple-500 text-white"
                        : "bg-slate-100 dark:bg-zinc-800/80 border border-slate-200/50 dark:border-zinc-700/50 text-foreground"
                    }`}
                  >
                    {/* Floating Message Actions */}
                    {m.role === "user" && (
                      <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-[calc(100%+8px)] flex items-center gap-1 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 shadow-md px-1.5 py-0.5 rounded-full opacity-90 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-200 z-10">
                        <button
                          type="button"
                          onClick={() => handleEdit(messageText)}
                          aria-label="Edit question"
                          className="p-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
                        >
                          <Pencil size={12} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(m.id, messageText)}
                          aria-label="Copy question"
                          className="p-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
                        >
                          {copiedId === m.id ? (
                            <Check
                              size={12}
                              className="text-green-500 animate-pulse"
                              aria-hidden="true"
                            />
                          ) : (
                            <Copy size={12} aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    )}
                    {m.role === "assistant" && (
                      <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-[calc(100%+8px)] flex items-center gap-1 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 shadow-md px-1.5 py-0.5 rounded-full opacity-90 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-200 z-10">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(m.id, messageText)}
                          aria-label="Copy answer"
                          className="p-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
                        >
                          {copiedId === m.id ? (
                            <Check
                              size={12}
                              className="text-green-500 animate-pulse"
                              aria-hidden="true"
                            />
                          ) : (
                            <Copy size={12} aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    )}
                    <div className="prose prose-sm dark:prose-invert max-w-none text-left [&_p]:text-left [&_div]:text-left [&_ul]:text-left [&_ol]:text-left [&_li]:text-left">
                      {renderMessageContent(m, messageText)}
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
            {isLoading && (
              <div className="flex justify-center sticky bottom-0 pt-2 pb-1 z-20">
                <button
                  type="button"
                  onClick={stop}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md hover:shadow-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
                >
                  <Square
                    size={8}
                    fill="currentColor"
                    className="text-red-500"
                    aria-hidden="true"
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
                className="flex-1 bg-transparent text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 resize-none overflow-y-auto max-h-24 py-1"
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
                  aria-label="Stop generating"
                  className="bg-red-500 hover:bg-red-600 text-white min-w-8 w-8 h-8 shadow-md hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
                >
                  <Square size={10} fill="currentColor" aria-hidden="true" />
                </Button>
              ) : (
                <Button
                  isIconOnly
                  type="submit"
                  aria-label="Send message"
                  className="bg-gradient-to-tr from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-purple-500 text-white min-w-8 w-8 h-8 shadow-md hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  isDisabled={!input?.trim()}
                >
                  <Send size={14} aria-hidden="true" />
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
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        className="h-14 w-14 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-purple-500 text-white shadow-xl hover:scale-110 hover:shadow-indigo-500/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {isOpen ? (
          <X size={24} aria-hidden="true" />
        ) : (
          <MessageCircle size={24} aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}
