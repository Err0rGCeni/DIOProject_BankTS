import { DioAccount } from "./DioAccount"

export class CompanyAccount extends DioAccount {

  constructor(name: string) {
    super(name)
  }

  getLoan = (value: number): void => {
    if (this.status) {
      this._balance += value
      console.log(`Voce pegou um empréstimo de ${value}. Novo saldo: ${this._balance}`)
    } else {
      console.log('Conta Inválida! Emprestimo negado')
    }
  }
  
}
