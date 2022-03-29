export function useNextOnEnter(inputs, onSubmit) {
  if (!inputs || !inputs.length) return;

  const [current, currentIndex] = inputs
    .map((input, index) => [input, index])
    .filter(([input]) => input.matches(":focus"))?.[0] ?? [inputs[0], -1];

  if (current) {
    console.info(current.matches(":focus"));
    current.focus();
  }

  const [next, nextIndex] =
    inputs
      .map(({ value }, index) => {
        if (!value || value === "") return index;
        return "remove";
      })
      .filter((_v, index) => {
        return index > currentIndex;
      })
      .filter((value) => value !== "remove")
      .map((index) => [inputs[index], index])?.[0] ?? [];

  console.info(currentIndex, nextIndex);
  if (next) {
    return handleNext({ next, nextIndex, onSubmit });
  }

  onSubmit?.(inputs);

  function handleNext({ next, nextIndex, onSubmit }) {
    if (nextIndex === inputs.length) return onSubmit?.(inputs);
    return next.focus();
  }
}
