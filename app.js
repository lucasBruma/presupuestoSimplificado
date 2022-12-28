const income = document.querySelector('#income');
const summary = [...document.querySelectorAll('.summary-item')];
const summaryIncome = summary[0].childNodes[3];
const summaryExpenses = summary[1].childNodes[3];
const summaryBalance = summary[2].childNodes[3];
const expenseName = document.querySelector('#expense-name');
const expenseAmount = document.querySelector('#expense-amount');
const expenseBtn = document.querySelector('#add-expense-button');
const expenseTable = document.querySelector('.expense-table');
let deleteExpenseBtn = [];
let acum = 0;

function setSummaryBalance(balance){

    expenses = parseInt(summaryExpenses.textContent.slice(1));
    summaryBalance.textContent = `$${balance - expenses}`;
    colorSummaryBalance(summaryBalance.textContent.slice(1));   
}

function updateSummaryIncome(income){
    summaryIncome.textContent = `$${income}`;
}

function incSummaryExpenses(expenses){
    expenses = parseInt(expenses);
    summaryExpenses.textContent = `$${acum+=expenses}`;
}

function decSummaryExpenses(id){
    const divExpense = [...document.querySelectorAll(`#${id}`)];
    const expense = parseInt(divExpense[1].textContent.slice(1));
    summaryExpenses.textContent = `$${acum-=expense}`;
}

function incSummaryBalance(balance, id){
    const divExpense = [...document.querySelectorAll(`#${id}`)];
    const expense = parseInt(divExpense[1].textContent.slice(1));
    balance = parseInt(balance);

    summaryBalance.textContent = `$${balance + expense}`;
    colorSummaryBalance(summaryBalance.textContent.slice(1));
}

function decSummaryBalance(balance,expense){
    balance = parseInt(balance);
    expense = parseInt(expense);

    summaryBalance.textContent = `$${balance - expense}`;
    colorSummaryBalance(summaryBalance.textContent.slice(1));
}

function colorSummaryBalance(balance){
    balance = parseInt(balance);
    if(balance > 0){
        summaryBalance.style.color = "green";
    }else if(balance < 0){
        summaryBalance.style.color = "red";
    }
}

function updateExpenseTable(expense,amount){
    expenseTable.innerHTML += `

        <div id="${expense}">${expense}</div>
        <div id="${expense}">$${amount}</div>
        <div class="delete" id="${expense}">
        <button name="delete-expense" class="delete-expense" id="${expense}">
            <img src="./images/trash.svg" alt="Tash" />
        </button>
        </div>

    `;
    deleteExpenseBtn = [...document.querySelectorAll('.delete-expense')];
}

function deleteRow(id){
    const nodos = [...document.querySelectorAll(`#${id}`)];
    nodos.map(nodo => nodo.remove())
}

function cleanInputs(){
    expenseName.value = "";
    expenseAmount.value = "";
}

income.addEventListener("blur", (e) =>{ 
    let value = parseInt(e.target.value);
    if(!Number.isNaN(value)){
        updateSummaryIncome(value); //elimino signo pesos
        setSummaryBalance(value); //elimino signo pesos
    }else alert('Ingresa un número en "Presupuesto"');
});

expenseBtn.addEventListener('click',()=>{
    if(!Number.isNaN(parseInt(expenseAmount.value)) && income.value != ''){
        updateExpenseTable(expenseName.value,expenseAmount.value);
        incSummaryExpenses(expenseAmount.value);
        decSummaryBalance(summaryBalance.textContent.slice(1),expenseAmount.value);
        cleanInputs();
    }else alert('Ingresa un número en "Gasto" o chequea si ya ingresaste el presupuesto');

});

expenseTable.addEventListener('click', (e) =>{
    if(e.target.nodeName == "IMG"){
        decSummaryExpenses(e.target.parentElement.id);
        incSummaryBalance(summaryBalance.textContent.slice(1),e.target.parentElement.id);
        deleteRow(e.target.parentElement.id);
    }
});