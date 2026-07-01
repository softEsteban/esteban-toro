import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client. The service-role key bypasses RLS and must
// NEVER be imported into a client component or shipped to the browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Supabase env vars are not configured.");
    return NextResponse.json(
      { error: "Signups are temporarily unavailable." },
      { status: 500 },
    );
  }

  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("content_engine_leads").insert({
    email: email.trim().toLowerCase(),
    source: "content-engine",
    referrer: request.headers.get("referer"),
    user_agent: request.headers.get("user-agent"),
  });

  // 23505 = unique_violation → already subscribed. Treat as success.
  if (error && error.code !== "23505") {
    console.error("Lead insert failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
