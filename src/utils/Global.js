export function hideEmailChars(emailString) {
  if (!emailString || typeof emailString !== "string") return null;

  const separator = emailString.substring(
    1,
    emailString.split("@")[0].length - 2
  );

  if (separator.length <= 0) {
    return emailString
      .split("@")
      .map((v, i) => {
        if (i === 1)
          return v
            .split(".")
            .map((v, i) => {
              if (i === 0) return Array(v.length + 1).join("*");
              return v;
            })
            .join(".");
        return v.replace(v.substring(0, 1), "*");
      })
      .join("@");
  }

  return emailString.replace(
    separator,
    Array(nummax(separator.length + 1, 8)).join("*")
  );
}

export function nummax(number, max) {
  if (number >= max) return max;
  return number;
}
