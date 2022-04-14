import * as XLSX from "sheetjs-style";
import React from "react";

import { History } from "../components/AdminPay";
import ReactDOMServer from "react-dom/server";
import {
  cStyle,
  filterCells,
  filterColumn,
  filterHeader,
  filterSheet,
  hStyle,
} from "../utils/Excel";
import { useContext } from "react";
import { adminContext } from "../contexts/AdminContext";

export function ExcelButton({ buttonText, name }) {
  const { fetched, history } = useContext(adminContext);

  function download() {
    if (history.length === 0) return;

    const tableDom = document.createElement("table");
    tableDom.innerHTML = ReactDOMServer.renderToStaticMarkup(
      React.cloneElement(<History ft={fetched} values={history} />)
    );

    const workbook = XLSX.utils.table_to_book(tableDom);
    const ws = workbook.Sheets.Sheet1;

    const wscols = [{ wch: 30 }, { wch: 18 }, { wch: 16 }, { wch: 16 }];

    ws["!cols"] = wscols;

    // Set Style to header
    filterHeader(filterSheet(ws)).map((key) => {
      ws[key].s = hStyle();
    });

    // Set Style to cells
    filterCells(filterSheet(ws)).map((key) => {
      ws[key].s = cStyle();
    });

    // Set Colors "D" Column
    filterColumn("D", filterSheet(ws)).map((key) => {
      ws[key].s.alignment = { horizontal: "center" };
      if (ws[key].v === "Entrada") ws[key].s.font.color = { rgb: "000A64A6" };
      if (ws[key].v === "Saída") ws[key].s.font.color = { rgb: "00C70A0A" };
    });

    // Set currency "B" column
    filterCells(filterColumn("B", filterSheet(ws))).map((key) => {
      ws[key].s.alignment = { horizontal: "center" };
    });

    // Set currency "C" column
    filterCells(filterColumn("C", filterSheet(ws))).map((key) => {
      ws[key].s.alignment = { horizontal: "right" };
    });

    workbook.Props = {
      Author: "Animesports",
      Language: "pt-BR",
      CreatedDate: new Date(),
      Title: "Histórico de Transações",
    };

    XLSX.writeFile(workbook, "Histórico.xlsx");
  }
  return (
    <button className={history.length === 0 && "disable"} onClick={download}>
      {buttonText}
    </button>
  );
}
