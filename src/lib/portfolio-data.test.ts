import { describe, expect, it } from "vitest";
import {
  learningItems,
  navItems,
  profile,
  contributions,
  projects,
  skills,
} from "./portfolio-data";

describe("portfolio content", () => {
  it("keeps the recruiter-critical profile details available", () => {
    expect(profile.name).toBe("Karim Aouaouda");
    expect(profile.role.toLowerCase()).toContain("laravel");
    expect(profile.summary.toLowerCase()).toContain("react native");
  });

  it("has dedicated navigation for projects and learning", () => {
    expect(navItems.map((item) => item.href)).toEqual(["/", "/projects", "/contributions", "/learn"]);
  });

  it("features at least three portfolio projects", () => {
    expect(projects.filter((project) => project.featured)).toHaveLength(3);
    expect(projects.some((project) => project.stack.includes("Laravel"))).toBe(true);
    expect(projects.some((project) => project.stack.includes("React Native"))).toBe(true);
  });

  it("has enough case-study detail for every project page", () => {
    projects.forEach((project) => {
      expect(project.problem.length).toBeGreaterThan(40);
      expect(project.solution.length).toBeGreaterThan(40);
      expect(project.responsibilities.length).toBeGreaterThan(1);
      expect(project.results.length).toBeGreaterThan(0);
      expect(project.mainImage).toMatch(/^\/.+\.(png|jpg|jpeg|webp)$/);
      expect(project.gallery.length).toBeGreaterThan(0);
    });
  });

  it("includes a contribution section separate from projects", () => {
    expect(contributions.length).toBeGreaterThanOrEqual(3);
    expect(contributions.some((item) => item.kind === "open-source")).toBe(true);
    expect(contributions.some((item) => item.kind === "startup")).toBe(true);
  });

  it("covers the requested skills and education content", () => {
    expect(skills.map((skill) => skill.title).join(" ")).toContain("Laravel");
    expect(skills.map((skill) => skill.title).join(" ")).toContain("Mobile");
    expect(learningItems).not.toHaveLength(0);
  });
});
