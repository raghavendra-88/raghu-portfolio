"use client";

import { motion } from "framer-motion";
import { staggerItemVariants } from "@/components/animations/StaggerReveal";
import { Skill } from "@/types";

export default function SkillBar({ skill }: { skill: Skill }) {
  return (
    <motion.div variants={staggerItemVariants} className="group">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-medium text-ink transition-colors group-hover:text-cyan-soft">
          {skill.name}
        </span>
        <span className="font-mono text-xs text-ink-faint">
          {skill.level}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-void-300">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-glow via-cyan-soft to-violet-glow"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />
      </div>
    </motion.div>
  );
}
