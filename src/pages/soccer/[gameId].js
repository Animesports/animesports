import Router from "next/router";
import { SoccerDetail } from "../../components/SoccerDetail";

import { Structure } from "../../components/Structure";

export default function Soccer({ gameId }) {
  return (
    <Structure contentStyle={{ position: "relative" }}>
      <SoccerDetail
        select={gameId}
        onClose={() => {
          Router.push("/soccer");
        }}
      />
    </Structure>
  );
}

export const getServerSideProps = ({ query }) => {
  return {
    props: {
      gameId: query?.gameId,
    },
  };
};
