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
            <td>${fund.current_price}</td>
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

document.getElementById('refresh-prices-btn').addEventListener('click', () => {
    window.api.refreshPrices();
});
