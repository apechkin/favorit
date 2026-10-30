import { useEffect, useMemo, useRef, useState } from "react";
import { useGetGoodsByParamsQuery } from "../../services/goods";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentBrand,
  currentBrandSelector,
} from "../../services/goodsSlice";

export default function SearchableBrand({
  byNumber,
  placeholder = "Выберите…",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef(null);
  const dispatch = useDispatch();
  const { currentData: dataByNumber } = useGetGoodsByParamsQuery({
    number: byNumber,
  });
  const brand = useSelector(currentBrandSelector);

  const options = useMemo(() => {
    const goods = dataByNumber.goods ?? [];
    return [...new Set(goods.map((item) => item.brand))].map((item) => ({
      value: item,
      label: item,
    }));
  }, [dataByNumber]);

  const filtered = options.filter(({ label }) =>
    label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const selected = options.find(({ value }) => value === brand);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function openDropdown() {
    setQuery("");
    setHighlighted(0);
    setOpen(true);
  }

  function select(option) {
    dispatch(setCurrentBrand(option.value));
    setOpen(false);
  }

  function onKeyDown(event) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    }
    if (event.key === "Enter" && filtered[highlighted]) {
      event.preventDefault();
      select(filtered[highlighted]);
    }
  }

  return (
    <div ref={rootRef} className="relative inline-block w-56 text-left">
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openDropdown())}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-left text-sm text-gray-900 shadow-sm transition hover:border-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none"
      >
        {selected ? (
          selected.label
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <span className="float-right text-gray-400">▾</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlighted(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Поиск…"
            className="w-full border-b border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-purple-500"
          />
          <ul className="max-h-60 overflow-auto py-1" role="listbox">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-400">
                Ничего не найдено
              </li>
            )}
            {filtered.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === brand}
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => select(option)}
                className={`cursor-pointer px-3 py-1.5 text-sm ${
                  index === highlighted
                    ? "bg-purple-100 text-purple-900"
                    : "text-gray-900"
                }`}
              >
                {option.label}
                {option.value === brand && (
                  <span className="float-right text-purple-600">✓</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
