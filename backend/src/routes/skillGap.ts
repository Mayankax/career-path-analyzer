import { Router } from "express";
import rawRolesData from "../data/roles.json" with { type: "json" };

type RolesDataType = Record<string, string[]>;

// Cast JSON so TS knows its structure
const rolesData: RolesDataType = rawRolesData;

const router = Router();

// Convert keys to lowercase for flexible matching
const normalizedRoles: RolesDataType = {};
for (const role of Object.keys(rolesData)) {
  const value = rolesData[role];
  if (Array.isArray(value)) {
    normalizedRoles[role.toLowerCase()] = value;
  }
}

// Normalize a skill string
const normalize = (skill: string) => skill.trim().toLowerCase();

router.post("/", (req, res) => {
  const { targetRole, currentSkills } = req.body;

  if (!targetRole || !currentSkills) {
    return res
      .status(400)
      .json({ error: "targetRole and currentSkills are required." });
  }

  const roleKey = normalize(targetRole);
  const requiredSkills = normalizedRoles[roleKey] || [];

  const normalizedUserSkills = currentSkills.map(normalize);

  // Matched skills
  const matchedSkills = requiredSkills.filter((skill) =>
    normalizedUserSkills.includes(normalize(skill))
  );

  // Missing skills
  const missingSkills = requiredSkills.filter(
    (skill) => !normalizedUserSkills.includes(normalize(skill))
  );

  // Recommendations
  const recommendations = missingSkills.map(
    (skill) => `Learn ${skill} and build a mini-project using it.`
  );

  // Suggested learning order: missing skills first
  const suggestedLearningOrder = [...missingSkills, ...matchedSkills];

  res.json({
    targetRole,
    matchedSkills,
    missingSkills,
    recommendations,
    suggestedLearningOrder,
  });
});

export default router;
