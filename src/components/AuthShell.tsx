import type { ReactNode } from "react";
import { Logo } from "./Logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-surface px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-7 flex justify-center">
          <Logo size="lg" />
        </div>
        <section className="rounded-3xl bg-card p-6 shadow-soft">
          <h1 className="text-center text-lg font-bold text-foreground">{title}</h1>
          {subtitle ? (
            <p className="mt-1 text-center text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
          <div className="mt-6">{children}</div>
        </section>
        {footer ? <div className="mt-6 text-center text-sm">{footer}</div> : null}
      </div>
    </main>
  );
}

export function Field({
  id,
  label,
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/40">
        <span className="text-muted-foreground">{icon}</span>
        <input
          id={id}
          {...props}
          className="h-11 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
}
