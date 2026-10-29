import { useState } from "react"
import { useDebounce } from "./hooks/useDebounce";
import {useGetGoodsByParamsQuery} from './services/goods'

export const Search = () => {
    const [inputValue, setInputValue] = useState('')
    const debouncedNumber = useDebounce(inputValue, 500);
    
    const { isFetching } = useGetGoodsByParamsQuery(
        { number: debouncedNumber },
        { skip: debouncedNumber.length < 3 } // Не ищем, пока введено меньше 3 символов
    );

    return (
        <div>
            <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите номер детали" />
                {isFetching && <p>Обновление результатов...</p>}
        </div>
    )
}