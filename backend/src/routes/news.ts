import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const topStories = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );

    const top5 = topStories.data.slice(0, 5);

    const stories = await Promise.all(
      top5.map(async (id: number) => {
        const story = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return story.data;
      })
    );

    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

export default router;
