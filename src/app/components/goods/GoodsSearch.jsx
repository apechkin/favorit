import { GoodsSearchInput } from "./GoodsSearchInput";
import { GoodsBrand } from "./GoodsBrand";
import { GoodsList } from "./GoodsList";

export const GoodsSearch = () => {
  return (
    <>
      <GoodsSearchInput />
      <GoodsBrand placeholder="Выберите бренд" />
      <GoodsList />
    </>
  );
};
