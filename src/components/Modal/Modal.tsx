import { FC, useContext, useEffect, useRef, useState } from "react";
import style from "./Modal.module.css";
import { IModal } from "../../types/components";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

export const Modal: FC<IModal> = observer(({ id, children }: IModal) => {
    const { modals } = useContext(Context)
    const ref = useRef<any>()
    const [onMouseDown, setOnMouseDown] = useState(false)
    useEffect(() => {
        ref.current.focus();
    }, [])
    return (
        <div ref={ref} className={style.back_modal} onClick={() => {
            onMouseDown && modals.close(id);
        }}
            onMouseDown={() => setOnMouseDown(true)}
            id={id}
            tabIndex={-1}
            aria-modal="true"
            aria-label='Description for modal content'
            role='dialog'
        >
            <div className={style.modal} onClick={(event) => event.stopPropagation()} onMouseDown={(event) => { setOnMouseDown(false); event.stopPropagation() }}  >
                {children}
            </div>
            <span tabIndex={0} aria-hidden='true' onFocus={() => { ref.current.focus() }}></span>
        </div>
    );
})