'use client'

import { motion } from 'framer-motion'

const page = () => {
  const sections = [
    {
      title: 'Halo, Aku Gendhut 👋',
      content: 'Namaku Muhammad Putra Perdana, tapi orang-orang lebih akrab memanggilku Gendhut.',
    },
    {
      title: 'Awal Cerita',
      content: 'Semua berawal dari komputer tua di pojok kamar. Aku bongkar, belajar, dan jatuh cinta pada dunia teknologi.',
    },
    {
      title: 'Ngoding? Pelan-pelan',
      content: 'HTML. CSS. Lalu Laravel. Unity. Dan sekarang... aku bikin web kayak gini.',
    },
    {
      title: 'Filosofi Hidupku',
      content: 'Aku bukan yang paling jago. Tapi aku yang paling penasaran. Dan aku terus belajar.',
    },
    {
      title: 'Sekarang & Besok',
      content: 'Aku masih belajar, masih berkembang. Tujuanku? Jadi solusi lewat kode dan karya.',
    },
  ]

  return (
    <main className="bg-black text-white min-h-screen snap-y snap-mandatory overflow-y-scroll">
      {sections.map((section, index) => (
        <section
          key={index}
          className="snap-start h-screen flex flex-col items-center justify-center px-8 text-center"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {section.title}
          </motion.h1>
          <motion.p
            className="max-w-xl text-lg md:text-xl text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {section.content}
          </motion.p>
        </section>
      ))}
    </main>
  )
}

export default page
