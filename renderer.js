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

    // Clear the form
    document.getElementById('add-fund-form').reset();
});
