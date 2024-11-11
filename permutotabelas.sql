-- SCHEMA: public

-- DROP SCHEMA IF EXISTS public ;

CREATE SCHEMA IF NOT EXISTS public
    AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public
    IS 'standard public schema';

GRANT USAGE ON SCHEMA public TO PUBLIC;

GRANT ALL ON SCHEMA public TO pg_database_owner;
-----------------------------------------------------

-- Table: public.avaliacoes

-- DROP TABLE IF EXISTS public.avaliacoes;

CREATE TABLE IF NOT EXISTS public.avaliacoes
(
    id_avaliacao integer NOT NULL DEFAULT nextval('avaliacoes_id_avaliacao_seq'::regclass),
    id_troca integer NOT NULL,
    nota_avaliacao integer NOT NULL,
    comentario_avaliacao text COLLATE pg_catalog."default" NOT NULL,
    data_avaliacao date NOT NULL,
    CONSTRAINT avaliacoes_pkey PRIMARY KEY (id_avaliacao),
    CONSTRAINT id_troca_fkey FOREIGN KEY (id_troca)
        REFERENCES public.trocas (id_trocas) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.avaliacoes
    OWNER to postgres;
-- Index: fki_id_troca_fkey

-- DROP INDEX IF EXISTS public.fki_id_troca_fkey;

CREATE INDEX IF NOT EXISTS fki_id_troca_fkey
    ON public.avaliacoes USING btree
    (id_troca ASC NULLS LAST)
    TABLESPACE pg_default;
-----------------------------------------------------

-- Table: public.servicos

-- DROP TABLE IF EXISTS public.servicos;

CREATE TABLE IF NOT EXISTS public.servicos
(
    id_servico integer NOT NULL DEFAULT nextval('servicos_id_servico_seq'::regclass),
    id_usuario integer NOT NULL,
    titulo_servico text COLLATE pg_catalog."default" NOT NULL,
    descricao_servico text COLLATE pg_catalog."default" NOT NULL,
    data_servico date NOT NULL,
    ativo boolean DEFAULT true,
    CONSTRAINT servicos_pkey PRIMARY KEY (id_servico),
    CONSTRAINT id_usario_fkey FOREIGN KEY (id_usuario)
        REFERENCES public.usuarios (id_usuario) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.servicos
    OWNER to postgres;
-- Index: fki_id_usario_fkey

-- DROP INDEX IF EXISTS public.fki_id_usario_fkey;

CREATE INDEX IF NOT EXISTS fki_id_usario_fkey
    ON public.servicos USING btree
    (id_usuario ASC NULLS LAST)
    TABLESPACE pg_default;
-----------------------------------------------------

	-- Table: public.trocas

-- DROP TABLE IF EXISTS public.trocas;

CREATE TABLE IF NOT EXISTS public.trocas
(
    id_trocas integer NOT NULL DEFAULT nextval('trocas_id_trocas_seq'::regclass),
    id_ofertante integer NOT NULL,
    id_receptor integer NOT NULL,
    id_servico integer NOT NULL,
    dados_troca text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT trocas_pkey PRIMARY KEY (id_trocas),
    CONSTRAINT id_ofertante_fkey FOREIGN KEY (id_ofertante)
        REFERENCES public.usuarios (id_usuario) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT id_receptor_fkey FOREIGN KEY (id_receptor)
        REFERENCES public.usuarios (id_usuario) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT id_servico_fkey FOREIGN KEY (id_servico)
        REFERENCES public.servicos (id_servico) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.trocas
    OWNER to postgres;
-- Index: fki_id_receptor_fkey

-- DROP INDEX IF EXISTS public.fki_id_receptor_fkey;

CREATE INDEX IF NOT EXISTS fki_id_receptor_fkey
    ON public.trocas USING btree
    (id_receptor ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_id_servico_fkey

-- DROP INDEX IF EXISTS public.fki_id_servico_fkey;

CREATE INDEX IF NOT EXISTS fki_id_servico_fkey
    ON public.trocas USING btree
    (id_servico ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_u

-- DROP INDEX IF EXISTS public.fki_u;

CREATE INDEX IF NOT EXISTS fki_u
    ON public.trocas USING btree
    (id_ofertante ASC NULLS LAST)
    TABLESPACE pg_default;
-----------------------------------------------------

-- Table: public.usuarios

-- DROP TABLE IF EXISTS public.usuarios;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id_usuario integer NOT NULL DEFAULT nextval('usuarios_id_usuario_seq'::regclass),
    nome_usuario text COLLATE pg_catalog."default" NOT NULL,
    email_usuario text COLLATE pg_catalog."default" NOT NULL,
    senha_usuario text COLLATE pg_catalog."default" NOT NULL,
    descricao_usario text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario),
    CONSTRAINT email_usuario_un UNIQUE (email_usuario)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuarios
    OWNER to postgres;
-----------------------------------------------------
