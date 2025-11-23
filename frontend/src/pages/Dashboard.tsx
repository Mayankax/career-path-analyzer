import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getSkillGap, getRoadmap, getHackerNews } from "@/lib/api";
import {
  Brain,
  Map,
  Newspaper,
  CheckCircle,
  XCircle,
  Rocket,
} from "lucide-react";

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
      className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6 md:p-10 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Page Header */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <Rocket className="text-indigo-600" /> Career Dashboard
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Target Role:{" "}
          <span className="font-semibold text-indigo-700">{targetRole}</span>
        </p>
      </motion.div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Gap Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border border-indigo-100 shadow-lg rounded-2xl hover:shadow-indigo-100 transition-all duration-300 bg-white">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-indigo-700">
                <Brain className="w-5 h-5" /> Skill Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!skillGap ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ) : (
                <div
                  className="max-h-[350px] overflow-y-auto pr-2
                              scrollbar-thin scrollbar-thumb-indigo-300 
                              scrollbar-track-indigo-100 rounded-lg space-y-6"
                >
                  {/* Matched Skills */}
                  <div>
                    <p className="font-semibold text-gray-800 flex items-center gap-2">
                      <CheckCircle className="text-green-600 w-5 h-5" />
                      Matched Skills
                    </p>

                    <ul className="list-disc ml-6 mt-2 text-green-600 space-y-1">
                      {skillGap.matchedSkills.length ? (
                        skillGap.matchedSkills.map((s: string) => (
                          <li key={s}>{s}</li>
                        ))
                      ) : (
                        <li className="text-gray-400 italic">
                          No skills matched yet.
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Missing Skills */}
                  <div>
                    <p className="font-semibold text-gray-800 flex items-center gap-2">
                      <XCircle className="text-red-500 w-5 h-5" />
                      Missing Skills
                    </p>

                    <ul className="list-disc ml-6 mt-2 text-red-600 space-y-1">
                      {skillGap.missingSkills.length ? (
                        skillGap.missingSkills.map((s: string) => (
                          <li key={s}>{s}</li>
                        ))
                      ) : (
                        <li className="text-gray-400 italic">
                          You have all the required skills!
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        </motion.div>

        {/* Roadmap Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border border-indigo-100 shadow-lg rounded-2xl hover:shadow-indigo-100 transition-all duration-300 bg-white">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-indigo-700">
                <Map className="w-5 h-5" /> Career Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!roadmap ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ) : (
                <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2 
                                scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100 rounded-lg">
                  {roadmap.map((phase: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className="font-semibold text-indigo-800 text-lg">
                        {phase.phase}
                      </p>
                      <ul className="list-disc ml-6 text-gray-700 space-y-1">
                        {phase.items.length ? (
                          phase.items.map((item: string) => <li key={item}>{item}</li>)
                        ) : (
                          <li className="text-gray-400 italic">
                            You already know all skills in this phase!
                          </li>
                        )}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              )}

            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Divider */}
      <Separator className="my-8 bg-indigo-200" />

      {/* Hacker News Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border border-indigo-100 shadow-md rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 text-indigo-700">
              <Newspaper className="w-5 h-5" /> Latest Tech News
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!news.length ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            ) : (
              <ul className="space-y-5">
                {news.map((n: any) => (
                  <motion.li
                    key={n.id}
                    className="border rounded-xl p-4 hover:bg-indigo-50 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <a
                      href={n.url}
                      target="_blank"
                      className="font-semibold text-indigo-700 hover:underline"
                    >
                      {n.title}
                    </a>
                    <p className="text-sm text-gray-700 mt-1">
                      Score: {n.score} • By: {n.by}
                    </p>
                    <p className="text-sm text-gray-600">
                      Type: {n.type || "story"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(n.time * 1000).toLocaleString()}
                    </p>
                  </motion.li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
