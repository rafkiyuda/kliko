import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-xs",
        secondary:
          "border-transparent bg-muted text-muted-foreground",
        destructive:
          "border-transparent bg-destructive/10 text-destructive border border-destructive/20",
        outline: "text-foreground border border-border",
        eco: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
        orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30",
        amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30",
        blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30",
        verified: "bg-emerald-600 text-white shadow-xs font-bold",
        gold: "bg-linear-to-r from-amber-500 to-yellow-400 text-slate-900 font-bold shadow-xs",
        silver: "bg-linear-to-r from-slate-300 to-slate-400 text-slate-900 font-bold shadow-xs",
        bronze: "bg-linear-to-r from-amber-700 to-amber-600 text-white font-bold shadow-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
