"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { POSTS } from "@/lib/blog-posts";

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300;1,9..144,400&display=swap');
`;

function useTheme() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("blog-theme");
        if (stored === "dark") setDark(true);
    }, []);

    function toggle() {
        setDark(d => {
            localStorage.setItem("blog-theme", !d ? "dark" : "light");
            return !d;
        });
    }

    const t = {
        page:    dark ? "#0C0A08" : "#FDFBF7",
        text:    dark ? "#E7E5E4" : "#1C1917",
        muted:   dark ? "#78716C" : "#78716C",
        border:  dark ? "#292524" : "#E7E5E4",
        card:    dark ? "#141110" : "#FFFFFF",
        accent:  dark ? "#FCD34D" : "#92400E",
        accentBg: dark ? "rgba(252,211,77,0.07)" : "rgba(146,64,14,0.06)",
        hover:   dark ? "#1C1917" : "#F5F3EF",
    };

    return { dark, toggle, t };
}

export default function BlogPage() {
    const { dark, toggle, t } = useTheme();
    const featured = POSTS.filter(p => p.featured);

    return (
        <div style={{ minHeight: "100vh", backgroundColor: t.page, color: t.text, transition: "background-color 0.35s, color 0.35s" }}>
            <style>{FONTS}{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: ${t.page}; }
                .serif { font-family: 'Lora', Georgia, serif; }
                .display { font-family: 'Fraunces', Georgia, serif; }
                .blog-card { transition: background-color 0.2s, transform 0.2s; }
                .blog-card:hover { background-color: ${t.hover} !important; transform: translateY(-2px); }
                .blog-toggle { transition: opacity 0.15s; }
                .blog-toggle:hover { opacity: 0.6; }
            `}</style>

            {/* Nav */}
            <nav style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "18px 40px",
                borderBottom: `1px solid ${t.border}`,
                position: "sticky", top: 0, zIndex: 20,
                backgroundColor: t.page,
            }}>
                <Link href="/" style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, fontWeight: 700, color: t.text, textDecoration: "none", letterSpacing: "-0.02em" }}>
                    et<span style={{ color: "#D97706" }}>.</span>
                </Link>

                <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 13, fontStyle: "italic", color: t.muted, letterSpacing: "0.02em" }}>
                    Journal
                </span>

                <button
                    onClick={toggle}
                    className="blog-toggle"
                    style={{
                        fontFamily: "'Lora', Georgia, serif", fontSize: 12,
                        color: t.muted, background: "none", border: `1px solid ${t.border}`,
                        borderRadius: 20, padding: "4px 14px", cursor: "pointer",
                        letterSpacing: "0.04em",
                    }}
                >
                    {dark ? "☀ light" : "☾ dark"}
                </button>
            </nav>

            {/* Header */}
            <header style={{ textAlign: "center", padding: "80px 32px 64px" }}>
                <h1 style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "clamp(3.5rem, 9vw, 6.5rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    color: t.text,
                }}>
                    Journal
                </h1>
                <p style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: 16,
                    fontStyle: "italic",
                    color: t.muted,
                    marginTop: 20,
                    lineHeight: 1.6,
                }}>
                    Thoughts on purpose, software, and the fastlane.
                </p>
                <div style={{ width: 1, height: 48, backgroundColor: t.border, margin: "40px auto 0" }} />
            </header>

            {/* Posts */}
            <main style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 120px" }}>
                <p style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: 10, fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: t.muted,
                    marginBottom: 32,
                }}>
                    Essays
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
                    {featured.map(post => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <article
                                className="blog-card"
                                style={{
                                    backgroundColor: t.card,
                                    border: `1px solid ${t.border}`,
                                    borderRadius: 18,
                                    padding: "38px 36px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 0,
                                    cursor: "pointer",
                                }}
                            >
                                <span style={{
                                    fontFamily: "'Lora', Georgia, serif",
                                    fontSize: 10, fontWeight: 600,
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    color: t.accent,
                                    backgroundColor: t.accentBg,
                                    padding: "3px 11px",
                                    borderRadius: 20,
                                    display: "inline-block",
                                    marginBottom: 22,
                                }}>
                                    {post.tag}
                                </span>

                                <h2 style={{
                                    fontFamily: "'Fraunces', Georgia, serif",
                                    fontSize: "clamp(1.45rem, 2.5vw, 1.85rem)",
                                    fontWeight: 400,
                                    lineHeight: 1.2,
                                    letterSpacing: "-0.02em",
                                    color: t.text,
                                    marginBottom: 18,
                                }}>
                                    {post.title}
                                </h2>

                                <p style={{
                                    fontFamily: "'Lora', Georgia, serif",
                                    fontSize: 14, lineHeight: 1.8,
                                    color: t.muted,
                                    marginBottom: 32,
                                    flex: 1,
                                }}>
                                    {post.excerpt}
                                </p>

                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 11, color: t.muted }}>
                                        {post.date} · {post.readTime} min read
                                    </span>
                                    <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 14, fontStyle: "italic", color: t.accent }}>
                                        Read →
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer style={{
                borderTop: `1px solid ${t.border}`,
                padding: "28px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 12, color: t.muted }}>
                    © {new Date().getFullYear()} Esteban Toro
                </p>
            </footer>
        </div>
    );
}
