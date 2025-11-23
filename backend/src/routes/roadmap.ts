import { Router } from "express";
import rawRolesJson from "../data/roles.json" with { type: "json" };

// Define structure of roles.json
type RolesData = Record<string, string[]>;

// Safe cast JSON → typed
const rolesJson: RolesData = rawRolesJson;

const router = Router();

const normalize = (text: string) => text.trim().toLowerCase();

// Split skills into 3 phases
function splitIntoPhases(skills: string[]): [string[], string[], string[]] {
  const chunk = Math.ceil(skills.length / 3);
  return [
    skills.slice(0, chunk),
    skills.slice(chunk, chunk * 2),
    skills.slice(chunk * 2)
  ];
}

// Match skill ignoring case
function skillMatch(skill: string, userSkills: string[]) {
  return userSkills.some((s) => normalize(s) === normalize(skill));
}

// Resolve role dynamically
function getRoleSkills(role: string, roles: RolesData): string[] | null {
  if (roles[role]) return roles[role];

  const replaced = role.replace(/developer/i, "Developer");
  if (roles[replaced]) return roles[replaced];

  return null;
}

router.post("/", (req, res) => {
  const { targetRole, currentSkills } = req.body;

  if (!targetRole || !currentSkills) {
    return res.status(400).json({
      error: "targetRole and currentSkills are required",
    });
  }

  const allSkills = getRoleSkills(targetRole, rolesJson);

  if (!allSkills) {
    return res.status(404).json({
      error: "Roadmap not found.",
      availableRoles: Object.keys(rolesJson),
    });
  }

  // Split into phases
  const [phase1, phase2, phase3] = splitIntoPhases(allSkills);

  // Explicit typing removes "p.items possibly undefined" error
  type Phase = {
    phase: string;
    items: string[];
  };

  const phases: Phase[] = [
    { phase: "Phase 1 (1–2 months)", items: phase1 },
    { phase: "Phase 2 (1–2 months)", items: phase2 },
    { phase: "Phase 3 (1–2 months)", items: phase3 },
  ];

  // Remove skills user already knows
  const personalized = phases.map((p) => ({
    phase: p.phase,
    items: p.items.filter((item) => !skillMatch(item, currentSkills)),
  }));

  res.json({
    targetRole,
    roadmap: personalized,
  });
});

export default router;
