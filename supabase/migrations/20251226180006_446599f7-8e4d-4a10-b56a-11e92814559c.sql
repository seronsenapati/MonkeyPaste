-- Create pastes table for storing shared text
CREATE TABLE public.pastes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pastes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read pastes (public access for sharing)
CREATE POLICY "Anyone can read pastes"
ON public.pastes
FOR SELECT
USING (true);

-- Allow anyone to create pastes (anonymous usage)
CREATE POLICY "Anyone can create pastes"
ON public.pastes
FOR INSERT
WITH CHECK (true);

-- Create index for faster code lookups
CREATE INDEX idx_pastes_code ON public.pastes(code);