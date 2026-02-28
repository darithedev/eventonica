--
-- PostgreSQL database dump
--

\restrict XXJahJVNKbGakk3RpXupPdxjTyHSm1Dl7xB5XJQUFc4lNjcLMQdetvOkdCffo6n

-- Dumped from database version 15.15 (Homebrew)
-- Dumped by pg_dump version 15.15 (Homebrew)

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

SET default_table_access_method = heap;

--
-- Name: events; Type: TABLE; Schema: public; Owner: dari
--

CREATE TABLE public.events (
    id bigint NOT NULL,
    event_name character varying(100) NOT NULL,
    category character varying(50) NOT NULL,
    date timestamp with time zone NOT NULL,
    is_favorite boolean DEFAULT false NOT NULL
);


ALTER TABLE public.events OWNER TO dari;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: dari
--

CREATE SEQUENCE public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO dari;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dari
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: dari
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: dari
--

COPY public.events (id, event_name, category, date, is_favorite) FROM stdin;
1	Tech Conference 2030	Technology	2026-03-16 15:00:00-04	f
3	The Dark Knight	Movie	2026-03-12 16:00:00-04	t
18	Here is a new event	Example	2026-02-27 13:58:00-05	f
\.


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dari
--

SELECT pg_catalog.setval('public.events_id_seq', 19, true);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: dari
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict XXJahJVNKbGakk3RpXupPdxjTyHSm1Dl7xB5XJQUFc4lNjcLMQdetvOkdCffo6n

