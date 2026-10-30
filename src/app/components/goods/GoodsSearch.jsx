import { GoodsSearchInput } from "./GoodsSearchInput";
import { GoodsBrand } from "./GoodsBrand";
import { GoodsList } from "./GoodsList";

export const GoodsSearch = () => {
  return (
    <div className="flex flex-col gap-y-4 my-4 mx-2">
      <GoodsSearchInput />
      <GoodsBrand placeholder="Выберите бренд" />
      <GoodsList />
    </div>
  );
};
