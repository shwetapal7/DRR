document.addEventListener('DOMContentLoaded', function() {
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const monthYearDisplay = document.getElementById('month-year');
    const excludedDatesInput = document.getElementById('excluded-dates');
    const lastUpdatedDisplay = document.getElementById('last-updated');
    const numberOfDaysDisplay = document.getElementById('number-of-days');
    const expectedDRRDisplay = document.getElementById('expected-drr');
    const cancelButton = document.getElementById('cancel-button');
    const saveButton = document.getElementById('save-button');
   
    const addNewButton = document.getElementById('addNewButton');
    const table = document.querySelector('.table');

    startDateInput.addEventListener('change', updateMonthYear);
    endDateInput.addEventListener('change', updateMonthYear);
    excludedDatesInput.addEventListener('change', updateNumberOfDays);
    saveButton.addEventListener('click', saveData);
    cancelButton.addEventListener('click',cancelUpdate);
    addNewButton.addEventListener('click', addNewRow);

    function updateMonthYear(row) {
        const startDate = new Date(row.querySelector('.start-date').value);
        const endDate = new Date(row.querySelector('.end-date').value);
        const monthYearString = `${startDate.toLocaleString('default', { month: 'long' })}, ${startDate.getFullYear()}`;
        row.querySelector('.month-year').textContent = monthYearString;
        updateNumberOfDays(row);
    }

    function updateNumberOfDays(row) {
        const startDate = new Date(row.querySelector('.start-date').value);
        const endDate = new Date(row.querySelector('.end-date').value);
        const excludedDates = row.querySelector('.excluded-dates').value.split(',').map(date => new Date(date.trim()));
        const filteredDates = excludedDates.filter(date => date >= startDate && date <= endDate);
        const numberOfDays = (endDate - startDate) / (1000 * 60 * 60 * 24) - filteredDates.length;
        row.querySelector('.number-of-days').textContent = numberOfDays;
        updateExpectedDRR(row);
    }

    function updateExpectedDRR(row) {
        const leadCount = parseInt(row.querySelector('.lead-count').value);
        const numberOfDays = parseInt(row.querySelector('.number-of-days').textContent);
        const expectedDRR = (numberOfDays === 0) ? 'N/A' : (leadCount / numberOfDays).toFixed(2);
        row.querySelector('.expected-drr').textContent = expectedDRR;
    }

    function saveData(event) {
        const row = event.target.closest('.row');
        const lastUpdatedElement = row.querySelector('.last-updated');
        const lastUpdated = new Date().toLocaleString();
        lastUpdatedElement.textContent = lastUpdated;
        alert('Data saved successfully!');
    }
    
    function cancelUpdate(event) {
        const row = event.target.closest('.row');
        const lastUpdatedElement = row.querySelector('.last-updated');
    
        const originalData = {
            startDate: row.querySelector('.start-date').value,
            endDate: row.querySelector('.end-date').value,
            excludedDates: row.querySelector('.excluded-dates').value,
            leadCount: row.querySelector('.lead-count').value
        };
    
        row.querySelector('.start-date').value = originalData.startDate;
        row.querySelector('.end-date').value = originalData.endDate;
        row.querySelector('.excluded-dates').value = originalData.excludedDates;
        row.querySelector('.lead-count').value = originalData.leadCount;
    
        updateMonthYear(row);
        updateNumberOfDays(row);
        updateExpectedDRR(row);
        lastUpdatedElement.textContent = '';
        alert('Update cancelled!');
    }
    
    

    function addNewRow() {
        const newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.innerHTML = `
            <div class="cell"><input type="text" style="width:55px;"></div>
            <div class="cell"><input type="text" style="width:55px;"></div>
            <div class="cell"><input type="date" class="start-date"></div>
            <div class="cell"><input type="date" class="end-date"></div>
            <div class="cell"><input type="number" class="lead-count"></div>
            <div class="cell month-year"></div>
            <div class="cell"><input type="text" class="excluded-dates"></div>
            <div class="cell last-updated"></div>
            <div class="cell number-of-days"></div>
            <div class="cell expected-drr"></div>
            <div class="cell"><button class="save-button">Save</button></div>
            <div class="cell"><button class="cancel-button">Cancel</button></div>
        `;
        table.appendChild(newRow);
        newRow.querySelector('.start-date').addEventListener('change', () => updateMonthYear(newRow));
        newRow.querySelector('.end-date').addEventListener('change', () => updateMonthYear(newRow));
        newRow.querySelector('.excluded-dates').addEventListener('change', () => updateNumberOfDays(newRow));
        newRow.querySelector('.save-button').addEventListener('click', saveData);
        newRow.querySelector('.cancel-button').addEventListener('click', cancelUpdate);
    }
   
    
});
