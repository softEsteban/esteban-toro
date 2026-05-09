"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { POSTS, Section } from "@/lib/blog-posts";

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
        page:     dark ? "#0C0A08" : "#FDFBF7",
        text:     dark ? "#E7E5E4" : "#1C1917",
        muted:    dark ? "#6B6560" : "#78716C",
        border:   dark ? "#292524" : "#E7E5E4",
        accent:   dark ? "#FCD34D" : "#92400E",
        accentBg: dark ? "rgba(252,211,77,0.07)" : "rgba(146,64,14,0.06)",
        quote:    dark ? "#1E1A17" : "#F5F3EF",
        quoteBorder: dark ? "#3D3530" : "#D6D3D1",
    };

    return { dark, toggle, t };
}

function ContentRenderer({ sections, t }: { sections: Section[]; t: ReturnType<typeof useTheme>["t"] }) {
    return (
        <>
            {sections.map((s, i) => {
                if (s.type === "lead") {
                    return (
                        <p
                            key={i}
                            className="blog-lead"
                            style={{
                                fontFamily: "'Lora', Georgia, serif",
                                fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
                                lineHeight: 1.75,
                                color: t.text,
                                fontStyle: "italic",
                                marginBottom: "1.8em",
                            }}
                        >
                            {s.text}
                        </p>
                    );
                }

                if (s.type === "p") {
                    return (
                        <p
                            key={i}
                            style={{
                                fontFamily: "'Lora', Georgia, serif",
                                fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
                                lineHeight: 1.85,
                                color: t.text,
                                marginBottom: "1.5em",
                            }}
                        >
                            {s.text}
                        </p>
                    );
                }

                if (s.type === "h2") {
                    return (
                        <h2
                            key={i}
                            style={{
                                fontFamily: "'Fraunces', Georgia, serif",
                                fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
                                fontWeight: 400,
                                fontStyle: "italic",
                                letterSpacing: "-0.01em",
                                lineHeight: 1.3,
                                color: t.text,
                                marginTop: "2.8em",
                                marginBottom: "1em",
                                paddingTop: "2.4em",
                                borderTop: `1px solid ${t.border}`,
                            }}
                        >
                            {s.text}
                        </h2>
                    );
                }

                if (s.type === "quote") {
                    return (
                        <blockquote
                            key={i}
                            style={{
                                fontFamily: "'Fraunces', Georgia, serif",
                                fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                                fontStyle: "italic",
                                fontWeight: 300,
                                lineHeight: 1.6,
                                color: t.text,
                                backgroundColor: t.quote,
                                borderLeft: `3px solid ${t.accent}`,
                                margin: "2em 0",
                                padding: "1.4em 1.8em",
                                borderRadius: "0 10px 10px 0",
                            }}
                        >
                            {s.text}
                            {s.attribution && (
                                <footer style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.75em", marginTop: "0.8em", opacity: 0.6, fontStyle: "normal" }}>
                                    — {s.attribution}
                                </footer>
                            )}
                        </blockquote>
                    );
                }

                return null;
            })}
        </>
    );
}

export default function BlogPostPage() {
    const params = useParams<{ slug: string }>();
    const { dark, toggle, t } = useTheme();
    const post = POSTS.find(p => p.slug === params.slug);

    if (!post) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: t.page, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, color: t.muted, fontStyle: "italic" }}>
                    Essay not found.
                </p>
                <Link href="/blog" style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 13, color: t.accent, textDecoration: "none" }}>
                    ← Back to Journal
                </Link>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: t.page, color: t.text, transition: "background-color 0.35s, color 0.35s" }}>
            <style>{FONTS}{`
                *, *::before, *::after { box-sizing: border-box; }
                body { background: ${t.page}; }
                .blog-lead::first-letter {
                    float: left;
                    font-family: 'Fraunces', Georgia, serif;
                    font-size: 4.2em;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 0.78;
                    margin-right: 0.1em;
                    margin-top: 0.05em;
                    color: ${t.text};
                }
                .back-link { transition: opacity 0.15s; text-decoration: none; }
                .back-link:hover { opacity: 0.6; }
                .toggle-btn { transition: opacity 0.15s; }
                .toggle-btn:hover { opacity: 0.6; }
            `}</style>

            {/* Nav */}
            <nav style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "18px 40px",
                borderBottom: `1px solid ${t.border}`,
                position: "sticky", top: 0, zIndex: 20,
                backgroundColor: t.page,
            }}>
                <Link
                    href="/blog"
                    className="back-link"
                    style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 13, color: t.muted, letterSpacing: "0.01em" }}
                >
                    ← Journal
                </Link>

                <button
                    onClick={toggle}
                    className="toggle-btn"
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

            {/* Article */}
            <article style={{ maxWidth: 680, margin: "0 auto", padding: "72px 28px 120px" }}>

                {/* Tag */}
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
                    marginBottom: 28,
                }}>
                    {post.tag}
                </span>

                {/* Title */}
                <h1 style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    color: t.text,
                    marginBottom: 24,
                }}>
                    {post.title}
                </h1>

                {/* Meta */}
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 13, color: t.muted, marginBottom: 48 }}>
                    {post.date} · {post.readTime} min read
                </p>

                {/* Rule */}
                <div style={{ width: "100%", height: 1, backgroundColor: t.border, marginBottom: 52 }} />

                {/* Content */}
                <ContentRenderer sections={post.content} t={t} />

                {/* End rule */}
                <div style={{ width: 48, height: 1, backgroundColor: t.border, margin: "64px auto 56px" }} />

                {/* Back */}
                <div style={{ textAlign: "center" }}>
                    <Link
                        href="/blog"
                        className="back-link"
                        style={{
                            fontFamily: "'Fraunces', Georgia, serif",
                            fontSize: 15,
                            fontStyle: "italic",
                            color: t.accent,
                        }}
                    >
                        ← Back to Journal
                    </Link>
                </div>
            </article>
        </div>
    );
}
