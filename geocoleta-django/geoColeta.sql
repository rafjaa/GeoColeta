PGDMP         %        	    
    p        	   geoColeta    9.1.6    9.1.6 �               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                       1262    16384 	   geoColeta    DATABASE     }   CREATE DATABASE "geoColeta" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'pt_BR.UTF-8' LC_CTYPE = 'pt_BR.UTF-8';
    DROP DATABASE "geoColeta";
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    5                       0    0    public    ACL     �   REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;
                  postgres    false    5            �            3079    11683    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false                       0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    188            �            1259    16412 
   auth_group    TABLE     ^   CREATE TABLE auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);
    DROP TABLE public.auth_group;
       public         postgres    false    5            �            1259    16410    auth_group_id_seq    SEQUENCE     s   CREATE SEQUENCE auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.auth_group_id_seq;
       public       postgres    false    5    166                       0    0    auth_group_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE auth_group_id_seq OWNED BY auth_group.id;
            public       postgres    false    165                       0    0    auth_group_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('auth_group_id_seq', 1, false);
            public       postgres    false    165            �            1259    16397    auth_group_permissions    TABLE     �   CREATE TABLE auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);
 *   DROP TABLE public.auth_group_permissions;
       public         postgres    false    5            �            1259    16395    auth_group_permissions_id_seq    SEQUENCE        CREATE SEQUENCE auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.auth_group_permissions_id_seq;
       public       postgres    false    164    5                       0    0    auth_group_permissions_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE auth_group_permissions_id_seq OWNED BY auth_group_permissions.id;
            public       postgres    false    163                       0    0    auth_group_permissions_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('auth_group_permissions_id_seq', 1, false);
            public       postgres    false    163            �            1259    16387    auth_permission    TABLE     �   CREATE TABLE auth_permission (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);
 #   DROP TABLE public.auth_permission;
       public         postgres    false    5            �            1259    16385    auth_permission_id_seq    SEQUENCE     x   CREATE SEQUENCE auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.auth_permission_id_seq;
       public       postgres    false    162    5                        0    0    auth_permission_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE auth_permission_id_seq OWNED BY auth_permission.id;
            public       postgres    false    161            !           0    0    auth_permission_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('auth_permission_id_seq', 30, true);
            public       postgres    false    161            �            1259    16457 	   auth_user    TABLE     �  CREATE TABLE auth_user (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(75) NOT NULL,
    password character varying(128) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    is_superuser boolean NOT NULL,
    last_login timestamp with time zone NOT NULL,
    date_joined timestamp with time zone NOT NULL
);
    DROP TABLE public.auth_user;
       public         postgres    false    5            �            1259    16442    auth_user_groups    TABLE     x   CREATE TABLE auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);
 $   DROP TABLE public.auth_user_groups;
       public         postgres    false    5            �            1259    16440    auth_user_groups_id_seq    SEQUENCE     y   CREATE SEQUENCE auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.auth_user_groups_id_seq;
       public       postgres    false    5    170            "           0    0    auth_user_groups_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE auth_user_groups_id_seq OWNED BY auth_user_groups.id;
            public       postgres    false    169            #           0    0    auth_user_groups_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('auth_user_groups_id_seq', 1, false);
            public       postgres    false    169            �            1259    16455    auth_user_id_seq    SEQUENCE     r   CREATE SEQUENCE auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.auth_user_id_seq;
       public       postgres    false    5    172            $           0    0    auth_user_id_seq    SEQUENCE OWNED BY     7   ALTER SEQUENCE auth_user_id_seq OWNED BY auth_user.id;
            public       postgres    false    171            %           0    0    auth_user_id_seq    SEQUENCE SET     7   SELECT pg_catalog.setval('auth_user_id_seq', 1, true);
            public       postgres    false    171            �            1259    16427    auth_user_user_permissions    TABLE     �   CREATE TABLE auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);
 .   DROP TABLE public.auth_user_user_permissions;
       public         postgres    false    5            �            1259    16425 !   auth_user_user_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.auth_user_user_permissions_id_seq;
       public       postgres    false    168    5            &           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE auth_user_user_permissions_id_seq OWNED BY auth_user_user_permissions.id;
            public       postgres    false    167            '           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('auth_user_user_permissions_id_seq', 1, false);
            public       postgres    false    167            �            1259    16508    django_admin_log    TABLE     �  CREATE TABLE django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    user_id integer NOT NULL,
    content_type_id integer,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);
 $   DROP TABLE public.django_admin_log;
       public         postgres    false    1978    5            �            1259    16506    django_admin_log_id_seq    SEQUENCE     y   CREATE SEQUENCE django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.django_admin_log_id_seq;
       public       postgres    false    179    5            (           0    0    django_admin_log_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE django_admin_log_id_seq OWNED BY django_admin_log.id;
            public       postgres    false    178            )           0    0    django_admin_log_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('django_admin_log_id_seq', 41, true);
            public       postgres    false    178            �            1259    16477    django_content_type    TABLE     �   CREATE TABLE django_content_type (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);
 '   DROP TABLE public.django_content_type;
       public         postgres    false    5            �            1259    16475    django_content_type_id_seq    SEQUENCE     |   CREATE SEQUENCE django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.django_content_type_id_seq;
       public       postgres    false    174    5            *           0    0    django_content_type_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE django_content_type_id_seq OWNED BY django_content_type.id;
            public       postgres    false    173            +           0    0    django_content_type_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('django_content_type_id_seq', 10, true);
            public       postgres    false    173            �            1259    16490    django_session    TABLE     �   CREATE TABLE django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);
 "   DROP TABLE public.django_session;
       public         postgres    false    5            �            1259    16500    django_site    TABLE     �   CREATE TABLE django_site (
    id integer NOT NULL,
    domain character varying(100) NOT NULL,
    name character varying(50) NOT NULL
);
    DROP TABLE public.django_site;
       public         postgres    false    5            �            1259    16498    django_site_id_seq    SEQUENCE     t   CREATE SEQUENCE django_site_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.django_site_id_seq;
       public       postgres    false    5    177            ,           0    0    django_site_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE django_site_id_seq OWNED BY django_site.id;
            public       postgres    false    176            -           0    0    django_site_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('django_site_id_seq', 1, true);
            public       postgres    false    176            �            1259    16553    moduloColeta_localcoleta    TABLE     �   CREATE TABLE "moduloColeta_localcoleta" (
    id integer NOT NULL,
    latitude character varying(100) NOT NULL,
    longitude character varying(100) NOT NULL,
    descricao text NOT NULL
);
 .   DROP TABLE public."moduloColeta_localcoleta";
       public         postgres    false    5            �            1259    16551    moduloColeta_localcoleta_id_seq    SEQUENCE     �   CREATE SEQUENCE "moduloColeta_localcoleta_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."moduloColeta_localcoleta_id_seq";
       public       postgres    false    5    185            .           0    0    moduloColeta_localcoleta_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE "moduloColeta_localcoleta_id_seq" OWNED BY "moduloColeta_localcoleta".id;
            public       postgres    false    184            /           0    0    moduloColeta_localcoleta_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('"moduloColeta_localcoleta_id_seq"', 27, true);
            public       postgres    false    184            �            1259    16538    moduloColeta_localcoleta_tipo    TABLE     �   CREATE TABLE "moduloColeta_localcoleta_tipo" (
    id integer NOT NULL,
    localcoleta_id integer NOT NULL,
    tiposcoleta_id integer NOT NULL
);
 3   DROP TABLE public."moduloColeta_localcoleta_tipo";
       public         postgres    false    5            �            1259    16536 $   moduloColeta_localcoleta_tipo_id_seq    SEQUENCE     �   CREATE SEQUENCE "moduloColeta_localcoleta_tipo_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."moduloColeta_localcoleta_tipo_id_seq";
       public       postgres    false    183    5            0           0    0 $   moduloColeta_localcoleta_tipo_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE "moduloColeta_localcoleta_tipo_id_seq" OWNED BY "moduloColeta_localcoleta_tipo".id;
            public       postgres    false    182            1           0    0 $   moduloColeta_localcoleta_tipo_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('"moduloColeta_localcoleta_tipo_id_seq"', 172, true);
            public       postgres    false    182            �            1259    16569    moduloColeta_log    TABLE       CREATE TABLE "moduloColeta_log" (
    id integer NOT NULL,
    "latitudeUsuario" character varying(100) NOT NULL,
    "longitudeUsuario" character varying(100) NOT NULL,
    local_id integer NOT NULL,
    data timestamp with time zone NOT NULL,
    tipo_id integer NOT NULL
);
 &   DROP TABLE public."moduloColeta_log";
       public         postgres    false    5            �            1259    16567    moduloColeta_log_id_seq    SEQUENCE     {   CREATE SEQUENCE "moduloColeta_log_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."moduloColeta_log_id_seq";
       public       postgres    false    5    187            2           0    0    moduloColeta_log_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE "moduloColeta_log_id_seq" OWNED BY "moduloColeta_log".id;
            public       postgres    false    186            3           0    0    moduloColeta_log_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('"moduloColeta_log_id_seq"', 1, false);
            public       postgres    false    186            �            1259    16530    moduloColeta_tiposcoleta    TABLE     n   CREATE TABLE "moduloColeta_tiposcoleta" (
    id integer NOT NULL,
    tipo character varying(30) NOT NULL
);
 .   DROP TABLE public."moduloColeta_tiposcoleta";
       public         postgres    false    5            �            1259    16528    moduloColeta_tiposcoleta_id_seq    SEQUENCE     �   CREATE SEQUENCE "moduloColeta_tiposcoleta_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."moduloColeta_tiposcoleta_id_seq";
       public       postgres    false    181    5            4           0    0    moduloColeta_tiposcoleta_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE "moduloColeta_tiposcoleta_id_seq" OWNED BY "moduloColeta_tiposcoleta".id;
            public       postgres    false    180            5           0    0    moduloColeta_tiposcoleta_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('"moduloColeta_tiposcoleta_id_seq"', 5, true);
            public       postgres    false    180            �           2604    16415    id    DEFAULT     `   ALTER TABLE ONLY auth_group ALTER COLUMN id SET DEFAULT nextval('auth_group_id_seq'::regclass);
 <   ALTER TABLE public.auth_group ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    165    166    166            �           2604    16400    id    DEFAULT     x   ALTER TABLE ONLY auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('auth_group_permissions_id_seq'::regclass);
 H   ALTER TABLE public.auth_group_permissions ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    164    163    164            �           2604    16390    id    DEFAULT     j   ALTER TABLE ONLY auth_permission ALTER COLUMN id SET DEFAULT nextval('auth_permission_id_seq'::regclass);
 A   ALTER TABLE public.auth_permission ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    161    162    162            �           2604    16460    id    DEFAULT     ^   ALTER TABLE ONLY auth_user ALTER COLUMN id SET DEFAULT nextval('auth_user_id_seq'::regclass);
 ;   ALTER TABLE public.auth_user ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    171    172    172            �           2604    16445    id    DEFAULT     l   ALTER TABLE ONLY auth_user_groups ALTER COLUMN id SET DEFAULT nextval('auth_user_groups_id_seq'::regclass);
 B   ALTER TABLE public.auth_user_groups ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    169    170    170            �           2604    16430    id    DEFAULT     �   ALTER TABLE ONLY auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('auth_user_user_permissions_id_seq'::regclass);
 L   ALTER TABLE public.auth_user_user_permissions ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    167    168    168            �           2604    16511    id    DEFAULT     l   ALTER TABLE ONLY django_admin_log ALTER COLUMN id SET DEFAULT nextval('django_admin_log_id_seq'::regclass);
 B   ALTER TABLE public.django_admin_log ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    179    178    179            �           2604    16480    id    DEFAULT     r   ALTER TABLE ONLY django_content_type ALTER COLUMN id SET DEFAULT nextval('django_content_type_id_seq'::regclass);
 E   ALTER TABLE public.django_content_type ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    173    174    174            �           2604    16503    id    DEFAULT     b   ALTER TABLE ONLY django_site ALTER COLUMN id SET DEFAULT nextval('django_site_id_seq'::regclass);
 =   ALTER TABLE public.django_site ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    176    177    177            �           2604    16556    id    DEFAULT     �   ALTER TABLE ONLY "moduloColeta_localcoleta" ALTER COLUMN id SET DEFAULT nextval('"moduloColeta_localcoleta_id_seq"'::regclass);
 L   ALTER TABLE public."moduloColeta_localcoleta" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    185    184    185            �           2604    16541    id    DEFAULT     �   ALTER TABLE ONLY "moduloColeta_localcoleta_tipo" ALTER COLUMN id SET DEFAULT nextval('"moduloColeta_localcoleta_tipo_id_seq"'::regclass);
 Q   ALTER TABLE public."moduloColeta_localcoleta_tipo" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    183    182    183            �           2604    16572    id    DEFAULT     p   ALTER TABLE ONLY "moduloColeta_log" ALTER COLUMN id SET DEFAULT nextval('"moduloColeta_log_id_seq"'::regclass);
 D   ALTER TABLE public."moduloColeta_log" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    186    187    187            �           2604    16533    id    DEFAULT     �   ALTER TABLE ONLY "moduloColeta_tiposcoleta" ALTER COLUMN id SET DEFAULT nextval('"moduloColeta_tiposcoleta_id_seq"'::regclass);
 L   ALTER TABLE public."moduloColeta_tiposcoleta" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    180    181    181                      0    16412 
   auth_group 
   TABLE DATA               '   COPY auth_group (id, name) FROM stdin;
    public       postgres    false    166    2068   ��                 0    16397    auth_group_permissions 
   TABLE DATA               F   COPY auth_group_permissions (id, group_id, permission_id) FROM stdin;
    public       postgres    false    164    2068   ��                 0    16387    auth_permission 
   TABLE DATA               G   COPY auth_permission (id, name, content_type_id, codename) FROM stdin;
    public       postgres    false    162    2068   ��                 0    16457 	   auth_user 
   TABLE DATA               �   COPY auth_user (id, username, first_name, last_name, email, password, is_staff, is_active, is_superuser, last_login, date_joined) FROM stdin;
    public       postgres    false    172    2068   �       
          0    16442    auth_user_groups 
   TABLE DATA               :   COPY auth_user_groups (id, user_id, group_id) FROM stdin;
    public       postgres    false    170    2068   ū       	          0    16427    auth_user_user_permissions 
   TABLE DATA               I   COPY auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
    public       postgres    false    168    2068   �                 0    16508    django_admin_log 
   TABLE DATA               �   COPY django_admin_log (id, action_time, user_id, content_type_id, object_id, object_repr, action_flag, change_message) FROM stdin;
    public       postgres    false    179    2068   ��                 0    16477    django_content_type 
   TABLE DATA               B   COPY django_content_type (id, name, app_label, model) FROM stdin;
    public       postgres    false    174    2068   ��                 0    16490    django_session 
   TABLE DATA               I   COPY django_session (session_key, session_data, expire_date) FROM stdin;
    public       postgres    false    175    2068   :�                 0    16500    django_site 
   TABLE DATA               0   COPY django_site (id, domain, name) FROM stdin;
    public       postgres    false    177    2068   C�                 0    16553    moduloColeta_localcoleta 
   TABLE DATA               Q   COPY "moduloColeta_localcoleta" (id, latitude, longitude, descricao) FROM stdin;
    public       postgres    false    185    2068   p�                 0    16538    moduloColeta_localcoleta_tipo 
   TABLE DATA               V   COPY "moduloColeta_localcoleta_tipo" (id, localcoleta_id, tiposcoleta_id) FROM stdin;
    public       postgres    false    183    2068   ��                 0    16569    moduloColeta_log 
   TABLE DATA               i   COPY "moduloColeta_log" (id, "latitudeUsuario", "longitudeUsuario", local_id, data, tipo_id) FROM stdin;
    public       postgres    false    187    2068   k�                 0    16530    moduloColeta_tiposcoleta 
   TABLE DATA               7   COPY "moduloColeta_tiposcoleta" (id, tipo) FROM stdin;
    public       postgres    false    181    2068   ��       �           2606    16419    auth_group_name_key 
   CONSTRAINT     R   ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_name_key;
       public         postgres    false    166    166    2069            �           2606    16404 1   auth_group_permissions_group_id_permission_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_key UNIQUE (group_id, permission_id);
 r   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_permission_id_key;
       public         postgres    false    164    164    164    2069            �           2606    16402    auth_group_permissions_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_pkey;
       public         postgres    false    164    164    2069            �           2606    16417    auth_group_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_pkey;
       public         postgres    false    166    166    2069            �           2606    16394 ,   auth_permission_content_type_id_codename_key 
   CONSTRAINT     �   ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_key UNIQUE (content_type_id, codename);
 f   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_codename_key;
       public         postgres    false    162    162    162    2069            �           2606    16392    auth_permission_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
       public         postgres    false    162    162    2069            �           2606    16447    auth_user_groups_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_pkey;
       public         postgres    false    170    170    2069            �           2606    16449 %   auth_user_groups_user_id_group_id_key 
   CONSTRAINT     w   ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_key UNIQUE (user_id, group_id);
 `   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_group_id_key;
       public         postgres    false    170    170    170    2069            �           2606    16462    auth_user_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_pkey;
       public         postgres    false    172    172    2069            �           2606    16432    auth_user_user_permissions_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_pkey;
       public         postgres    false    168    168    2069            �           2606    16434 4   auth_user_user_permissions_user_id_permission_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_key UNIQUE (user_id, permission_id);
 y   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_permission_id_key;
       public         postgres    false    168    168    168    2069            �           2606    16464    auth_user_username_key 
   CONSTRAINT     X   ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);
 J   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_username_key;
       public         postgres    false    172    172    2069            �           2606    16517    django_admin_log_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_pkey;
       public         postgres    false    179    179    2069            �           2606    16484 '   django_content_type_app_label_model_key 
   CONSTRAINT     {   ALTER TABLE ONLY django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_key UNIQUE (app_label, model);
 e   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_app_label_model_key;
       public         postgres    false    174    174    174    2069            �           2606    16482    django_content_type_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_pkey;
       public         postgres    false    174    174    2069            �           2606    16497    django_session_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);
 L   ALTER TABLE ONLY public.django_session DROP CONSTRAINT django_session_pkey;
       public         postgres    false    175    175    2069            �           2606    16505    django_site_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY django_site
    ADD CONSTRAINT django_site_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.django_site DROP CONSTRAINT django_site_pkey;
       public         postgres    false    177    177    2069            �           2606    16561    moduloColeta_localcoleta_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY "moduloColeta_localcoleta"
    ADD CONSTRAINT "moduloColeta_localcoleta_pkey" PRIMARY KEY (id);
 d   ALTER TABLE ONLY public."moduloColeta_localcoleta" DROP CONSTRAINT "moduloColeta_localcoleta_pkey";
       public         postgres    false    185    185    2069            �           2606    16545 ?   moduloColeta_localcoleta_tipo_localcoleta_id_tiposcoleta_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY "moduloColeta_localcoleta_tipo"
    ADD CONSTRAINT "moduloColeta_localcoleta_tipo_localcoleta_id_tiposcoleta_id_key" UNIQUE (localcoleta_id, tiposcoleta_id);
 �   ALTER TABLE ONLY public."moduloColeta_localcoleta_tipo" DROP CONSTRAINT "moduloColeta_localcoleta_tipo_localcoleta_id_tiposcoleta_id_key";
       public         postgres    false    183    183    183    2069            �           2606    16543 "   moduloColeta_localcoleta_tipo_pkey 
   CONSTRAINT     {   ALTER TABLE ONLY "moduloColeta_localcoleta_tipo"
    ADD CONSTRAINT "moduloColeta_localcoleta_tipo_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public."moduloColeta_localcoleta_tipo" DROP CONSTRAINT "moduloColeta_localcoleta_tipo_pkey";
       public         postgres    false    183    183    2069            �           2606    16574    moduloColeta_log_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY "moduloColeta_log"
    ADD CONSTRAINT "moduloColeta_log_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."moduloColeta_log" DROP CONSTRAINT "moduloColeta_log_pkey";
       public         postgres    false    187    187    2069            �           2606    16535    moduloColeta_tiposcoleta_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY "moduloColeta_tiposcoleta"
    ADD CONSTRAINT "moduloColeta_tiposcoleta_pkey" PRIMARY KEY (id);
 d   ALTER TABLE ONLY public."moduloColeta_tiposcoleta" DROP CONSTRAINT "moduloColeta_tiposcoleta_pkey";
       public         postgres    false    181    181    2069            �           1259    16587    auth_group_permissions_group_id    INDEX     _   CREATE INDEX auth_group_permissions_group_id ON auth_group_permissions USING btree (group_id);
 3   DROP INDEX public.auth_group_permissions_group_id;
       public         postgres    false    164    2069            �           1259    16588 $   auth_group_permissions_permission_id    INDEX     i   CREATE INDEX auth_group_permissions_permission_id ON auth_group_permissions USING btree (permission_id);
 8   DROP INDEX public.auth_group_permissions_permission_id;
       public         postgres    false    164    2069            �           1259    16586    auth_permission_content_type_id    INDEX     _   CREATE INDEX auth_permission_content_type_id ON auth_permission USING btree (content_type_id);
 3   DROP INDEX public.auth_permission_content_type_id;
       public         postgres    false    162    2069            �           1259    16592    auth_user_groups_group_id    INDEX     S   CREATE INDEX auth_user_groups_group_id ON auth_user_groups USING btree (group_id);
 -   DROP INDEX public.auth_user_groups_group_id;
       public         postgres    false    170    2069            �           1259    16591    auth_user_groups_user_id    INDEX     Q   CREATE INDEX auth_user_groups_user_id ON auth_user_groups USING btree (user_id);
 ,   DROP INDEX public.auth_user_groups_user_id;
       public         postgres    false    170    2069            �           1259    16590 (   auth_user_user_permissions_permission_id    INDEX     q   CREATE INDEX auth_user_user_permissions_permission_id ON auth_user_user_permissions USING btree (permission_id);
 <   DROP INDEX public.auth_user_user_permissions_permission_id;
       public         postgres    false    168    2069            �           1259    16589 "   auth_user_user_permissions_user_id    INDEX     e   CREATE INDEX auth_user_user_permissions_user_id ON auth_user_user_permissions USING btree (user_id);
 6   DROP INDEX public.auth_user_user_permissions_user_id;
       public         postgres    false    168    2069            �           1259    16595     django_admin_log_content_type_id    INDEX     a   CREATE INDEX django_admin_log_content_type_id ON django_admin_log USING btree (content_type_id);
 4   DROP INDEX public.django_admin_log_content_type_id;
       public         postgres    false    179    2069            �           1259    16594    django_admin_log_user_id    INDEX     Q   CREATE INDEX django_admin_log_user_id ON django_admin_log USING btree (user_id);
 ,   DROP INDEX public.django_admin_log_user_id;
       public         postgres    false    179    2069            �           1259    16593    django_session_expire_date    INDEX     U   CREATE INDEX django_session_expire_date ON django_session USING btree (expire_date);
 .   DROP INDEX public.django_session_expire_date;
       public         postgres    false    175    2069            �           1259    16596 ,   moduloColeta_localcoleta_tipo_localcoleta_id    INDEX     }   CREATE INDEX "moduloColeta_localcoleta_tipo_localcoleta_id" ON "moduloColeta_localcoleta_tipo" USING btree (localcoleta_id);
 B   DROP INDEX public."moduloColeta_localcoleta_tipo_localcoleta_id";
       public         postgres    false    183    2069            �           1259    16597 ,   moduloColeta_localcoleta_tipo_tiposcoleta_id    INDEX     }   CREATE INDEX "moduloColeta_localcoleta_tipo_tiposcoleta_id" ON "moduloColeta_localcoleta_tipo" USING btree (tiposcoleta_id);
 B   DROP INDEX public."moduloColeta_localcoleta_tipo_tiposcoleta_id";
       public         postgres    false    183    2069            �           1259    16598    moduloColeta_log_local_id    INDEX     W   CREATE INDEX "moduloColeta_log_local_id" ON "moduloColeta_log" USING btree (local_id);
 /   DROP INDEX public."moduloColeta_log_local_id";
       public         postgres    false    187    2069            �           1259    16599    moduloColeta_log_tipo_id    INDEX     U   CREATE INDEX "moduloColeta_log_tipo_id" ON "moduloColeta_log" USING btree (tipo_id);
 .   DROP INDEX public."moduloColeta_log_tipo_id";
       public         postgres    false    187    2069            �           2606    16405 )   auth_group_permissions_permission_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 j   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_permission_id_fkey;
       public       postgres    false    164    162    1986    2069            �           2606    16450    auth_user_groups_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 Y   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_group_id_fkey;
       public       postgres    false    1996    166    170    2069            �           2606    16435 -   auth_user_user_permissions_permission_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 r   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_permission_id_fkey;
       public       postgres    false    1986    168    162    2069            �           2606    16485     content_type_id_refs_id_728de91f    FK CONSTRAINT     �   ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT content_type_id_refs_id_728de91f FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 Z   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT content_type_id_refs_id_728de91f;
       public       postgres    false    174    2016    162    2069                       2606    16523 %   django_admin_log_content_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_fkey FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 `   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_content_type_id_fkey;
       public       postgres    false    2016    174    179    2069                        2606    16518    django_admin_log_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 X   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_user_id_fkey;
       public       postgres    false    179    2010    172    2069            �           2606    16420    group_id_refs_id_3cea63fe    FK CONSTRAINT     �   ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT group_id_refs_id_3cea63fe FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 Z   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT group_id_refs_id_3cea63fe;
       public       postgres    false    164    166    1996    2069                       2606    16562    localcoleta_id_refs_id_93c75b25    FK CONSTRAINT     �   ALTER TABLE ONLY "moduloColeta_localcoleta_tipo"
    ADD CONSTRAINT localcoleta_id_refs_id_93c75b25 FOREIGN KEY (localcoleta_id) REFERENCES "moduloColeta_localcoleta"(id) DEFERRABLE INITIALLY DEFERRED;
 i   ALTER TABLE ONLY public."moduloColeta_localcoleta_tipo" DROP CONSTRAINT localcoleta_id_refs_id_93c75b25;
       public       postgres    false    2035    183    185    2069                       2606    16546 1   moduloColeta_localcoleta_tipo_tiposcoleta_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "moduloColeta_localcoleta_tipo"
    ADD CONSTRAINT "moduloColeta_localcoleta_tipo_tiposcoleta_id_fkey" FOREIGN KEY (tiposcoleta_id) REFERENCES "moduloColeta_tiposcoleta"(id) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public."moduloColeta_localcoleta_tipo" DROP CONSTRAINT "moduloColeta_localcoleta_tipo_tiposcoleta_id_fkey";
       public       postgres    false    183    181    2027    2069                       2606    16575    moduloColeta_log_local_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "moduloColeta_log"
    ADD CONSTRAINT "moduloColeta_log_local_id_fkey" FOREIGN KEY (local_id) REFERENCES "moduloColeta_localcoleta"(id) DEFERRABLE INITIALLY DEFERRED;
 ]   ALTER TABLE ONLY public."moduloColeta_log" DROP CONSTRAINT "moduloColeta_log_local_id_fkey";
       public       postgres    false    2035    185    187    2069                       2606    16580    moduloColeta_log_tipo_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "moduloColeta_log"
    ADD CONSTRAINT "moduloColeta_log_tipo_id_fkey" FOREIGN KEY (tipo_id) REFERENCES "moduloColeta_tiposcoleta"(id) DEFERRABLE INITIALLY DEFERRED;
 \   ALTER TABLE ONLY public."moduloColeta_log" DROP CONSTRAINT "moduloColeta_log_tipo_id_fkey";
       public       postgres    false    2027    187    181    2069            �           2606    16470    user_id_refs_id_831107f1    FK CONSTRAINT     �   ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT user_id_refs_id_831107f1 FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 S   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT user_id_refs_id_831107f1;
       public       postgres    false    2010    170    172    2069            �           2606    16465    user_id_refs_id_f2045483    FK CONSTRAINT     �   ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT user_id_refs_id_f2045483 FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 ]   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT user_id_refs_id_f2045483;
       public       postgres    false    172    168    2010    2069                  x������ � �            x������ � �         J  x�]�]�� F��*\�D��y�q��Q�8j��pw?X
ޠ=�J�=��8�ũ�����cR��O,�Bj��E���q�Bv֛6�j���}���)��w�6��r�'H�.��������Ԥ���l��h��2�������sjQ��JO��&e�+��xZ!᫰ɭ]�.A7�5_ 2�Xý#e�ڨ[��s�#�.��� �'
��a�v,����#:4�;^A���1RERr'�I�f=���n�Q��ƒ����=�i����Ok$|������`K�l�8D��.M#�C ���[���3��x�1|��,��#�� ���         �   x�]��
�@@�3_��]8�;���
2j��B� FG�|�A��'.;�� Q��{BHѩ��.e�Б1kt��S��-����O�b�'G�#��,�_�A� ��I��J�ATfM|nۡˇ��9 7MpV����d��&���� ���Ko�R��C-�      
      x������ � �      	      x������ � �         �  x��V�n�6]+_�pX�ڥi:�I��E�#q��H�1��4�b�Ŭ��V?�+ɒ:F�A��vt��sI�	='�����Ȍ	�%���c��D���n\	���� &Qrz�&�e�ܴ>}{%� �6j
