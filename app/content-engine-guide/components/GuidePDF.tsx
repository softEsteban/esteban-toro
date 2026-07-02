import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type {
  Block,
  Chapter,
  GuideContent,
  TreeNode,
} from "../lib/guide-content";

// ─────────────────────────────────────────────────────────────────────────────
// The downloadable PDF, built from the SAME `GuideContent` data as the web page.
// Dark, premium documentation aesthetic with a cover, table of contents,
// running footer + page numbers, and a renderer per block type.
// ─────────────────────────────────────────────────────────────────────────────

// Register a clean sans + mono so the PDF matches the web feel. These are
// bundled with @react-pdf as built-in families (Helvetica / Courier); we alias
// them for readability.
Font.registerHyphenationCallback((word) => [word]); // don't hyphenate

const INK = "#0a0a0f";
const PANEL = "#14141c";
const PANEL_2 = "#1b1b26";
const BORDER = "#2a2a38";
const TEXT = "#e8e8f0";
const MUTED = "#a0a0b4";
const FAINT = "#6c6c80";
const ACCENT = "#a78bfa";

const TONE: Record<string, { bar: string; label: string }> = {
  tip: { bar: ACCENT, label: "TIP" },
  warning: { bar: "#fbbf24", label: "WARNING" },
  note: { bar: "#38bdf8", label: "NOTE" },
  success: { bar: "#34d399", label: "KEY IDEA" },
};

const s = StyleSheet.create({
  page: {
    backgroundColor: INK,
    color: TEXT,
    paddingTop: 54,
    paddingBottom: 60,
    paddingHorizontal: 54,
    fontFamily: "Helvetica",
    fontSize: 10.5,
    lineHeight: 1.6,
  },
  // Cover
  cover: {
    backgroundColor: INK,
    color: TEXT,
    padding: 60,
    height: "100%",
    justifyContent: "space-between",
  },
  coverBadge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
    fontSize: 8,
    letterSpacing: 2,
    color: MUTED,
  },
  coverKicker: {
    color: ACCENT,
    fontSize: 11,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  coverTitle: {
    fontSize: 44,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.05,
    marginBottom: 20,
  },
  coverSubtitle: {
    fontSize: 14,
    color: MUTED,
    lineHeight: 1.5,
    maxWidth: 380,
  },
  coverMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 16,
  },
  coverMeta: { fontSize: 9, color: FAINT },
  // TOC
  tocTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 22,
  },
  tocRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#1e1e28",
  },
  tocNum: {
    width: 28,
    color: ACCENT,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  tocText: { flex: 1, fontSize: 11, color: TEXT },
  tocTagline: { fontSize: 9, color: FAINT, marginTop: 1 },
  // Chapter
  chapterEyebrow: {
    color: ACCENT,
    fontSize: 9,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  chapterTitle: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.15,
    marginBottom: 6,
  },
  chapterTagline: {
    fontSize: 11,
    color: MUTED,
    marginBottom: 18,
    fontStyle: "italic",
  },
  // Blocks
  h: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    marginTop: 16,
    marginBottom: 6,
    color: TEXT,
  },
  p: { fontSize: 10.5, color: "#c8c8d6", marginBottom: 9, lineHeight: 1.65 },
  li: {
    flexDirection: "row",
    marginBottom: 5,
    paddingRight: 6,
  },
  liBullet: { width: 16, color: ACCENT, fontSize: 10.5 },
  liText: { flex: 1, fontSize: 10.5, color: "#c8c8d6", lineHeight: 1.55 },
  code: {
    backgroundColor: "#0d0d14",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    marginVertical: 10,
    overflow: "hidden",
  },
  codeHeader: {
    backgroundColor: PANEL,
    paddingVertical: 5,
    paddingHorizontal: 12,
    fontSize: 8,
    color: MUTED,
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  codeBody: {
    fontFamily: "Courier",
    fontSize: 8.5,
    color: "#d8d8e4",
    padding: 12,
    lineHeight: 1.5,
  },
  callout: {
    flexDirection: "row",
    backgroundColor: PANEL,
    borderRadius: 8,
    marginVertical: 10,
    overflow: "hidden",
  },
  calloutBar: { width: 3 },
  calloutBody: { padding: 12, flex: 1 },
  calloutLabel: { fontSize: 7.5, letterSpacing: 1.5, marginBottom: 3 },
  calloutTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
    color: TEXT,
  },
  calloutText: { fontSize: 9.5, color: MUTED, lineHeight: 1.55 },
  flow: {
    backgroundColor: PANEL,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    padding: 14,
    marginVertical: 10,
  },
  flowStep: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PANEL_2,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  flowNum: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#26263400",
    borderWidth: 1,
    borderColor: BORDER,
    color: MUTED,
    fontSize: 8,
    textAlign: "center",
    paddingTop: 3,
    marginRight: 8,
  },
  flowLabel: { fontSize: 10.5, color: TEXT, fontFamily: "Helvetica-Bold" },
  flowNote: { fontSize: 8.5, color: FAINT },
  flowArrow: { textAlign: "center", color: FAINT, fontSize: 9, paddingVertical: 2 },
  tree: {
    backgroundColor: "#0d0d14",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
  },
  treeRow: { fontFamily: "Courier", fontSize: 9, marginBottom: 3, lineHeight: 1.4 },
  gridWrap: { flexDirection: "row", flexWrap: "wrap", marginVertical: 8, marginHorizontal: -4 },
  card2: { width: "50%", padding: 4 },
  card3: { width: "33.33%", padding: 4 },
  cardInner: {
    backgroundColor: PANEL,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    padding: 9,
  },
  cardName: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: TEXT, marginBottom: 2 },
  cardDesc: { fontSize: 8, color: FAINT, lineHeight: 1.4 },
  promptGroupTitle: {
    fontSize: 8.5,
    letterSpacing: 1.5,
    color: ACCENT,
    textTransform: "uppercase",
    marginTop: 10,
    marginBottom: 5,
  },
  promptRow: {
    flexDirection: "row",
    backgroundColor: PANEL,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    padding: 8,
    marginBottom: 4,
  },
  promptCaret: { color: ACCENT, fontFamily: "Courier", fontSize: 9, width: 12 },
  promptText: { flex: 1, fontSize: 9, color: "#c8c8d6", lineHeight: 1.45 },
  splitWrap: { flexDirection: "row", marginVertical: 8, marginHorizontal: -4 },
  splitCol: { width: "50%", padding: 4 },
  splitInner: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
  splitTitle: { fontSize: 9.5, fontFamily: "Helvetica-Bold", marginBottom: 6 },
  splitLi: { flexDirection: "row", marginBottom: 3 },
  // Footer
  footer: {
    position: "absolute",
    bottom: 28,
    left: 54,
    right: 54,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 8,
    fontSize: 8,
    color: FAINT,
  },
});

