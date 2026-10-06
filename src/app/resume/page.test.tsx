import { describe, it, expect, vi } from "vitest";

import { render, screen, fireEvent, within } from "@testing-library/react";

import resumeJson from "@/data/resume.json";

import ResumePage, { metadata } from "./page";

describe("ResumePage", () => {
  it("exports correct Next.js SEO metadata", () => {
    expect(metadata.title).toBe("Amr Abed - Resume");
    expect(metadata.description).toBe(
      "Professional resume of Amr Abed — Engineering Manager, PhD in Computer Engineering, AWS Certified, Cloud & AI Architect.",
    );
  });

  it("renders header with name, label, tagline, and contact links from resume.json", () => {
    render(<ResumePage />);

    const header = screen.getByRole("banner");
    expect(
      within(header).getByRole("heading", {
        name: resumeJson.basics.name,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(
      within(header).getByText(resumeJson.basics.label),
    ).toBeInTheDocument();
    expect(
      within(header).getByText(resumeJson.basics.tagline),
    ).toBeInTheDocument();

    const websiteLink = within(header).getByRole("link", {
      name: /amrabed\.com/i,
    });
    expect(websiteLink).toHaveAttribute("href", resumeJson.basics.url);

    const linkedInLink = within(header).getByRole("link", {
      name: /linkedin/i,
    });
    expect(linkedInLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/amrabed",
    );

    const githubLink = within(header).getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://www.github.com/amrabed",
    );
  });

  it("renders Download PDF button pointing to /AmrAbed.pdf", () => {
    render(<ResumePage />);

    const downloadLink = screen.getByRole("link", { name: /download pdf/i });
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute("href", "/AmrAbed.pdf");
    expect(downloadLink).toHaveAttribute("download");
  });

  it("renders Print button triggering window.print()", () => {
    const printSpy = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<ResumePage />);

    const printButton = screen.getByRole("button", { name: /print/i });
    expect(printButton).toBeInTheDocument();

    fireEvent.click(printButton);
    expect(printSpy).toHaveBeenCalledTimes(1);

    printSpy.mockRestore();
  });

  it("renders summary narrative from resume.json", () => {
    render(<ResumePage />);

    expect(screen.getByText(resumeJson.basics.summary)).toBeInTheDocument();
  });

  it("renders experience items from resume.json", () => {
    render(<ResumePage />);

    const expSection = screen.getByRole("region", { name: /^experience$/i });
    const articles = within(expSection).getAllByRole("article");
    expect(articles.length).toBe(resumeJson.positions.length);

    const firstArticle = articles[0];
    const firstPosition = resumeJson.positions[0];
    expect(
      within(firstArticle).getByRole("heading", {
        name: new RegExp(firstPosition.title, "i"),
      }),
    ).toBeInTheDocument();
    expect(
      within(firstArticle).getByRole("link", {
        name: firstPosition.organization.name,
      }),
    ).toHaveAttribute("href", firstPosition.organization.url);
    expect(
      within(firstArticle).getByText(firstPosition.tasks[0]),
    ).toBeInTheDocument();
  });

  it("renders education degrees from resume.json", () => {
    render(<ResumePage />);

    const eduSection = screen.getByRole("region", { name: /^education$/i });
    const firstDegree = resumeJson.degrees[0];
    expect(
      within(eduSection).getByRole("heading", {
        name: new RegExp(firstDegree.title, "i"),
      }),
    ).toBeInTheDocument();
    expect(
      within(eduSection).getAllByText(firstDegree.university.name).length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      within(eduSection).getByText(firstDegree.duration),
    ).toBeInTheDocument();
  });

  it("renders skills domains, certifications, and publications/projects", () => {
    render(<ResumePage />);

    // Skills
    expect(
      screen.getByRole("heading", { name: /skills & competencies/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Cloud:/i)).toBeInTheDocument();
    expect(screen.getByText(/Machine Learning:/i)).toBeInTheDocument();

    // Certifications
    const certSection = screen.getByRole("region", {
      name: /^certifications$/i,
    });
    const firstCert = resumeJson.certifications[0];
    expect(within(certSection).getByText(firstCert.title)).toBeInTheDocument();
    expect(within(certSection).getByText(firstCert.date)).toBeInTheDocument();

    // Publications & Projects
    expect(
      screen.getByRole("heading", { name: /publications & projects/i }),
    ).toBeInTheDocument();
  });
});
