import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useGetGoodsByParamsQuery } from "./services/goods";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedNumber = useDebounce(inputValue, 500);

  const { isFetching } = useGetGoodsByParamsQuery(
    { number: debouncedNumber },
    { skip: debouncedNumber.length < 3 }, // Не ищем, пока введено меньше 3 символов
  );

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите номер детали"
        className="w-64 rounded-lg border border-gray-300 bg-white/80 px-4 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
      />
      {isFetching && <p>Обновление результатов...</p>}
    </div>
  );
};
