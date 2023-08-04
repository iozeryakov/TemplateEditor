import { IIfElse, ITextArea, templateType } from "../types/template";
import { IValues } from "../types/types";
/*
* Функция опреденяет является ли обьект типом ITextArea
*/
export function isITextArea(obj: any): obj is ITextArea {
    return "id" in obj && "value" in obj;
}

/*
* Функция опреденяет является ли обьект типом IIfElse
*/
export function isIIfElse(obj: any): obj is IIfElse {
    return "id" in obj && "if" in obj && "then" in obj && "else" in obj;
}
/*
* Функция соединяет текст в одно целое и заменяет переменые на вводимые значения 
*/
export function messageGenerator(node: templateType, values: IValues): string {
    let message = "";
    node.forEach((nodeItem) => {
        if (isITextArea(nodeItem)) {
            message += getMessage(nodeItem.value, values)
        } else {
            const ifResult = messageGenerator(nodeItem.if, values);
            if (ifResult !== "") {
                message += messageGenerator(nodeItem.then, values);
            } else {
                message += messageGenerator(nodeItem.else, values);
            }
        }
    });
    return getMessage(message, values);
};
/*
* Функция для замены в тексте переменных на вводимые значения 
*/
export function getMessage(strWithVar: string, values: IValues): string {
    const match = strWithVar.match(/\{+([^{}]+)\}+/g); //ищем все подстроки в фигурных скобках
    let replacedStr = strWithVar;
    if (match) {
        for (const name of match) {
            const clearName = name.slice(1, name.length - 1);// убираем фигурные скобки 
            if (values[clearName] !== undefined) { //если такая переменная есть, то заменяем ее на введенное значение
                const replacer = values[clearName];
                replacedStr = replacedStr.split(name).join(replacer);
            }

        }
    }
    return replacedStr;
};
/*
* Функция генерирует уникальные id
*/
export function unid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2)
}
/*
* Функция сохранения
*/
export async function save(template: templateType) {
    localStorage.setItem("template", JSON.stringify(template))
}
/*
* Функция проверяет соответствует ли структуре template
*/
export function isTemplate(template: any): boolean {
    if (!Array.isArray(template))
        return false
    else if (template.length === 0)
        return false
    else if ((template.length % 2) === 0)
        return false
    let type = 0
    let isGood = true
    for (const item of template) {
        if (isITextArea(item)) {
            if (type === 1) {
                isGood = false
            } else {
                type = 1
                isGood = isGood && true
            }

        } else if (isIIfElse(item)) {
            if (type === 2) {
                isGood = false
            } else {
                type = 2
                isGood = isGood && isTemplate(item.if) && isTemplate(item.else) && isTemplate(item.then)
            }

        } else {
            isGood = false
        }
    }
    return isGood
}
/*
* Функция проверяет соответствует ли структуре arrVarNames 
*/
export function isStringArray(arr: any) {
    if (!Array.isArray(arr))
        return false
    else if (arr.length === 0)
        return false

    let isGood = true
    for (const item of arr) {
        if (typeof (item) === 'string') {
            isGood = isGood && true
        } else {
            isGood = false

        }
        return isGood
    }
}
