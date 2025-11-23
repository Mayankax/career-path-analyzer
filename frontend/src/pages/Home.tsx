import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Rocket, Target } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const [targetRole, setTargetRole] = useState("");
  const [skills, setSkills] = useState("");

  const handleAnalyze = () => {
    navigate("/dashboard", {
      state: {
        targetRole,
        skills: skills.split(",").map((s) => s.trim()),
      },
    });
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-xl rounded-2xl border border-indigo-100 bg-white">
          <CardHeader className="pb-3 text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Rocket className="text-indigo-600 w-7 h-7" />
              Career Path Analyzer
            </CardTitle>
            <p className="text-gray-600 text-sm mt-1">
              Understand your skill gaps and map your learning journey.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Target Role */}
            <div className="space-y-2">
              <Label className="font-medium flex items-center gap-2 text-gray-800">
                <Target className="w-4 h-4 text-indigo-600" />
                Target Role
              </Label>
              <Input
                placeholder="e.g., Backend Developer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Current Skills */}
            <div className="space-y-2">
              <Label className="font-medium text-gray-800">
                Current Skills (comma separated)
              </Label>
              <Textarea
                placeholder="Java, SQL, Git..."
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={3}
                className="w-full resize-none"
              />
            </div>

            {/* Button */}
            <Button
              className="w-full py-3 text-md bg-indigo-600 hover:bg-indigo-700 transition-all"
              onClick={handleAnalyze}
            >
              Analyze My Career Path
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
