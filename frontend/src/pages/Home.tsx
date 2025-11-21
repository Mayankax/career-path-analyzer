import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
      className="min-h-screen flex items-center justify-center bg-gray-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full max-w-xl shadow-md border rounded-xl bg-white p-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Career Path Analyzer
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Enter your current skills and your target role.
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label className="font-medium">Target Role</Label>
            <Input
              placeholder="e.g., Backend Developer"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Current Skills (comma separated)</Label>
            <Textarea
              placeholder="Java, SQL, Git..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              rows={3}
              className="w-full resize-none"
            />
          </div>

          <Button className="w-full py-3 text-md" onClick={handleAnalyze}>
            Analyze My Career Path
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
