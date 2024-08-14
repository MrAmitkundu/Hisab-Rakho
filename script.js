

// SAVED DETAILS IN THE STORAGE    SAVED DETAILS IN THE STORAGE    SAVED DETAILS IN THE STORAGE    SAVED DETAILS IN THE STORAGE    SAVED DETAILS IN THE STORAGE    SAVED DETAILS IN THE STORAGE    SAVED DETAILS IN THE STORAGE    

//  ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     

// document.addEventListener('DOMContentLoaded', function() {
// document.querySelector('.view-check-button').addEventListener('click', function() {
//     // Show an alert before executing the function
//     alert('Retrieving data for the selected month...');

//     // Get the value from the month input
//     const monthInput = document.getElementById('date-input-view').value;

//     // Check if the month input is filled
//     if (!monthInput) {
//         alert('Please fill the area.');
//         return; // Exit the function if input is empty
//     }

//     // Extract month and year from the input
//     const [year, month] = monthInput.split('-'); // Split the input into year and month
//     const formattedKey = `${month}${year}`; // Format as MMYYYY

//     // Retrieve data from local storage
//     const storedData = JSON.parse(localStorage.getItem(formattedKey));

//     // Clear the table body before populating new data
//     const tableBody = document.getElementById('table-body');
//     tableBody.innerHTML = ''; // Clear previous entries

//     // Check if there is any data for the specified key
//     if (storedData && storedData.length > 0) {
//         // Loop through the stored data and create table rows
//         storedData.forEach(item => {
//             const row = document.createElement('tr'); // Create a new row
//             row.innerHTML = `
//                 <td>${item.date}</td>
//                 <td>${item.item}</td>
//                 <td>${item.amount}</td>
//                 <td>${item.details}</td>
//             `; // Populate the row with data
//             tableBody.appendChild(row); // Append the row to the table body
//         });
//     } else {
//         // If no data found, display a message
//         const row = document.createElement('tr');
//         row.innerHTML = `<td colspan="4">No records found for this month.</td>`;
//         tableBody.appendChild(row);
//     }
// });
// });


//  ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     ADD DETAILS IN THE LIST     
// function testing() {
//     // const buttonsssss = document.querySelectorAll('.view-check-button');
//     console.log("HIII");

// }
// window.onload = testing;

