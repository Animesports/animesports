import { useState } from "react";
import { SoccerDetail } from "../components/SoccerDetail";
import { SoccerTable } from "../components/SoccerTable";
import { Structure } from "../components/Structure";

export default function Soccer() {
  return (
    <Structure contentStyle={{ position: "relative" }}>
      <SoccerTable />
      <SoccerDetail />
    </Structure>
  );
}
