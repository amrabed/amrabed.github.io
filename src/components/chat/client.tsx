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
      className={`chat-widget ${
        isFilterBarVisible
          ? "chat-widget-visible-filter"
          : "chat-widget-hidden-filter"
      }`}
    >
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <h3 className="text-sm font-semibold">Miro — Amr's Assistant</h3>
            <button
              onClick={toggleChat}
              aria-label="Close AI assistant"
              className="chat-header-close-btn"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            className="chat-messages-container"
          >
            {messages.length === 0 && !isLoading && (
              <div className="chat-empty-state">
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
            {error && <div className="chat-error-msg">{getErrorMessage()}</div>}
            {isLoading && (
              <div className="chat-stop-container">
                <button type="button" onClick={stop} className="chat-stop-btn">
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
          <form onSubmit={handleSubmit} className="chat-input-form">
            <div className="chat-input-wrapper">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question..."
                rows={1}
                className="chat-input-textarea"
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
                  className="chat-action-btn-stop"
                >
                  <Square size={10} fill="currentColor" aria-hidden="true" />
                </Button>
              ) : (
                <Button
                  isIconOnly
                  type="submit"
                  aria-label="Send message"
                  className="chat-action-btn-send"
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
        className="chat-toggle-trigger"
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
