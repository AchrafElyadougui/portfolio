import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Container from "../common/Container";
import RevealText from "../common/RevealText";
import MagneticButton from "../common/MagneticButton";
import { social } from "../../data/social";
import { fadeUp, viewportStagger } from "../../lib/motion";

const contactLinks = [
  { label: "Email", value: social.email, href: `mailto:${social.email}` },
  { label: "LinkedIn", value: "el-yadougui-achraf", href: social.linkedin },
  { label: "GitHub", value: "AchrafElyadougui", href: social.github },
];

const initialForm = { name: "", email: "", subject: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.subject.trim()) errors.subject = "Subject is required.";
  if (!form.message.trim()) {
    errors.message = "Message is required.";
  } else if (form.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

const fieldClasses =
  "w-full border-b bg-transparent py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-colors focus:border-[var(--color-accent)]";

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (validated) setValidated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setValidated(true);
  };

  return (
    <section id="contact" className="py-28 md:py-40">
      <Container>
        <div className="mb-6 flex items-baseline gap-3 font-mono text-xs">
          <span className="text-[var(--color-accent)]">07</span>
          <span className="uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Contact</span>
          <span className="h-px flex-1 bg-[var(--color-line)]" />
        </div>

        <RevealText
          as="h2"
          stagger={0.04}
          className="text-[clamp(2.6rem,10vw,7rem)] font-semibold leading-[0.95] tracking-tighter text-[var(--color-text)]"
          segments={[
            { text: "Let's build " },
            { text: "something.", className: "text-[var(--color-accent)]" },
          ]}
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <motion.div
            variants={viewportStagger(0.08).variants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5"
          >
            <p className="max-w-sm text-[var(--color-text-muted)]">
              Have a project, a role, or just want to say hi? Reach out directly, or
              use the form.
            </p>

            <div className="mt-10">
              {contactLinks.map((link) => (
                <motion.a
                  key={link.label}
                  variants={fadeUp}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-cursor="OPEN"
                  className="group flex items-center justify-between border-t border-[var(--color-line)] py-5 last:border-b"
                >
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
                      {link.label}
                    </span>
                    <span className="text-lg text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-accent)] sm:text-xl">
                      {link.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-[var(--color-text-faint)] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--color-accent)]"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            variants={viewportStagger(0.06).variants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-7"
          >
            <div className="grid gap-8 sm:grid-cols-2">
              <motion.div variants={fadeUp}>
                <label htmlFor="name" className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`${fieldClasses} ${errors.name ? "border-red-400" : "border-[var(--color-line-strong)]"}`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </motion.div>
              <motion.div variants={fadeUp}>
                <label htmlFor="email" className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`${fieldClasses} ${errors.email ? "border-red-400" : "border-[var(--color-line-strong)]"}`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="mt-8">
              <label htmlFor="subject" className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                className={`${fieldClasses} ${errors.subject ? "border-red-400" : "border-[var(--color-line-strong)]"}`}
              />
              {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <label htmlFor="message" className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                className={`${fieldClasses} resize-none ${errors.message ? "border-red-400" : "border-[var(--color-line-strong)]"}`}
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
              <MagneticButton
                as="button"
                type="submit"
                data-cursor="SEND"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-[#0a0a0a]"
              >
                Send Message <ArrowUpRight size={14} />
              </MagneticButton>
            </motion.div>

            {validated && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-start gap-2 border border-[var(--color-accent)]/30 bg-[var(--color-accent-dim)] p-4 text-sm text-[var(--color-accent)]"
              >
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                This form isn&apos;t wired to an email service yet, so nothing was
                actually sent — please reach out directly at{" "}
                <a href={`mailto:${social.email}`} className="underline">
                  {social.email}
                </a>{" "}
                in the meantime.
              </motion.p>
            )}
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
