--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg16.04+1)
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: invitado; Type: TABLE; Schema: public;
--

CREATE TABLE "public"."invitado" (
    "id" integer NOT NULL,
    "idpartido" integer,
    "nombre" character varying(255),
    "estado" integer
);

--
-- Name: partido; Type: TABLE; Schema: public;
--

CREATE TABLE "public"."partido" (
    "id" integer NOT NULL,
    "nombre" character varying(255),
    "tipopartidoid" integer,
    "recintodeportivoid" integer,
    "fecha" "date",
    "hora" time without time zone
);

--
-- Name: tipopartido; Type: TABLE; Schema: public;
--

CREATE TABLE "public"."tipopartido" (
    "id" integer NOT NULL,
    "nombre" character varying(255)
);

--
-- Data for Name: evento; Type: TABLE DATA; Schema: public;
--

INSERT INTO "public"."evento" SET ("id","nombre") VALUES (1, 'Fútbol - 11 contra 11. (22 personas)');
INSERT INTO "public"."evento" SET ("id","nombre") VALUES (2, 'Futbolito - 7 contra 7. (14 personas)');
INSERT INTO "public"."evento" SET ("id","nombre") VALUES (3, 'Baby Fútbol - 5 contra 5. (10 personas)');


--
-- Name: invitado invitado_pkey; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY "public"."invitado"
    ADD CONSTRAINT "invitado_pkey" PRIMARY KEY ("id");

--
-- Name: partido partido_pkey; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY "public"."partido"
    ADD CONSTRAINT "partido_pkey" PRIMARY KEY ("id");

--
-- Name: tipopartido tipopartido_pkey; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY "public"."tipopartido"
    ADD CONSTRAINT "tipopartido_pkey" PRIMARY KEY ("id");

--
-- PostgreSQL database dump complete
--

