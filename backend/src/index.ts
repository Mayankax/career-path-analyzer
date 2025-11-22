import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import skillGapRoutes from "./routes/skillGap.js";
import roadmapRoutes from "./routes/roadmap.js";
import newsRoutes from "./routes/news.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Career Analyzer Backend Running (TS + MongoDB)");
});

app.use("/api/skill-gap", skillGapRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/hackernews", newsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
