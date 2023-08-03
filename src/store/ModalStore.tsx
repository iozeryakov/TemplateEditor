import { makeAutoObservable } from "mobx";
/**
 * Класс модальных окон если в списке есть id модального окна, то оно открыто, если нет то оно закрыто.
 */
export default class ModalStore {
    private _modals: string[]
    constructor() {
        this._modals = []
        makeAutoObservable(this);
    }
    open(id: string) {

        if (this._modals.filter(i => i === id).length === 0)
            this._modals.push(id)
    }
    close(id: string) {

        this._modals = this._modals.filter(i => i !== id)
    }
    getIsOpen(id: string) {
        if (this._modals.filter(i => i === id).length !== 0) {
            return true
        } else {
            return false
        }

    }
}