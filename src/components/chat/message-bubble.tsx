"use client";

import { Check, Copy, Pencil } from "lucide-react";

import { UIMessage } from "ai";
import React, { memo } from "react";
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
        className="chat-message-markdown-link"
      >
        {children}
      </a>
    );
  },
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="chat-message-markdown-p">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="chat-message-markdown-ul">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="chat-message-markdown-ol">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="chat-message-markdown-li">{children}</li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="chat-message-markdown-strong">{children}</strong>
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
            <div key={partKey} className="chat-user-text">
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
          <div key={partKey} className="chat-reasoning-text">
            Thinking: {part.text}
          </div>
        );
      }
      return null;
    });
  }

  if (message.role === "user") {
    return <div className="chat-user-text">{text}</div>;
  }

  return <ReactMarkdown components={markdownComponents}>{text}</ReactMarkdown>;
};

const EditAction = ({
  onEdit,
  text,
}: {
  onEdit: (text: string) => void;
  text: string;
}) => (
  <Tooltip closeDelay={0}>
    <Tooltip.Trigger>
      <Button
        isIconOnly
        variant="ghost"
        onPress={() => onEdit(text)}
        className="chat-message-action-btn"
        aria-label="Edit question"
      >
        <Pencil size={12} aria-hidden="true" />
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      Edit question
      <Tooltip.Arrow />
    </Tooltip.Content>
  </Tooltip>
);

const CopyAction = ({
  onCopy,
  id,
  text,
  isCopied,
  role,
}: {
  onCopy: (id: string, text: string) => void;
  id: string;
  text: string;
  isCopied: boolean;
  role: string;
}) => (
  <Tooltip closeDelay={0}>
    <Tooltip.Trigger>
      <Button
        isIconOnly
        variant="ghost"
        onPress={() => onCopy(id, text)}
        className="chat-message-action-btn"
        aria-label={role === "user" ? "Copy question" : "Copy answer"}
      >
        {isCopied ? (
          <Check
            size={12}
            className="chat-action-btn-success"
            aria-hidden="true"
          />
        ) : (
          <Copy size={12} aria-hidden="true" />
        )}
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      {role === "user" ? "Copy question" : "Copy answer"}
      <Tooltip.Arrow />
    </Tooltip.Content>
  </Tooltip>
);

const MessageActions = ({
  role,
  messageId,
  messageText,
  isCopied,
  onEdit,
  onCopy,
}: {
  role: string;
  messageId: string;
  messageText: string;
  isCopied: boolean;
  onEdit: (text: string) => void;
  onCopy: (id: string, text: string) => void;
}) => (
  <div data-role={role} className="chat-message-actions">
    {role === "user" && <EditAction onEdit={onEdit} text={messageText} />}
    <CopyAction
      onCopy={onCopy}
      id={messageId}
      text={messageText}
      isCopied={isCopied}
      role={role}
    />
  </div>
);

export const MessageBubble = memo(
  ({
    message,
    isGenerating,
    onEdit,
    onCopy,
    isCopied,
  }: {
    message: UIMessage;
    isGenerating: boolean;
    onEdit: (text: string) => void;
    onCopy: (id: string, text: string) => void;
    isCopied: boolean;
  }) => {
    const messageText =
      message.parts?.reduce(
        (acc, p) => (p.type === "text" ? acc + p.text : acc),
        "",
      ) || "";

    return (
      <div data-role={message.role} className="chat-message-wrapper">
        <div
          tabIndex={0}
          role="button"
          data-role={message.role}
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
          className="chat-message-bubble group"
        >
          <MessageActions
            role={message.role}
            messageId={message.id}
            messageText={messageText}
            isCopied={isCopied}
            onEdit={onEdit}
            onCopy={onCopy}
          />

          <div className="prose prose-sm dark:prose-invert max-w-none">
            <MessageContent message={message} text={messageText} />
            {isGenerating && (
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
  },
);

MessageBubble.displayName = "MessageBubble";

export const ThinkingIndicator = memo(() => (
  <div className="chat-thinking-wrapper">
    <div className="chat-thinking-indicator">
      <span className="chat-thinking-text">Thinking</span>
      <div className="chat-thinking-dot [animation-delay:-0.3s]"></div>
      <div className="chat-thinking-dot [animation-delay:-0.15s]"></div>
      <div className="chat-thinking-dot"></div>
    </div>
  </div>
));

ThinkingIndicator.displayName = "ThinkingIndicator";
