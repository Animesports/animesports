import { DefaultOp, UseNextOp } from "./Types";

/**
 *
 * @param {[HTMLInputElement]} inputs
 * @param {UseNextOp} options
 * @param {Function} onSubmit
 */
export function useNextOnEnter(inputs, onSubmit, options) {
  if (!inputs || !inputs.length) return;

  const defaultOp = new DefaultOp();
  options = options ?? {};

  for (const op in defaultOp) {
    options[op] = options[op] ?? defaultOp[op];
  }

  const [current, currentIndex] = inputs
    .map((input, index) => [input, index])
    .filter(([input]) => input.matches(":focus"))?.[0] ?? [inputs[0], -1];

  if (current && options.ignoreEmpty) {
    current.focus();
  }

  const [next, nextIndex] =
    inputs
      .map(({ value }, index) => {
        if (!value || value === "") return index;
        return "remove";
      })
      .filter((_v, index) => {
        if (!options.ignoreEmpty) return true;
        return index > currentIndex;
      })
      .filter((value) => value !== "remove")
      .map((index) => [inputs[index], index])?.[0] ?? [];

  if (next) {
    return handleNext({ next, nextIndex, onSubmit });
  }

  onSubmit?.(inputs);

  function handleNext({ next, nextIndex, onSubmit }) {
    if (nextIndex === inputs.length) return onSubmit?.(inputs);
    return next.focus();
  }
}
