import { useDispatch, useSelector } from "react-redux";
import {
  analoguesSelector,
  setAnalogues,
} from "../../services/goodsFilterSlice";

export const GoodsAnalogues = () => {
  const analogues = useSelector(analoguesSelector);
  const dispatch = useDispatch();

  return (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      <input
        type="checkbox"
        name="analogues"
        checked={analogues}
        onChange={(e) => dispatch(setAnalogues(e.target.checked))}
        className="h-4 w-4 accent-purple-600"
      />
      Искать аналоги
    </label>
  );
};
