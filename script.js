let totalBalance = 0;
let totalExpense = 0;

function updateUI() {
    document.getElementById('totalBalance').textContent = `₹ ${totalBalance}`;
    document.getElementById('totalExpense').textContent = `₹ ${totalExpense}`;
}

function addIncome() {
    let incomeType = document.getElementById('incomeType').value;
    let incomeAmount = parseFloat(document.getElementById('incomeAmount').value);

    if (incomeType && !isNaN(incomeAmount) && incomeAmount > 0) {
        totalBalance += incomeAmount;
        updateUI();
        addRow('incomeTable', 'incomeDetails', incomeType, incomeAmount);
        document.getElementById('incomeType').value = '';
        document.getElementById('incomeAmount').value = '';
    } else {
        alert("Please enter a valid income type and amount.");
    }
}

function addExpense() {
    let expenseType = document.getElementById('expenseType').value;
    let expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

    if (expenseType && !isNaN(expenseAmount) && expenseAmount > 0) {
        totalExpense += expenseAmount;
        totalBalance -= expenseAmount;
        updateUI();
        addRow('expenseTable', 'expenseDetails', expenseType, expenseAmount);
        document.getElementById('expenseType').value = '';
        document.getElementById('expenseAmount').value = '';
    } else {
        alert("Please enter a valid expense type and amount.");
    }
}

function addRow(tableId, bodyId, type, amount) {
    let tableBody = document.getElementById(bodyId);
    let row = tableBody.insertRow();
    let typeCell = row.insertCell(0);
    let amountCell = row.insertCell(1);
    let balanceCell = row.insertCell(2);
    let dateCell = row.insertCell(3);

    typeCell.textContent = type;
    amountCell.textContent = `₹ ${amount}`;
    balanceCell.textContent = `₹ ${totalBalance}`;
    dateCell.textContent = new Date().toLocaleString();
}

function clearData() {
    if (confirm("Are you sure you want to clear all data?")) {
        totalBalance = 0;
        totalExpense = 0;
        updateUI();
        document.getElementById('incomeDetails').innerHTML = '';
        document.getElementById('expenseDetails').innerHTML = '';
    }
}

function displayChart() {
    const ctx = document.getElementById('budgetChart').getContext('2d');

    const data = {
        labels: ['Expense', 'Remaining Balance'],
        datasets: [{
            label: 'My First Dataset',
            data: [totalExpense, totalBalance],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverOffset: 4
        }]
    };

    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true
        }
    });
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {

        localStorage.setItem('loggedInUser', username);
        alert('Login successful!');
        window.location.href = 'budget.html'; 
    } else {
        alert('Invalid username or password.');
    }
}

function register() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && email && password) {
      
        localStorage.setItem('user', JSON.stringify({ username, email, password }));
        alert('Registration successful!');
        window.location.href = 'index.html';
    } else {
        alert('Please fill all fields.');
    }
}

function logout() {
    window.location.href = 'index.html';
}