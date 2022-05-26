import { useContext, useEffect, useState } from "react";
import { SoccerDetail } from "../../components/SoccerDetail";
import { SoccerTable } from "../../components/SoccerTable";
import { Structure } from "../../components/Structure";
import { soccerContext } from "../../contexts/SoccerContext";
import { getDisplayDate } from "../../utils/Date";
import { gameQuery } from "../../utils/Soccer";

export default function Soccer() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (!window) return;
    setSelected(new URLSearchParams(window.location.search).get("p"));
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    !selected && url.searchParams.delete("p");
    selected && url.searchParams.set("p", selected);
    window.history.replaceState(null, null, url);
  }, [selected]);

  const { games, fetching } = useContext(soccerContext);

  useEffect(() => {
    console.info("New soccer Filter:", filter);
  }, [filter]);

  const soccerQuery =
    !fetching &&
    games.map((game) => {
      return {
        id: game.id,
        query: gameQuery(game),
      };
    });

  return (
    <Structure
      onSearch={setFilter}
      searchList={soccerQuery}
      contentStyle={{ position: "relative" }}
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
