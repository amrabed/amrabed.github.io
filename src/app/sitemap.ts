import { MetadataRoute } from "next";

export const dynamic = "force-static";

interface GitHubRepo {
  name: string;
  fork: boolean;
  pushed_at: string;
  has_pages: boolean;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: "https://amrabed.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  try {
    const response = await fetch(
      "https://api.github.com/users/amrabed/repos?type=public&per_page=100",
    );
    const repos: GitHubRepo[] = await response.json();

    const repoEntries: MetadataRoute.Sitemap = repos
      .filter(
        (repo: GitHubRepo) =>
          !repo.fork && repo.name !== "amrabed.github.io" && repo.has_pages,
      )
      .map((repo: GitHubRepo) => ({
        url: `https://amrabed.com/${repo.name}`,
        lastModified: new Date(repo.pushed_at),
        changeFrequency: "monthly",
        priority: 0.6,
      }));

    return [...staticEntries, ...repoEntries];
  } catch (error) {
    console.error("Error fetching GitHub repos for sitemap:", error);
    return staticEntries;
  }
}
