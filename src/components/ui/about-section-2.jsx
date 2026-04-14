import { motion } from 'framer-motion'

export default function AboutSection2({
  eyebrow,
  title,
  subtitle,
  highlights = [],
  reducedMotion = false,
}) {
  return (
    <section className="ambient-band snap-start px-4 py-16 sm:px-5 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-turquoise">{eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-ocean sm:text-5xl">{title}</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ocean/75">{subtitle}</p>
        </motion.div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
              whileHover={reducedMotion ? undefined : { y: -4 }}
              className="ambient-frame ambient-border-glow relative rounded-2xl p-4"
            >
              <p className="text-2xl" aria-hidden>
                {item.icon}
              </p>
              <h3 className="mt-3 font-display text-3xl text-ocean">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ocean/75">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
