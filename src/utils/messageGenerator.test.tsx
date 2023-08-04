import { templateType } from "../types/template";
import { messageGenerator, getMessage } from "./utils"
const template1: templateType = [
    {
        id: "1",
        value: "Привет {name}",
    }
]
const template2: templateType = [
    {
        id: "1",
        value: "Привет {name}",
    },
    {
        id: "2",
        if: [
            {
                id: "4",
                value: "{friend}",
            },
        ],
        then: [
            {
                id: "5",
                value: " мой {friend}. ",
            },
        ],
        else: [
            {
                id: "6",
                value: ". ",
            },
        ],
    },
    {
        id: "3",
        value: "Как дела {friend}?",
    },
]

describe("Проверка функции messageGenerator", () => {
    test("Шаблон без блоков ifthenelse и переменная", () => {
        const values = { name: "Иван" }
        const message = messageGenerator(template1, values)
        expect(message).toBe("Привет Иван")
    })
    test("Шаблон без блоков ifthenelse и переменных нет", () => {
        const values = {}
        const message = messageGenerator(template1, values)
        expect(message).toBe("Привет {name}")
    })
    test("Текст не интерпретируется, как оператор1", () => {
        const values = { name: "if else" }
        const message = messageGenerator(template1, values)
        expect(message).toBe("Привет if else")
    })
    test("Текст не интерпретируется, как оператор2", () => {
        const values = { name: "for while" }
        const message = messageGenerator(template1, values)
        expect(message).toBe("Привет for while")
    })
    test("Текст не интерпретируется, как оператор3", () => {
        const values = { name: "console.log(1)" }
        const message = messageGenerator(template1, values)
        expect(message).toBe("Привет console.log(1)")
    })
    test("Текст не интерпретируется, как оператор4", () => {
        const values = { name: "<script>console.log(1)</script>" }
        const message = messageGenerator(template1, values)
        expect(message).toBe("Привет <script>console.log(1)</script>")
    })
    test("Шаблон с блоком ifthenelse и переменных нет (else)", () => {
        const values = {}
        const message = messageGenerator(template2, values)
        expect(message).toBe("Привет {name} мой {friend}. Как дела {friend}?")
    })
    test("Шаблон с блоком ifthenelse и есть 1 переменная (else)", () => {
        const values = { name: "Иван" }
        const message = messageGenerator(template2, values)
        expect(message).toBe("Привет Иван мой {friend}. Как дела {friend}?")
    })
    test("Шаблон с блоком ifthenelse и есть 1 переменная но пустая (else)", () => {
        const values = { name: "" }
        const message = messageGenerator(template2, values)
        expect(message).toBe("Привет  мой {friend}. Как дела {friend}?")
    })
    test("Шаблон с блоком ifthenelse и есть 2-а переменная (else)", () => {
        const values = { name: "Иван", friend: "друг" }
        const message = messageGenerator(template2, values)
        expect(message).toBe("Привет Иван мой друг. Как дела друг?")
    })
    test("Шаблон с блоком ifthenelse и есть 2-а переменная но пустая (then)", () => {
        const values = { name: "Иван", friend: "" }
        const message = messageGenerator(template2, values)
        expect(message).toBe("Привет Иван. Как дела ?")
    })
    test("Шаблон с блоком ifthenelse, первое значение ссылается на вторую переменную, а та пустая", () => {
        const values = { name: "{friend}", friend: "" }
        const message = messageGenerator(template2, values)
        expect(message).toBe("Привет . Как дела ?")
    })
    test("Шаблон с блоком ifthenelse, первое значение ссылается на вторую переменную, а та не пустая", () => {
        const values = { name: "{friend}", friend: "Иван" }
        const message = messageGenerator(template2, values)
        expect(message).toBe("Привет Иван мой Иван. Как дела Иван?")
    })
})

describe("Проверка функции getMessage", () => {
    test("Замена переменной на значение", () => {
        const str = "Привет {name}"
        const values = { name: "Иван" }
        const message = getMessage(str, values)
        expect(message).toBe("Привет Иван")
    })
    test("Замена переменной на значение, текс в {} не являющийся переменной остается", () => {
        const str = "Привет {name} {друг}"
        const values = { name: "Иван" }
        const message = getMessage(str, values)
        expect(message).toBe("Привет Иван {друг}")
    })
    test("Замена переменных на значения", () => {
        const str = "Привет {name} мой {friend}"
        const values = { name: "Иван", friend: "друг" }
        const message = getMessage(str, values)
        expect(message).toBe("Привет Иван мой друг")
    })
    test("Пустая строка, есть переменные", () => {
        const str = ""
        const values = { name: "Иван", friend: "друг" }
        const message = getMessage(str, values)
        expect(message).toBe("")
    })
    test("Переменных нет, не пустая строка", () => {
        const str = "Привет {name} мой {friend}"
        const values = {}
        const message = getMessage(str, values)
        expect(message).toBe("Привет {name} мой {friend}")
    })
    test("Замена переменных стоящие в доп скобках пользователя", () => {
        const str = "Привет {*{name}*}"
        const values = { name: "Иван" }
        const message = getMessage(str, values)
        expect(message).toBe("Привет {*Иван*}")
    })
})
