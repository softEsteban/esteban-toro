"use client";

import { motion } from "framer-motion";

interface Quest {
  number: string;
  title: string;
  challenge: string;
  solution: string;
  impact: string;
  tags: string[];
  status: "COMPLETED";
}

const QUESTS: Quest[] = [
  {
    number: "014",
    title: "Student Tracking Platform",
    challenge:
      "An educational institution needed to track hundreds of students across programs with no unified system.",
    solution:
      "Built a full-stack platform with automated status tracking, alerts, and reporting dashboards.",
    impact: "Saved administrative teams dozens of hours monthly.",
    tags: ["Internal Tool", "Automation", "Dashboard"],
    status: "COMPLETED",
  },
  {
    number: "021",
    title: "AI Travel Planner",
    challenge:
      "Travel advisors were spending hours manually researching and composing itineraries for clients.",
    solution:
      "Developed an AI-powered planning system that generates personalized travel itineraries in minutes.",
    impact: "Reduced trip research time significantly. Advisors 3x output.",
    tags: ["AI Agent", "SaaS", "Automation"],
    status: "COMPLETED",
  },
  {
    number: "032",
    title: "Restaurant Loyalty System",
    challenge:
      "A restaurant chain had no digital loyalty program — customers weren't returning.",
    solution:
      "Built a points-based loyalty platform with QR check-ins, rewards tracking, and engagement flows.",
    impact: "Improved customer retention and repeat visit rates measurably.",
    tags: ["Product", "CRM", "Growth"],
    status: "COMPLETED",
  },
  {
    number: "041",
    title: "Business Intelligence Dashboard",
    challenge:
      "Executives were making decisions without real-time visibility — data was siloed across departments.",
    solution:
      "Created a unified BI dashboard that aggregates data from multiple sources into one live view.",
    impact: "Unified reporting. Faster decisions. One source of truth.",
    tags: ["Data", "Dashboard", "BI"],
    status: "COMPLETED",
  },
  {
    number: "055",
    title: "Lead Generation Platform",
    challenge:
      "A B2B company was relying purely on referrals with no systematic outbound motion.",
    solution:
      "Designed and deployed an automated lead gen system with targeting, enrichment, and outreach sequences.",
    impact: "Created a reliable pipeline of qualified leads from cold audiences.",
    tags: ["Lead Gen", "Automation", "Growth"],
    status: "COMPLETED",
  },
  {
    number: "063",
    title: "Business Automation System",
    challenge:
      "A services company had repetitive manual processes consuming 40%+ of team capacity.",
    solution:
      "Mapped and automated critical workflows using AI + no-code tools, freeing the team entirely.",
    impact: "Reclaimed ~20 hours per week of team capacity.",
    tags: ["Automation", "AI", "OPS"],
    status: "COMPLETED",
  },
];

export default function QuestBoard() {
  return (
    <section
      id="quests"
      className="py-24 px-6 bg-[#050508] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-3">
            ◈ Quest Log
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Completed Quests
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Real challenges. Real solutions. Real results.
          </p>
        </motion.div>

        {/* Quest grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {QUESTS.map((quest, i) => (
            <motion.div
              key={quest.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-zinc-800 bg-[#0a0a10] p-6 overflow-hidden transition-colors duration-300 hover:border-zinc-700"
            >
              {/* Subtle top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Quest number + status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-600 tracking-widest">
                  QUEST #{quest.number}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-900/50 text-emerald-400 border border-emerald-800/50">
                  ✓ {quest.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-lg mb-4 leading-tight">
                {quest.title}
              </h3>

              {/* Challenge / Solution / Impact */}
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">
                    Challenge
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {quest.challenge}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">
                    Solution
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {quest.solution}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-indigo-500/70 uppercase tracking-wider mb-1">
                    Impact
                  </p>
                  <p className="text-indigo-300 text-sm font-medium leading-relaxed">
                    {quest.impact}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {quest.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-zinc-600 text-sm font-mono mt-12"
        >
          More quests in progress. New ones starting soon.
        </motion.p>
      </div>
    </section>
  );
}
