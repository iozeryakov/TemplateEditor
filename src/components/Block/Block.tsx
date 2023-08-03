import { FC } from "react"
import { Textarea } from "../Textarea/Textarea"
import { IfThenElse } from "../IfThenElse/IfThenElse"
import { IBlock } from "../../types/components"
import { isITextArea } from "../../utils/utils"


export const Block: FC<IBlock> = ({ list, setLastSelect, setValue, deleteIf }: IBlock) => {
    return (
        <>
            {list.map((i) => {
                if (isITextArea(i)) {
                    return <Textarea key={i.id} text={i} setLastSelect={setLastSelect} setValue={setValue} />
                } else {
                    return <IfThenElse key={i.id} item={i} setLastSelect={setLastSelect} setValue={setValue} deleteIf={deleteIf} />
                }
            }

            )}
        </>
    )
} 