/* eslint-disable react/display-name, @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi, beforeEach } from "vitest";

import { render, act, fireEvent } from "@testing-library/react";

import ChatWidgetClient from "./client";

// Mocks
const mockToggleChat = vi.fn();
const mockHandleInputChange = vi.fn();
const mockHandleSubmit = vi.fn();
const mockStop = vi.fn();
const mockReset = vi.fn();
const mockSetInput = vi.fn();
const mockCopyToClipboard = vi.fn();
const mockHandleEdit = vi.fn();
const mockHandleSuggestedQuestion = vi.fn();

let mockMessages: any[] = [];
let mockIsRunning = false;

const mockRuntime: any = {
  thread: {
    getState: () => ({
      messages: mockMessages,
      isRunning: mockIsRunning,
    }),
  },
};

let mockUseChatWidgetResult: any = {};

vi.mock("./use-chat-widget", () => ({
  useChatWidget: () => mockUseChatWidgetResult,
}));

vi.mock("@assistant-ui/react", () => ({
  AssistantRuntimeProvider: ({ children }: any) => <div>{children}</div>,
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
    mockMessages = [];
    mockIsRunning = false;
    mockUseChatWidgetResult = {
      runtime: mockRuntime,
      isOpen: false,
      toggleChat: mockToggleChat,
      input: "",
      handleInputChange: mockHandleInputChange,
      handleSubmit: mockHandleSubmit,
      stop: mockStop,
      reset: mockReset,
      scrollRef: { current: null },
      inputRef: { current: null },
      copiedId: null,
      copyToClipboard: mockCopyToClipboard,
      handleEdit: mockHandleEdit,
      handleSuggestedQuestion: mockHandleSuggestedQuestion,
      isFilterBarVisible: false,
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
    const {
      getAllByLabelText,
      getByText,
      getByPlaceholderText,
      getByLabelText,
    } = render(<ChatWidgetClient />);

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
    mockMessages = [];
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

  it("should focus the input textarea after a suggested question is triggered", () => {
    mockUseChatWidgetResult.isOpen = true;
    mockMessages = [];

    const { getByText, getByLabelText } = render(<ChatWidgetClient />);
    const textarea = getByLabelText("Ask a question to Miro");
    const focusSpy = vi.spyOn(textarea, "focus");

    mockHandleSuggestedQuestion.mockImplementation(() => {
      textarea.focus();
    });

    const suggestedQuestion = getByText("What was his PhD research about?");

    act(() => {
      suggestedQuestion.click();
    });

    expect(focusSpy).toHaveBeenCalled();
  });

  it("should render messages list, typing indicator and stop button when loading", () => {
    mockUseChatWidgetResult.isOpen = true;
    mockIsRunning = true;
    mockMessages = [
      {
        id: "1",
        role: "user",
        content: [{ type: "text", text: "Tell me about Amr" }],
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
    expect(mockReset).toHaveBeenCalled();
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
});
