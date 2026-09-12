CREATE TABLE public.unidades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  bairro TEXT NOT NULL,
  cidade TEXT NOT NULL,
  endereco TEXT NOT NULL,
  fila_atual INTEGER NOT NULL DEFAULT 0,
  espera_minutos INTEGER NOT NULL DEFAULT 0,
  aberta BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.unidades TO anon;
GRANT SELECT ON public.unidades TO authenticated;
GRANT ALL ON public.unidades TO service_role;

ALTER TABLE public.unidades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Unidades sao publicas para leitura anonima" ON public.unidades FOR SELECT TO anon USING (true);
CREATE POLICY "Unidades sao publicas para leitura autenticada" ON public.unidades FOR SELECT TO authenticated USING (true);

ALTER TABLE public.profiles ADD COLUMN unidade_id UUID REFERENCES public.unidades(id) ON DELETE SET NULL;

INSERT INTO public.unidades (nome, bairro, cidade, endereco, fila_atual, espera_minutos, aberta) VALUES
('UBS Vila Nova', 'Vila Nova', 'São Paulo', 'Rua das Acácias, 210', 12, 35, true),
('UBS Jardim Primavera', 'Jardim Primavera', 'São Paulo', 'Av. Central, 1450', 4, 12, true),
('UBS Santa Clara', 'Santa Clara', 'São Paulo', 'Rua Dom Pedro, 88', 21, 60, true),
('UBS Parque das Flores', 'Parque das Flores', 'Guarulhos', 'Rua Ipê Amarelo, 47', 8, 25, true),
('UBS Bairro Alto', 'Bairro Alto', 'Guarulhos', 'Estrada do Porto, 903', 0, 0, false),
('UBS Riacho Doce', 'Riacho Doce', 'Osasco', 'Rua João Ramalho, 322', 15, 45, true);