SELECT id, title, user_id FROM public.projects; 
SELECT id, title, user_id FROM public.missions;
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS is_demo
BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.missions
ADD COLUMN IF NOT EXISTS is_demo
BOOLEAN NOT NULL DEFAULT false; 

UPDATE public.projects
SET is_demo = true
WHERE user_id IS NULL
AND title IN (
  'Desenho com Gestos',
  'Detector de Invasores',
  'React Quest'
);

UPDATE public.missions
SET is_demo = true
WHERE user_id IS NULL
AND title IN (
  'Criar componente de perfil',
  'Criar a Central de Missões',
  'Investigar um erro'
); 

GRANT USAGE ON SCHEMA public TO anon;

GRANT SELECT ON public.projects
TO anon;

GRANT SELECT ON public.missions
TO anon; 

CREATE POLICY "Leitura de projetos demonstrativos"
ON public.projects
FOR SELECT
TO anon
USING (
  is_demo = true
  AND user_id IS NULL
);

CREATE POLICY "Leitura de missoes demonstrativas"
ON public.missions
FOR SELECT
TO anon
USING (
  is_demo = true
  AND user_id IS NULL
); 