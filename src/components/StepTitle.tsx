import { useRef, useEffect } from "react";

export default function StepTitle({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <h2 ref={ref} tabIndex={-1} className="step-title focus:outline-none">
      {children}
    </h2>
  );
}