function scriptForAddPage() {
    // CURRENT DATE AUTO MATICALLY SET IN THE CALLENDER    CURRENT DATE AUTO MATICALLY SET IN THE CALLENDER    CURRENT DATE AUTO MATICALLY SET IN THE CALLENDER    CURRENT DATE AUTO MATICALLY SET IN THE CALLENDER    CURRENT DATE AUTO MATICALLY SET IN THE CALLENDER    
    function setCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const currentDate = `${year}-${month}-${day}`;

        document.getElementById('Test_Date').value = currentDate;
    }
    window.onload = setCurrentDate;



    // CURRENT DATE AUTO MATICALLY SET IN THE CALLENDER    CURRENT DATE AUTO MATICALLY SET IN THE CALLENDER    CURRENT DATE AUTO MATICALLY SET IN THE CALLENDER    CURRENT DATE AUTO MATICALLY SET IN THE CALLENDER    CURRENT DATE AUTO MATICALLY SET IN THE CALLENDER    

    // REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  

    document.querySelector('.add-section-button').addEventListener('click', function (event) {
        event.preventDefault();

        const requiredFields = document.querySelectorAll('#myForm input[required], #myForm select[required]');
        let allFilled = true;

        requiredFields.forEach(function (field) {
            if (!field.value) {
                allFilled = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '';
            }
        });

        if (!allFilled) {
            alert('Please fill in all required fields.');
        } else {
            saveInputDetails(); // Call the function to save input details
            alert('Details saved successfully!');
        }
    });

    // REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  REQUIRED ITEMS  


    // SAVED DETAILS IN THE STORAGE    SAVED DETAILS IN THE STORAGE    SAVED DETAILS IN THE STORAGE    SAVED DETAILS IN THE STORAGE    SAVED DETAILS IN THE STORAGE    SAVED DETAILS IN THE STORAGE    SAVED DETAILS IN THE STORAGE    

    function saveInputDetails() {
        // Get values from the form
        const date = document.getElementById('Test_Date').value;
        const item = document.getElementById('cars').value;
        const amount = parseInt(document.getElementById('Amount').value) || 0; // Parse amount as integer
        const details = document.getElementById('add').value;

        // Format the date to create a key (MMYYYY)
        const [year, month] = date.split('-');
        const key = `${month}${year}`; // Create the key in MMYYYY format

        // Calculate the previous month and year
        let previousMonth = parseInt(month) - 1;
        let previousYear = parseInt(year);

        // If the previous month is less than 1, adjust the month and year
        if (previousMonth < 1) {
            previousMonth = 12; // December
            previousYear -= 1; // Decrease the year
        }

        // Format previous month to MM and year to YYYY
        const previousKey = `${String(previousMonth).padStart(2, '0')}${previousYear}`; // Create the previous key in MMYYYY format

        // Retrieve the old balance from local storage using previousKey
        const remainingBalanceKey = 'remainingBalance';
        let existingBalances = JSON.parse(localStorage.getItem(remainingBalanceKey)) || [];
        let oldBalance = 0; // Initialize oldBalance

        // Find the old balance for the previousKey
        for (let i = 0; i < existingBalances.length; i++) {
            if (existingBalances[i].key === previousKey) {
                oldBalance = existingBalances[i].remainingBalance;
                break;
            }
        }

        // Retrieve existing data for this key from local storage
        let existingData = JSON.parse(localStorage.getItem(key)) || [];

        // Initialize totalExpenses and totalIncome
        let totalExpenses = 0;
        let totalIncome = 0;

        // Calculate totals from existing data
        existingData.forEach(transaction => {
            if (transaction.type === "Income") {
                totalIncome += parseInt(transaction.amount);
            } else {
                totalExpenses += parseInt(transaction.amount);
            }
        });

        // Create an object to hold the new transaction data
        const inputDetails = {
            date: date,
            item: item,
            amount: amount,
            details: details,
            type: item === "Taka-Tullam" ? "Income" : "Expense" // Determine type based on selected item
        };

        // Add the new input details to the existing data
        existingData.push(inputDetails);

        // Save the updated array back to local storage using the formatted key
        localStorage.setItem(key, JSON.stringify(existingData));

        // Update totalIncome and totalExpenses based on the new transaction
        if (inputDetails.type === "Income") {
            totalIncome += amount;
        } else {
            totalExpenses += amount;
        }

        // Calculate the remaining balance
        const remainingBalance = totalIncome + oldBalance - totalExpenses;

        // Update remaining balance in local storage
        updateRemainingBalance(remainingBalance, key);

        // Update incoming balances in local storage
        updateIncomingBalance(item, amount, key);

        // Update expense balances in local storage
        updateExpenseBalance(item, amount, key);

        // Handle Old Balance storage
        handleOldBalance(key, previousKey, oldBalance);

        // Clear the form fields after saving
        document.getElementById('myForm').reset(); // Ensure 'myForm' is the ID of your form element
    }

    // Function to handle old balance in local storage
    function handleOldBalance(currentKey, previousKey, oldBalance) {
        const oldBalanceKey = 'oldBalance';
        let existingOldBalances = JSON.parse(localStorage.getItem(oldBalanceKey)) || [];

        // Check if the current key already exists in the old balance data
        let balanceFound = false;
        for (let i = 0; i < existingOldBalances.length; i++) {
            if (existingOldBalances[i].currentKey === currentKey) {
                // Update the existing entry
                existingOldBalances[i].previousKey = previousKey;
                existingOldBalances[i].amount = oldBalance; // Update oldBalance
                balanceFound = true;
                break;
            }
        }

        // If the current key was not found, create a new entry
        if (!balanceFound) {
            existingOldBalances.push({ currentKey: currentKey, previousKey: previousKey, amount: oldBalance });
        }

        // Save the updated old balance data back to local storage
        localStorage.setItem(oldBalanceKey, JSON.stringify(existingOldBalances));
    }

    // Function to update remaining balance in local storage
    function updateRemainingBalance(remainingBalance, key) {
        const remainingBalanceKey = 'remainingBalance';
        let existingBalances = JSON.parse(localStorage.getItem(remainingBalanceKey)) || [];

        // Check if the key already exists in the existing balances
        let balanceFound = false;
        for (let i = 0; i < existingBalances.length; i++) {
            if (existingBalances[i].key === key) {
                // Update the existing balance
                existingBalances[i].remainingBalance = remainingBalance;
                balanceFound = true;
                break;
            }
        }

        // If the key was not found, create a new balance entry
        if (!balanceFound) {
            existingBalances.push({ key: key, remainingBalance: remainingBalance });
        }

        // Save the updated array back to local storage
        localStorage.setItem(remainingBalanceKey, JSON.stringify(existingBalances));
    }

    // Function to update incoming balance in local storage
    function updateIncomingBalance(item, amount, key) {
        const incomingBalanceKey = 'incomingBalance';
        let existingIncomingBalances = JSON.parse(localStorage.getItem(incomingBalanceKey)) || [];

        // Only update if the item is income
        if (item === "Taka-Tullam") {
            let incomingBalanceFound = false;
            for (let i = 0; i < existingIncomingBalances.length; i++) {
                if (existingIncomingBalances[i].key === key) {
                    // Update the existing incoming balance
                    existingIncomingBalances[i].amount += amount; // Accumulate income
                    incomingBalanceFound = true;
                    break;
                }
            }

            // If the key was not found, create a new incoming balance entry
            if (!incomingBalanceFound) {
                existingIncomingBalances.push({ key: key, amount: amount });
            }

            // Save the updated array back to local storage
            localStorage.setItem(incomingBalanceKey, JSON.stringify(existingIncomingBalances));
        }
    }

    // Function to update expense balance in local storage
    function updateExpenseBalance(item, amount, key) {
        const expenseBalanceKey = 'expenseBalance';
        let existingExpenseBalances = JSON.parse(localStorage.getItem(expenseBalanceKey)) || [];

        // Only update if the item is an expense
        if (item !== "Taka-Tullam") {
            let expenseBalanceFound = false;
            for (let i = 0; i < existingExpenseBalances.length; i++) {
                if (existingExpenseBalances[i].key === key) {
                    // Update the existing expense balance
                    existingExpenseBalances[i].amount += amount; // Accumulate expenses
                    expenseBalanceFound = true;
                    break;
                }
            }

            // If the key was not found, create a new expense balance entry
            if (!expenseBalanceFound) {
                existingExpenseBalances.push({ key: key, amount: amount });
            }

            // Save the updated array back to local storage
            localStorage.setItem(expenseBalanceKey, JSON.stringify(existingExpenseBalances));
        }
    }
}

