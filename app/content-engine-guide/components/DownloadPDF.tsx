"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Download, Loader2 } from "lucide-react";
import { cn } from "../../content-engine/lib/cn";
import { GuidePDF } from "./GuidePDF";
import type { GuideContent } from "../lib/guide-content";

// @react-pdf/renderer must never run on the server here — mirror the pattern
// used by the PDFStudio route (dynamic import, ssr: false).
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((m) => m.PDFDownloadLink),
  { ssr: false },
);

export function DownloadPDF({
  guide,
  className,
}: {
  guide: GuideContent;
  className?: string;
}) {
  // Only mount the link after hydration to avoid SSR/CSR markup mismatches.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const fileName = `${guide.meta.title
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/(^-|-$)/g, "")}.pdf`;

  const base = cn(
    "inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium",
    "bg-white text-black transition-all duration-300 hover:bg-white/90",
    "shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_10px_30px_-10px_rgba(255,255,255,0.35)]",
    className,
  );

  if (!mounted) {
    return (
      <span className={cn(base, "pointer-events-none opacity-70")}>
        <Loader2 className="h-4 w-4 animate-spin" />
        {guide.ui.downloading}
      </span>
    );
  }

  return (
    <PDFDownloadLink
      document={<GuidePDF guide={guide} />}
      fileName={fileName}
      className={base}
    >
      {({ loading }) =>
        loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {guide.ui.downloading}
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            {guide.ui.download}
          </>
        )
      }
    </PDFDownloadLink>
  );
}
