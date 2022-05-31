import React, { useEffect, useState } from "react";
import { aLow, low } from "../utils/Global";

/**
 * @typedef {Object} FetchSearchType
 * @property {React.Component} children - React children element
 * @property {searcherCallBack} searcher - Performs the search with the value entered by the user
 * @property {effectCallBack} effect - Called whenever the search is done
 * @property {onFetchCallBack} onFetch - Called whenever the search is done
 * @property {filterCallBack=} filter - Function responsible for converting a list of strings
 */

/**
 * @typedef {Object} onFetchCallBack
 * @property {Boolean} state - Fetch current state
 */

/**
 * @typedef {Object} EffectType
 * @property {Array<{}>} search - All search element
 * @property {Object} selected - Current Selected element
 */

/**
 * @callback searcherCallBack
 * @param {string} value - Value imputed by the user
 * @returns {Array} - Fetch response should be returned
 */

/**
 * @callback effectCallBack
 * @param {EffectType} result - Result of the search carried out
 */

/**
 * @callback filterCallBack
 * @param {Array} search - Result of the search carried out
 * @returns {Array<string>} - String list that will be displayed
 */

/**
 * Performs a search whenever the input value changes.
 * @param {FetchSearchType} parameters - {@link FetchSearchType} FetchSearcher parameters and definitions
 */
export function FetchSearcher(parameters) {
  const { children, effect, searcher, filter, onFetch } = parameters;

  const [timeOut, setOut] = useState(setTimeout(() => {}, 0));
  const [fetching, setFetching] = useState(false);
  const [value, setValue] = useState(null);
  const [search, setSearch] = useState([]);
  const [list, setList] = useState([]);

  function onChange(event) {
    setValue(event.target.value);
  }

  async function requestFetch() {
    if (typeof fetch !== "function") return;
    setFetching(true);
    typeof onFetch === "function" && onFetch(true);

    setTimeout(async () => {
      await searcher(value)
        .then(
          (response) => {
            setSearch(response);
          },
          (err) => {
            console.info("FetchSearcher: error", err);
          }
        )
        .finally(() => onFetch(false));
    }, 100);

    setFetching(false);
  }

  useEffect(() => {
    if (typeof effect !== "function") return;
    const li =
      typeof filter === "function"
        ? filter(search)
        : search.map((v) => String(v));

    setList(li);

    effect({ search, selected: search[aLow(li).indexOf(low(value))] });
  }, [search]);

  useEffect(() => {
    if (fetching || value == null || value.replaceAll(" ", "").length === 0)
      return;

    clearTimeout(timeOut);

    if (aLow(list).includes(low(value))) {
      return effect({
        search,
        selected: search[aLow(list).indexOf(low(value))],
      });
    }

    setOut(setTimeout(requestFetch, 1800));
  }, [value]);

  return <>{React.cloneElement(children, { onChange, list })}</>;
}
