"use client";
import { useState, useEffect, useRef } from "react";

// ─── Design tokens ───────────────────────────────────────────
const T = {
  bg: "#0c0b0a",
  surface: "#141312",
  border: "#1e1c1a",
  borderHover: "#2a2724",
  muted: "#3d3a36",
  subtle: "#6b6560",
  body: "#a09890",
  heading: "#e8e4de",
  accent: "#c4a35a",
  accentDim: "#8a7340",
  green: "#5a8f7a",
  greenDim: "#3d6454",
  mono: "'Space Mono', monospace",
  serif: "'Playfair Display', Georgia, serif",
};

// ─── Fade-in wrapper ─────────────────────────────────────────
function FadeIn({ show, children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (show) {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
    }
    setVisible(false);
  }, [show, delay]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}

// ─── OS Selection Card ───────────────────────────────────────
function OSCard({ icon, label, sublabel, selected, onClick }) {
  const [hovered, setHovered] = useState(false);
  const active = selected || hovered;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 1 0",
        minWidth: 160,
        background: selected ? "#1a1816" : "transparent",
        border: `1px solid ${selected ? T.accent : active ? T.borderHover : T.border}`,
        padding: "28px 24px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {selected && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: T.accent,
          }}
        />
      )}
      <span style={{ fontSize: 32, lineHeight: 1 }}>{icon}</span>
      <span
        style={{
          fontFamily: T.mono,
          fontSize: 14,
          fontWeight: 700,
          color: selected ? T.heading : active ? T.body : T.subtle,
          letterSpacing: "0.05em",
          transition: "color 0.2s",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: T.mono,
          fontSize: 10,
          color: T.muted,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {sublabel}
      </span>
    </button>
  );
}

// ─── Action button (links to external pages) ────────────────
function ActionButton({ href, children, variant = "primary" }) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = variant === "primary";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: T.mono,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        textDecoration: "none",
        padding: isPrimary ? "14px 24px" : "10px 18px",
        background: isPrimary
          ? hovered ? T.accent : T.heading
          : "transparent",
        color: isPrimary
          ? T.bg
          : hovered ? T.heading : T.body,
        border: isPrimary ? "none" : `1px solid ${hovered ? T.borderHover : T.border}`,
        cursor: "pointer",
        transition: "all 0.2s ease",
        marginBottom: 16,
        marginRight: 10,
      }}
    >
      {children} <span style={{ transition: "transform 0.2s", transform: hovered ? "translateX(2px)" : "none" }}>→</span>
    </a>
  );
}

// ─── YouTube tutorial link ───────────────────────────────────
function VideoLink({ href, title, duration }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        textDecoration: "none",
        padding: "12px 16px",
        background: hovered ? "rgba(255,255,255,0.02)" : "transparent",
        border: `1px solid ${hovered ? T.borderHover : T.border}`,
        marginBottom: 16,
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(255,0,0,0.1)",
          border: "1px solid rgba(255,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 14, marginLeft: 2 }}>▶</span>
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 12,
            fontWeight: 700,
            color: hovered ? T.heading : T.body,
            transition: "color 0.2s",
            lineHeight: 1.4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            color: T.muted,
            marginTop: 2,
          }}
        >
          YouTube · {duration}
        </div>
      </div>
      <span style={{ fontFamily: T.mono, fontSize: 10, color: T.muted }}>↗</span>
    </a>
  );
}

