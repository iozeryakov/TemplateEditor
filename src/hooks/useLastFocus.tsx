import { useEffect, useState } from "react"
/**
 * hook для отслеживания элемента с котрого открывается модальное окно
 */
function useLastFocus(isOpen: boolean) {
    const [lastFocus, setLastFocus] = useState<any>()
    useEffect(() => {//запоминаю элемент на котором было открыто модальное окно, что бы при закрытии вернуть фокус на него
        if (lastFocus && !isOpen) {
            lastFocus.focus()
        }
    }, [isOpen, lastFocus])
    return { setLastFocus }
}
export default useLastFocus