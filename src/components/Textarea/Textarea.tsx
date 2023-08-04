import { FC } from "react";
import style from "./Textarea.module.css";
import { ITextarea } from "../../types/components";
import TextareaAutosize from 'react-textarea-autosize';

export const Textarea: FC<ITextarea> = ({ text, setLastSelect, setValue }: ITextarea) => {
    return (<>
        <TextareaAutosize minRows={2} className={style.text}
            onChange={(e) => {
                setValue({ ...text, value: e.currentTarget.value })
                setLastSelect({ id: text.id, index: e.currentTarget.selectionEnd })
            }}
            onSelect={(e) => setLastSelect({ id: text.id, index: e.currentTarget.selectionEnd })}
            value={text.value}
        />

    </>
    );
};
