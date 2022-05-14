export function organizeByDate(array) {
  if (array.length === 1) return array;

  return array.reduce((group, item, ind) => {
    if (ind === 1) {
      const date = dateWithoutTime(group.date);

      group = { [date]: [group] };
    }

    const date = dateWithoutTime(item.date);
    group[date] = group[date] ?? [];
    group[date].push(item);

    return group;
  });
}

export function sortByDate(obj) {
  return Object.keys(obj)
    .sort((a, b) => {
      function getData(str) {
        return new Date(str);
      }

      return getData(b) - getData(a);
    })
    .map((key) => {
      return {
        group: key,
        games: sortByHours(obj[key]),
      };
    });
}

export function sortByHours(array) {
  return array.sort((a, b) => {
    function getData(str) {
      return new Date(str);
    }

    return getData(a.date) - getData(b.date);
  });
}

export function localDate(str, opts) {
  if (!str) return;
  const d = typeof str === "string" ? new Date(str) : str;
  const { day, month, year } = getDisplayDate(d, { numeric: true });
  return new Date(
    year,
    month,
    day + (opts?.increase ?? 0)
  ).toLocaleDateString();
}

export function ISOdateFormat(str) {
  if (!str) return;
  const d = typeof str === "string" ? new Date(str) : str;
  return d.toISOString().split("T")[0];
}

export function ISOtimeFormat(str) {
  if (!str) return;
  const d = typeof str === "string" ? new Date(str) : str;
  return d.toLocaleTimeString().slice(0, 5);
}

export function getDisplayDate(str, options) {
  const d = typeof str === "string" ? new Date(str) : str;

  const display = {
    year: ("0000" + d.getFullYear()).slice(-4),
    month: ("00" + (d.getMonth() + 1)).slice(-2),
    day: ("00" + d.getDate()).slice(-2),
    hours: ("00" + d.getHours()).slice(-2),
    minutes: ("00" + d.getMinutes()).slice(-2),
    seconds: ("00" + d.getSeconds()).slice(-2),
    milliseconds: ("000" + d.getMilliseconds()).slice(-3),
    week: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ][d.getDay()],
  };

  if (options?.numeric) {
    for (const key in display) {
      display[key] = Number(display[key]);
    }
  }

  return display;
}

function dateWithoutTime(date) {
  return new Date(
    `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  );
}
