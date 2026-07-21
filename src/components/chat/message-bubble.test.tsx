/* eslint-disable react/display-name, @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from "vitest";

import React from "react";

import { render } from "@testing-library/react";

import { MessageBubble } from "./message-bubble";

// Mock HeroUI Tooltip and other components to simplify testing
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

describe("MessageBubble Link Sanitization", () => {
  const defaultProps = {
    isGenerating: false,
    onEdit: vi.fn(),
    onCopy: vi.fn(),
    isCopied: false,
  };

  it("should permit safe links like https and hash references", () => {
    const message = {
      id: "1",
      role: "assistant",
      content:
        "Check out [Amr's website](https://amrabed.com) and go to [#experience](#experience).",
      parts: [
        {
          type: "text",
          text: "Check out [Amr's website](https://amrabed.com) and go to [#experience](#experience).",
        },
      ],
    } as any;

    const { container } = render(
      <MessageBubble {...defaultProps} message={message} />,
    );

    const links = container.querySelectorAll("a");
    expect(links.length).toBe(2);
    expect(links[0].getAttribute("href")).toBe("https://amrabed.com");
    expect(links[1].getAttribute("href")).toBe("#experience");
  });

  it("should sanitize unsafe executable protocols to #", () => {
    const message = {
      id: "2",
      role: "assistant",
      content:
        "Try these: [XSS 1](javascript:alert(1)), [XSS 2](data:text/html,<script>alert(1)</script>), and [XSS 3](vbscript:msgbox).",
      parts: [
        {
          type: "text",
          text: "Try these: [XSS 1](javascript:alert(1)), [XSS 2](data:text/html,<script>alert(1)</script>), and [XSS 3](vbscript:msgbox).",
        },
      ],
    } as any;

    const { container } = render(
      <MessageBubble {...defaultProps} message={message} />,
    );

    const links = container.querySelectorAll("a");
    expect(links.length).toBe(3);
    expect(links[0].getAttribute("href")).toBe("#");
    expect(links[1].getAttribute("href")).toBe("#");
    expect(links[2].getAttribute("href")).toBe("#");
  });
});
