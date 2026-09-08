import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { IdCard, Loader2, Lock, LogIn } from "lucide-react";
import { AuthShell, Field } from "@/components/AuthShell";
import { supabase } from "@/integrations/supabase/client";
import { documentoToEmail, normalizeDocumento } from "@/lib/auth";

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
  const [documento, setDocumento] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    const doc = normalizeDocumento(documento);
    if (doc.length < 7) {
      setErro("Informe um CPF ou CNES válido.");
      return;
    }

    setCarregando(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: documentoToEmail(doc),
      password: senha,
    });
    setCarregando(false);

    if (error) {
      setErro("CPF/CNES ou senha incorretos.");
      return;
    }
    navigate({ to: "/painel" });
  }

  return (
    <AuthShell title="Bem-vindo de volta" subtitle="Entre para acompanhar sua fila na UBS">
      <form onSubmit={handleSubmit}>
        <Field
          id="documento"
          label="CPF ou CNES"
          icon={<IdCard size={18} />}
          placeholder="Digite seu CPF ou CNES"
          inputMode="numeric"
          autoComplete="username"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
        />
        <Field
          id="senha"
          label="Senha"
          icon={<Lock size={18} />}
          type="password"
          placeholder="Digite sua senha"
          autoComplete="current-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <div className="mb-6 text-right">
          <Link
            to="/recuperar-senha"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>

        {erro ? (
          <p className="mb-4 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {erro}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={carregando}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-brand-deep disabled:opacity-60"
        >
          {carregando ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
          Acessar
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Novo por aqui?{" "}
        <Link to="/cadastro" className="font-semibold text-primary hover:underline">
          Criar uma conta
        </Link>
      </p>
    </AuthShell>
  );
}
