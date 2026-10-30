import { useDispatch, useSelector } from "react-redux";
import {
  currentNumberSelector,
  setInputValue,
} from "../../services/goodsSearchSlice";

export const GoodsSearchInput = () => {
  const inputValue = useSelector(currentNumberSelector);
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => dispatch(setInputValue(e.target.value))}
        placeholder="Введите номер детали"
        className="w-64 rounded-lg border border-gray-300 bg-white/80 px-4 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
      />
    </div>
  );
};
