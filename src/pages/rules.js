import Link from "next/link";
import { Structure } from "../components/Structure";
import styles from "../styles/pages/Rules.module.css";

export default function Rules() {
  return (
    <Structure contentClass={styles.container}>
      <h1 className={styles.mainTitle}>Tudo o que você precisa saber</h1>

      <div>
        <p>
          <img className={styles.imageTL} src="/icons/logo.svg" alt="logo" />O{" "}
          <Link href="#">Animesports</Link> é dividido em
          <Link href="#temporadas"> temporadas mensais</Link>. Cada temporada
          possui os jogos de futebol nos quais é possível fazer um{" "}
          <Link href="#jogos">palpite</Link>. Os jogadores que acertarem mais
          resultados ganham uma <Link href="#recompensas">recompensa</Link>.
        </p>

        <p>
          Para entrar efetivamente em uma{" "}
          <Link href="#temporadas">temporada</Link> é preciso ter uma recarga
          ativa naquele mês. Saiba como recarregar na seção{" "}
          <Link href="#recargas">recarga</Link>.
        </p>

        <p>
          Você pode avançar de <Link href="#ligas">liga</Link> acumulando pontos
          consecutivos. Quanto maior a liga, maior as{" "}
          <Link href="#ligas">vantagens</Link>.
        </p>
      </div>

      <div id="temporadas">
        <h2 className={styles.title}>Temporadas</h2>
        <p>
          As temporadas ocorrem entre os dias <b>01</b> às 00:00 e <b>27</b> às
          20:50 de cada mês no horário de Brasília. Cada temporada recebe uma
          série de <Link href="#jogos">jogos</Link> nas quais os jogadores podem
          acumular pontos através de palpites.
        </p>

        <p>
          No fim, os três primeiros colocados recebem as suas respectivas{" "}
          <Link href="#recompensas">recompensas</Link>.
        </p>
      </div>

      <div id="jogos">
        <h2 className={styles.title}>Jogos</h2>
        <p>
          É possível fazer palpites nos jogos de futebol incluídos na temporada
          através da página <Link href="/soccer">Jogos</Link>. Se o palpite
          estiver correto, o jogador acumula pontos e disputa o{" "}
          <Link href="#recompensas">prêmio</Link> daquele mês.
        </p>

        <table>
          <tr>
            <td>Acertou o placar</td>
            <td>
              <b>2</b> pontos
            </td>
          </tr>
          <tr>
            <td>Acertou o vencedor</td>
            <td>
              <b>1</b> pontos
            </td>
          </tr>
        </table>

        <p>
          <b className={styles.red}>Fique atento!</b> Somente é possível fazer
          palpites até o horário de <b>início</b> do{" "}
          <Link href="#jogos">jogo</Link>.
        </p>
      </div>

      <div id="recompensas">
        <h2 className={styles.title}>Recompensas</h2>
        <p>
          Ao fim de cada <Link href="#temporadas">temporada</Link>, os três
          primeiros colocados recebem uma premiação por transferência via PIX. O
          valor total do montante varia de temporada para temporada, entretanto,
          a distribuição é fixa:
          <table>
            <tr>
              <td>1° Colocado</td>
              <td>60%</td>
            </tr>
            <tr>
              <td>2° Colocado</td>
              <td>30%</td>
            </tr>
            <tr>
              <td>3° Colocado</td>
              <td>10%</td>
            </tr>
          </table>
          <p>
            <b className={styles.red}>Fique atento!</b> Registre sua chave PIX
            para receber a recompensa na página{" "}
            <Link href="/account">Conta</Link>. O vencedor tem 15 dias para
            resolver a pendência.
          </p>
        </p>
      </div>

      <div id="recargas">
        <h2 className={styles.title}>Recargas</h2>
        <p>
          <img src="/icons/pix-mini.svg" alt="PIX" className={styles.imageTR} />
          Antes de fazer um palpite em um <Link href="#jogos">jogo</Link>, é
          necessário ter uma recarga <b>ativa</b>. Para{" "}
          <Link href="#recargas">recarregar</Link>, você deve fazer um pagamento
          via <b>PIX</b> na página <Link href="/account">Conta</Link>.
        </p>

        <p>
          Apenas uma recarga será usada por{" "}
          <Link href="#temporadas">temporada</Link>. Se você fizer mais de uma
          recarga dentro de um mês, as outras serão usadas em{" "}
          <b>temporadas futuras</b>.
        </p>

        <p>
          Seu pagamento será <b>processado</b> pelo aplicativo. Este processo
          pode levar algum tempo.
        </p>
      </div>

      <div id="ligas">
        <h2 className={styles.title}>Ligas</h2>
        <p>
          Quando você faz <b>acertos consecutivos</b>, os{" "}
          <Link href="#jogos">pontos</Link> são usados na liga. Quando maior for
          sua <b>liga</b>, mais <b>vantagens</b> você terá. É possível ver sua
          liga atual na página <Link href="/leagues">Ligas</Link>.
        </p>

        <p>
          <b className={styles.red}>Fique atento!</b> Esta funcionalidade está
          em <b>desenvolvimento</b> e ficará disponível em breve, assim como as{" "}
          <b>vantagens</b>.
        </p>
      </div>

      <div id="duvidas">
        <h2 className={styles.title}>Dúvidas</h2>
        <p>
          Se ainda tem dúvidas quanto ao <Link href="#">Animesports</Link>,
          entre em contato conosco clicando{" "}
          <Link href="mailto:animesports.dev@gmail.com">aqui</Link>.
        </p>
      </div>
    </Structure>
  );
}
