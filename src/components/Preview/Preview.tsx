import { FC, useContext, useEffect, useState } from "react";
import style from "./Preview.module.css";
import { Modal } from "../Modal/Modal";
import { Input } from "../Input/Input";
import { IPreview } from "../../types/components";
import { messageGenerator } from "../../utils/utils";
import { IValues } from "../../types/types";
import { Context } from "../..";
import { observer } from "mobx-react-lite";



export const Preview: FC<IPreview> = observer(({ arrVarNames, template }: IPreview) => {
    const { modals } = useContext(Context)
    const [values, setValues] = useState<IValues>(arrVarNames.reduce((prev, curren) => ({ ...prev, [curren]: '' }), {}))
    const [message, setMessage] = useState(messageGenerator(template, values))

    function onChange(name: string, value: string) {
        setValues((prev) => ({ ...prev, [name]: value }))
    }
    useEffect(() => { setMessage(messageGenerator(template, values)) }, [values, setMessage, template])
    return (
        <Modal id="modal2">
            <div className={style.modal_header}>
                <div className={style.titile}>Message Preview</div>
                <button type='button' className={style.title_close} onClick={() => modals.close("modal2")}>
                    <span>
                        <svg width="20px" height="20px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" type="MSPage">
                                <g id="Icon-Set" type="MSLayerGroup" transform="translate(-467.000000, -1039.000000)" fill="#000000">
                                    <path d="M489.396,1061.4 C488.614,1062.18 487.347,1062.18 486.564,1061.4 L479.484,1054.32 L472.404,1061.4 C471.622,1062.18 470.354,1062.18 469.572,1061.4 C468.79,1060.61 468.79,1059.35 469.572,1058.56 L476.652,1051.48 L469.572,1044.4 C468.79,1043.62 468.79,1042.35 469.572,1041.57 C470.354,1040.79 471.622,1040.79 472.404,1041.57 L479.484,1048.65 L486.564,1041.57 C487.347,1040.79 488.614,1040.79 489.396,1041.57 C490.179,1042.35 490.179,1043.62 489.396,1044.4 L482.316,1051.48 L489.396,1058.56 C490.179,1059.35 490.179,1060.61 489.396,1061.4 L489.396,1061.4 Z M485.148,1051.48 L490.813,1045.82 C492.376,1044.26 492.376,1041.72 490.813,1040.16 C489.248,1038.59 486.712,1038.59 485.148,1040.16 L479.484,1045.82 L473.82,1040.16 C472.257,1038.59 469.721,1038.59 468.156,1040.16 C466.593,1041.72 466.593,1044.26 468.156,1045.82 L473.82,1051.48 L468.156,1057.15 C466.593,1058.71 466.593,1061.25 468.156,1062.81 C469.721,1064.38 472.257,1064.38 473.82,1062.81 L479.484,1057.15 L485.148,1062.81 C486.712,1064.38 489.248,1064.38 490.813,1062.81 C492.376,1061.25 492.376,1058.71 490.813,1057.15 L485.148,1051.48 L485.148,1051.48 Z" id="cross" type="MSShapeGroup"></path>
                                </g>
                            </g>
                        </svg>
                    </span>
                </button>
            </div>
            <div className={style.modal_body}>
                <textarea className={style.text} rows={10} value={message} readOnly></textarea >
                <div>
                    <div className={style.list_names}>
                        <div className={style.variables}>Variables : </div>
                        {Object.keys(values).map((i, index) => (
                            <Input key={i + index} id={i + index} name={i} value={values[i]} onChange={onChange} />
                        ))}

                    </div>
                </div>
            </div>
            <div className={style.modal_footer}>
                <button className={style.footer_button} onClick={() => modals.close("modal2")}>Close</button>
            </div>
        </Modal>
    );
})