"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle2,
  ArrowDown,
  Folder,
  FileCode,
  Terminal,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../content-engine/lib/cn";
import type { Block, CalloutTone, TreeNode } from "../lib/guide-content";

// ── Inline formatting ────────────────────────────────────────────────────────
// Renders `inline code` spans inside otherwise-plain strings.
function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={i}
            className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-white/90 ring-1 ring-inset ring-white/10"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

// ── Callouts ─────────────────────────────────────────────────────────────────
const CALLOUT: Record<
  CalloutTone,
  { icon: typeof Lightbulb; ring: string; bg: string; text: string; iconColor: string }
> = {
  tip: {
    icon: Lightbulb,
    ring: "ring-violet-400/25",
    bg: "bg-violet-500/[0.07]",
    text: "text-violet-200",
    iconColor: "text-violet-300",
  },
  warning: {
    icon: AlertTriangle,
    ring: "ring-amber-400/25",
    bg: "bg-amber-500/[0.07]",
    text: "text-amber-200",
    iconColor: "text-amber-300",
  },
  note: {
    icon: Info,
    ring: "ring-sky-400/25",
    bg: "bg-sky-500/[0.07]",
    text: "text-sky-200",
    iconColor: "text-sky-300",
  },
  success: {
    icon: CheckCircle2,
    ring: "ring-emerald-400/25",
    bg: "bg-emerald-500/[0.07]",
    text: "text-emerald-200",
    iconColor: "text-emerald-300",
  },
};

