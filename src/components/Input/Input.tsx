import { FC } from "react";
import style from "./Input.module.css";
import { IInput } from "../../types/components";

export const Input: FC<IInput> = ({ id, name, value, onChange }: IInput) => {
    return (
        <div className={style.input}>
            <label htmlFor={id} className={style.label_input}>{name}</label>
            <input className={style.iinput} id={id} type="text" placeholder={name} value={value}
                onChange={(e) => onChange(name, e.currentTarget.value)} />
        </div>
    );
};