function scriptForViewPage() {
    document.querySelector('.view-check-button').addEventListener('click', function () {
        // Show an alert before executing the function
        // alert('Retrieving data for the selected month...');

        // Get the value from the month input
        const monthInput = document.getElementById('date-input-view').value;

        // Check if the month input is filled
        if (!monthInput) {
            alert('Please fill the area.');
            return; // Exit the function if input is empty
        }

        // Extract month and year from the input
        const [year, month] = monthInput.split('-'); // Split the input into year and month
        const formattedKey = `${month}${year}`; // Format as MMYYYY

        // Retrieve data from local storage
        const storedData = JSON.parse(localStorage.getItem(formattedKey));

        // Clear the table body before populating new data
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = ''; // Clear previous entries

        // Initialize total amount variable
        let totalExpenses = 0;
        let totalIncome = 0;
        let oldBalance = 0; // Initialize oldBalance

        // Retrieve oldBalance data from local storage
        const oldBalanceData = JSON.parse(localStorage.getItem('oldBalance'));

        // Check if oldBalanceData exists and matches the formattedKey
        if (oldBalanceData && Array.isArray(oldBalanceData)) {
            const matchingData = oldBalanceData.find(item => item.currentKey === formattedKey);
            if (matchingData) {
                oldBalance = parseInt(matchingData.amount); // Assign value to oldBalance if matched
            }
        }

        // Check if there is any data for the specified key
        if (storedData && storedData.length > 0) {
            // Loop through the stored data and create table rows
            storedData.forEach(item => {
                if (item.type === "Expense") {
                    totalExpenses += parseInt(item.amount);
                } else {
                    totalIncome += parseInt(item.amount);
                }
                // Create a new row
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.date}</td>
                    <td>${item.item}</td>
                    <td>${item.amount}</td>
                    <td>${item.details}</td>
                `; // Populate the row with data
                tableBody.appendChild(row); // Append the row to the table body
            });

            const oldBalanceRow = document.createElement('tr');
            oldBalanceRow.innerHTML = `
                <td colspan="2">Old Balance:</td>
                <td colspan="2">${oldBalance}</td>
            `;
            tableBody.appendChild(oldBalanceRow);

            const totalIncomeRow = document.createElement('tr');
            totalIncomeRow.innerHTML = `
                <td colspan="2">Total Income:</td>
                <td colspan="2">${totalIncome}</td>
            `;
            tableBody.appendChild(totalIncomeRow);

            // Create a new row for the total amount
            const totalExpenseRow = document.createElement('tr');
            totalExpenseRow.innerHTML = `
                <td colspan="2">Total Expenses:</td>
                <td colspan="2">${totalExpenses}</td>
            `;
            tableBody.appendChild(totalExpenseRow);

            const remainingBalance = totalIncome + oldBalance - totalExpenses;

            const balanceRow = document.createElement('tr');
            balanceRow.innerHTML = `
                <td colspan="2">Remaining Balance:</td>
                <td colspan="2">${remainingBalance}</td>
            `;
            tableBody.appendChild(balanceRow);
        } else {
            // If no data found, display a message
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="4">No records found for this month.</td>`;
            tableBody.appendChild(row);
        }
    });
}

























// Call the correct function based on the current page
if (window.location.pathname.endsWith('add.html')) {
    scriptForAddPage();
} else if (window.location.pathname.endsWith('view.html')) {
    scriptForViewPage();
}