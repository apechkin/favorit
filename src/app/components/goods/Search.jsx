import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetGoodsByParamsQuery } from "../../services/goods";
import SearchableBrand from "./SearchableBrand";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [currentBrand, setCurrentBrand] = useState("");
  const debouncedNumber = useDebounce(inputValue, 500);

  const { isFetching, isError, isSuccess } = useGetGoodsByParamsQuery(
    { number: debouncedNumber },
    { skip: debouncedNumber.length < 1 }, // Не ищем, пока введено меньше 3 символов
  );

  const handleBrandChange = useCallback((brand) => {
    setCurrentBrand(brand);
  }, []);

  const content = useMemo(() => {
    if (isFetching) return <p>Обновление результатов...</p>;
    if (isError) return <p>Произошла ошибка, повторите снова</p>;
    if (isSuccess)
      return (
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
          <span>Производитель</span>
          <SearchableBrand
            brand={currentBrand}
            byNumber={debouncedNumber}
            onChange={handleBrandChange}
            placeholder="Выберите бренд"
          />
        </div>
      );
  }, [
    isFetching,
    isError,
    isSuccess,
    debouncedNumber,
    currentBrand,
    handleBrandChange,
  ]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите номер детали"
        className="w-64 rounded-lg border border-gray-300 bg-white/80 px-4 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
      />
      {content}
    </div>
  );
};
