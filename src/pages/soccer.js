import { useState } from "react";
import { SoccerDetail } from "../components/SoccerDetail";
import { SoccerTable } from "../components/SoccerTable";
import { Structure } from "../components/Structure";
import { SoccerContextProvider } from "../contexts/SoccerContext";

export default function Soccer() {
  return (
    <Structure contentStyle={{ position: "relative" }}>
      <SoccerContextProvider>
        <SoccerTable />
        <SoccerDetail />
      </SoccerContextProvider>
    </Structure>
  );
}
