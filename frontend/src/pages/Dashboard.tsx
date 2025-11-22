import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { getSkillGap, getRoadmap, getHackerNews } from "@/lib/api";

export default function Dashboard() {
  const location = useLocation();
  const { targetRole, skills } = location.state || {};

  const [skillGap, setSkillGap] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    getSkillGap({ targetRole, currentSkills: skills }).then((res) => {
      setSkillGap(res.data);
    });

    getRoadmap({ targetRole, currentSkills: skills }).then((res) => {
      setRoadmap(res.data.roadmap);
    });

    getHackerNews().then((res) => {
      setNews(res.data);
    });
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-100 p-6 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Career Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Target Role: <span className="font-semibold">{targetRole}</span>
        </p>
      </div>

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Skill Gap */}
        <Card className="shadow-md border rounded-xl bg-white">
          <CardHeader>
            <CardTitle className="text-xl">Skill Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {!skillGap ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ) : (
              <div>
                <p className="font-semibold">Matched Skills:</p>
                <ul className="list-disc ml-6 text-green-600">
                  {skillGap.matchedSkills.map((s: string) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>

                <p className="font-semibold mt-4">Missing Skills:</p>
                <ul className="list-disc ml-6 text-red-600">
                  {skillGap.missingSkills.map((s: string) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Roadmap */}
        <Card className="shadow-md border rounded-xl bg-white">
          <CardHeader>
            <CardTitle className="text-xl">Career Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            {!roadmap ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ) : (
              <div className="space-y-4">
                {roadmap.map((phase: any, i: number) => (
                  <div key={i}>
                    <p className="font-semibold">{phase.phase}</p>
                    <ul className="list-disc ml-6 text-gray-700">
                      {phase.items.map((item: string) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </div>

      <Separator />

      {/* HackerNews Section */}
      <Card className="shadow-md border rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-xl">Latest Tech News</CardTitle>
        </CardHeader>
        <CardContent>
          {!news.length ? (
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          ) : (
            <ul className="space-y-4">
              {news.map((n: any) => (
                <li key={n.id} className="border-b pb-3">
                  <a
                    href={n.url}
                    target="_blank"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {n.title}
                  </a>

                  <p className="text-sm text-gray-700">
                    Score: {n.score} • By: {n.by}
                  </p>

                  <p className="text-sm text-gray-600">
                    Type: {n.type || "story"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(n.time * 1000).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
