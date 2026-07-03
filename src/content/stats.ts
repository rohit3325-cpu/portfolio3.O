import { skillCategories } from "./skills";

const technologiesUsed = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);

export const staticStats = {
  problemsSolved: 210,
  projectsBuilt: 11,
  technologiesUsed,
  hackathonFinals: 2,
  // Used only if the live GitHub fetch fails, so the counter never shows zero.
  fallbackContributions: 500,
};
