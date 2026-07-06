import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useCallback } from "react";

import { useChat } from "@ai-sdk/react";

import { useFilter } from "@/contexts/filter";

export const getApiEndpoint = () => {
  if (process.env.NEXT_PUBLIC_CHAT_API_URL) {
    return process.env.NEXT_PUBLIC_CHAT_API_URL;
  }
  if (typeof globalThis.window === "undefined") return "/api/chat";
  const hostname = globalThis.window.location.hostname;
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

export function useChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { isFilterBarVisible } = useFilter();

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: getApiEndpoint() }),
  });

  const isLoading = status === "submitted" || status === "streaming";
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  return {
    isOpen,
    toggleChat,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
    error,
    getErrorMessage,
    stop,
    scrollRef,
    inputRef,
    copiedId,
    copyToClipboard,
    handleEdit,
    isFilterBarVisible,
    status,
  };
}