// ─── Step component ──────────────────────────────────────────
function Step({ number, title, children, delay = 0, show = true }) {
  return (
    <FadeIn show={show} delay={delay}>
      <div style={{ marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 11,
              color: T.accent,
              flexShrink: 0,
            }}
          >
            {number}
          </span>
          <h3
            style={{
              fontFamily: T.serif,
              fontSize: 24,
              fontWeight: 400,
              fontStyle: "italic",
              color: T.heading,
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>
        </div>
        <div style={{ paddingLeft: 38 }}>{children}</div>
      </div>
    </FadeIn>
  );
}

// ─── Body text helper ────────────────────────────────────────
function Body({ children, style: s }) {
  return (
    <p
      style={{
        fontFamily: T.mono,
        fontSize: 13,
        lineHeight: 1.8,
        color: T.body,
        margin: "0 0 16px 0",
        ...s,
      }}
    >
      {children}
    </p>
  );
}

// ─── Callout ─────────────────────────────────────────────────
function Callout({ children, type = "tip" }) {
  const colors = {
    tip: { border: T.accent, label: "Tip", labelColor: T.accent },
    note: { border: T.green, label: "Note", labelColor: T.green },
    warning: { border: "#a05a5a", label: "Heads up", labelColor: "#c47a7a" },
  };
  const c = colors[type];
  return (
    <div
      style={{
        borderLeft: `2px solid ${c.border}`,
        padding: "16px 20px",
        marginBottom: 16,
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <span
        style={{
          fontFamily: T.mono,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: c.labelColor,
          display: "block",
          marginBottom: 8,
        }}
      >
        {c.label}
      </span>
      <div style={{ fontFamily: T.mono, fontSize: 12, lineHeight: 1.7, color: T.subtle }}>
        {children}
      </div>
    </div>
  );
}

// ─── Section divider ─────────────────────────────────────────
function Divider() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" }}>
      <div style={{ height: 1, background: T.border, margin: "12px 0" }} />
    </div>
  );
}

// ─── Inline link ─────────────────────────────────────────────
function Link({ href, children }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        color: h ? T.accent : T.body,
        textDecoration: "none",
        borderBottom: `1px solid ${h ? T.accent : T.muted}`,
        transition: "all 0.2s",
      }}
    >
      {children}
    </a>
  );
}

