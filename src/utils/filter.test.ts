/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";

import {
  filterByArea,
  filterByQuery,
  filterBySelection,
  match,
} from "./filter";

describe("filter utils", () => {
  describe("match", () => {
    it("should return true if query matches a value case-insensitively", () => {
      expect(match(["React", "TypeScript"], "react")).toBe(true);
      expect(match(["React", "TypeScript"], "typescript")).toBe(true);
    });

    it("should return false if query does not match any value", () => {
      expect(match(["React", "TypeScript"], "vue")).toBe(false);
    });

    it("should return false for an empty array", () => {
      expect(match([], "react")).toBe(false);
    });
  });

  describe("filterBySelection", () => {
    it("should return true if selection set is empty", () => {
      const selectionSet = new Set<string>();
      expect(filterBySelection(["React"], selectionSet)).toBe(true);
    });

    it("should return true if value is in selection set case-insensitively", () => {
      const selectionSet = new Set(["react", "typescript"]);
      expect(filterBySelection(["React"], selectionSet)).toBe(true);
    });

    it("should return false if value is not in selection set", () => {
      const selectionSet = new Set(["vue"]);
      expect(filterBySelection(["React"], selectionSet)).toBe(false);
    });
  });

  describe("filterByArea", () => {
    it("should correctly proxy to filterBySelection", () => {
      const selectionSet = new Set(["frontend"]);
      expect(filterByArea(["Frontend", "Backend"], selectionSet)).toBe(true);
      expect(filterByArea(["Database"], selectionSet)).toBe(false);
    });
  });

  describe("filterByQuery", () => {
    it("should return true if query is empty", () => {
      const item = { name: "Project Name", description: "Desc" };
      expect(filterByQuery(item as any, "")).toBe(true);
    });

    it("should return false for unsupported items", () => {
      const item = { id: "123" };
      expect(filterByQuery(item as any, "query")).toBe(false);
    });

    describe("Project filtering", () => {
      const project = {
        name: "My Project",
        description: "A cool React application",
        roles: ["Developer"],
        tools: ["Vite", "TypeScript"],
        tags: ["web"],
      };

      it("should match project by name", () => {
        expect(filterByQuery(project as any, "my project")).toBe(true);
      });

      it("should match project by description", () => {
        expect(filterByQuery(project as any, "cool react")).toBe(true);
      });

      it("should match project by roles", () => {
        expect(filterByQuery(project as any, "developer")).toBe(true);
      });

      it("should match project by tools", () => {
        expect(filterByQuery(project as any, "vite")).toBe(true);
        expect(filterByQuery(project as any, "typescript")).toBe(true);
      });

      it("should match project by tags", () => {
        expect(filterByQuery(project as any, "web")).toBe(true);
      });

      it("should return false if query does not match", () => {
        expect(filterByQuery(project as any, "angular")).toBe(false);
      });

      it("should handle missing optional fields gracefully", () => {
        const minimalProject = {
          name: "Mini Project",
          description: "Desc",
        };
        expect(filterByQuery(minimalProject as any, "desc")).toBe(true);
        expect(filterByQuery(minimalProject as any, "mini")).toBe(true);
        expect(filterByQuery(minimalProject as any, "nonexistent")).toBe(false);
      });
    });

    describe("Degree filtering", () => {
      const degree = {
        title: "Bachelor of Science",
        university: { name: "MIT" },
      };

      it("should match degree by title", () => {
        expect(filterByQuery(degree as any, "bachelor")).toBe(true);
      });

      it("should match degree by university name", () => {
        expect(filterByQuery(degree as any, "mit")).toBe(true);
      });

      it("should return false if query does not match", () => {
        expect(filterByQuery(degree as any, "stanford")).toBe(false);
      });
    });

    describe("Certification filtering", () => {
      const cert = {
        title: "AWS Solutions Architect",
        organization: { name: "Amazon" },
        badge: "aws-badge.png",
        skills: ["AWS", "Cloud"],
        areas: ["Infrastructure"],
      };

      it("should match certification by title", () => {
        expect(filterByQuery(cert as any, "architect")).toBe(true);
      });

      it("should match certification by organization name", () => {
        expect(filterByQuery(cert as any, "amazon")).toBe(true);
      });

      it("should match certification by skills", () => {
        expect(filterByQuery(cert as any, "aws")).toBe(true);
      });

      it("should match certification by areas", () => {
        expect(filterByQuery(cert as any, "infrastructure")).toBe(true);
      });

      it("should return false if query does not match", () => {
        expect(filterByQuery(cert as any, "azure")).toBe(false);
      });

      it("should handle missing optional fields gracefully", () => {
        const minimalCert = {
          title: "AWS Certification",
          organization: { name: "Amazon" },
          badge: "badge.png",
        };
        expect(filterByQuery(minimalCert as any, "amazon")).toBe(true);
        expect(filterByQuery(minimalCert as any, "nonexistent")).toBe(false);
      });
    });

    describe("Publication filtering", () => {
      const pub = {
        title: "Deep Learning Research",
        venue: "Nature",
        authors: ["Amr Abed", "John Doe"],
        roles: ["Primary Author"],
        skills: ["PyTorch", "Python"],
        tags: ["AI"],
      };

      it("should match publication by title", () => {
        expect(filterByQuery(pub as any, "learning")).toBe(true);
      });

      it("should match publication by venue", () => {
        expect(filterByQuery(pub as any, "nature")).toBe(true);
      });

      it("should match publication by authors", () => {
        expect(filterByQuery(pub as any, "amr")).toBe(true);
      });

      it("should match publication by roles", () => {
        expect(filterByQuery(pub as any, "primary")).toBe(true);
      });

      it("should match publication by skills", () => {
        expect(filterByQuery(pub as any, "pytorch")).toBe(true);
      });

      it("should match publication by tags", () => {
        expect(filterByQuery(pub as any, "ai")).toBe(true);
      });

      it("should return false if query does not match", () => {
        expect(filterByQuery(pub as any, "blockchain")).toBe(false);
      });

      it("should handle missing optional fields gracefully", () => {
        const minimalPub = {
          title: "Mini Pub",
          venue: "Nature",
          authors: ["Amr"],
        };
        expect(filterByQuery(minimalPub as any, "nature")).toBe(true);
        expect(filterByQuery(minimalPub as any, "nonexistent")).toBe(false);
      });
    });

    describe("Position filtering", () => {
      const position = {
        title: "Senior Engineer",
        organization: { name: "Google" },
        roles: ["TLM"],
        skills: ["Golang", "C++"],
        tags: ["Distributed Systems"],
        tasks: ["Code Review", "Design Docs"],
      };

      it("should match position by title", () => {
        expect(filterByQuery(position as any, "engineer")).toBe(true);
      });

      it("should match position by organization name", () => {
        expect(filterByQuery(position as any, "google")).toBe(true);
      });

      it("should match position by roles", () => {
        expect(filterByQuery(position as any, "tlm")).toBe(true);
      });

      it("should match position by skills", () => {
        expect(filterByQuery(position as any, "golang")).toBe(true);
      });

      it("should match position by tags", () => {
        expect(filterByQuery(position as any, "distributed")).toBe(true);
      });

      it("should match position by tasks", () => {
        expect(filterByQuery(position as any, "code review")).toBe(true);
      });

      it("should return false if query does not match", () => {
        expect(filterByQuery(position as any, "marketing")).toBe(false);
      });

      it("should handle missing optional fields gracefully", () => {
        const minimalPos = {
          title: "Mini Pos",
          organization: { name: "Org" },
        };
        expect(filterByQuery(minimalPos as any, "org")).toBe(true);
        expect(filterByQuery(minimalPos as any, "nonexistent")).toBe(false);
      });
    });
  });
});
