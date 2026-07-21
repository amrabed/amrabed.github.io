"use client";

import { MessageCircle, X, Send, Square, RotateCcw } from "lucide-react";

import { Button, Tooltip } from "@heroui/react";

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
    setMessages,
    setInput,
  } = useChatWidget();

  const handleReset = () => {
    stop();
    setMessages([]);
    setInput("");
  };

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
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <Tooltip closeDelay={0}>
                  <Tooltip.Trigger>
                    <Button
                      isIconOnly
                      onPress={handleReset}
                      aria-label="Reset conversation"
                      className="chat-header-close-btn"
                    >
                      <RotateCcw size={16} aria-hidden="true" />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    Reset conversation
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip>
              )}
              <Tooltip closeDelay={0}>
                <Tooltip.Trigger>
                  <Button
                    isIconOnly
                    onPress={toggleChat}
                    aria-label="Close AI assistant"
                    className="chat-header-close-btn"
                  >
                    <X size={18} aria-hidden="true" />
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Close AI assistant
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip>
            </div>
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
                      variant="ghost"
                      onPress={() => handleSuggestedQuestion(q)}
                      className="chat-suggestion-btn"
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
                isGenerating={
                  index === messages.length - 1 &&
                  m.role === "assistant" &&
                  isLoading
                }
                onEdit={handleEdit}
                onCopy={copyToClipboard}
                isCopied={copiedId === m.id}
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
                aria-label="Ask a question to Miro"
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
                <Tooltip closeDelay={0}>
                  <Tooltip.Trigger>
                    <Button
                      isIconOnly
                      type="button"
                      onClick={stop}
                      aria-label="Stop generating"
                      className="chat-action-btn-stop"
                    >
                      <Square size={10} fill="currentColor" aria-hidden="true" />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    Stop generating
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip>
              ) : (
                <Tooltip closeDelay={0}>
                  <Tooltip.Trigger>
                    <Button
                      isIconOnly
                      type="submit"
                      aria-label="Send message"
                      className="chat-action-btn-send"
                      isDisabled={!input?.trim()}
                    >
                      <Send size={14} aria-hidden="true" />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    Send message
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <Tooltip closeDelay={0}>
        <Tooltip.Trigger>
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
        </Tooltip.Trigger>
        <Tooltip.Content>
          {isOpen ? "Close AI assistant" : "Open AI assistant"}
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
