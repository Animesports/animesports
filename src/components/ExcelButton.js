import * as XLSX from "sheetjs-style";

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

export function ExcelButton({ buttonText, name }) {
  function download() {
    const tableDom = document.createElement("table");
    tableDom.innerHTML = ReactDOMServer.renderToStaticMarkup(History());

    const workbook = XLSX.utils.table_to_book(tableDom);
    const ws = workbook.Sheets.Sheet1;

    const wscols = [{ wch: 30 }, { wch: 18 }, { wch: 16 }];

    ws["!cols"] = wscols;

    // Set Style to header
    filterHeader(filterSheet(ws)).map((key) => {
      ws[key].s = hStyle();
    });

    // Set Style to cells
    filterCells(filterSheet(ws)).map((key) => {
      ws[key].s = cStyle();
    });

    // Set Colors "C" Column
    filterColumn("C", filterSheet(ws)).map((key) => {
      ws[key].s.alignment = { horizontal: "center" };
      if (ws[key].v === "Entrada") ws[key].s.font.color = { rgb: "000A64A6" };
      if (ws[key].v === "Saída") ws[key].s.font.color = { rgb: "00C70A0A" };
    });

    // Set currency "B" column
    filterCells(filterColumn("B", filterSheet(ws))).map((key) => {
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
  return <button onClick={download}>{buttonText}</button>;
}
