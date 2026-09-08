import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { IdCard, Lock, LogIn, ShieldCheck } from "lucide-react";
import { AuthShell, Field } from "@/components/AuthShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login | Fila Zero UBS" },
      {
        name: "description",
        content:
          "Acesse o Fila Zero UBS com CPF ou CNES e acompanhe filas, triagem e agendamentos da sua unidade básica de saúde.",
      },
      { property: "og:title", content: "Login | Fila Zero UBS" },
      {
        property: "og:description",
        content: "Entre no Fila Zero UBS e acompanhe a fila da sua unidade de saúde.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  return (
    <AuthShell title="Bem-vindo de volta" subtitle="Entre para acompanhar sua fila na UBS">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/painel" });
        }}
      >
        <Field
          id="documento"
          label="CPF ou CNES"
          icon={<IdCard size={18} />}
          placeholder="Digite seu CPF ou CNES"
          inputMode="numeric"
          autoComplete="username"
        />
        <Field
          id="senha"
          label="Senha"
          icon={<Lock size={18} />}
          type="password"
          placeholder="Digite sua senha"
          autoComplete="current-password"
        />

        <div className="mb-6 text-right">
          <Link
            to="/recuperar-senha"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-brand-deep"
        >
          <LogIn size={18} /> Acessar
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-semibold text-muted-foreground">OU</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={() => navigate({ to: "/painel" })}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-primary/40 bg-accent text-sm font-semibold text-accent-foreground transition-colors hover:bg-brand-soft"
      >
        <ShieldCheck size={18} /> Entrar com Gov.br
      </button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Novo por aqui?{" "}
        <Link to="/cadastro" className="font-semibold text-primary hover:underline">
          Criar uma conta
        </Link>
      </p>
    </AuthShell>
  );
}
