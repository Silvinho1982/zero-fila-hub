import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { IdCard, Loader2, Lock, User, UserPlus } from "lucide-react";
import { AuthShell, Field } from "@/components/AuthShell";
import { supabase } from "@/integrations/supabase/client";
import { documentoToEmail, normalizeDocumento } from "@/lib/auth";

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
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    const doc = normalizeDocumento(documento);
    if (nome.trim().length < 3) {
      setErro("Informe seu nome completo.");
      return;
    }
    if (doc.length < 7) {
      setErro("Informe um CPF ou CNES válido.");
      return;
    }
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (senha !== senha2) {
      setErro("As senhas não coincidem.");
      return;
    }

    setCarregando(true);
    const { data, error } = await supabase.auth.signUp({
      email: documentoToEmail(doc),
      password: senha,
      options: { data: { nome: nome.trim(), documento: doc } },
    });

    if (error) {
      setCarregando(false);
      setErro(
        error.message.toLowerCase().includes("already")
          ? "Este CPF/CNES já está cadastrado. Faça o login."
          : "Não foi possível concluir o cadastro. Tente novamente.",
      );
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      await supabase
        .from("profiles")
        .upsert({ id: userId, nome: nome.trim(), documento: doc });
    }
    setCarregando(false);

    if (!data.session) {
      setErro("Cadastro criado. Faça o login para continuar.");
      return;
    }
    navigate({ to: "/painel" });
  }

  return (
    <AuthShell title="Novo usuário" subtitle="Preencha seus dados para começar">
      <form onSubmit={handleSubmit}>
        <Field
          id="nome"
          label="Nome completo"
          icon={<User size={18} />}
          placeholder="Digite seu nome completo"
          autoComplete="name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Field
          id="documento"
          label="CPF ou CNES"
          icon={<IdCard size={18} />}
          placeholder="Digite seu CPF ou CNES"
          inputMode="numeric"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
        />
        <Field
          id="senha"
          label="Senha"
          icon={<Lock size={18} />}
          type="password"
          placeholder="Crie uma senha"
          autoComplete="new-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Field
          id="senha2"
          label="Repita sua senha"
          icon={<Lock size={18} />}
          type="password"
          placeholder="Repita sua senha"
          autoComplete="new-password"
          value={senha2}
          onChange={(e) => setSenha2(e.target.value)}
        />

        {erro ? (
          <p className="mb-4 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {erro}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={carregando}
          className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-brand-deep disabled:opacity-60"
        >
          {carregando ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
          Cadastrar
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
