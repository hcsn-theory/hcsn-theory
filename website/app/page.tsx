"use client"

import * as React from "react"
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Section, Card, Badge } from '@/components';
import { siteConfig, coreIdeas, documentationItems, roadmapItems } from '@/config/site';
import { ArrowRight, BookOpen, Layers, Network, Activity, ArrowUpRight } from 'lucide-react';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
}

const stagger: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 sm:py-32 bg-background">
        <div className="absolute inset-0 z-0 bg-grid-slate-100/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-900/[0.04] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none" />


        {/* Animated Background Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="empirical" className="mb-6 animate-fade-in-up">
              v1.0 Empirical Foundation
            </Badge>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-foreground mb-6"
          >
            HCSN <span className="text-primary">Theory</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-xl sm:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Read Documentation
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-foreground bg-secondary rounded-lg hover:bg-secondary/80 transition-all"
            >
              Learn More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>

          <motion.p
            custom={4}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mt-12 text-sm text-muted-foreground/60 max-w-lg mx-auto border-t pt-6"
          >
            HCSN Theory is a simulation-first framework. All claims are derived from empirical results, not postulated axioms.
          </motion.p>
        </div>
      </section>

      {/* Stats/Quick Facts Section (New) */}
      <section className="border-y bg-accent/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: "Canonical Docs", value: "4", icon: BookOpen },
              { label: "Core Concepts", value: "6", icon: Layers },
              { label: "Simulations", value: "100+", icon: Activity },
              { label: "Emergence", value: "100%", icon: Network },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center p-4">
                <stat.icon className="w-6 h-6 text-primary mb-2 opacity-80" />
                <span className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Project */}
      <Section
        title="About the Project"
        subtitle="Research-driven approach to fundamental theory"
        className="bg-background"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <Card className="border-primary/20 bg-primary/5">
            <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
              Simulation-First
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              All claims are validated against simulations before promotion to
              theory. Empirical evidence guides every step.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Minimal Axioms
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Start with discrete events and local causality. No spacetime,
              symmetries, or external fields assumed.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Emergence Over Assumption
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Particles, geometry, momentum, and forces emerge from rewrite
              statistics, not postulated axioms.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              No External Claims
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              This is exploratory theory. No correspondence with known physics
              is assumed or claimed.
            </p>
          </Card>
        </motion.div>
      </Section>

      {/* Core Ideas */}
      <Section
        title="Core Ideas"
        subtitle="Key concepts of the framework"
        className="bg-accent/30"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {coreIdeas.map((idea, idx) => (
            <motion.div key={idx} variants={fadeIn} custom={idx}>
              <Card className="h-full hover:border-primary/50 transition-colors">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {idea.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{idea.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Documentation Overview */}
      <Section
        title="Documentation"
        subtitle="The four canonical documents"
        className="bg-background"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documentationItems.map((item) => (
            <Link href={item.link} key={item.id} className="group">
              <Card className="cursor-pointer group-hover:border-primary transition-colors h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-secondary rounded-lg group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <Badge variant={item.status.toLowerCase().replace(' ', '-') as any}>
                    {item.status}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center">
                  {item.title}
                  <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* Roadmap Preview */}
      <Section
        title="Roadmap"
        subtitle="Progress and future directions"
        className="bg-accent/30"
      >
        <div className="space-y-4 max-w-4xl mx-auto">
          {roadmapItems.map((item, idx) => (
            <Card key={idx} className="bg-card/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {item.phase}
                    </span>
                    <h4 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                <Badge
                  variant={
                    item.status === 'Completed'
                      ? 'stable'
                      : item.status === 'Current'
                        ? 'empirical'
                        : 'in-progress'
                  }
                >
                  {item.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/roadmap"
            className="inline-flex items-center text-muted-foreground hover:text-primary font-medium transition-colors group"
          >
            Full roadmap
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">
            Join the Research
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            This is an open project. We welcome questions, skepticism, and collaboration.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors shadow-xl"
          >
            Contact HCSN Research
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
