"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { cn } from "../lib/cn";
import { useT } from "./LanguageProvider";

type Status = "idle" | "loading" | "success" | "error";

// Same pattern the server enforces, so client + server agree.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns a validation error code, or null when the email is valid. */
function validateEmail(value: string): "empty" | "format" | null {
  const email = value.trim();
  if (!email) return "empty";
  if (!EMAIL_RE.test(email)) return "format";
  return null;
}

/**
 * Reusable email capture form. Drop it anywhere on the page.
 *
 * Persists the lead to Supabase via the server-side route handler at
 * `app/api/subscribe/route.ts` (which uses the service-role key, so no secret
 * ever reaches the browser).
 *
 * ────────────────────────────────────────────────────────────────────────────
 * TODO (optional): also forward the email to an email provider so you can send
 * the guide automatically. Do this inside the route handler, not here:
 *
 *   • ConvertKit — POST https://api.convertkit.com/v3/forms/{FORM_ID}/subscribe
 *     with { api_key, email }.
 *   • Beehiiv — POST https://api.beehiiv.com/v2/publications/{PUB_ID}/subscriptions
 *     with Authorization: Bearer {API_KEY} and { email }.
 * ────────────────────────────────────────────────────────────────────────────
 */
async function subscribe(email: string): Promise<void> {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error ?? "Subscription failed");
  }
}

export function EmailForm({
  className,
  size = "default",
  buttonLabel,
}: {
  className?: string;
  size?: "default" | "lg";
  buttonLabel?: string;
}) {
  const { form, product } = useT();
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const isLarge = size === "lg";
  const label = buttonLabel ?? product.primaryCta;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    // Client-side validation: empty input + email format.
    const validationError = validateEmail(email);
    if (validationError) {
      setErrorMsg(
        validationError === "empty" ? form.errorEmpty : form.errorFormat,
      );
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      await subscribe(email);
      setStatus("success");
    } catch {
      setErrorMsg(form.errorGeneric);
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full", className)}
      noValidate
    >
      <div
        className={cn(
          "flex flex-col gap-3",
          isLarge ? "sm:flex-row" : "sm:flex-row sm:gap-3",
        )}
      >
        <Input
          type="email"
          required
          autoComplete="email"
          placeholder={form.placeholder}
          value={email}
          disabled={status === "success"}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-label="Email address"
          className={cn(isLarge && "sm:h-16 sm:text-lg")}
        />
        <Button
          type="submit"
          size={isLarge ? "lg" : "default"}
          disabled={status === "loading" || status === "success"}
          className={cn("shrink-0", isLarge && "sm:h-16")}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === "loading" ? (
              <motion.span
                key="loading"
                className="inline-flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                {form.sending}
              </motion.span>
            ) : status === "success" ? (
              <motion.span
                key="success"
                className="inline-flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Check className="h-4 w-4" />
                {form.successBtn}
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                className="inline-flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>

      <div className="mt-3 min-h-5 px-1 text-sm">
        {status === "error" && (
          <p className="text-rose-400">{errorMsg}</p>
        )}
        {status === "success" ? (
          <p className="text-emerald-400">{form.successMsg}</p>
        ) : (
          status !== "error" && (
            <p className="text-white/40">{form.disclaimer}</p>
          )
        )}
      </div>
    </form>
  );
}
