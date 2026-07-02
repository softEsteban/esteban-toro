// TEMPORARY verification route — delete after checking the PDF output.
import * as React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { writeFile } from "node:fs/promises";
import { GuidePDF } from "../content-engine-guide/components/GuidePDF";
import { getGuide } from "../content-engine-guide/lib/guide-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const el = React.createElement(GuidePDF, { guide: getGuide("es") });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buf = await renderToBuffer(el as any);
  await writeFile(
    "C:/Users/esteb/Documents/esteban-toro/tmp-guide-check.pdf",
    buf,
  );
  return new Response("ok:" + buf.length);
}
