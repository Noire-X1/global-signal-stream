import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PANEL_GLOW = [
  "0 0 0 1px rgba(168, 85, 247, 0.15)",
  "0 0 30px rgba(168, 85, 247, 0.25)",
  "0 0 80px rgba(168, 85, 247, 0.12)",
  "0 0 140px rgba(168, 85, 247, 0.06)",
  "inset 0 0 40px rgba(168, 85, 247, 0.04)",
].join(", ");

const BUTTON_GLOW_HOVER = [
  "0 0 12px rgba(168, 85, 247, 0.8)",
  "0 0 30px rgba(168, 85, 247, 0.4)",
  "0 0 60px rgba(168, 85, 247, 0.2)",
].join(", ");

const ease = [0.22, 1, 0.36, 1] as const;
const exitEase = [0.76, 0, 0.24, 1] as const;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

const inputStyle: React.CSSProperties = {
  background: "rgba(5, 5, 5, 0.9)",
  border: "1px solid rgba(61, 68, 81, 0.7)",
  borderRadius: "2px",
  color: "#FFFFFF",
  fontFamily: "'DM Mono', monospace",
  fontSize: "13px",
  padding: "14px 16px",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Mono', monospace",
  fontWeight: 500,
  fontSize: "9px",
  letterSpacing: "0.25em",
  color: "#A1A1AA",
  textTransform: "uppercase",
  marginBottom: "8px",
  display: "block",
};

interface AuthGateProps {
  children: ReactNode;
}

const AuthGate = ({ children }: AuthGateProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => setShowContent(true), 200);
    setTimeout(() => setIsAuthenticated(true), 1200);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(168, 85, 247, 0.6)";
    e.target.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.10), 0 0 16px rgba(168,85,247,0.15)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(61, 68, 81, 0.7)";
    e.target.style.boxShadow = "none";
  };

  return (
    <>
      <AnimatePresence>
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }}
            exit={{
              opacity: 0,
              filter: "blur(12px)",
              scale: 1.04,
              transition: { duration: 1.1, ease: exitEase },
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            key="auth-overlay"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              style={{
                background: "rgba(5, 5, 5, 0.72)",
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                border: "1px solid rgba(168, 85, 247, 0.30)",
                borderRadius: "2px",
                boxShadow: PANEL_GLOW,
                width: "min(420px, 90vw)",
                padding: "48px 40px",
              }}
            >
              {/* Masthead */}
              <motion.div variants={itemVariants}>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 400,
                    fontSize: "9px",
                    letterSpacing: "0.3em",
                    color: "#A1A1AA",
                    marginBottom: "12px",
                  }}
                >
                  Global Intelligence · Live
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 900,
                      fontSize: "36px",
                      color: "#FFFFFF",
                      lineHeight: 1,
                    }}
                  >
                    NOIRE
                  </span>
                  <span
                    className="neon-text-glow"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                      fontSize: "14px",
                      letterSpacing: "0.35em",
                      color: "#A855F7",
                    }}
                  >
                    NEWS
                  </span>
                </div>
              </motion.div>

              {/* Divider */}
              <motion.div
                variants={itemVariants}
                style={{
                  borderBottom: "1px solid rgba(168, 85, 247, 0.2)",
                  paddingBottom: "24px",
                  marginBottom: "28px",
                }}
              />

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                style={{
                  fontFamily: "'Lora', serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "#A1A1AA",
                  marginBottom: "36px",
                }}
              >
                Autonomous intelligence, delivered at the speed of now.
              </motion.p>

              {/* Email */}
              <motion.div variants={itemVariants} style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Access Key</label>
                <input
                  type="email"
                  placeholder="operative@noire.news"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants} style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Cipher</label>
                <input
                  type="password"
                  placeholder="••••••••••"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </motion.div>

              {/* Confirm Password (sign up only) */}
              <AnimatePresence>
                {isSignUp && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    style={{ overflow: "hidden", marginBottom: "16px" }}
                  >
                    <label style={labelStyle}>Confirm Cipher</label>
                    <input
                      type="password"
                      placeholder="••••••••••"
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enter Button */}
              <motion.button
                variants={itemVariants}
                onClick={handleEnter}
                whileTap={{ scale: 0.97, opacity: 0.85 }}
                onHoverStart={() => setHovering(true)}
                onHoverEnd={() => setHovering(false)}
                style={{
                  width: "100%",
                  marginTop: "24px",
                  padding: "16px",
                  background: hovering ? "rgba(168, 85, 247, 0.12)" : "transparent",
                  border: `1px solid rgba(168, 85, 247, ${hovering ? 0.8 : 0.45})`,
                  borderRadius: "2px",
                  color: hovering ? "#FFFFFF" : "#A855F7",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.32em",
                  fontWeight: 500,
                  cursor: "pointer",
                  boxShadow: hovering ? BUTTON_GLOW_HOVER : "none",
                  transition: "all 0.22s ease",
                  textTransform: "uppercase",
                }}
              >
                {isSignUp ? "CREATE ACCESS" : "ENTER"}
              </motion.button>

              {/* Sign up toggle */}
              <motion.p
                variants={itemVariants}
                onClick={() => setIsSignUp(!isSignUp)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 400,
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  color: "#3D4451",
                  textAlign: "center",
                  marginTop: "20px",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#A1A1AA"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#3D4451"; }}
              >
                {isSignUp ? "← Back to sign in" : "New operative? — Request access"}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0 }}
        style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default AuthGate;
