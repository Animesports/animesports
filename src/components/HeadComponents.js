import Head from "next/head";

export function HeadComponents({ current }) {
  const Indexes = [
    ["/", "Animesports - Jogue Agora", {}],
    ["/leadboard", "Leadboard", , {}],
    ["/soccer", "Jogos", {}],
    ["/leagues", "Ligas", {}],
    ["/about", "Sobre", {}],
    ["/account", "Conta", { index: false }],
    ["/admin", "Admin", { index: false }],
    ["/login", "Entrar", {}],
    ["/register", "Registrar", {}],
  ];

  const currentIndex =
    Indexes[Indexes.map(([i]) => i).indexOf(current)] ?? Indexes[0];

  const metas = {
    name: "Animesports",
    title: "Jogue Agora no Animesports",
    description:
      "Faça seus palpites. Recompensas mensais. Jogue com seus amigos. Futebol e bate-papo.",
    robots: `${currentIndex[2]?.index !== false ? "index" : "noindex"}, follow`,
    banner:
      "https://raw.githubusercontent.com/Animesports/animesports/main/public/banner.png",
    canonical: `https://animesports.cf${currentIndex[0]}`,
    url: "https://animesports.cf/",
  };

  return (
    <Head>
      <title>{currentIndex[1]}</title>

      <link rel="icon" type="image/x-icon" href="/icons/fav2.ico"></link>
      <link rel="canonical" href={metas.canonical} />

      <meta name="title" content={metas.title} />
      <meta name="description" content={metas.description} />
      <meta name="robots" content={metas.robots} />

      {/* SEO - GOOGLE */}
      <meta itemProp="name" content={metas.title} />
      <meta itemProp="description" content={metas.description} />
      <meta itemProp="image" content={metas.banner} />

      <meta httpEquiv="content-language" content="pt-br" />

      {/* SEO - FACEBOOK */}
      <meta property="og:url" content={metas.url} />
      <meta property="og:site_name" content={metas.name} />
      <meta property="og:title" content={metas.title} />
      <meta property="og:description" content={metas.description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={metas.banner} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />

      {/* SEO - TWITTER */}
      <meta property="twitter:url" content={metas.url} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={metas.name} />
      <meta property="twitter:description" content={metas.description} />
      <meta property="twitter:image" content={metas.banner} />
    </Head>
  );
}
