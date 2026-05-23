"use client";

import Link from "next/link";
import { POSTS } from "@/lib/blog-posts";

const TAG_STYLES: Record<string, { bg: string; text: string; border: string }> = {
    "Life":     { bg: "#fef3c7", text: "#92400e", border: "#fbbf24" },
    "Building": { bg: "#d1fae5", text: "#065f46", border: "#34d399" },
    "default":  { bg: "#ede9fe", text: "#4338ca", border: "#a5b4fc" },
};

function tagStyle(tag: string) {
    return TAG_STYLES[tag] ?? TAG_STYLES["default"];
}

export default function BlogPage() {
    const featured = POSTS.filter(p => p.featured);

    return (
        <div suppressHydrationWarning style={{ minHeight: "100vh", backgroundColor: "#0c0a09", color: "#e7e5e4" }}>
            <style suppressHydrationWarning>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300;1,9..144,400&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #0c0a09; }
                .panel { transition: transform 0.22s cubic-bezier(.22,1,.36,1), box-shadow 0.22s; }
                .panel:hover { transform: translateY(-6px) rotate(0deg) !important; box-shadow: 5px 5px 0 #f59e0b !important; }
            `}</style>

            {/* Nav */}
            <nav style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "18px 40px",
                borderBottom: "1px solid #1c1917",
                position: "sticky", top: 0, zIndex: 20,
                backgroundColor: "rgba(12,10,9,0.9)",
                backdropFilter: "blur(12px)",
            }}>
                <Link href="/" style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, fontWeight: 700, color: "#fff", textDecoration: "none", letterSpacing: "-0.02em" }}>
                    et<span style={{ color: "#f59e0b" }}>.</span>
                </Link>
                <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 13, fontStyle: "italic", color: "#57534e", letterSpacing: "0.02em" }}>
                    Journal
                </span>
                <Link href="/" style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 12, color: "#57534e", textDecoration: "none", letterSpacing: "0.04em", border: "1px solid #1c1917", borderRadius: 20, padding: "4px 14px" }}>
                    ← back
                </Link>
            </nav>

            {/* Header */}
            <header style={{ padding: "80px 32px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                {/* Ghost watermark */}
                <div aria-hidden style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%) rotate(-4deg)",
                    fontSize: "clamp(7rem, 22vw, 18rem)",
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 700,
                    color: "rgba(245,158,11,0.035)",
                    letterSpacing: "-0.04em",
                    userSelect: "none",
                    pointerEvents: "none",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                }}>
                    JOURNAL
                </div>

                {/* Issue badge */}
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    border: "2px solid #f59e0b",
                    borderRadius: 3,
                    padding: "5px 16px",
                    marginBottom: 32,
                    backgroundColor: "rgba(245,158,11,0.07)",
                }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f59e0b", display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#f59e0b" }}>
                        Essays · Dispatches · Notes
                    </span>
                </div>

                <h1 style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "clamp(4rem, 11vw, 8rem)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    letterSpacing: "-0.04em",
                    lineHeight: 0.95,
                    color: "#fafaf9",
                    position: "relative",
                }}>
                    Journal
                </h1>

                <p style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: 15,
                    fontStyle: "italic",
                    color: "#57534e",
                    marginTop: 22,
                    lineHeight: 1.6,
                }}>
                    Thoughts on purpose, software, and the fastlane.
                </p>

                {/* Divider line */}
                <div style={{ width: 1, height: 48, backgroundColor: "#1c1917", margin: "40px auto 0" }} />
            </header>

            {/* Panels */}
            <main style={{ maxWidth: 940, margin: "0 auto", padding: "0 24px 120px" }}>
                <p style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: 10, fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase" as const,
                    color: "#57534e",
                    marginBottom: 36,
                }}>
                    Essays
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 32, alignItems: "start" }}>
                    {featured.map((post, i) => {
                        const tc = tagStyle(post.tag);
                        const rot = i % 2 === 0 ? "-1.3deg" : "1.1deg";
                        return (
                            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                                <article
                                    className="panel"
                                    style={{
                                        backgroundColor: "#111010",
                                        border: "2.5px solid #2c2926",
                                        borderRadius: 4,
                                        padding: "36px 32px 30px",
                                        display: "flex",
                                        flexDirection: "column",
                                        cursor: "pointer",
                                        transform: `rotate(${rot})`,
                                        boxShadow: "4px 4px 0 #1a1816",
                                        position: "relative",
                                    }}
                                >
                                    {/* Panel number */}
                                    <span style={{
                                        position: "absolute", top: 14, right: 18,
                                        fontFamily: "'Fraunces', Georgia, serif",
                                        fontSize: 11, fontStyle: "italic",
                                        color: "#3c3835",
                                        letterSpacing: "-0.01em",
                                    }}>
                                        #{String(i + 1).padStart(2, "0")}
                                    </span>

                                    {/* Tag */}
                                    <span style={{
                                        fontFamily: "'Lora', Georgia, serif",
                                        fontSize: 10, fontWeight: 700,
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase" as const,
                                        color: tc.text,
                                        backgroundColor: tc.bg,
                                        padding: "3px 11px",
                                        borderRadius: 3,
                                        display: "inline-block",
                                        marginBottom: 20,
                                        border: `1px solid ${tc.border}`,
                                        alignSelf: "flex-start",
                                    }}>
                                        {post.tag}
                                    </span>

                                    {/* Title */}
                                    <h2 style={{
                                        fontFamily: "'Fraunces', Georgia, serif",
                                        fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)",
                                        fontWeight: 700,
                                        lineHeight: 1.15,
                                        letterSpacing: "-0.025em",
                                        color: "#fafaf9",
                                        marginBottom: 20,
                                    }}>
                                        {post.title}
                                    </h2>

                                    {/* Speech bubble excerpt */}
                                    <div style={{
                                        backgroundColor: "#18160f",
                                        border: "1.5px solid #2c2926",
                                        borderRadius: "3px 12px 12px 12px",
                                        padding: "14px 16px",
                                        marginBottom: 28,
                                        position: "relative",
                                    }}>
                                        {/* bubble tail */}
                                        <div style={{
                                            position: "absolute",
                                            top: -8, left: 14,
                                            width: 0, height: 0,
                                            borderLeft: "6px solid transparent",
                                            borderRight: "6px solid transparent",
                                            borderBottom: "8px solid #2c2926",
                                        }} />
                                        <div style={{
                                            position: "absolute",
                                            top: -5.5, left: 15.5,
                                            width: 0, height: 0,
                                            borderLeft: "4.5px solid transparent",
                                            borderRight: "4.5px solid transparent",
                                            borderBottom: "6px solid #18160f",
                                        }} />
                                        <p style={{
                                            fontFamily: "'Lora', Georgia, serif",
                                            fontSize: 13.5, lineHeight: 1.75,
                                            color: "#a8a29e",
                                            fontStyle: "italic",
                                        }}>
                                            "{post.excerpt}"
                                        </p>
                                    </div>

                                    {/* Footer row */}
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 11, color: "#57534e" }}>
                                            {post.date} · {post.readTime} min read
                                        </span>
                                        <span style={{
                                            fontFamily: "'Fraunces', Georgia, serif",
                                            fontSize: 13, fontStyle: "italic",
                                            color: "#f59e0b",
                                        }}>
                                            Read →
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        );
                    })}
                </div>
            </main>

            {/* Footer */}
            <footer style={{
                borderTop: "1px solid #1a1816",
                padding: "28px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 12, color: "#3c3835" }}>
                    © {new Date().getFullYear()} Esteban Toro
                </p>
            </footer>
        </div>
    );
}
