export abstract class DioAccount {
    private static _newAccount: number = 0;
    private readonly _name: string;
    private readonly _accountNumber: number;
    protected _balance: number = 0;
    private _status: boolean = true;

    constructor(name: string) {
        this._name = name;
        this._accountNumber = DioAccount._newAccount;
        DioAccount._newAccount += 1;
        console.log('DioAccount created!');
    }
    
    public get name() : string {
        return this._name
    }

    public get accountNumber() : number {
        return this._accountNumber
    }

    public get balance() : number {
        return this._balance
    }

    public get status() : boolean {
        return this._status
    }
    // 01: Deposit & Withdraw
    deposit(value: number): void {
        this._balance += value
        console.log(`Depositado ${value}. Novo saldo: ${this._balance}.`)
    }

    withdraw(value: number): void {
        if (this._status) {
            if (this._balance >= value) {
                this._balance -= value
                console.log(`Sacado ${value}. Novo saldo: ${this._balance}.`)                
            } else {
                console.log("Saque acima do valor de saldo.")
            }
        } else {
            console.log("Conta Invalidada!")
        }
    }
    
}