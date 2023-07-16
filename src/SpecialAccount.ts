import { DioAccount } from "./DioAccount"

export class SpecialAccount extends DioAccount {

    constructor(name: string) {
        super(name)
    }

    deposit(value: number): void {
        this._balance += value + 10
        console.log(`Oh querido, depositado ${value}+10 . Novo saldo: ${this._balance}.`)
    }

}
