import { FC } from "react";
import style from "./Textarea.module.css";
import { ITextarea } from "../../types/components";

export const Textarea: FC<ITextarea> = ({ text, setLastSelect, setValue }: ITextarea) => {
    return (<>
        <textarea className={style.text} onChange={(e) => {
            setValue({ ...text, value: e.currentTarget.value })
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.target.scrollHeight.toString()}px`;
            setLastSelect({ id: text.id, index: e.currentTarget.selectionEnd })
        }}
            onSelect={(e) => setLastSelect({ id: text.id, index: e.currentTarget.selectionEnd })}
            value={text.value}
        ></textarea >
    </>
    );
};