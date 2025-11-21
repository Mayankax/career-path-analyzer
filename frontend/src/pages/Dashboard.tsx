import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function Dashboard() {
  const location = useLocation();
  const { targetRole, skills } = location.state || {};

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
          Target Role: <span className="font-medium">{targetRole}</span>
        </p>
      </div>

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Skill Gap */}
        <Card className="shadow-md border rounded-xl bg-white">
          <CardHeader>
            <CardTitle className="text-xl">Skill Gap Analysis</CardTitle>
            <p className="text-sm text-gray-500">
              Based on your target role and current skills.
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">Loading skill gap results...</p>
          </CardContent>
        </Card>

        {/* Roadmap */}
        <Card className="shadow-md border rounded-xl bg-white">
          <CardHeader>
            <CardTitle className="text-xl">Career Roadmap</CardTitle>
            <p className="text-sm text-gray-500">
              Step-by-step plan to reach your goal.
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">Loading roadmap...</p>
          </CardContent>
        </Card>

      </div>

      <Separator />

      {/* Bottom News Section */}
      <Card className="shadow-md border rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-xl">Latest Tech News</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">Fetching top 5 tech stories...</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
