import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useCallback } from "react";

import { useChatRuntime } from "@assistant-ui/react-ai-sdk";

import { useFilterUI } from "@/contexts/filter";

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
  const { isFilterBarVisible } = useFilterUI();

  const runtime = useChatRuntime({
    transport: new DefaultChatTransport({ api: getApiEndpoint() }),
  });

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
      if (!input.trim() || runtime.thread.getState().isRunning) return;

      const currentInput = input;
      setInput("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
      try {
        await runtime.thread.append({
          role: "user",
          content: [{ type: "text", text: currentInput }],
        });
        if (inputRef.current) {
          inputRef.current.focus();
        }
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    },
    [input, runtime],
  );

  const handleSuggestedQuestion = useCallback(
    async (question: string) => {
      if (runtime.thread.getState().isRunning) return;
      try {
        await runtime.thread.append({
          role: "user",
          content: [{ type: "text", text: question }],
        });
        if (inputRef.current) {
          inputRef.current.focus();
        }
      } catch (err) {
        console.error("Failed to send suggested question:", err);
      }
    },
    [runtime],
  );

  const stop = useCallback(() => {
    runtime.thread.cancelRun();
  }, [runtime]);

  const reset = useCallback(() => {
    runtime.thread.cancelRun();
    runtime.thread.reset();
    setInput("");
  }, [runtime]);

  return {
    runtime,
    isOpen,
    toggleChat,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    stop,
    reset,
    scrollRef,
    inputRef,
    copiedId,
    copyToClipboard,
    handleEdit,
    handleSuggestedQuestion,
    isFilterBarVisible,
  };
}
