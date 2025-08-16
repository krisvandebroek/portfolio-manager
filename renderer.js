async function loadFunds() {
    const funds = await window.api.getFunds();
    const fundsList = document.getElementById('funds-list');
    fundsList.innerHTML = ''; // Clear existing rows

    funds.forEach(fund => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fund.name}</td>
            <td>${fund.identifier}</td>
            <td>${fund.target_gain_percentage}</td>
            <td><button class="add-purchase-btn" data-fund-id="${fund.id}">Add Purchase</button></td>
        `;
        fundsList.appendChild(row);
    });
}

document.getElementById('add-fund-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const fundName = document.getElementById('fund-name').value;
    const fundIdentifier = document.getElementById('fund-identifier').value;
    const targetGain = document.getElementById('target-gain').value;

    const fundData = {
        name: fundName,
        identifier: fundIdentifier,
        targetGain: parseFloat(targetGain)
    };

    window.api.addFund(fundData);

    // Clear the form and reload the funds
    document.getElementById('add-fund-form').reset();
    loadFunds();
});

// Load funds when the page loads
loadFunds();

const addPurchaseModal = document.getElementById('add-purchase-modal');
const addPurchaseForm = document.getElementById('add-purchase-form');
const cancelPurchaseBtn = document.getElementById('cancel-purchase');
const fundsList = document.getElementById('funds-list');
let currentFundId = null;

fundsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-purchase-btn')) {
        currentFundId = event.target.getAttribute('data-fund-id');
        addPurchaseModal.style.display = 'block';
    }
});

cancelPurchaseBtn.addEventListener('click', () => {
    addPurchaseModal.style.display = 'none';
    addPurchaseForm.reset();
});

addPurchaseForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const transactionData = {
        fund_id: parseInt(currentFundId),
        transaction_type: 'buy',
        transaction_date: document.getElementById('purchase-date').value,
        units: parseFloat(document.getElementById('purchase-units').value),
        price_per_unit: parseFloat(document.getElementById('purchase-price').value)
    };

    window.api.addTransaction(transactionData);

    addPurchaseModal.style.display = 'none';
    addPurchaseForm.reset();
});
