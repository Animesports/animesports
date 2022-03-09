export function organizeByDate(array) {
  // ONLY: "YYYY-MM-DD"
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

export function getDisplayDate(str) {
  const d = new Date(str);
  return {
    year: ("0000" + d.getFullYear()).slice(-4),
    month: ("00" + d.getMonth()).slice(-2),
    day: ("00" + d.getDate()).slice(-2),
    hours: ("00" + d.getHours()).slice(-2),
    minutes: ("00" + d.getMinutes()).slice(-2),
    seconds: ("00" + d.getSeconds()).slice(-2),
    milliseconds: ("000" + d.getMilliseconds()).slice(-3),
  };
}

function dateWithoutTime(date) {
  return new Date(`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`);
}
