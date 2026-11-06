CREATE TABLE public.missions (
  id UUID PRIMARY KEY
    DEFAULT gen_random_uuid(),

  user_id UUID
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  title TEXT NOT NULL,

  description TEXT NOT NULL
    DEFAULT '',

  technology TEXT NOT NULL
    DEFAULT '',

  difficulty TEXT NOT NULL
    DEFAULT 'Fácil',

  xp INTEGER NOT NULL
    DEFAULT 0
    CHECK (xp >= 0),

  completed BOOLEAN NOT NULL
    DEFAULT false,

  created_at TIMESTAMPTZ NOT NULL
    DEFAULT now()
);
CREATE TABLE public.projects (
  id UUID PRIMARY KEY
    DEFAULT gen_random_uuid(),

  user_id UUID
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  title TEXT NOT NULL,

  description TEXT NOT NULL
    DEFAULT '',

  technologies TEXT[] NOT NULL
    DEFAULT '{}',

  status TEXT NOT NULL
    DEFAULT 'Em andamento'
    CHECK (
      status IN (
        'Em andamento',
        'Concluído'
      )
    ),

  github_url TEXT,

  deploy_url TEXT,

  created_at TIMESTAMPTZ NOT NULL
    DEFAULT now()
);
ALTER TABLE public.projects
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.missions
ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE
  public.projects,
  public.missions
FROM anon, authenticated;