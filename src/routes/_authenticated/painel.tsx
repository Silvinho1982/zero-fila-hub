import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  CalendarDays,
  ChevronRight,
  CloudOff,
  Hospital,
  ListOrdered,
  LogOut,
  Map,
  MessageCircleQuestion,
  Stethoscope,
  Ticket,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";
import { readCache, writeCache } from "@/lib/offline";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export const Route = createFileRoute("/_authenticated/painel")({
  head: () => ({
    meta: [
      { title: "Painel do Cidadão | Fila Zero UBS" },
      {
        name: "description",
        content:
          "Painel do cidadão: localize UBS, consulte prioridades, faça triagem de sintomas e acompanhe a fila em tempo real.",
      },
      { property: "og:title", content: "Painel do Cidadão | Fila Zero UBS" },
      {
        property: "og:description",
        content: "Acompanhe fila, triagem, senhas e agendamentos da sua UBS.",
      },
    ],
  }),
  component: PainelPage,
});

const acoes = [
  {
    icon: Hospital,
    titulo: "UBS",
    desc: "Localizar unidades básicas de saúde",
    to: "/ubs" as const,
  },
  { icon: ListOrdered, titulo: "Prioridade", desc: "Consultar critérios de prioridade" },
  { icon: Stethoscope, titulo: "Sintomas", desc: "Triagem rápida de sintomas" },
  { icon: Activity, titulo: "Triagem", desc: "Status atual na fila" },
  { icon: Ticket, titulo: "Classificação", desc: "Visualização de senhas chamadas" },
  { icon: Map, titulo: "Mapa", desc: "Geolocalização das filas" },
  { icon: CalendarDays, titulo: "Agenda", desc: "Consultas agendadas" },
  { icon: MessageCircleQuestion, titulo: "Fale conosco", desc: "Suporte ou Ouvidoria da saúde" },
];

function PainelPage() {
  const navigate = useNavigate();
  const [nome, setNome] = useState<string>("Cidadão");

  useEffect(() => {
    let ativo = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user || !ativo) return;
      const { data } = await supabase
        .from("profiles")
        .select("nome")
        .eq("id", user.id)
        .maybeSingle();
      const nomeFinal =
        data?.nome ?? (user.user_metadata?.["nome"] as string | undefined) ?? "Cidadão";
      if (ativo) setNome(nomeFinal.split(" ")[0] ?? "Cidadão");
    })();
    return () => {
      ativo = false;
    };
  }, []);

  async function sair() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <main className="min-h-screen bg-surface pb-12">
      <header className="rounded-b-3xl bg-card px-5 pb-6 pt-8 shadow-soft">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <Logo />
          <h1 className="mt-5 self-start text-2xl font-extrabold text-foreground">Olá, {nome}!</h1>
          <p className="mt-1 self-start text-sm text-muted-foreground">
            O que você precisa resolver hoje na sua unidade de saúde?
          </p>
        </div>
      </header>

      <section className="mx-auto mt-7 max-w-md px-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Ações
          </h2>
          <span className="text-xs font-medium text-primary">8 serviços</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {acoes.map(({ icon: Icon, titulo, desc }) => (
            <button
              key={titulo}
              type="button"
              className="group flex flex-col items-start gap-2 rounded-2xl border border-border bg-card p-4 text-left shadow-card transition-colors hover:border-primary/50 hover:bg-accent"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-brand-deep">
                <Icon size={20} />
              </span>
              <span className="text-sm font-bold text-foreground">{titulo}</span>
              <span className="text-xs leading-snug text-muted-foreground">{desc}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={sair}
          className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-input bg-background text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <LogOut size={18} /> Sair da conta
        </button>
      </section>
    </main>
  );
}
