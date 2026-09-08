import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, IdCard, MailCheck } from "lucide-react";
import { useState } from "react";
import { AuthShell, Field } from "@/components/AuthShell";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => ({
    meta: [
      { title: "Recuperar senha | Fila Zero UBS" },
      {
        name: "description",
        content:
          "Informe seu CPF cadastrado e receba as instruções para redefinir a senha do Fila Zero UBS.",
      },
      { property: "og:title", content: "Recuperar senha | Fila Zero UBS" },
      {
        property: "og:description",
        content: "Redefina a senha da sua conta Fila Zero UBS.",
      },
    ],
  }),
  component: RecuperarSenhaPage,
});

function RecuperarSenhaPage() {
  const [enviado, setEnviado] = useState(false);

  return (
    <AuthShell
      title="Esqueceu sua senha?"
      subtitle="Sem problema! Informe seu CPF cadastrado e enviaremos as instruções de recuperação."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setEnviado(true);
        }}
      >
        <Field
          id="cpf"
          label="CPF cadastrado"
          icon={<IdCard size={18} />}
          placeholder="Digite seu CPF"
          inputMode="numeric"
        />

        {enviado ? (
          <p className="mb-4 rounded-xl bg-accent px-4 py-3 text-sm text-accent-foreground">
            Instruções enviadas! Verifique o e-mail e o SMS vinculados ao seu CPF.
          </p>
        ) : null}

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-brand-deep"
        >
          <MailCheck size={18} /> Enviar instruções de recuperação
        </button>
      </form>

      <Link
        to="/"
        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-input bg-background text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
      >
        <ArrowLeft size={18} /> Voltar para o login
      </Link>
    </AuthShell>
  );
}
