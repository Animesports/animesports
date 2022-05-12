import { useState } from "react";
import { SoccerDetail } from "../../components/SoccerDetail";
import { SoccerTable } from "../../components/SoccerTable";
import { Structure } from "../../components/Structure";

export default function Soccer() {
  const [selected, setSelected] = useState(null);

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
