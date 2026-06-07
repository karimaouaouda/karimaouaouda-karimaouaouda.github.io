"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type FormState = "idle" | "submitting" | "success" | "error";

const contactFunctionUrl = process.env.NEXT_PUBLIC_SUPABASE_CONTACT_FUNCTION_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      message: String(data.get("message") || ""),
      source: "portfolio",
    };

    if (contactFunctionUrl && anonKey) {
      const response = await fetch(contactFunctionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setState("error");
        return;
      }

      setState("success");
      event.currentTarget.reset();
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setState("success");
      event.currentTarget.reset();
      return;
    }

    const { error } = await supabase.from("contact_messages").insert(payload);

    if (error) {
      setState("error");
      return;
    }

    setState("success");
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-md border border-[#dbe3ea] bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#111827]">
          Name
          <input className="form-input" name="name" required placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#111827]">
          Email
          <input className="form-input" type="email" name="email" required placeholder="you@company.com" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-[#111827]">
        Company or role
        <input className="form-input" name="company" placeholder="Startup, recruiter, founder..." />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[#111827]">
        Message
        <textarea className="form-input min-h-32 resize-y" name="message" required placeholder="Tell me about the role, product, or project." />
      </label>
      <Button type="submit" disabled={state === "submitting"} icon={Send}>
        {state === "submitting" ? "Sending..." : "Send message"}
      </Button>
      {state === "success" ? (
        <p className="text-sm font-medium text-[#0f766e]">
          Message captured. Add Supabase env vars to persist it in production.
        </p>
      ) : null}
      {state === "error" ? <p className="text-sm font-medium text-red-600">Something failed while saving the message.</p> : null}
    </form>
  );
}
