"use client";

import { ReactNode } from "react";

export type CategoryColor =
  | "yellow"
  | "purple"
  | "pink"
  | "teal"
  | "green"
  | "red"
  | "blue"
  | "orange";

export const categoryColors: Record<
  CategoryColor,
  { bg: string; icon: string; ring: string; bar: string }
> = {
  yellow: {
    bg: "bg-[#FFF4D6]",
    icon: "text-[#C7870A]",
    ring: "stroke-[#FFB019]",
    bar: "stroke-[#FFB019]",
  },
  purple: {
    bg: "bg-[#EDE4FF]",
    icon: "text-[#8A3FFC]",
    ring: "stroke-[#8A3FFC]",
    bar: "stroke-[#8A3FFC]",
  },
  pink: {
    bg: "bg-[#FFE2E5]",
    icon: "text-[#FF4D6D]",
    ring: "stroke-[#FF4D6D]",
    bar: "stroke-[#FF4D6D]",
  },
  teal: {
    bg: "bg-[#D8F4EE]",
    icon: "text-[#1A8870]",
    ring: "stroke-[#1A8870]",
    bar: "stroke-[#1A8870]",
  },
  green: {
    bg: "bg-[#DDF2D6]",
    icon: "text-[#41B853]",
    ring: "stroke-[#41B853]",
    bar: "stroke-[#41B853]",
  },
  red: {
    bg: "bg-[#FFD9D5]",
    icon: "text-[#FF3D2E]",
    ring: "stroke-[#FF3D2E]",
    bar: "stroke-[#FF3D2E]",
  },
  blue: {
    bg: "bg-[#DCEBFF]",
    icon: "text-[#2A82EB]",
    ring: "stroke-[#2A82EB]",
    bar: "stroke-[#2A82EB]",
  },
  orange: {
    bg: "bg-[#FFE7CC]",
    icon: "text-[#E6781A]",
    ring: "stroke-[#E6781A]",
    bar: "stroke-[#E6781A]",
  },
};

interface CategoryIconProps {
  color: CategoryColor;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export function CategoryIcon({ color, children, size = "md" }: CategoryIconProps) {
  const sizes = {
    sm: "h-10 w-10",
    md: "h-12 w-12",
    lg: "h-14 w-14",
  };
  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-7 w-7",
  };
  const c = categoryColors[color];
  return (
    <div
      className={`flex items-center justify-center rounded-full ${sizes[size]} ${c.bg}`}
    >
      <div className={`${iconSizes[size]} ${c.icon}`}>{children}</div>
    </div>
  );
}

interface ProgressRingProps {
  color: CategoryColor;
  progress: number; // 0-100
  label: string;
  value: string;
  unit?: string;
  size?: number;
}

export function ProgressRing({
  color,
  progress,
  label,
  value,
  unit,
  size = 96,
}: ProgressRingProps) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Resolve raw hex colors for the SVG strokes
  const ringStroke = {
    yellow: "#FFB019",
    purple: "#8A3FFC",
    pink: "#FF4D6D",
    teal: "#1A8870",
    green: "#41B853",
    red: "#FF3D2E",
    blue: "#2A82EB",
    orange: "#E6781A",
  }[color];
  const trackStroke = {
    yellow: "#FFF4D6",
    purple: "#EDE4FF",
    pink: "#FFE2E5",
    teal: "#D8F4EE",
    green: "#DDF2D6",
    red: "#FFD9D5",
    blue: "#DCEBFF",
    orange: "#FFE7CC",
  }[color];

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackStroke}
            strokeWidth={6}
            opacity={0.4}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringStroke}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-text-primary leading-none">{value}</span>
          {unit && <span className="text-[10px] text-text-muted mt-0.5">{unit}</span>}
        </div>
      </div>
      <p className="mt-2 text-[11px] font-medium text-text-secondary uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}

interface SectionTitleProps {
  title: string;
  action?: ReactNode;
}

export function SectionTitle({ title, action }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between px-1">
      <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      {action ?? (
        <button className="p-1 -mr-1 text-text-muted hover:text-text-primary transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export function TopBar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-2">
      <button
        className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-background-secondary transition-colors"
        aria-label="Back"
      >
        <svg
          className="w-5 h-5 text-text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <h1 className="text-base font-semibold text-text-primary">{title}</h1>
      <button
        className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-background-secondary transition-colors"
        aria-label="Search"
      >
        <svg
          className="w-5 h-5 text-text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
}
