import { useSelector } from "react-redux";
import {
  currentBrandSelector,
  analoguesSelector,
} from "../../services/goodsFilterSlice";
import { useGetGoodsByParamsQuery } from "../../services/goodsApi";
import { currentNumberSelector } from "../../services/goodsSearchSlice";
import { GoodsItem } from "./GoodsItem";
import { Fragment } from "react";

export const GoodsList = () => {
  const brand = useSelector(currentBrandSelector);
  const analogues = useSelector(analoguesSelector);
  const currentNumber = useSelector(currentNumberSelector);
  let params = {
    number: currentNumber,
    brand,
  };
  if (analogues) params.analogues = analogues;
  const { currentData, isError, isFetching, isSuccess } =
    useGetGoodsByParamsQuery({ ...params }, { skip: !(brand && brand.length) });

  if (isFetching)
    return <p className="text-sm text-gray-500">Загрузка списка...</p>;
  if (isError)
    return (
      <p className="text-sm text-red-500">Произошла ошибка, повторите снова</p>
    );
  if (!isSuccess || !brand) {
    return null;
  }
  if (currentData?.goods.length === 0 || !currentData)
    return <p className="text-sm text-gray-500">Предложений не найдено</p>;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs tracking-wide text-gray-500 uppercase">
            <th className="px-4 py-2.5">Название / Производитель</th>
            <th className="px-4 py-2.5 text-right">Цена</th>
            <th className="px-4 py-2.5 text-right">Остаток</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentData?.goods.map((item) => {
            const analogues = item.analogues ?? [];

            return (
              <Fragment key={item.goodsID}>
                <GoodsItem item={item} />

                {analogues.length > 0 && (
                  <>
                    <tr className="bg-purple-50/70">
                      <td colSpan={3} className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold tracking-wide text-purple-800 uppercase">
                            Аналоги:
                          </span>
                        </div>
                      </td>
                    </tr>

                    {analogues.map((analog) => (
                      <GoodsItem key={analog.goodsID} item={analog} />
                    ))}
                  </>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
