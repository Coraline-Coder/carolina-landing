"use client";

import { useEffect, useRef, useCallback } from "react";

interface MetricCounterProps {
  value: string;
  suffix?: string;
  prefix?: string;
}

export default function MetricCounter({
  value,
  suffix = "",
  prefix = "",
}: MetricCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const animateValue = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) {
      el.textContent = value;
      return;
    }

    const numericStr = numericMatch[0];
    const numValue = parseFloat(numericStr);
    const hasDecimal = numericStr.includes(".");
    const decimalPlaces = hasDecimal
      ? numericStr.split(".")[1].length
      : 0;
    const nonNumericPrefix = value.substring(0, value.indexOf(numericStr));
    const nonNumericSuffix = value.substring(
      value.indexOf(numericStr) + numericStr.length
    );

    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentNum = numValue * eased;
      const formatted = hasDecimal
        ? currentNum.toFixed(decimalPlaces)
        : Math.round(currentNum).toString();

      if (el) {
        el.textContent = `${nonNumericPrefix}${formatted}${nonNumericSuffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animateValue]);

  return (
    <div ref={ref} className="metric-value">
      {prefix}
      {value}
      {suffix}
    </div>
  );
}
