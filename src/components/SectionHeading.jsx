import { motion } from 'framer-motion'

const SectionHeading = ({ eyebrow, title, subtitle, splitTitle = false, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`mb-8 ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-turquoise">{eyebrow}</p>
      <h2
        className="mt-3 font-display text-3xl leading-tight text-ocean sm:text-4xl"
        data-split={splitTitle || undefined}
      >
        {title}
      </h2>
      {subtitle && <p className="mt-3 max-w-lg text-sm text-ocean/70">{subtitle}</p>}
    </motion.div>
  )
}

export default SectionHeading
