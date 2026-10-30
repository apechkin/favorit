export const GoodsItem = ({ item }) => {
  return (
    <tr className="transition hover:bg-purple-50">
      <td className="px-4 py-3">
        <p className="font-medium text-gray-900">{item.name}</p>
        <p className="mt-0.5 text-xs text-gray-500">
          {item.brand} · номер детали {item.number}
        </p>
      </td>
      <td className="px-4 py-3 text-right font-semibold text-purple-700">
        {item.price?.toLocaleString("ru-RU")} ₽
      </td>
      <td className="px-4 py-3 text-right text-gray-700">{item.count}</td>
    </tr>
  );
};