// ─── Main Component ──────────────────────────────────────────
export default function DoItLiveGuide() {
  const [os, setOs] = useState(() => {
    if (typeof navigator === "undefined") return "windows";
    const p = navigator.platform?.toLowerCase() || "";
    const ua = navigator.userAgent?.toLowerCase() || "";
    if (p.startsWith("mac") || /macintosh/.test(ua)) return "mac";
    if (/linux/.test(p) && !/android/.test(ua)) return "linux";
    return "windows";
  });
  const stepsRef = useRef(null);

  useEffect(() => {
    if (os && stepsRef.current) {
      setTimeout(() => {
        stepsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [os]);

  const osLabel = os === "mac" ? "macOS" : os === "windows" ? "Windows" : os === "linux" ? "Linux" : "";

  const obsDownloadUrl =
    os === "mac"
      ? "https://obsproject.com/download#mac"
      : os === "linux"
        ? "https://obsproject.com/download#linux"
        : "https://obsproject.com/download#windows";

  const encoderRec =
    os === "mac"
      ? "Apple VT H264"
      : os === "windows"
        ? "NVENC (if NVIDIA) or x264"
        : "x264 or VAAPI";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        color: T.heading,
        overflowX: "hidden",
      }}
    >
      {/* Grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0.03,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ─── HEADER ─── */}
      <header
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "48px 32px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 13,
            fontWeight: 700,
            color: T.heading,
            letterSpacing: "0.05em",
          }}
        >
          doitlive<span style={{ color: T.accent }}>.guide</span>
        </div>
        <a
          href="https://buildstory.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: T.muted,
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.color = T.subtle)}
          onMouseLeave={(e) => (e.target.style.color = T.muted)}
        >
          a buildstory project
        </a>
      </header>

      {/* ─── HERO ─── */}
      <section
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "80px 32px 64px",
        }}
      >
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: T.accent,
            marginBottom: 24,
          }}
        >
          Start streaming in ~15 minutes
        </div>
        <h1
          style={{
            fontFamily: T.serif,
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.1,
            margin: "0 0 24px 0",
            color: T.heading,
          }}
        >
          Go live on Twitch.
        </h1>
        <Body style={{ maxWidth: 540, color: T.subtle, marginBottom: 0 }}>
          No fluff, no affiliate links, no gear you need to buy. Just the fastest path from zero to
          streaming with stuff you already have. Pick your OS and follow the steps.
        </Body>
      </section>

      <Divider />

      {/* ─── WHY / PERSONAL MESSAGE ─── */}
      <section
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "64px 32px",
        }}
      >
        
        <div
          style={{
            border: `1px solid ${T.border}`,
            background: "linear-gradient(135deg, rgba(196,163,90,0.03) 0%, transparent 60%)",
            padding: "40px 36px",
            position: "relative",
            overflow: "hidden",
          }}
        >
                    <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: T.accent,
              marginBottom: 24,
            }}
          >
            Why stream?
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 80,
              height: 1,
              background: T.accent,
            }}
          />
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 13,
              lineHeight: 2,
              color: T.body,
              marginBottom: 16,
            }}
          >
            Hey!
          </div>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 13,
              lineHeight: 2,
              color: T.body,
              marginBottom: 16,
            }}
          >
            My name is Charlie, and I stream on Twitch as @thecoppinger.
          </div>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 13,
              lineHeight: 2,
              color: T.body,
            }}
          >
            <p style={{ margin: "0 0 16px 0" }}>
              8 years ago, I started streaming. There wasn't even a category for development back
              then. Streaming has changed my life. As a kid with no degree in a faraway place (New
              Zealand), I've been able to grow a group of friends, a community and a professional
              career in tech — by doing it live. I've learnt faster, laughed more and enjoyed the
              adventure.
            </p>
            <p style={{ margin: "0 0 16px 0" }}>
              I firmly believe anyone can, and should, stream. You don't need fancy equipment. You
              don't even need a camera, or heck, even a microphone. You don't need to look a certain
              way, or be good at talking. None of that matters. Come as you are, do your thing, find
              your people and make it happen.
            </p>
            <p style={{ margin: "0 0 24px 0" }}>
              Need any more help?{" "}
              <a
                href="https://discord.gg/buildstory"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: T.accent,
                  textDecoration: "none",
                  borderBottom: `1px solid ${T.accentDim}`,
                }}
              >
                Message me on the Buildstory Discord
              </a>{" "}
              and I'll do my best to help.
            </p>
            <div style={{ marginTop: 8 }}>
              <p style={{ margin: "0 0 4px 0", color: T.subtle }}>Good luck,</p>
              <p
                style={{
                  margin: "0 0 12px 0",
                  fontWeight: 700,
                  color: T.heading,
                  fontSize: 14,
                }}
              >
                Charlie
              </p>
              <p style={{ margin: 0, color: T.subtle, fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                p.s. let's do it live <img src="/do-it-live-favicon.png" alt="" style={{ width: 20, height: 20, display: "inline-block", verticalAlign: "middle" }} />
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── OS SELECTION ─── */}
      <section
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "64px 32px",
        }}
      >
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: T.muted,
            marginBottom: 24,
          }}
        >
          Step zero — what are you on?
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <OSCard
            icon="🍎"
            label="macOS"
            sublabel="Intel or Apple Silicon"
            selected={os === "mac"}
            onClick={() => setOs("mac")}
          />
          <OSCard
            icon="🪟"
            label="Windows"
            sublabel="10 or 11"
            selected={os === "windows"}
            onClick={() => setOs("windows")}
          />
          <OSCard
            icon="🐧"
            label="Linux"
            sublabel="Ubuntu / Fedora / Arch / etc"
            selected={os === "linux"}
            onClick={() => setOs("linux")}
          />
        </div>
      </section>

      {/* ─── STEPS (revealed on OS selection) ─── */}
      {os && (
        <div ref={stepsRef}>
          <Divider />

          <section
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "64px 32px 32px",
            }}
          >
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: T.muted,
                marginBottom: 48,
              }}
            >
              Setup guide for {osLabel}
            </div>

            {/* ── Step 1: Twitch Account ── */}
            <Step number="01" title="Create a Twitch account" show={true} delay={100}>
              <Body>
                If you don't already have one, create an account on Twitch. Use whatever email you
                want — you can change your display name later.
              </Body>
              <ActionButton href="https://www.twitch.tv/signup">Create Twitch account</ActionButton>
              <Callout type="tip">
                Enable two-factor authentication right away. Twitch requires it before you can
                stream, so get it out of the way now.
              </Callout>
              <ActionButton href="https://www.twitch.tv/settings/security" variant="secondary">
                Twitch security settings
              </ActionButton>
            </Step>

            {/* ── Step 2: Install OBS ── */}
            <Step number="02" title="Install OBS Studio" show={true} delay={250}>
              <Body>
                OBS is free, open-source, and the industry standard. It's what virtually every
                serious streamer uses. There are other options — ignore them. Start here.
              </Body>
              <ActionButton href={obsDownloadUrl}>Download OBS Studio</ActionButton>
              {os === "linux" && (
                <Callout type="note">
                  Install via Flatpak for the most up-to-date version:{" "}
                  <code style={{ color: T.green, fontSize: 12 }}>
                    flatpak install flathub com.obsproject.Studio
                  </code>
                </Callout>
              )}
              <Body>
                When OBS opens for the first time, it'll offer an Auto-Configuration Wizard. Select
                "Optimize for streaming" and let it run — it'll pick sensible defaults for your
                hardware and connection.
              </Body>
              <VideoLink
                href="https://www.youtube.com/watch?v=9z9GiEM4uvA"
                title="Complete OBS Tutorial for Beginners (Primal Video, 2025)"
                duration="17 min"
              />
            </Step>

            {/* ── Step 3: Connect to Twitch ── */}
            <Step number="03" title="Connect OBS to Twitch" show={true} delay={400}>
              <Body>
                You need to link OBS to your Twitch account so it knows where to send your stream.
                The easiest way: in OBS, go to{" "}
                <span style={{ color: T.heading }}>Settings → Stream</span>, select{" "}
                <span style={{ color: T.heading }}>Twitch</span> as the service, and click{" "}
                <span style={{ color: T.heading }}>Connect Account</span>. Log in, authorize, done.
              </Body>
              <Callout type="tip">
                The "Connect Account" method is easier than manually copying your stream key. It
                also lets you set your stream title and category directly from OBS.
              </Callout>
              <Body>
                If you'd rather paste the key manually, grab it from your Creator Dashboard:
              </Body>
              <ActionButton href="https://dashboard.twitch.tv/settings/stream" variant="secondary">
                Get your stream key
              </ActionButton>
            </Step>

            {/* ── Step 4: Scene Setup ── */}
            <Step number="04" title="Set up your scene" show={true} delay={550}>
              <Body>
                OBS works with <span style={{ color: T.heading }}>Scenes</span> (layouts you switch
                between) and <span style={{ color: T.heading }}>Sources</span> (the things shown in
                each scene). For your first stream, you need one scene with one or two sources.
              </Body>
              <Body>
                In the "Sources" panel at the bottom of OBS, click the + button:
              </Body>
              <div
                style={{
                  background: "#0a0908",
                  border: `1px solid ${T.border}`,
                  padding: "20px 24px",
                  marginBottom: 16,
                }}
              >
                {[
                  {
                    label: os === "mac" ? "macOS Screen Capture" : "Display Capture or Window Capture",
                    desc: os === "mac"
                      ? "Shows your screen or a specific window. \"Window\" mode is better if you want to keep some things private."
                      : "Shows your screen or a specific app. \"Window Capture\" is better if you want to keep some things private.",
                  },
                  {
                    label: "Video Capture Device (optional)",
                    desc: "Your webcam — the one built into your laptop is fine. Resize the preview and drag it to a corner.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "baseline",
                      padding: "10px 0",
                      borderBottom: i === 0 ? `1px solid ${T.border}` : "none",
                    }}
                  >
                    <span style={{ color: T.accent, fontSize: 8, flexShrink: 0, marginTop: 6 }}>
                      ◆
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: T.mono,
                          fontSize: 13,
                          fontWeight: 700,
                          color: T.heading,
                          marginBottom: 4,
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: T.mono,
                          fontSize: 12,
                          color: T.subtle,
                          lineHeight: 1.6,
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {os === "mac" && (
                <Callout type="warning">
                  macOS requires you to grant screen recording permission to OBS. Go to{" "}
                  <span style={{ color: T.body }}>
                    System Settings → Privacy & Security → Screen Recording
                  </span>{" "}
                  and enable OBS. You'll need to restart OBS after.
                </Callout>
              )}

              {os === "linux" && (
                <Callout type="note">
                  On Wayland, screen capture can be tricky. If you don't see your screen, try the
                  "PipeWire" source in OBS, or switch to an X11 session for your first stream.
                </Callout>
              )}

              <VideoLink
                href="https://www.youtube.com/watch?v=9z9GiEM4uvA&t=414s"
                title="OBS Scenes & Sources Setup (Primal Video, 2025)"
                duration="~7 min section"
              />
            </Step>

            {/* ── Step 5: Audio ── */}
            <Step number="05" title="Sort your audio" show={true} delay={700}>
              <Body>
                Viewers will forgive bad video. They will not forgive bad audio. But "bad audio"
                doesn't mean you need a fancy mic — it means background noise and echo.
              </Body>

              <div
                style={{
                  background: "#0a0908",
                  border: `1px solid ${T.border}`,
                  padding: "20px 24px",
                  marginBottom: 16,
                }}
              >
                {[
                  {
                    label: "Use whatever you already have",
                    desc: "Your laptop mic, AirPods, gaming headset, phone earbuds with a mic — all fine. Seriously. Don't buy anything before your first stream.",
                  },
                  {
                    label: "Headphones > speakers",
                    desc: "Wear any headphones so your mic doesn't pick up game audio or stream alerts. This is the single biggest audio improvement you can make for free.",
                  },
                  {
                    label: "Turn on noise suppression (free, built in)",
                    desc: "In OBS Audio Mixer, click the gear on your mic → Filters → add \"Noise Suppression\" → pick RNNoise. Removes most background noise instantly.",
                  },
                ].map((item, i, arr) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "baseline",
                      padding: "10px 0",
                      borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none",
                    }}
                  >
                    <span style={{ color: T.accent, fontSize: 8, flexShrink: 0, marginTop: 6 }}>
                      ◆
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: T.mono,
                          fontSize: 13,
                          fontWeight: 700,
                          color: T.heading,
                          marginBottom: 4,
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: T.mono,
                          fontSize: 12,
                          color: T.subtle,
                          lineHeight: 1.6,
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Body>
                In OBS, check{" "}
                <span style={{ color: T.heading }}>Settings → Audio</span>. Make sure your mic
                is selected under "Mic/Auxiliary Audio." Then do a test recording (File → Start
                Recording), talk for 30 seconds, and listen back.
              </Body>
              <VideoLink
                href="https://www.youtube.com/watch?v=9z9GiEM4uvA&t=845s"
                title="OBS Audio Configuration (Primal Video, 2025)"
                duration="~3 min section"
              />
            </Step>

            {/* ── Step 6: Output Settings ── */}
            <Step number="06" title="Dial in your settings" show={true} delay={850}>
              <Body>
                If you ran the Auto-Configuration Wizard, you're probably fine. But if you want to
                tweak things, these defaults work for most people:
              </Body>
              <div
                style={{
                  background: "#0a0908",
                  border: `1px solid ${T.border}`,
                  padding: "20px 24px",
                  marginBottom: 16,
                }}
              >
                {[
                  { setting: "Resolution", value: "1920×1080 (or your native)" },
                  { setting: "FPS", value: "30 (60 if your machine handles it)" },
                  { setting: "Bitrate", value: "4500 kbps" },
                  { setting: "Encoder", value: encoderRec },
                  { setting: "Rate Control", value: "CBR" },
                  { setting: "Keyframe Interval", value: "2 seconds" },
                ].map((row, i, arr) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none",
                    }}
                  >
                    <span style={{ fontFamily: T.mono, fontSize: 12, color: T.subtle }}>
                      {row.setting}
                    </span>
                    <span
                      style={{
                        fontFamily: T.mono,
                        fontSize: 12,
                        color: T.heading,
                        fontWeight: 700,
                        textAlign: "right",
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <Callout type="note">
                If your stream is laggy or dropping frames, lower your bitrate to 3000 kbps and
                resolution to 1280×720. Smooth 720p beats choppy 1080p every time.
              </Callout>
            </Step>

            {/* ── Step 7: Go Live ── */}
            <Step number="07" title="Go live" show={true} delay={1000}>
              <Body>
                Set a title and category on Twitch. For building with AI, good categories include{" "}
                <span style={{ color: T.heading }}>Software and Game Development</span>,{" "}
                <span style={{ color: T.heading }}>Science & Technology</span>, or{" "}
                <span style={{ color: T.heading }}>Just Chatting</span>.
              </Body>
              <ActionButton href="https://dashboard.twitch.tv" variant="secondary">
                Open Twitch Dashboard
              </ActionButton>
              <Body>In OBS, hit the big button:</Body>
              <div
                style={{
                  background: "rgba(90,143,122,0.08)",
                  border: `1px solid ${T.greenDim}`,
                  padding: "20px 24px",
                  textAlign: "center",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 16,
                    fontWeight: 700,
                    color: T.green,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  Start Streaming
                </span>
              </div>
              <Body>
                That's it. You're live. It doesn't need to be perfect. Talk through what you're
                doing, even if nobody's watching yet. The first stream is always the hardest — after
                this, it's just muscle memory.
              </Body>
              <Callout type="tip">
                Open your own stream in another tab to make sure everything looks and sounds right.
                Keep Twitch chat open so you can see if anyone says hello.
              </Callout>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <ActionButton href="https://inspector.twitch.tv" variant="secondary">
                  Twitch stream inspector
                </ActionButton>
              </div>
            </Step>
          </section>

          <Divider />

          {/* ─── QUICK TIPS ─── */}
          <section
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "64px 32px",
            }}
          >
            <FadeIn show={true} delay={1200}>
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: T.muted,
                  marginBottom: 32,
                }}
              >
                Before you go
              </div>
              <h2
                style={{
                  fontFamily: T.serif,
                  fontSize: 28,
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.3,
                  margin: "0 0 32px 0",
                  color: T.heading,
                }}
              >
                Things nobody tells you.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  {
                    title: "Talk to yourself",
                    text: "Narrate your thought process even when chat is empty. It feels weird for 10 minutes, then it becomes natural. It's how people find you interesting when they drop in.",
                  },
                  {
                    title: "Don't watch your viewer count",
                    text: "Seriously. Hide it. You'll stream differently (worse) when you think nobody's watching. Just build.",
                  },
                  {
                    title: "Stream at the same time each day",
                    text: "Consistency beats marathon sessions. Even 1–2 hours at a predictable time builds an audience faster than random 8-hour streams.",
                  },
                  {
                    title: "Your first 10 streams will be rough",
                    text: "That's fine. Every streamer you watch went through this. The only way out is through.",
                  },
                  {
                    title: "Use a \"Starting Soon\" and \"Be Right Back\" scene",
                    text: "Add two more scenes in OBS: one for when you're about to start (so people see something while you set up) and one for breaks. A text source with your message is enough.",
                  },
                ].map((tip, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: `1px solid ${T.border}`,
                      paddingLeft: 20,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: T.mono,
                        fontSize: 13,
                        fontWeight: 700,
                        color: T.heading,
                        marginBottom: 6,
                      }}
                    >
                      {tip.title}
                    </div>
                    <div
                      style={{
                        fontFamily: T.mono,
                        fontSize: 12,
                        lineHeight: 1.8,
                        color: T.subtle,
                      }}
                    >
                      {tip.text}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </section>

          <Divider />

          {/* ─── CTA ─── */}
          <section
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "80px 32px 120px",
              textAlign: "center",
            }}
          >
            <FadeIn show={true} delay={1400}>
              <h2
                style={{
                  fontFamily: T.serif,
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.2,
                  margin: "0 0 16px 0",
                }}
              >
                Now go build something live.
              </h2>
              <Body
                style={{
                  color: T.subtle,
                  textAlign: "center",
                  maxWidth: 400,
                  margin: "0 auto 32px",
                }}
              >
                Streaming your build process is the best way to learn, connect, and prove what you
                can do. No excuses left.
              </Body>
              <a
                href="https://buildstory.com"
                style={{
                  fontFamily: T.mono,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "18px 40px",
                  background: T.heading,
                  color: T.bg,
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = T.accent;
                  e.target.style.letterSpacing = "0.25em";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = T.heading;
                  e.target.style.letterSpacing = "0.15em";
                }}
              >
                Join the hackathon →
              </a>
            </FadeIn>
          </section>
        </div>
      )}

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "24px 32px",
          borderTop: `1px solid ${T.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: T.mono, fontSize: 11, color: T.muted }}>
          doitlive.guide
        </span>
        <span style={{ fontFamily: T.mono, fontSize: 11, color: T.muted }}>
          Show, don't tell.
        </span>
      </footer>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${T.accent}; color: ${T.bg}; }
        body { background: ${T.bg}; }
      `}</style>
    </div>
  );
}
