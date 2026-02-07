"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps extends HTMLMotionProps<"div"> {
  title?: string
  footer?: React.ReactNode
  children: React.ReactNode
}

export function Card({ title, footer, children, className, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col p-6">
        {title && <h3 className="mb-3 text-xl font-semibold leading-none tracking-tight">{title}</h3>}
        <div className="flex-1 text-sm text-muted-foreground">{children}</div>
      </div>
      {footer && <div className="bg-muted/50 p-6 pt-0">{footer}</div>}
    </motion.div>
  )
}
