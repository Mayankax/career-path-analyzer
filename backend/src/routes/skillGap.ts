import { Router } from "express";
import rolesData from "../data/roles.json" with { type: "json" };

type RolesDataType = Record<string, string[]>;

const typedRolesData = rolesData as RolesDataType;

const router = Router();

router.post("/", (req, res) => {
  const { targetRole, currentSkills } = req.body;

  const requiredSkills = typedRolesData[targetRole] || [];

  const matched = currentSkills.filter((s: string) =>
    requiredSkills.includes(s)
  );

  const missing = requiredSkills.filter(
    (s: string) => !currentSkills.includes(s)
  );

  res.json({
    targetRole,
    matchedSkills: matched,
    missingSkills: missing,
    recommendations: missing.map(
      (skill) => `Learn ${skill} and build a small project.`
    ),
  });
});

export default router;
