"use client";

import { MessageCircle, X, Send, Square } from "lucide-react";

import { Button } from "@heroui/react";

import { MessageBubble, ThinkingIndicator } from "./message-bubble";
import { useChatWidget } from "./use-chat-widget";

export default function ChatWidgetClient() {
  const {
    isOpen,
    toggleChat,
    input,
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
    handleSuggestedQuestion,
    isFilterBarVisible,
    status,
  } = useChatWidget();

  const suggestedQuestions = [
    "What are Amr's core technical skills?",
    "Tell me about his most recent projects.",
    "What was his PhD research about?",
  ];

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
              <div className="chat-empty-state flex-col gap-4">
                <div className="text-center">
                  Hi! I&apos;m Miro. Ask me anything about Amr&apos;s
                  experience, projects, or skills 🙂
                </div>
                <div className="flex flex-col gap-2 w-full max-w-[280px]">
                  {suggestedQuestions.map((q) => (
                    <Button
                      key={q}
                      size="sm"
                      variant="flat"
                      onPress={() => handleSuggestedQuestion(q)}
                      className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-xl h-auto py-2 px-3 whitespace-normal text-left justify-start border border-indigo-100/50 dark:border-indigo-800/30 transition-all active:scale-95"
                      aria-label={`Ask: ${q}`}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
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
