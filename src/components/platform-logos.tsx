"use client";

import { motion } from "framer-motion";

const platforms = [
  { name: "Meta Ads", color: "#4A90D9" },
  { name: "Facebook Ads", color: "#4A90D9" },
  { name: "Instagram Ads", color: "#8B5CF6" },
  { name: "WhatsApp Ads", color: "#10B981" },
];

export default function PlatformLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      {platforms.map((platform, i) => (
        <motion.div
          key={platform.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          whileHover={{
            scale: 1.05,
            boxShadow: `0 0 20px ${platform.color}25, 0 0 40px ${platform.color}10`,
          }}
          className="flex items-center justify-center px-5 py-3 rounded-xl
            bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm
            transition-colors duration-300
            hover:border-white/[0.12] hover:bg-white/[0.06]"
        >
          <span
            className="text-sm font-medium text-gray-400 transition-colors duration-300"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {platform.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
