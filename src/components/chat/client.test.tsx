/* eslint-disable react/display-name, @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi, beforeEach } from "vitest";

import { render, act, fireEvent } from "@testing-library/react";

import ChatWidgetClient from "./client";

// Mocks
const mockToggleChat = vi.fn();
const mockHandleInputChange = vi.fn();
const mockHandleSubmit = vi.fn();
const mockStop = vi.fn();
const mockSetMessages = vi.fn();
const mockSetInput = vi.fn();
const mockCopyToClipboard = vi.fn();
const mockHandleEdit = vi.fn();
const mockHandleSuggestedQuestion = vi.fn();

let mockUseChatWidgetResult: any = {};

vi.mock("./use-chat-widget", () => ({
  useChatWidget: () => mockUseChatWidgetResult,
}));

vi.mock("@heroui/react", async (importOriginal) => {
  const actual: any = await importOriginal();
  const MockTooltip = ({ children }: any) => <div>{children}</div>;
  MockTooltip.Trigger = ({ children }: any) => <>{children}</>;
  MockTooltip.Content = ({ children }: any) => <div>{children}</div>;
  MockTooltip.Arrow = () => null;

  return {
    ...actual,
    Tooltip: MockTooltip,
  };
});

describe("ChatWidgetClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseChatWidgetResult = {
      isOpen: false,
      toggleChat: mockToggleChat,
      input: "",
      handleInputChange: mockHandleInputChange,
      handleSubmit: mockHandleSubmit,
      messages: [],
      isLoading: false,
      error: null,
      getErrorMessage: () => "",
      stop: mockStop,
      scrollRef: { current: null },
      inputRef: { current: null },
      copiedId: null,
      copyToClipboard: mockCopyToClipboard,
      handleEdit: mockHandleEdit,
      handleSuggestedQuestion: mockHandleSuggestedQuestion,
      isFilterBarVisible: false,
      status: "idle",
      setMessages: mockSetMessages,
      setInput: mockSetInput,
    };
  });

  it("should render only toggle button when chat is closed", () => {
    const { getByLabelText, queryByText } = render(<ChatWidgetClient />);

    expect(getByLabelText("Open AI assistant")).toBeInTheDocument();
    expect(queryByText("Miro — Amr's Assistant")).not.toBeInTheDocument();

    act(() => {
      getByLabelText("Open AI assistant").click();
    });
    expect(mockToggleChat).toHaveBeenCalled();
  });

  it("should render chat window and its contents when open", () => {
    mockUseChatWidgetResult.isOpen = true;
    const { getAllByLabelText, getByText, getByPlaceholderText, getByLabelText } = render(
      <ChatWidgetClient />,
    );

    expect(getByText("Miro — Amr's Assistant")).toBeInTheDocument();
    expect(getAllByLabelText("Close AI assistant").length).toBe(2);
    expect(getByPlaceholderText("Ask a question...")).toBeInTheDocument();
    expect(getByLabelText("Ask a question to Miro")).toBeInTheDocument();

    const textarea = getByLabelText("Ask a question to Miro");
    act(() => {
      fireEvent.change(textarea, { target: { value: "Hello" } });
    });
    expect(mockHandleInputChange).toHaveBeenCalled();
  });

  it("should render suggested questions when empty and not loading", () => {
    mockUseChatWidgetResult.isOpen = true;
    mockUseChatWidgetResult.messages = [];
    const { getByText } = render(<ChatWidgetClient />);

    const suggestedQuestion = getByText("What was his PhD research about?");
    expect(suggestedQuestion).toBeInTheDocument();

    act(() => {
      suggestedQuestion.click();
    });
    expect(mockHandleSuggestedQuestion).toHaveBeenCalledWith(
      "What was his PhD research about?",
    );
  });

  it("should render messages list, typing indicator and stop button when loading", () => {
    mockUseChatWidgetResult.isOpen = true;
    mockUseChatWidgetResult.isLoading = true;
    mockUseChatWidgetResult.status = "submitted";
    mockUseChatWidgetResult.messages = [
      {
        id: "1",
        role: "user",
        content: "Tell me about Amr",
        parts: [{ type: "text", text: "Tell me about Amr" }],
      },
    ];

    const { getByLabelText, getByText, queryByLabelText } = render(
      <ChatWidgetClient />,
    );

    expect(getByText("Tell me about Amr")).toBeInTheDocument();
    expect(getByLabelText("Stop generating")).toBeInTheDocument();
    expect(queryByLabelText("Send message")).not.toBeInTheDocument();

    // Reset button is visible since messages.length > 0
    const resetBtn = getByLabelText("Reset conversation");
    expect(resetBtn).toBeInTheDocument();

    act(() => {
      resetBtn.click();
    });
    expect(mockStop).toHaveBeenCalled();
    expect(mockSetMessages).toHaveBeenCalledWith([]);
    expect(mockSetInput).toHaveBeenCalledWith("");
  });

  it("should trigger form submit on key down Enter without Shift key", () => {
    mockUseChatWidgetResult.isOpen = true;
    mockUseChatWidgetResult.input = "Question";
    const { getByLabelText } = render(<ChatWidgetClient />);

    const textarea = getByLabelText("Ask a question to Miro");
    act(() => {
      fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });
    });

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("should allow shift Enter key down to add newlines without submit", () => {
    mockUseChatWidgetResult.isOpen = true;
    mockUseChatWidgetResult.input = "Question";
    const { getByLabelText } = render(<ChatWidgetClient />);

    const textarea = getByLabelText("Ask a question to Miro");
    act(() => {
      fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });
    });

    expect(mockHandleSubmit).not.toHaveBeenCalled();
  });

  it("should render error message when error is present", () => {
    mockUseChatWidgetResult.isOpen = true;
    mockUseChatWidgetResult.error = new Error("Failed to generate response");
    mockUseChatWidgetResult.getErrorMessage = () => "An error occurred. Please try again later.";
    const { getByText } = render(<ChatWidgetClient />);

    expect(getByText("An error occurred. Please try again later.")).toBeInTheDocument();
  });
});
