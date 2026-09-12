import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CloudOff,
  Hospital,
  Loader2,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";
import { formatarHorario, readCache, writeCache } from "@/lib/offline";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export const Route = createFileRoute("/_authenticated/ubs")({
  head: () => ({
    meta: [
      { title: "Escolha sua UBS | Fila Zero UBS" },
      {
        name: "description",
        content:
          "Busque e escolha a unidade básica de saúde mais próxima e veja a fila e o tempo de espera estimado.",
      },
      { property: "og:title", content: "Escolha sua UBS | Fila Zero UBS" },
      {
        property: "og:description",
        content: "Selecione a UBS de referência e acompanhe a fila em tempo real.",
      },
    ],
  }),
  component: EscolhaUbsPage,
});

type Unidade = {
  id: string;
  nome: string;
  bairro: string;
  cidade: string;
  endereco: string;
  fila_atual: number;
  espera_minutos: number;
  aberta: boolean;
};

const CACHE_KEY = "unidades";

function EscolhaUbsPage() {
  const navigate = useNavigate();
  const online = useOnlineStatus();
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [atualizadoEm, setAtualizadoEm] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    const cache = readCache<Unidade[]>(CACHE_KEY);
    if (cache) {
      setUnidades(cache.data);
      setAtualizadoEm(cache.at);
      setCarregando(false);
    }

    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      const [unidadesRes, perfilRes] = await Promise.all([
        supabase
          .from("unidades")
          .select("id, nome, bairro, cidade, endereco, fila_atual, espera_minutos, aberta")
          .order("nome"),
        userId
          ? supabase.from("profiles").select("unidade_id").eq("id", userId).maybeSingle()
          : Promise.resolve({ data: null }),
      ]);

      if (!ativo) return;

      if (unidadesRes.data) {
        setUnidades(unidadesRes.data as Unidade[]);
        setAtualizadoEm(Date.now());
        writeCache(CACHE_KEY, unidadesRes.data);
      } else if (!cache) {
        setAviso("Não conseguimos carregar as unidades agora. Tente novamente com internet.");
      }

      const unidadeSalva = (perfilRes.data as { unidade_id: string | null } | null)?.unidade_id;
      if (unidadeSalva) setSelecionada(unidadeSalva);
      setCarregando(false);
    })();

    return () => {
      ativo = false;
    };
  }, []);

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return unidades;
    return unidades.filter((u) =>
      [u.nome, u.bairro, u.cidade, u.endereco].join(" ").toLowerCase().includes(termo),
    );
  }, [busca, unidades]);

  async function confirmar() {
    if (!selecionada) return;
    setSalvando(true);
    setAviso(null);

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) {
      setSalvando(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ unidade_id: selecionada })
      .eq("id", userId);

    setSalvando(false);
    if (error) {
      setAviso("Sem conexão agora. Sua escolha será salva quando a internet voltar.");
      writeCache("unidade_pendente", selecionada);
      return;
    }
    navigate({ to: "/painel" });
  }

  return (
    <main className="min-h-screen bg-surface pb-32">
      <header className="rounded-b-3xl bg-card px-5 pb-6 pt-6 shadow-soft">
        <div className="mx-auto max-w-md">
          <div className="flex items-center justify-between">
            <Link
              to="/painel"
              aria-label="Voltar para o painel"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-input bg-background text-foreground transition-colors hover:bg-secondary"
            >
              <ArrowLeft size={18} />
            </Link>
            <Logo />
            <span className="h-11 w-11" aria-hidden="true" />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-foreground">Escolha sua UBS</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Selecione a unidade de referência para acompanhar a fila e receber chamadas de senha.
          </p>

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-input bg-background px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/40">
            <Search size={18} className="text-muted-foreground" aria-hidden="true" />
            <input
              id="busca-ubs"
              aria-label="Buscar unidade por nome, bairro ou cidade"
              placeholder="Buscar por nome, bairro ou cidade"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="h-11 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>

          {!online ? (
            <p className="mt-3 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground">
              <CloudOff size={14} aria-hidden="true" /> Você está sem internet. Mostrando a lista
              salva no aparelho
              {atualizadoEm ? ` (${formatarHorario(atualizadoEm)})` : ""}.
            </p>
          ) : null}
        </div>
      </header>

      <section className="mx-auto mt-6 max-w-md px-5">
        {carregando ? (
          <p className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 size={18} className="animate-spin" /> Carregando unidades…
          </p>
        ) : null}

        {aviso ? (
          <p className="mb-4 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {aviso}
          </p>
        ) : null}

        {!carregando && filtradas.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
            Nenhuma unidade encontrada para “{busca}”.
          </p>
        ) : null}

        <ul className="flex flex-col gap-3">
          {filtradas.map((u) => {
            const ativa = selecionada === u.id;
            return (
              <li key={u.id}>
                <button
                  type="button"
                  aria-pressed={ativa}
                  onClick={() => setSelecionada(u.id)}
                  className={`w-full rounded-2xl border p-4 text-left shadow-card transition-colors ${
                    ativa
                      ? "border-primary bg-brand-soft"
                      : "border-border bg-card hover:border-primary/50 hover:bg-accent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      {ativa ? <Check size={20} /> : <Hospital size={20} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-foreground">{u.nome}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={13} aria-hidden="true" /> {u.endereco} — {u.bairro},{" "}
                        {u.cidade}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1 rounded-lg bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
                          <Users size={13} aria-hidden="true" /> {u.fila_atual} na fila
                        </span>
                        <span className="rounded-lg bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
                          ~{u.espera_minutos} min de espera
                        </span>
                        <span
                          className={`rounded-lg px-2 py-1 text-xs font-bold ${
                            u.aberta
                              ? "bg-health/15 text-foreground"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {u.aberta ? "Aberta agora" : "Fechada"}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-card/95 px-5 py-4 backdrop-blur">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={confirmar}
            disabled={!selecionada || salvando}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-brand-deep disabled:opacity-60"
          >
            {salvando ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
            Confirmar unidade
          </button>
        </div>
      </div>
    </main>
  );
}
