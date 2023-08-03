import { FC } from "react";
import style from "./IfThenElse.module.css";
import { Block } from "../Block/Block";
import { IIfThenElse } from "../../types/components";

export const IfThenElse: FC<IIfThenElse> = ({ item, setLastSelect, setValue, deleteIf }: IIfThenElse) => {
    return (
        <div className={style.blockIf}>
            <div className={style.blockIf_child}>
                <div className={style.wrapperIf}>
                    <span className={style.if_color}>IF</span>
                    <button type="button" className={style.delete} onClick={() => deleteIf(item.id)}>Delete</button>
                </div>

                <div className={style.wrapper}>
                    <Block list={item.if} setLastSelect={setLastSelect} setValue={setValue} deleteIf={deleteIf} />
                </div>

            </div>
            <div className={style.blockIf_child}>
                <span className={style.if_color}>THEN</span>
                <div className={style.wrapper}>
                    <Block list={item.then} setLastSelect={setLastSelect} setValue={setValue} deleteIf={deleteIf} />
                </div>
            </div>
            <div className={style.blockIf_child}>
                <span className={style.if_color}>ELSE</span>
                <div className={style.wrapper}>
                    <Block list={item.else} setLastSelect={setLastSelect} setValue={setValue} deleteIf={deleteIf} />
                </div>
            </div>
        </div>
    );
};