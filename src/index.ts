import { DioAccount } from './DioAccount';
import { PeopleAccount } from './PeopleAccount';
import { CompanyAccount } from './CompanyAccount';
import { SpecialAccount } from './SpecialAccount';

const USERS: Array<PeopleAccount | CompanyAccount | SpecialAccount> = [];

document.addEventListener('DOMContentLoaded', function () {
    const createBtn = document.querySelector('#btn-user-creation')
    createBtn?.addEventListener('click', createUser)

    const selectUser = document.querySelector('#select-user');
    selectUser?.addEventListener('change', handleUserSelection);
});

function getUserClassName(user: DioAccount): string {
    if (user instanceof PeopleAccount) {
        return 'PeopleAccount';
    } else if (user instanceof CompanyAccount) {
        return 'CompanyAccount';
    } else if (user instanceof SpecialAccount) {
        return 'SpecialAccount';
    }

    return 'DioAccount';
}

function createUser(): void {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const typeInput = document.getElementById('account-type') as HTMLSelectElement;

    let newUser: DioAccount | null = null;

    switch (typeInput.value) {
        case 'pessoa':
            newUser = new PeopleAccount(nameInput.value || 'Teste');
            break;
        case 'empresa':
            newUser = new CompanyAccount(nameInput.value || 'Teste');
            break;
        case 'especial':
            newUser = new SpecialAccount(nameInput.value || 'Teste');
            break;
        default:
            console.error('Tipo de conta inválido');
            break;
    }

    if (newUser) {
        USERS.push(newUser);
        updateUserList();
    }
}

function updateUserList(): void {
    const userList = document.querySelector('#user-list ul');
    const userSelection = document.querySelector('#select-user');

    if (userList && userSelection) {
        userList.innerHTML = '';
        userSelection.innerHTML = '<option value="-1">Selecionar</option>';

        if (USERS.length) {
            USERS.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = `${user.accountNumber}: ${user.name} (${getUserClassName(user)})`;
                listItem.className = getUserClassName(user);
                userList.appendChild(listItem);

                const optionItem = document.createElement('option')
                optionItem.textContent = `${user.accountNumber}: ${user.name}`
                optionItem.value = String(user.accountNumber)
                userSelection?.appendChild(optionItem)
            });
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = 'Lista vazia!';
            userList.appendChild(listItem);

            const optionItem = document.createElement('option')
            optionItem.value = ""
            optionItem.innerText = "Sem usuários"
            userSelection?.appendChild(optionItem)
        }
    }
}

function handleUserSelection(): void {
    const selectUser = document.querySelector('#select-user') as HTMLSelectElement;
    const userInfos = document.querySelector('#user-infos') as HTMLElement;
    const userActions = document.querySelector('#user-actions') as HTMLElement;

    let selectedValue: number = Number(selectUser.value)

    if (selectUser && selectedValue >= 0) {
        const targetUser = USERS.find(e => e.accountNumber === selectedValue)
        if (userInfos && targetUser) {
            userInfos.innerHTML = `
            <span class="info">
            <h3>Número da Conta: </h3>
            <p>${targetUser?.accountNumber}</p>
        </span>
        <span class="info">
            <h3>Nome: </h3>
            <p>${targetUser?.name}</p>
        </span>
        <span class="info">
            <h3>Saldo: </h3>
            <p>${targetUser?.balance}</p>
        </span>
        <span class="info">
            <h3>Status: </h3>
            <p>${targetUser?.status}</p>
        </span>
            `;
            userInfos.style.visibility = 'visible';
            handleActionButtons(targetUser)
            userActions.style.visibility = 'visible';
        }
    } else {
        userInfos.style.visibility = 'hidden'
        userActions.style.visibility = 'hidden';
    }
}

function handleActionButtons(user: DioAccount): void {
    const btnDeposit = document.querySelector('#btn-deposit') as HTMLButtonElement;
    btnDeposit.innerText = user instanceof SpecialAccount ? 'Depositar +10' : 'Depositar';
    btnDeposit.disabled = false;
    btnDeposit.onclick = () => handleDeposit(user);
  
    const btnWithdraw = document.querySelector('#btn-withdraw') as HTMLButtonElement;
    btnWithdraw.disabled = false;
    btnWithdraw.onclick = () => handleWithdraw(user);
  
    const btnLoan = document.querySelector('#btn-loan') as HTMLButtonElement;
    if (user instanceof CompanyAccount) {
      btnLoan.disabled = false;
      btnLoan.onclick = () => handleLoan(user);
    } else {
      btnLoan.disabled = true;
    }
  }

//TODO: Button + Input
function handleDeposit(user: DioAccount): void {
    const deposit = document.querySelector("#input-deposit") as HTMLInputElement;
    user.deposit(Number(deposit.value))
    deposit.value = '0'
    handleUserSelection()
}

function handleWithdraw(user: DioAccount): void {
    const withdraw = document.querySelector("#input-withdraw") as HTMLInputElement;
    user.withdraw(Number(withdraw.value))
    withdraw.value = '0'
    handleUserSelection()
}

function handleLoan(user: CompanyAccount): void {
    const loan = document.querySelector("#input-loan") as HTMLInputElement;
    user.getLoan(Number(loan.value))
    loan.value = '0'
    handleUserSelection()
}