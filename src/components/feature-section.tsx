"use client"

import { motion } from "framer-motion"
import { FileText, Building, GraduationCap, ChevronRight } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Document Recognition",
      description:
        "Professional recognition of foreign education documents with comprehensive assessment and verification services.",
      link: "/recognition",
      color: "from-blue-500 to-indigo-700",
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Institutional Accreditation",
      description: "Comprehensive accreditation services for educational institutions ensuring quality standards and compliance.",
      link: "/accreditation",
      color: "from-orange-400 to-pink-600",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Bologna Process",
      description: "Implementation and support of Bologna Process principles for European higher education integration.",
      link: "/bologna",
      color: "from-emerald-500 to-teal-700",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(0,51,102,0.03),transparent_20%)]" />
      </div>

      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border border-[#003366]/20 bg-white px-3 py-1 text-sm text-[#003366] shadow-sm">
            <span className="font-medium">Our Services</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-[#003366] sm:text-4xl md:text-5xl">
              Quality Education Assessment
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Comprehensive services for educational institutions, students, and professionals seeking quality assurance
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5" />
              <div className="relative z-10">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${feature.color} text-white`}
                >
                  {feature.icon}
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold text-[#003366]">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <div className="mt-4 flex items-center text-[#FF6600] group-hover:underline">
                  <a href={feature.link} className="text-sm font-medium">
                    Learn more
                  </a>
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#003366] to-[#FF6600] transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
