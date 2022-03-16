export function filterSheet(ws) {
  return Object.keys(ws).filter((key) => {
    return !["!cols", "!ref"].includes(key);
  });
}

export function filterColumn(letter, list, options) {
  return list.filter((key) => {
    if (options?.reverse) return key.split("")[0] !== letter;
    return key.split("")[0] === letter;
  });
}

export function filterHeader(list) {
  return list.filter((key) => {
    return key.split("")[1] === "1";
  });
}

export function filterCells(list) {
  return list.filter((key) => {
    return key.split("")[1] !== "1";
  });
}

export function hStyle() {
  return {
    fill: {
      patternType: "solid",
      fgColor: { rgb: "00262626" },
    },
    alignment: {
      horizontal: "center",
      vertical: "center",
    },
    font: {
      name: "Poppins",
      sz: 13,

      color: { rgb: "FFFFFFFF" },
    },
  };
}

export function cStyle() {
  return {
    font: {
      name: "Karla",
      sz: 13,

      color: { rgb: "00262626" },
    },
  };
}