function Callout({
  tone,
  title,
  text,
}: {
  tone: CalloutTone;
  title: string;
  text: string;
}) {
  const c = CALLOUT[tone];
  const Icon = c.icon;
  return (
    <div
      className={cn(
        "my-7 flex gap-4 rounded-2xl p-5 ring-1 ring-inset backdrop-blur",
        c.bg,
        c.ring,
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", c.iconColor)} aria-hidden />
      <div>
        <p className={cn("mb-1 text-sm font-semibold", c.text)}>{title}</p>
        <p className="text-sm leading-relaxed text-white/70">
          <RichText text={text} />
        </p>
      </div>
    </div>
  );
}

// ── Code block ───────────────────────────────────────────────────────────────
function CodeBlock({
  title,
  lang,
  code,
}: {
  title?: string;
  lang?: string;
  code: string;
}) {
  return (
    <div className="my-7 overflow-hidden rounded-2xl bg-[#0b0b10] ring-1 ring-inset ring-white/10">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-white/40" aria-hidden />
          <span className="text-xs font-medium text-white/50">
            {title ?? lang ?? "code"}
          </span>
        </div>
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
      </div>
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
        <code className="font-mono text-white/85">{code}</code>
      </pre>
    </div>
  );
}

// ── Flow / architecture diagram ──────────────────────────────────────────────
function Flow({
  title,
  steps,
}: {
  title?: string;
  steps: { label: string; note?: string }[];
}) {
  return (
    <figure className="my-8">
      {title && (
        <figcaption className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
          {title}
        </figcaption>
      )}
      <div className="rounded-2xl bg-white/[0.02] p-6 ring-1 ring-inset ring-white/10">
        <ol className="flex flex-col items-stretch gap-0">
          {steps.map((step, i) => (
            <li key={i}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative flex items-center gap-4 rounded-xl bg-gradient-to-r from-white/[0.06] to-transparent px-5 py-4 ring-1 ring-inset ring-white/10"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white/70 ring-1 ring-inset ring-white/15">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-white">{step.label}</p>
                  {step.note && (
                    <p className="text-sm text-white/50">{step.note}</p>
                  )}
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-1.5">
                  <ArrowDown
                    className="h-4 w-4 text-white/25"
                    aria-hidden
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

// ── Folder tree ──────────────────────────────────────────────────────────────
function TreeRows({ nodes, depth = 0 }: { nodes: TreeNode[]; depth?: number }) {
  return (
    <>
      {nodes.map((node, i) => (
        <React.Fragment key={`${depth}-${i}-${node.label}`}>
          <div
            className="flex items-center gap-2 py-1 font-mono text-[13px]"
            style={{ paddingLeft: `${depth * 20}px` }}
          >
            {node.kind === "dir" ? (
              <Folder className="h-3.5 w-3.5 shrink-0 text-sky-300/80" aria-hidden />
            ) : (
              <FileCode className="h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden />
            )}
            <span
              className={cn(
                node.kind === "dir" ? "text-white/90" : "text-white/65",
              )}
            >
              {node.label}
            </span>
            {node.note && (
              <span className="text-white/30"># {node.note}</span>
            )}
          </div>
          {node.children && <TreeRows nodes={node.children} depth={depth + 1} />}
        </React.Fragment>
      ))}
    </>
  );
}

function Tree({ title, nodes }: { title?: string; nodes: TreeNode[] }) {
  return (
    <div className="my-7 overflow-hidden rounded-2xl bg-[#0b0b10] ring-1 ring-inset ring-white/10">
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <Folder className="h-3.5 w-3.5 text-white/40" aria-hidden />
        <span className="text-xs font-medium text-white/50">
          {title ?? "structure"}
        </span>
      </div>
      <div className="overflow-x-auto p-5">
        <TreeRows nodes={nodes} />
      </div>
    </div>
  );
}

// ── Grid of concept cards ────────────────────────────────────────────────────
function Grid({
  columns = 2,
  items,
}: {
  columns?: 2 | 3;
  items: { name: string; desc: string }[];
}) {
  return (
    <div
      className={cn(
        "my-7 grid gap-3",
        columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
          className="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-inset ring-white/10 transition-colors duration-300 hover:bg-white/[0.05] hover:ring-white/20"
        >
          <p className="mb-1.5 font-medium text-white">{item.name}</p>
          <p className="text-sm leading-relaxed text-white/55">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ── Prompt library ───────────────────────────────────────────────────────────
function Prompts({
  groups,
}: {
  groups: { category: string; items: string[] }[];
}) {
  return (
    <div className="my-7 space-y-6">
      {groups.map((group, gi) => (
        <div key={gi}>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            {group.category}
          </p>
          <div className="space-y-2">
            {group.items.map((item, ii) => (
              <div
                key={ii}
                className="flex items-start gap-3 rounded-xl bg-white/[0.03] px-4 py-3 ring-1 ring-inset ring-white/10"
              >
                <span
                  className="mt-1 font-mono text-xs text-violet-300/80"
                  aria-hidden
                >
                  {">"}
                </span>
                <p className="text-sm leading-relaxed text-white/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Split comparison (this vs. that) ─────────────────────────────────────────
function Split({
  left,
  right,
}: {
  left: { title: string; items: string[] };
  right: { title: string; items: string[] };
}) {
  return (
    <div className="my-7 grid gap-3 sm:grid-cols-2">
      {[left, right].map((col, ci) => (
        <div
          key={ci}
          className={cn(
            "rounded-2xl p-5 ring-1 ring-inset",
            ci === 0
              ? "bg-white/[0.02] ring-white/10"
              : "bg-violet-500/[0.06] ring-violet-400/20",
          )}
        >
          <p
            className={cn(
              "mb-3 text-sm font-semibold",
              ci === 0 ? "text-white/60" : "text-violet-200",
            )}
          >
            {col.title}
          </p>
          <ul className="space-y-2">
            {col.items.map((item, ii) => (
              <li
                key={ii}
                className="flex items-start gap-2 text-sm text-white/70"
              >
                <span
                  className={cn(
                    "mt-1.5 h-1 w-1 shrink-0 rounded-full",
                    ci === 0 ? "bg-white/30" : "bg-violet-300",
                  )}
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ── Lists ────────────────────────────────────────────────────────────────────
function List({ ordered, items }: { ordered: boolean; items: string[] }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className="my-6 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-white/70">
          {ordered ? (
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold text-white/60">
              {i + 1}
            </span>
          ) : (
            <span
              className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-violet-300/70"
              aria-hidden
            />
          )}
          <span className="leading-relaxed">
            <RichText text={item} />
          </span>
        </li>
      ))}
    </Tag>
  );
}

// ── Dispatcher ───────────────────────────────────────────────────────────────
export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "p":
            return (
              <p key={i} className="my-5 text-[17px] leading-[1.75] text-white/70">
                <RichText text={block.text} />
              </p>
            );
          case "h":
            return (
              <h3
                key={i}
                className="mb-3 mt-12 text-xl font-semibold tracking-tight text-white"
              >
                {block.text}
              </h3>
            );
          case "ul":
            return <List key={i} ordered={false} items={block.items} />;
          case "ol":
            return <List key={i} ordered items={block.items} />;
          case "code":
            return (
              <CodeBlock
                key={i}
                title={block.title}
                lang={block.lang}
                code={block.code}
              />
            );
          case "callout":
            return (
              <Callout
                key={i}
                tone={block.tone}
                title={block.title}
                text={block.text}
              />
            );
          case "flow":
            return <Flow key={i} title={block.title} steps={block.steps} />;
          case "tree":
            return <Tree key={i} title={block.title} nodes={block.nodes} />;
          case "grid":
            return <Grid key={i} columns={block.columns} items={block.items} />;
          case "prompts":
            return <Prompts key={i} groups={block.groups} />;
          case "split":
            return <Split key={i} left={block.left} right={block.right} />;
          case "stats":
            return (
              <div key={i} className="my-7 grid gap-3 sm:grid-cols-3">
                {block.items.map((s, si) => (
                  <div
                    key={si}
                    className="rounded-2xl bg-white/[0.03] p-5 text-center ring-1 ring-inset ring-white/10"
                  >
                    <p className="text-2xl font-semibold text-white">{s.value}</p>
                    <p className="mt-1 text-sm text-white/50">{s.label}</p>
                  </div>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
