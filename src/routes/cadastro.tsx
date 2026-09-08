import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { IdCard, Lock, User, UserPlus } from "lucide-react";
import { AuthShell, Field } from "@/components/AuthShell";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta | Fila Zero UBS" },
      {
        name: "description",
        content:
          "Cadastre-se no Fila Zero UBS com nome, CPF ou CNES e senha para acompanhar filas e atendimentos.",
      },
      { property: "og:title", content: "Criar conta | Fila Zero UBS" },
      {
        property: "og:description",
        content: "Crie sua conta no Fila Zero UBS em poucos passos.",
      },
    ],
  }),
  component: CadastroPage,
});

function CadastroPage() {
  const navigate = useNavigate();

  return (
    <AuthShell title="Novo usuário" subtitle="Preencha seus dados para começar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/painel" });
        }}
      >
        <Field
          id="nome"
          label="Nome completo"
          icon={<User size={18} />}
          placeholder="Digite seu nome completo"
          autoComplete="name"
        />
        <Field
          id="documento"
          label="CPF ou CNES"
          icon={<IdCard size={18} />}
          placeholder="Digite seu CPF ou CNES"
          inputMode="numeric"
        />
        <Field
          id="senha"
          label="Senha"
          icon={<Lock size={18} />}
          type="password"
          placeholder="Crie uma senha"
          autoComplete="new-password"
        />
        <Field
          id="senha2"
          label="Repita sua senha"
          icon={<Lock size={18} />}
          type="password"
          placeholder="Repita sua senha"
          autoComplete="new-password"
        />

        <button
          type="submit"
          className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-brand-deep"
        >
          <UserPlus size={18} /> Cadastrar
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        CPF já cadastrado?{" "}
        <Link to="/" className="font-semibold text-primary hover:underline">
          Faça o login!
        </Link>
      </p>
    </AuthShell>
  );
}