// Strip the `inline code` backticks for the PDF (no inline styling there).
function plain(text: string) {
  return text.replace(/`/g, "");
}

function Footer({ label }: { label: string }) {
  return (
    <View style={s.footer} fixed>
      <Text>{label}</Text>
      <Text
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}

function TreeRowsPDF({ nodes, depth = 0 }: { nodes: TreeNode[]; depth?: number }) {
  return (
    <>
      {nodes.map((node, i) => (
        <View key={`${depth}-${i}`}>
          {/* One Text node with nested spans → wraps cleanly, no row overflow. */}
          <Text style={[s.treeRow, { paddingLeft: depth * 12 }]}>
            <Text style={{ color: FAINT }}>
              {node.kind === "dir" ? "› " : "· "}
            </Text>
            <Text style={{ color: node.kind === "dir" ? TEXT : MUTED }}>
              {node.label}
            </Text>
            {node.note ? (
              <Text style={{ color: FAINT }}>{"   # " + node.note}</Text>
            ) : null}
          </Text>
          {node.children && (
            <TreeRowsPDF nodes={node.children} depth={depth + 1} />
          )}
        </View>
      ))}
    </>
  );
}

function BlockPDF({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return <Text style={s.p}>{plain(block.text)}</Text>;
    case "h":
      return <Text style={s.h}>{block.text}</Text>;
    case "ul":
      return (
        <View style={{ marginVertical: 6 }}>
          {block.items.map((it, i) => (
            <View key={i} style={s.li}>
              <Text style={s.liBullet}>•</Text>
              <Text style={s.liText}>{plain(it)}</Text>
            </View>
          ))}
        </View>
      );
    case "ol":
      return (
        <View style={{ marginVertical: 6 }}>
          {block.items.map((it, i) => (
            <View key={i} style={s.li}>
              <Text style={s.liBullet}>{i + 1}.</Text>
              <Text style={s.liText}>{plain(it)}</Text>
            </View>
          ))}
        </View>
      );
    case "code":
      return (
        <View style={s.code} wrap={false}>
          <Text style={s.codeHeader}>{block.title ?? block.lang ?? "code"}</Text>
          <Text style={s.codeBody}>{block.code}</Text>
        </View>
      );
    case "callout": {
      const tone = TONE[block.tone];
      return (
        <View style={s.callout} wrap={false}>
          <View style={[s.calloutBar, { backgroundColor: tone.bar }]} />
          <View style={s.calloutBody}>
            <Text style={[s.calloutLabel, { color: tone.bar }]}>
              {tone.label}
            </Text>
            <Text style={s.calloutTitle}>{block.title}</Text>
            <Text style={s.calloutText}>{plain(block.text)}</Text>
          </View>
        </View>
      );
    }
    case "flow":
      return (
        <View style={s.flow} wrap={false}>
          {block.title && (
            <Text style={[s.calloutLabel, { color: FAINT, marginBottom: 8 }]}>
              {block.title.toUpperCase()}
            </Text>
          )}
          {block.steps.map((step, i) => (
            <View key={i}>
              <View style={s.flowStep}>
                <Text style={s.flowNum}>{i + 1}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.flowLabel}>{step.label}</Text>
                  {step.note && <Text style={s.flowNote}>{step.note}</Text>}
                </View>
              </View>
              {i < block.steps.length - 1 && <Text style={s.flowArrow}>↓</Text>}
            </View>
          ))}
        </View>
      );
    case "tree":
      return (
        <View style={s.tree} wrap={false}>
          <TreeRowsPDF nodes={block.nodes} />
        </View>
      );
    case "grid":
      return (
        <View style={s.gridWrap}>
          {block.items.map((it, i) => (
            <View
              key={i}
              style={block.columns === 3 ? s.card3 : s.card2}
              wrap={false}
            >
              <View style={s.cardInner}>
                <Text style={s.cardName}>{it.name}</Text>
                <Text style={s.cardDesc}>{it.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    case "prompts":
      return (
        <View style={{ marginVertical: 6 }}>
          {block.groups.map((g, gi) => (
            <View key={gi}>
              <Text style={s.promptGroupTitle}>{g.category}</Text>
              {g.items.map((it, ii) => (
                <View key={ii} style={s.promptRow} wrap={false}>
                  <Text style={s.promptCaret}>{">"}</Text>
                  <Text style={s.promptText}>{it}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      );
    case "split":
      return (
        <View style={s.splitWrap} wrap={false}>
          {[block.left, block.right].map((col, ci) => (
            <View key={ci} style={s.splitCol}>
              <View
                style={[
                  s.splitInner,
                  {
                    backgroundColor: ci === 0 ? PANEL : "#1c1730",
                    borderColor: ci === 0 ? BORDER : "#3b2f66",
                  },
                ]}
              >
                <Text
                  style={[
                    s.splitTitle,
                    { color: ci === 0 ? MUTED : ACCENT },
                  ]}
                >
                  {col.title}
                </Text>
                {col.items.map((it, ii) => (
                  <View key={ii} style={s.splitLi}>
                    <Text style={{ color: ci === 0 ? FAINT : ACCENT, width: 10, fontSize: 9 }}>
                      •
                    </Text>
                    <Text style={{ flex: 1, fontSize: 9, color: MUTED }}>
                      {it}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      );
    case "stats":
      return (
        <View style={s.gridWrap}>
          {block.items.map((it, i) => (
            <View key={i} style={s.card3} wrap={false}>
              <View style={[s.cardInner, { alignItems: "center" }]}>
                <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold", color: TEXT }}>
                  {it.value}
                </Text>
                <Text style={s.cardDesc}>{it.label}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    default:
      return null;
  }
}

function ChapterPage({
  chapter,
  eyebrow,
  footerLabel,
}: {
  chapter: Chapter;
  eyebrow: string;
  footerLabel: string;
}) {
  return (
    <Page size="A4" style={s.page}>
      <Text style={s.chapterEyebrow}>
        {eyebrow} {chapter.number}
      </Text>
      <Text style={s.chapterTitle}>{chapter.title}</Text>
      <Text style={s.chapterTagline}>{chapter.tagline}</Text>
      {chapter.blocks.map((block, i) => (
        <BlockPDF key={i} block={block} />
      ))}
      <Footer label={footerLabel} />
    </Page>
  );
}

export function GuidePDF({ guide }: { guide: GuideContent }) {
  const footerLabel = `${guide.meta.title} · ${guide.meta.author.replace(/^by |^por /, "")}`;

  return (
    <Document
      title={guide.meta.title}
      author={guide.meta.author}
      subject={guide.meta.subtitle}
    >
      {/* Cover */}
      <Page size="A4" style={s.cover}>
        <View>
          <Text style={s.coverBadge}>{guide.meta.version}</Text>
        </View>
        <View>
          <Text style={s.coverKicker}>{guide.meta.kicker}</Text>
          <Text style={s.coverTitle}>{guide.meta.title}</Text>
          <Text style={s.coverSubtitle}>{guide.meta.subtitle}</Text>
        </View>
        <View style={s.coverMetaRow}>
          <Text style={s.coverMeta}>{guide.meta.author}</Text>
          <Text style={s.coverMeta}>{guide.meta.readingTime}</Text>
        </View>
      </Page>

      {/* Table of contents */}
      <Page size="A4" style={s.page}>
        <Text style={s.tocTitle}>{guide.ui.contents}</Text>
        {guide.chapters.map((c) => (
          <View key={c.id} style={s.tocRow}>
            <Text style={s.tocNum}>{String(c.number).padStart(2, "0")}</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.tocText}>{c.title}</Text>
              <Text style={s.tocTagline}>{c.tagline}</Text>
            </View>
          </View>
        ))}
        <Footer label={footerLabel} />
      </Page>

      {/* One page (or more) per chapter */}
      {guide.chapters.map((chapter) => (
        <ChapterPage
          key={chapter.id}
          chapter={chapter}
          eyebrow={guide.ui.chapter}
          footerLabel={footerLabel}
        />
      ))}
    </Document>
  );
}
