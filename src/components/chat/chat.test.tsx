import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import ChatWidgetClient from "./client";

// Mock HeroUI components
vi.mock("@heroui/react", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    Button: ({ children, onPress, onClick, ...props }: any) => {
        // Filter out HeroUI-specific props that cause React warnings
        const { isIconOnly, variant, size, isDisabled, ...rest } = props;
        return (
            <button
                onClick={onPress || onClick}
                disabled={isDisabled}
                {...rest}
            >
                {children}
            </button>
        );
    },
  };
});

// Mock hooks and contexts
vi.mock("@/contexts/filter", () => ({
  useFilter: () => ({
    isFilterBarVisible: false,
  }),
}));

// Mock useChat hook
const mockSendMessage = vi.fn();
const mockStop = vi.fn();
let chatStatus = "idle";
let chatMessages: any[] = [];
let chatError: any = null;

vi.mock("@ai-sdk/react", () => ({
  useChat: () => ({
    messages: chatMessages,
    sendMessage: mockSendMessage,
    status: chatStatus,
    error: chatError,
    stop: mockStop,
  }),
}));

// Mock navigator.clipboard
const mockWriteText = vi.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

describe("ChatWidgetClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    chatStatus = "idle";
    chatMessages = [];
    chatError = null;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should toggle chat open and closed with correct aria-labels", () => {
    render(<ChatWidgetClient />);

    const toggleBtn = screen.getByRole("button", { name: "Open AI assistant" });
    expect(toggleBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(toggleBtn);
    });

    expect(screen.getByText("Miro — Amr's Assistant")).toBeInTheDocument();

    const closeButtons = screen.getAllByRole("button", { name: "Close AI assistant" });
    expect(closeButtons.length).toBe(2);

    act(() => {
        fireEvent.click(closeButtons[0]);
    });

    expect(screen.queryByText("Miro — Amr's Assistant")).not.toBeInTheDocument();
  });

  it("should allow sending a message", async () => {
    render(<ChatWidgetClient />);

    act(() => {
      fireEvent.click(screen.getByLabelText("Open AI assistant"));
    });

    const textarea = screen.getByPlaceholderText("Ask a question...") as HTMLTextAreaElement;
    const sendBtn = screen.getByLabelText("Send message");

    act(() => {
      fireEvent.change(textarea, { target: { value: "Hello Miro" } });
    });

    act(() => {
      fireEvent.click(sendBtn);
    });

    expect(mockSendMessage).toHaveBeenCalledWith({ text: "Hello Miro" });
    expect(textarea.value).toBe("");
  });

  it("should handle Enter key to send message", () => {
    render(<ChatWidgetClient />);
    act(() => {
      fireEvent.click(screen.getByLabelText("Open AI assistant"));
    });

    const textarea = screen.getByPlaceholderText("Ask a question...") as HTMLTextAreaElement;
    act(() => {
      fireEvent.change(textarea, { target: { value: "Hello Enter" } });
    });

    act(() => {
      fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });
    });

    expect(mockSendMessage).toHaveBeenCalledWith({ text: "Hello Enter" });
  });

  it("should show stop button and indicators when loading", () => {
    chatStatus = "submitted";
    chatMessages = [{ id: "1", role: "user", parts: [{ type: "text", text: "Wait" }] }];

    render(<ChatWidgetClient />);

    act(() => {
      fireEvent.click(screen.getByLabelText("Open AI assistant"));
    });

    expect(screen.getByText("Thinking")).toBeInTheDocument();

    const stopButtons = screen.getAllByLabelText("Stop generating");
    expect(stopButtons.length).toBeGreaterThan(0);

    act(() => {
      fireEvent.click(stopButtons[0]);
    });
    expect(mockStop).toHaveBeenCalled();
  });

  it("should show generating indicator when assistant message is streaming", () => {
    chatStatus = "streaming";
    chatMessages = [
        { id: "1", role: "user", parts: [{ type: "text", text: "Q" }] },
        { id: "2", role: "assistant", parts: [{ type: "text", text: "A" }] }
    ];

    render(<ChatWidgetClient />);
    act(() => {
      fireEvent.click(screen.getByLabelText("Open AI assistant"));
    });

    expect(screen.getByText("Generating...")).toBeInTheDocument();
  });

  it("should render messages and actions", () => {
    chatMessages = [
      { id: "1", role: "user", parts: [{ type: "text", text: "My question" }] },
      { id: "2", role: "assistant", parts: [{ type: "text", text: "My answer" }] }
    ];

    render(<ChatWidgetClient />);

    act(() => {
      fireEvent.click(screen.getByLabelText("Open AI assistant"));
    });

    expect(screen.getByText("My question")).toBeInTheDocument();
    expect(screen.getByText("My answer")).toBeInTheDocument();

    const editBtn = screen.getByLabelText("Edit question");
    const copyQuestionBtn = screen.getByLabelText("Copy question");
    const copyAnswerBtn = screen.getByLabelText("Copy answer");

    expect(editBtn).toBeInTheDocument();
    expect(copyQuestionBtn).toBeInTheDocument();
    expect(copyAnswerBtn).toBeInTheDocument();

    // Test edit
    act(() => {
        fireEvent.click(editBtn);
    });
    const textarea = screen.getByPlaceholderText("Ask a question...") as HTMLTextAreaElement;
    expect(textarea.value).toBe("My question");

    // Test copy question
    act(() => {
        fireEvent.click(copyQuestionBtn);
    });
    expect(mockWriteText).toHaveBeenCalledWith("My question");

    // Check for success state of copy
    expect(screen.getByLabelText("Copy question")).toBeInTheDocument();

    act(() => {
        vi.advanceTimersByTime(2000);
    });

    // Test copy answer
    act(() => {
        fireEvent.click(copyAnswerBtn);
    });
    expect(mockWriteText).toHaveBeenCalledWith("My answer");
  });

  it("should handle error messages", () => {
    chatError = { message: "429 Too Many Requests" };
    render(<ChatWidgetClient />);

    act(() => {
      fireEvent.click(screen.getByLabelText("Open AI assistant"));
    });

    expect(screen.getByText(/limit/)).toBeInTheDocument();
  });
});
