export function useNextOnEnter(inputs, onSubmit) {
  if (!inputs || !inputs.length) return;

  const [next, index] =
    inputs
      .map(({ value }, index) => {
        if (!value || value === "") return index;
        return "remove";
      })
      .filter((_v, index) => {
        return !inputs[index].matches(":focus");
      })
      .filter((value) => value !== "remove")
      .map((index) => [inputs[index], index])?.[0] ?? [];

  if (next) {
    if (index === inputs.length) return onSubmit?.(inputs);
    return next.focus();
  }

  onSubmit?.(inputs);
}
