import { Router } from "express";

const router = Router();

const roadmaps: any = {
  "Backend Developer": [
    { phase: "Phase 1 (1–2 months)", items: ["Java basics", "OOP", "Git"] },
    { phase: "Phase 2 (2 months)", items: ["Spring Boot", "SQL", "APIs"] },
    { phase: "Phase 3 (1–2 months)", items: ["Deployment", "Projects", "System Design Basics"] }
  ],

  "Frontend Developer": [
    { phase: "Phase 1 (1–1.5 months)", items: ["HTML", "CSS", "JavaScript"] },
    { phase: "Phase 2 (1 month)", items: ["React", "Git"] },
    { phase: "Phase 3 (1–1.5 months)", items: ["Projects", "Deployment", "Responsive Design"] }
  ],

  "Data Analyst": [
    { phase: "Phase 1 (1 month)", items: ["Excel", "SQL basics"] },
    { phase: "Phase 2 (1.5 months)", items: ["Python", "Statistics"] },
    { phase: "Phase 3 (1–1.5 months)", items: ["Dashboards (Tableau/PowerBI)", "Case Studies", "Projects"] }
  ]
};


router.post("/", (req, res) => {
  const { targetRole, currentSkills } = req.body;

  const roadmap = roadmaps[targetRole] || [];

  // Remove skills user already knows
  const personalized = roadmap.map((phase: any) => ({
    phase: phase.phase,
    items: phase.items.filter(
      (item: string) =>
        !currentSkills.find(
          (skill: string) => skill.toLowerCase() === item.toLowerCase()
        )
    )
  }));

  res.json({
    targetRole,
    roadmap: personalized
  });
});


export default router;
