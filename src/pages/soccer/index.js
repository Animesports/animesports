import { useEffect, useState } from "react";
import { SoccerDetail } from "../../components/SoccerDetail";
import { SoccerTable } from "../../components/SoccerTable";
import { Structure } from "../../components/Structure";

export default function Soccer() {
  const [selected, setSelected] = useState(null);

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

  return (
    <Structure contentStyle={{ position: "relative" }}>
      <SoccerTable onSelect={setSelected} />
      <SoccerDetail
        select={selected}
        onClose={() => {
          setSelected(null);
        }}
      />
    </Structure>
  );
}
