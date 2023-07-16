# Construindo Uma App Simples de Banco Com Typescript

Refatorado com HTML5 via snowpack

## Desafios

[ ] Implementar os métodos de depósito (deposit) e saque (withdraw) na classe DioAccount

- Os valores dos saldos devem ser alterados, de acordo com o valor informado para depósito
- Apenas contas com o status true e saldo (balance) maior que o valor solicitado podem fazer saques

[ ] Implementar o método de empréstimo (getLoan) na classe CompanyAccount

- Os valores do saldos deve ser acrescidos, de acordo com o valor informado para empréstimo
- Apenas contas com o status true podem fazer empréstimo

[ ] Criar um novo tipo de conta a partir da DioAccount

- Esta conta não deve receber novos atributos
- Esta conta terá um método de depósito, que acresce 10 a mais ao valor informado para depósito. (Ex: Um depósito de 100, será de 110 no final)

[ ] Todos os atributos de qualquer conta devem ser privados

[ ] Os atributos name e accountNumber não podem ser alterados internamente ou externamente

[ ] Criar instancias para cada um dos tipos de conta no app.ts e executar os métodos possíveis.

## Snowpack Scripts

### npm start

Runs the app in the development mode.
Open <http://localhost:8080> to view it in the browser.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!
