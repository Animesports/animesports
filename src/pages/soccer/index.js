import { useContext, useEffect, useState } from "react";
import { SoccerDetail } from "../../components/SoccerDetail";
import { SoccerTable } from "../../components/SoccerTable";
import { Structure } from "../../components/Structure";
import { soccerContext } from "../../contexts/SoccerContext";
import { replaceUrlParameter } from "../../utils/Global";
import { gameQuery } from "../../utils/Soccer";

export default function Soccer() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (!window) return;
    setSelected(new URLSearchParams(window.location.search).get("p"));
  }, []);

  useEffect(() => {
    replaceUrlParameter(new URL(window.location.href), "p", selected);
  }, [selected]);

  const { games, fetching } = useContext(soccerContext);

  const soccerQuery =
    !fetching &&
    games.length &&
    games.map((game) => {
      return {
        id: game.id,
        query: gameQuery(game),
      };
    });

  const initialSearch =
    !fetching && games.length && gameQuery(games[games.length - 1], { max: 5 });

  return (
    <Structure
      onSearch={setFilter}
      searchList={soccerQuery}
      contentStyle={{ position: "relative" }}
      initialSearch={initialSearch}
    >
      <SoccerTable onSelect={setSelected} filter={filter} />
      <SoccerDetail
        select={selected}
        onClose={() => {
          setSelected(null);
        }}
      />
    </Structure>
  );
}
