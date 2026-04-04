import { motion, AnimatePresence } from "framer-motion";
import type { NewsStory } from "@/data/newsStories";

interface StoryPanelProps {
  story: NewsStory | null;
  onClose: () => void;
}

const ease = [0.22, 1, 0.36, 1];

const StoryPanel = ({ story, onClose }: StoryPanelProps) => {
  return (
    <AnimatePresence>
      {story && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: "48px",
            pointerEvents: "auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(5, 5, 5, 0.82)",
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
              border: "1px solid rgba(168, 85, 247, 0.18)",
              borderRadius: "2px",
              boxShadow:
                "0 0 0 1px rgba(168,85,247,0.08), 0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(168,85,247,0.08) inset",
              width: "min(560px, 92vw)",
              padding: "36px 32px",
              position: "relative",
            }}
          >
            {/* Category + Timestamp */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.4, ease }}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 500,
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  color: "#A855F7",
                  textTransform: "uppercase",
                }}
              >
                {story.category}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.4, ease }}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 400,
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  color: "#3D4451",
                }}
              >
                {story.timestamp}
              </motion.span>
            </div>

            {/* Region tag */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease }}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 400,
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "#D8B4FE",
                textTransform: "uppercase",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "#A855F7",
                  boxShadow: "0 0 8px rgba(168, 85, 247, 0.6)",
                  display: "inline-block",
                }}
              />
              {story.region}
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "22px",
                lineHeight: 1.25,
                color: "#FFFFFF",
                marginBottom: "14px",
              }}
            >
              {story.headline}
            </motion.h2>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease }}
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: 1.7,
                color: "#A1A1AA",
                marginBottom: "20px",
              }}
            >
              {story.summary}
            </motion.p>

            {/* Source */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4, ease }}
              style={{
                borderTop: "1px solid rgba(168, 85, 247, 0.15)",
                paddingTop: "14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 400,
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "#3D4451",
                }}
              >
                {story.source}
              </span>
              <button
                onClick={onClose}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 500,
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  color: "#A855F7",
                  background: "transparent",
                  border: "1px solid rgba(168, 85, 247, 0.25)",
                  borderRadius: "2px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.6)";
                  e.currentTarget.style.background = "rgba(168, 85, 247, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.25)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Dismiss
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoryPanel;
