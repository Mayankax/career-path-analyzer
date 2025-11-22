import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // backend URL
});

export const getSkillGap = (payload: any) =>
  API.post("/api/skill-gap", payload);

export const getRoadmap = (payload: any) =>
  API.post("/api/roadmap", payload);

export const getHackerNews = () =>
  API.get("/api/hackernews");
