import Head from "next/head";

export function HeadComponents({ current }) {
  const Indexes = [
    ["/", "Animesports"],
    ["/leadboard", "Leadboard"],
    ["/soccer", "Jogos"],
    ["/leagues", "Ligas"],
    ["/about", "Sobre"],
    ["/account", "Conta"],
    ["/admin", "Admin"],
    ["/login", "Entrar"],
    ["/register", "Registrar"],
  ];

  const currentIndex =
    Indexes[Indexes.map(([i]) => i).indexOf(current)] ?? Indexes[0];

  return (
    <Head>
      <title>{currentIndex[1]}</title>

      <link rel="icon" type="image/x-icon" href="/icons/fav1.ico"></link>
      <link rel="canonical" href="https://animesports.cf/" />

      <meta name="title" content="title-here" />
      <meta name="description" content="desc-here" />
      <meta name="robots" content="index, follow" />

      <meta httpEquiv="content-language" content="pt-br" />
    </Head>
  );
}
