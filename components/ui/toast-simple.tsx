import * as React from "react";
import { X } from "lucide-react";

interface Toast {
  id: string;
  message: string;
  description?: string;
  type: "success" | "error" | "info";
}

const ToastContext = React.createContext<{
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-md p-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-background border border-border rounded-lg shadow-lg p-4 animate-in slide-in-from-top-5"
          >
            <div className="flex gap-3">
              <div className="flex-1">
                <p className="font-medium">{toast.message}</p>
                {toast.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 opacity-70 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function Toaster(props: any) {
  return null; // We'll use ToastProvider instead
}

// Hook to use toast
export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

// Simple toast function
export const toast = {
  success: (message: string, options?: { description?: string }) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: { message, description: options?.description, type: "success" },
        })
      );
    }
  },
  error: (message: string, options?: { description?: string }) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: { message, description: options?.description, type: "error" },
        })
      );
    }
  },
};