a�{���}QA<R'�k��Ó���j�8��̤�̘)D$7�_!�s��!��X��")ɸ@JkC�	x]�ӏ��Z�ڐn�����w�����¦�Hm�zd#�`$	#�N�4��5��}������`�	��|
e��/�G��>��iI�iB�ߧ�����&�qcD$��L�<�k�17��}5�Cp� I�S�H>l}�m�nk��3�-�Զ���x:c)!���d��W�&���ڕ�0�&&%�p�86xn�Jn��V��P�=�m֛�oW=�Ō<���`u�����hr�h�W@�M^��tFb^3���f�	Z'WO�к�n��rn��M�� o�IU�I�� cn]3V��$Ԣ!?K�]��� >�`Q�F�X���.����v���A
0�&-��{�wО&-�*�K�e�*(����y��v�'��d�`�g�/��0��L�?�*\�{m����ci6iqJف
n��������@�:�g��>�XlLd#N�Q_ã�o ��"T&��Zb�F�Խ(c�}ԉ�h,X6x�f�j�vN�p�753��\�v&3BaB/r���މ�# ����B`L7�eY��7ʓ9l8��f��N N��~p�+��\��0R�H�C"/�E�mz#�\I5{/X���Wc��M&�X�� 	z���P�M�q��P��IFR�6�����E_��F@�#Z�/@� �XR��E~���.�XT��R5�a�@��j��h%CV;W���48���i�,�D2!������܇C\��86ķ����Ar;�s�V*�Y��i�>-����T��_
��um�ӻ���c9�0�dI�Ҍ����RC��kÉ3cZP.�L�[����r83f5�Ph�>�h����g�5cK��<\�^�x�Ӷ���b��j`� B%3�A�l���<��`p}FT��S�`2;��;�xw��(�i��YRɝ]ol?m[�O�-���������         �   x�m�K�0D�p���j�����rPj�1���ܾ��HQ��c�!R���� &�g�x�1q�m^%�!�6)
/`9(�t��AѲ��P��v��@�R-R+����-�4�&
W���,�eOj`�!{~5�N3�D��������r���}@�/�d�         �   x�e��n�0  �3<�^ �_[Lv �]Z�V:.��)(ٖmO����	�S@0��7�s�9]"�p[�	A ���l2y*���h�u9���e'��N�R=��j.B��(s���H��Iq|i�bn2�c��{5�����l������`�]EF>@��tE��R� 
�q��k�,t�{K�q�҆xk}吘w7�d/�����Q��tj3�NPq?ky�������w<�����
��)�>�a��lV�            x�3�L�H�-�I�K��Efs��qqq �<	�           x�}U�n�F<�_���==��"+��DP�[�ˈKK���
F�&BF>�+,E.g���� H\NuwUue�6��;��hK�;�g�s�a��Pv�+>�U;VE�}?����b��/�.�GM�?�X��>n�&�g4��	؋���ؠM���X�]w8�mr}<,!��JH�=�6�*����6�������L_Q�آͲ�n���Pw�ӡ��f���y����R�y�68�m��P�]yh�Cߌ7��~h0�KxL蓌܊��u(@�:���|<��]?N-��n�ϭ����t 6��S��$<ÁY�wA����ЍU�u�� ��X�WuA�E�������X���Z�8R��3�+Z"���~������+�X���C�=����?w�h:p���x��U��Cl�8���$�pJS`����l�B�>�)�u9}k�n�(��OM1�Y�c_m+L;���pv��
�ʇ`�kh���Z�	����z(��٪��Ug9YO�'LfXEiN��i��wƚ�Cݢ��{#igy�7௎|XOm�p�����{��He�
��
�qW����G, ��:s�wK'�1�w�E%%�1��aY��ˋ�]?�~�N"\$@9#ʥ�DĢ]��ɿ��ۂقIU���-I�B����5޷)?��ݢٞV���b!�vi�Ǯ����U��!��	�����8����;��z�q���V8�<\�p
J�`���S?^H�%$�l������j�9��(�i�7�'��s'h���~?�W=/�q�QV	��e�#ÈI"����}S#0ʘӚ��!J�`�#)p���1����P�.��K՜����w���-��}�Em�[>����'_�X��F�$Wؖ��9�
Z�&֧�q-!N1	�����*g��8�ذX����sU|�d�nZxa7� RbΒ���p��W��Q8$��/���n9�l��bK��V�~����Oq�wv
��0��0s��w��ҸyxY���I���Y-DA	w=�"���R�1��q�$��p��&��� G�         �  x�%��!ߧ`\H Xrq�q�4SG�V��_�2�Z1�3uES;���8�uťv��G��� )�����3m8+��Y�����ǋ�����8�a��̘r���lf�Z����G]�>���k�Pgt�\�ԎfN�R�L&�F���G���؍��Y��q���:�8��8Yq�@��Z���Lu�Wj��D�U+�Pg�Ty�R;.��ޥµ
�U�������U��v4RÖFi\%=]J��n���0;��6�4�����z���}0S|��24��"]l�t�Y$��f-�pk��F�h�i�H��E����x���9�� ��^�1��^tscI֪��>a:�1\�1H\�1�\�1�\�1]��$v���>a:���x�N�.0Y-����޺�k�u��z�&��ֽ��ֽ���I�)M��?�֎�	            x������ � �         J   x�3�H,H��2��9���$39�˘�7�$1G?,3�(�˄ӿ(��<��)�����
A�ə�@�e@�1z\\\ I��     