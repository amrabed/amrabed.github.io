"use client";

import { Check, Copy, Pencil } from "lucide-react";

import { UIMessage } from "ai";
import ReactMarkdown from "react-markdown";

import { Button, Tooltip } from "@heroui/react";

const selectElementText = (target: HTMLElement) => {
  const textContainer = target.querySelector(".prose") || target;
  const selection = globalThis.window?.getSelection();
  const range = document.createRange();
  range.selectNodeContents(textContainer);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

const markdownComponents = {
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
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
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="mb-0.5">{children}</li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold text-indigo-950 dark:text-white">
      {children}
    </strong>
  ),
};

const MessageContent = ({
  message,
  text,
}: {
  message: UIMessage;
  text: string;
}) => {
  if (message.parts && message.parts.length > 0) {
    return message.parts.map((part, i) => {
      const partKey = `${message.id}-part-${part.type}-${i}`;
      if (part.type === "text") {
        if (message.role === "user") {
          return (
            <div key={partKey} className="whitespace-pre-wrap break-words">
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

  if (message.role === "user") {
    return <div className="whitespace-pre-wrap break-words">{text}</div>;
  }

  return <ReactMarkdown components={markdownComponents}>{text}</ReactMarkdown>;
};

export const MessageBubble = ({
  message,
  isLoading,
  isLast,
  onEdit,
  onCopy,
  copiedId,
}: {
  message: UIMessage;
  isLoading: boolean;
  isLast: boolean;
  onEdit: (text: string) => void;
  onCopy: (id: string, text: string) => void;
  copiedId: string | null;
}) => {
  const showTypingIndicator =
    isLast && message.role === "assistant" && isLoading;
  const messageText =
    message.parts
      ?.filter((p) => p.type === "text")
      .map((p) =>
        p.type === "text" ? (p as { type: "text"; text: string }).text : "",
      )
      .join("") || "";

  return (
    <div
      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        tabIndex={0}
        role="button"
        aria-label="Double click to select message text"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectElementText(e.currentTarget);
          }
        }}
        onDoubleClick={(e) => {
          selectElementText(e.currentTarget);
        }}
        className={`chat-message-bubble group ${
          message.role === "user"
            ? "chat-message-user"
            : "chat-message-assistant"
        }`}
      >
        {/* Floating Message Actions */}
        <div
          className={`chat-message-actions ${
            message.role === "user"
              ? "chat-message-actions-user"
              : "chat-message-actions-assistant"
          }`}
        >
          {message.role === "user" && (
            <Tooltip closeDelay={0}>
              <Tooltip.Trigger>
                <Button
                  isIconOnly
                  variant="ghost"
                  onPress={() => onEdit(messageText)}
                  className="chat-message-action-btn"
                  aria-label="Edit question"
                >
                  <Pencil size={12} />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                Edit question
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip>
          )}
          <Tooltip closeDelay={0}>
            <Tooltip.Trigger>
              <Button
                isIconOnly
                variant="ghost"
                onPress={() => onCopy(message.id, messageText)}
                className="chat-message-action-btn"
                aria-label={
                  message.role === "user" ? "Copy question" : "Copy answer"
                }
              >
                {copiedId === message.id ? (
                  <Check size={12} className="text-green-500 animate-pulse" />
                ) : (
                  <Copy size={12} />
                )}
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              {message.role === "user" ? "Copy question" : "Copy answer"}
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <MessageContent message={message} text={messageText} />
          {showTypingIndicator && (
            <div className="chat-typing-indicator">
              <span className="chat-typing-text">Generating...</span>
              <div className="chat-typing-dot [animation-delay:-0.3s]"></div>
              <div className="chat-typing-dot [animation-delay:-0.15s]"></div>
              <div className="chat-typing-dot"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
