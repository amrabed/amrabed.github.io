import { describe, it, expect, vi, beforeEach } from "vitest";

import { render, fireEvent, act } from "@testing-library/react";

import publications from "@/data/publications";

import PublicationCard from "./publication";

describe("PublicationCard", () => {
  beforeEach(() => {
    // Mock navigator.clipboard.writeText
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.defineProperty(globalThis, "navigator", {
      value: { clipboard: mockClipboard },
      writable: true,
    });
    vi.useFakeTimers();
  });

  it("renders correctly", () => {
    if (publications.length > 0) {
      const { getByText } = render(
        <PublicationCard publication={publications[0]} />,
      );
      expect(getByText(publications[0].title)).toBeInTheDocument();
    }
  });

  it("triggers and copies BibTeX successfully with visual feedback", async () => {
    if (publications.length > 0) {
      const { getByLabelText, getByText, queryByText } = render(
        <PublicationCard publication={publications[0]} />,
      );

      // Open Popover
      const citeBtn = getByLabelText("Cite");
      fireEvent.click(citeBtn);

      // Verify Popover content displays and the copy button is present
      const copyBtnBefore = getByLabelText("Copy BibTeX to clipboard");
      expect(copyBtnBefore).toBeInTheDocument();

      // Click the Copy BibTeX button
      fireEvent.click(copyBtnBefore);

      // Should show the copied checkmark, "Copied!" tooltip/state, and "Copied" text
      expect(navigator.clipboard.writeText).toHaveBeenCalled();

      const copyBtnAfter = getByLabelText("BibTeX copied");
      expect(copyBtnAfter).toBeInTheDocument();

      const copiedText = getByText("Copied");
      expect(copiedText).toBeInTheDocument();

      // Fast-forward timers by 2 seconds
      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // The button state should reset back to "Copy BibTeX to clipboard"
      expect(getByLabelText("Copy BibTeX to clipboard")).toBeInTheDocument();
      expect(queryByText("Copied")).not.toBeInTheDocument();
    }
  });
});
