import { useState, useEffect } from "react";
import type { MethodStep } from "@/types/recipe";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea-simple";

import { Caveat } from 'next/font/google';

const caveat = Caveat({
  weight: '400',   // choose font weight
  subsets: ['latin'], // character subsets
});

interface MethodStepsProps {
  steps: MethodStep[];
  showEdits: boolean;
}

export function MethodSteps({ steps, showEdits }: MethodStepsProps) {
  // Initialize state from localStorage
  const [annotations, setAnnotations] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    const stored = localStorage.getItem("methodStepAnnotations");
    return stored ? JSON.parse(stored) : {};
  });

  // Persist annotations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("methodStepAnnotations", JSON.stringify(annotations));
  }, [annotations]);

  const handleAnnotationChange = (id: string, value: string) => {
    setAnnotations((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {steps.map((step) => (
        <div key={step.id} className="space-y-2">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <span className="text-sm">{step.step}</span>
            </div>
            <div className="flex-1 space-y-1 pt-0.5">
              {step.title && <h4>{step.title}</h4>}
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>

          {showEdits ? (
            <Textarea
              placeholder="Add annotation..."
              value={annotations[step.id] || ""}
              onChange={(e) => handleAnnotationChange(step.id, e.target.value)}
              className="ml-10 mt-1 text-sm max-w-xs"
            />
          ) : (
            annotations[step.id] && (
              <p className="ml-10 mt-1 text-md bg-orange-100 text-muted-foreground italic">
                <span className={caveat.className}>{annotations[step.id]}</span>
              </p>
            )
          )}
        </div>
      ))}
    </div>
  );
}
