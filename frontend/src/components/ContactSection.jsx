import { useState } from "react";
import { motion } from "framer-motion";
import Instagram from '../assets/icons/instagram.svg';
import Discord from '../assets/icons/discord.svg';
import Mail from '../assets/icons/email.svg';
import LinkedIn from '../assets/icons/linkedin.svg';
import { fadeUp, staggerContainer, viewportFadeUp } from '../lib/motion';
import RevealText from './RevealText';

const contactLinks = [
    {name:'Mail',icon:Mail,link:'mailto:achrafelyadougui@gmail.com'},
    {name:'LinkedIn',icon:LinkedIn,link:'https://linkedin.com/in/achraf-el-yadougui'},
    {name:'Discord',icon:Discord,link:'https://discord.gg/DHcZFKSc'},
    {name:'Instagram',icon:Instagram,link:'https://www.instagram.com/achraf_el_yadougui/'},
]
export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <motion.section {...viewportFadeUp} className="mx-auto text-[var(--color-text)] mb-7">
      <RevealText
        as="h2"
        className="text-3xl md:text-4xl font-bold mb-4"
        segments={[
          { text: "Contact me" },
          { text: ".", className: "text-blue-500" },
        ]}
      />
      <p className="mb-8 text-lg">
        I'm always eager to explore new opportunities and take on exciting projects. If you have a project in mind, or just want to say hi, feel free to send me a message.
      </p>

      <form className="bg-white dark:bg-[var(--color-nav-hover)] p-6 rounded-xl shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border rounded px-3 py-2 bg-transparent"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@doe.com"
              className="w-full border rounded px-3 py-2 bg-transparent"
              required
            />
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">
            Message<span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Hello there, I would like to ask you about..."
            className="w-full border rounded px-3 py-2 bg-transparent"
            rows="5"
            maxLength="500"
            required
          />
          <p className="text-right text-sm text-gray-500">
            {form.message.length}/500 characters
          </p>
        </div>
        <div className="flex justify-end">
            <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-gray-200 text-black px-6 py-2 rounded-md hover:bg-gray-300 transition "
            disabled
            >
             Send
            </motion.button>
        </div>
      </form>

      <p className="mt-8 text-lg">Or contact me with...</p>
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-4 flex flex-wrap items-center gap-4"
      >
        {contactLinks.map((tag, i) => (
            <motion.a
                variants={fadeUp}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={tag.link} target="_blank" key={i}
                className="w-fit h-fit flex items-center gap-2 bg-[var(--color-nav-hover)] text-[var(--color-nav-text)] px-5 py-1 rounded-md">
                <img
                    src={tag.icon}
                    alt={`${tag.name} icon`}
                    className="w-6 h-6"
                />
                {tag.name}
            </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}

