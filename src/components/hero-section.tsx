"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, ChevronRight } from "lucide-react"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * (canvas?.width || 800)
        this.y = Math.random() * (canvas?.height || 600)
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = Math.random() > 0.5 ? "rgba(0, 51, 102, 0.3)" : "rgba(255, 102, 0, 0.3)"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (canvas && this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas?.width || 800

        if (canvas && this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas?.height || 600
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < particles.length; i++) {
          particles[i].update()
          particles[i].draw()
        }
      }
      requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full border border-[#003366]/20 bg-white px-3 py-1 text-sm text-[#003366] shadow-sm">
              <span className="font-medium">Білім сапасын бағалау орталығы</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter text-[#003366] sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Connecting</span>
                <span className="block bg-gradient-to-r from-[#003366] to-[#0066CC] bg-clip-text text-transparent">
                  Education & Quality
                </span>
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Bridging the gap between academic excellence and international standards through innovative quality assessment and recognition services.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button className="group bg-[#003366] hover:bg-[#004080] text-white">
                For Students
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="group border-[#003366] text-[#003366] hover:bg-[#003366]/10">
                For Universities
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="mt-6 flex items-center space-x-4 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`inline-block h-8 w-8 rounded-full border-2 border-white bg-[#00${i}366]`} />
                ))}
              </div>
              <div className="text-gray-600">
                <span className="font-medium">500+</span> students already enrolled
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[350px] w-full md:h-[450px] lg:h-[500px]">
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#FF6600]/20 blur-xl" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#003366]/20 blur-xl" />
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
                <Image
                  src="/images/placeholder.svg"
                  alt="BilimCert Education Quality Assessment"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#003366]/20 via-transparent to-[#FF6600]/20" />

                <div className="absolute bottom-4 right-4 rounded-lg bg-white/90 backdrop-blur-sm p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-[#FF6600] animate-pulse" />
                    <span className="text-xs font-medium text-[#003366]">Quality Assurance</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </section>
  )
}
