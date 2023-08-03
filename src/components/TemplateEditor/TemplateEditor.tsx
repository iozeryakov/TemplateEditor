import { FC, useContext, useState } from "react";
import style from "./TemplateEditor.module.css";
import { Modal } from "../Modal/Modal";
import { Preview } from "../Preview/Preview";
import { Block } from "../Block/Block";
import { ITextArea, templateType } from "../../types/template";
import { ITemplateEditor } from "../../types/components";
import { isITextArea, isStringArray, isTemplate, unid } from "../../utils/utils";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import useLastFocus from "../../hooks/useLastFocus";

export const TemplateEditor: FC<ITemplateEditor> = observer(({ callbackSave, arrVarNames, template }: ITemplateEditor) => {
    if (!isStringArray(arrVarNames))
        arrVarNames = ['firstname', 'lastname', 'company', 'position']
    const { modals } = useContext(Context)
    const isOpen = modals.getIsOpen("modal2")
    const { setLastFocus } = useLastFocus(isOpen)
    const [listValue, setListValue] = useState<templateType>((template && isTemplate(template)) ? template : [{ id: unid(), value: '' }]);
    const [lastSelect, setLastSelect] = useState({
        id: '',
        index: 0
    })

    /**
     * Функция для удаления блока ifthenelse, изменения текта, втавки переменных,добавления ifthenelse
     * Первоночально это было 4 разные функции но они все были почти одинаковы, поэтому решил их объединить 
     * рекурсивно пробегаем по обекту template и выполняем то или иное действие в зависимости от типа действия
     */
    function search(template: templateType, type: 'set' | 'addTag' | 'add' | 'delete', elem?: ITextArea, tag?: string, id?: string) {
        let newList: templateType = [], need = false, value = ''
        for (const item of template) {
            if (isITextArea(item)) {
                if (type === 'set') {
                    if (item.id === elem?.id) {
                        newList.push(elem)
                    } else {
                        newList.push(item)
                    }
                } else if (type === 'delete') {
                    if (need) {
                        newList[newList.length - 1] = { ...newList[newList.length - 1], value: value + item.value }
                        setLastSelect({ id: newList[newList.length - 1].id, index: value.length })
                        need = false
                    } else {
                        value = item.value
                        newList.push(item)
                    }

                } else {
                    const lastId = lastSelect.id || listValue[0].id
                    setLastSelect((prev) => ({ ...prev, id: lastId }))
                    if (item.id === lastId) {
                        if (type === 'addTag') {
                            newList.push({ ...item, value: item.value.slice(0, lastSelect.index) + `{${tag}}` + item.value.slice(lastSelect.index) })
                        } else {
                            newList.push({ ...item, value: item.value.slice(0, lastSelect.index) })
                            newList.push({ id: unid(), if: [{ id: unid(), value: '' }], then: [{ id: unid(), value: '' }], else: [{ id: unid(), value: '' }] })
                            newList.push({ id: unid(), value: item.value.slice(lastSelect.index) })
                        }
                    } else {
                        newList.push(item)
                    }
                }
            } else {
                if (type === "delete") {
                    if (item.id === id) {
                        need = true
                    } else {
                        newList.push({ id: item.id, if: search(item.if, type, elem, tag, id), then: search(item.then, type, elem, tag, id), else: search(item.else, type, elem, tag, id) })
                    }
                } else
                    newList.push({ id: item.id, if: search(item.if, type, elem, tag, id), then: search(item.then, type, elem, tag, id), else: search(item.else, type, elem, tag, id) })
            }
        }
        return newList
    }
    /**
    * Функция изменения текста
    */
    function setValue(elem: ITextArea) {
        setListValue((prev) => search(prev, 'set', elem))
    }
    /**
     * Функция для удаления блока ifthenele
     */
    function deleteIf(id: string) {
        setListValue((prev) => search(prev, 'delete', undefined, undefined, id))
    }
    /**
    * Функция вставления переменных в текст
    */
    function onClick(el: string) {
        setListValue((prev) => search(prev, 'addTag', undefined, el))
        setLastSelect((prev) => ({ ...prev, index: prev.index + (el.length + 2) }))
    }
    return (
        <>
            <Modal id="modal1">
                <div className={style.modal_header}>
                    <div className={style.titile}>Message Template Editor</div>
                    <button type='button' className={style.title_close} onClick={() => modals.close("modal1")}>
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
                    <div className={style.list_names}>
                        {arrVarNames.map((i) =>
                            <button key={i} onClick={() => onClick(i)} type="button" className={style.name}>{`{${i}}`}</button>
                        )}
                    </div>
                    <div className={style.wrapper_if}>
                        <button type='button' className={style.if} onClick={() => setListValue((prev) => search(prev, 'add'))}>
                            <span>Click to add: </span>
                            <span className={style.if_color}>IF</span>
                            <span>{' [{some_variable} or expression] '}</span>
                            <span className={style.if_color}>THEN</span>
                            <span>{' [then_value] '}</span>
                            <span className={style.if_color}>ELSE</span>
                            <span>{' [else_value]'}</span>
                        </button>
                    </div>
                    <div className={style.texts}>
                        <Block list={listValue} setLastSelect={setLastSelect} setValue={setValue} deleteIf={deleteIf} />
                    </div>
                </div>
                <div className={style.modal_footer}>
                    <div className={style.wrapper_footer}>
                        <button className={style.footer_button} onClick={(e) => { setLastFocus(e.currentTarget); modals.open("modal2"); }}>Preview</button>
                        <button className={style.footer_button} onClick={() => callbackSave(listValue)}>Save</button>
                        <button className={style.footer_button} onClick={() => modals.close("modal1")}>Close</button>
                    </div>
                </div>
            </Modal>
            {isOpen && <Preview template={listValue} arrVarNames={arrVarNames} />}
        </>
    );
})

