"use client";

import { useState } from "react";

export default function HeroEnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setSubmitStatus("error");
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMsg("");

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_CMS_API_URL || "";
      const res = await fetch(`${apiBaseUrl}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          interestedIn: subject || "General Enquiry",
          preferredDate,
          projectGoals: preferredDate
            ? `${message}${message ? "\n\n" : ""}Preferred Date: ${preferredDate}`
            : message,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSubmitStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setPreferredDate("");
        setMessage("");
      } else {
        setSubmitStatus("error");
        setErrorMsg(json.error || "Failed to submit enquiry.");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setErrorMsg("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="backdrop-blur-md bg-black/30 border border-white/15 p-8 sm:p-10">
      <h3 className="font-serif text-2xl text-[#FAF6EC]">Book Your Table</h3>
      <p className="mt-1 text-sm text-[#FAF6EC]/60">We aim to respond within 24 hours.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Name */}
        <div className="relative pt-4">
          <input
            type="text"
            id="hero-enquiry-name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer w-full bg-transparent border-b border-white/30 py-2 text-[#FAF6EC] font-light focus:outline-none focus:border-[#C9A66B] transition-colors placeholder-transparent"
            placeholder="Name"
            required
            aria-required="true"
            aria-describedby="hero-enquiry-status"
          />
          <label
            htmlFor="hero-enquiry-name"
            className="absolute left-0 -top-0 text-[10px] uppercase tracking-widest font-bold text-[#FAF6EC]/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#FAF6EC]/50 peer-placeholder-shown:font-light peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#C9A66B]"
          >
            Name <span className="text-[#C9A66B]">*</span>
          </label>
        </div>

        {/* Email */}
        <div className="relative pt-4">
          <input
            type="email"
            id="hero-enquiry-email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full bg-transparent border-b border-white/30 py-2 text-[#FAF6EC] font-light focus:outline-none focus:border-[#C9A66B] transition-colors placeholder-transparent"
            placeholder="Email"
            required
            aria-required="true"
            aria-describedby="hero-enquiry-status"
          />
          <label
            htmlFor="hero-enquiry-email"
            className="absolute left-0 -top-0 text-[10px] uppercase tracking-widest font-bold text-[#FAF6EC]/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#FAF6EC]/50 peer-placeholder-shown:font-light peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#C9A66B]"
          >
            Email <span className="text-[#C9A66B]">*</span>
          </label>
        </div>

        {/* Enquiry Type + Preferred Date (calendar) side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative pt-4">
            <select
              id="hero-enquiry-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="peer w-full bg-transparent border-b border-white/30 py-2 text-[#FAF6EC] font-light focus:outline-none focus:border-[#C9A66B] transition-colors appearance-none cursor-pointer"
              aria-describedby="hero-enquiry-status"
            >
              <option value="" disabled className="text-neutral-800">
                Enquiry type
              </option>
              <option value="Table Reservation" className="text-neutral-800">
                Table Reservation
              </option>
              <option value="Christmas Party" className="text-neutral-800">
                Christmas Party
              </option>
              <option value="Christmas Day" className="text-neutral-800">
                Christmas Day
              </option>
              <option value="Boxing Day" className="text-neutral-800">
                Boxing Day
              </option>
              <option value="New Year's Eve" className="text-neutral-800">
                New Year&apos;s Eve
              </option>
              <option value="General Enquiry" className="text-neutral-800">
                General Enquiry
              </option>
            </select>
            <label
              htmlFor="hero-enquiry-subject"
              className="absolute left-0 -top-0 text-[10px] uppercase tracking-widest font-bold text-[#FAF6EC]/50 peer-focus:text-[#C9A66B]"
            >
              Enquiry Type
            </label>
            <div
              className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-[#FAF6EC]/50 mt-4"
              aria-hidden="true"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Calendar / preferred date field */}
          <div className="relative pt-4">
            <input
              type="date"
              id="hero-enquiry-date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="peer w-full bg-transparent border-b border-white/30 py-2 text-[#FAF6EC] font-light focus:outline-none focus:border-[#C9A66B] transition-colors [color-scheme:dark]"
              aria-describedby="hero-enquiry-status"
            />
            <label
              htmlFor="hero-enquiry-date"
              className="absolute left-0 -top-0 text-[10px] uppercase tracking-widest font-bold text-[#FAF6EC]/50 peer-focus:text-[#C9A66B]"
            >
              Preferred Date
            </label>
          </div>
        </div>

        {/* Message (optional) */}
        <div className="relative pt-4">
          <textarea
            id="hero-enquiry-message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="peer w-full bg-transparent border-b border-white/30 py-2 text-[#FAF6EC] font-light focus:outline-none focus:border-[#C9A66B] transition-colors placeholder-transparent resize-none"
            placeholder="Message"
            aria-describedby="hero-enquiry-status"
          />
          <label
            htmlFor="hero-enquiry-message"
            className="absolute left-0 -top-0 text-[10px] uppercase tracking-widest font-bold text-[#FAF6EC]/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#FAF6EC]/50 peer-placeholder-shown:font-light peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#C9A66B]"
          >
            Message (optional)
          </label>
        </div>

        <div id="hero-enquiry-status" role="status" aria-live="polite">
          {submitStatus === "success" && (
            <p className="text-emerald-400 text-sm font-semibold">
              ✓ Thank you! We&apos;ll be in touch shortly.
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-rose-400 text-sm font-semibold">✗ {errorMsg}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-[#C9A66B] hover:bg-[#DAB77E] text-[#0E2A1E] uppercase tracking-[0.2em] text-xs font-bold transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
}
