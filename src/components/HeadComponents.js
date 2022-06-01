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
    </Head>
  );
}
