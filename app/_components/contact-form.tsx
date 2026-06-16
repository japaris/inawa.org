"use client";

import { useState, type FormEvent } from "react";
import { LANDING } from "@/lib/copy";

type Status = "idle" | "sending" | "success" | "error";

const c = LANDING.contact;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    idea: "",
    stage: c.stages.options[0].value,
    company: "", // honeypot anti-spam
  });

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        idea: "",
        stage: c.stages.options[0].value,
        company: "",
      });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="mt-8 rounded-xl border border-terracotta/40 bg-cream px-6 py-5 text-center text-ink">
        {c.feedback.success}
      </p>
    );
  }

  const inputClass =
    "rounded-lg border border-border bg-cream px-3.5 py-2.5 text-ink outline-none transition-colors focus:border-terracotta focus:ring-2 focus:ring-terracotta/20";

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4 text-left">
      {/* Honeypot : masqué aux humains, rempli par les bots. */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={(e) => update("company", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="grid gap-1.5">
        <span className="text-sm font-medium text-ink">{c.fields.name}</span>
        <input
          type="text"
          required
          maxLength={120}
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="grid gap-1.5">
        <span className="text-sm font-medium text-ink">{c.fields.email}</span>
        <input
          type="email"
          required
          maxLength={200}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="grid gap-1.5">
        <span className="text-sm font-medium text-ink">{c.fields.idea}</span>
        <textarea
          required
          rows={4}
          maxLength={5000}
          value={form.idea}
          onChange={(e) => update("idea", e.target.value)}
          className={inputClass}
        />
      </label>

      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium text-ink">
          {c.stages.legend}
        </legend>
        <div className="flex flex-wrap gap-2">
          {c.stages.options.map((o) => (
            <label
              key={o.value}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors ${
                form.stage === o.value
                  ? "border-terracotta bg-terracotta text-cream"
                  : "border-border bg-cream text-ink hover:border-terracotta"
              }`}
            >
              <input
                type="radio"
                name="stage"
                value={o.value}
                checked={form.stage === o.value}
                onChange={(e) => update("stage", e.target.value)}
                className="sr-only"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      {status === "error" && (
        <p className="text-sm font-medium text-terracotta-deep">
          {c.feedback.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="justify-self-start rounded-full bg-navy px-7 py-3 font-medium text-cream transition-colors hover:bg-navy-deep disabled:opacity-60"
      >
        {status === "sending" ? c.feedback.sending : c.fields.submit}
      </button>
    </form>
  );
}
