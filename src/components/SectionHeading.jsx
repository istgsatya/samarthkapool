import { motion } from 'framer-motion'
import BlurTextAnimation from './ui/blur-text-animation'

const SectionHeading = ({ eyebrow, title, subtitle, splitTitle = false, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`mb-8 ${className}`}
    >
      <BlurTextAnimation
        text={eyebrow}
        as="p"
        className="text-xs font-semibold uppercase tracking-[0.35em]"
        textColor="text-turquoise"
      />
      <BlurTextAnimation
        text={title}
        as="h2"
        className="mt-3 font-display text-3xl leading-tight text-ocean sm:text-4xl"
        textColor="text-ocean"
      />
      {subtitle ? (
        <BlurTextAnimation
          text={subtitle}
          as="p"
          className="mt-3 max-w-lg text-sm text-ocean/70"
          textColor="text-ocean/70"
        />
      ) : null}
    </motion.div>
  )
}

export default SectionHeading
