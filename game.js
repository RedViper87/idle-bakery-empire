// game.js

let revenue = 0;
let bakedGoods = 0;
let ovenLevel = 0;
let employeeCount = 0;

// Upgrade costs
let ovenCost = 10;
let employeeCost = 50;

// Revenue per bake based on upgrades
const bakeValue = () => 1 + ovenLevel;

// Revenue per second from employees
const revenuePerSecond = () => employeeCount * 5;

// DOM Elements
const revenueElement = document.getElementById('revenue');
const bakedGoodsElement = document.getElementById('bakedGoods');
const bakeButton = document.getElementById('bakeButton');
const upgradeOvenButton = document.getElementById('upgradeOven');
const hireEmployeeButton = document.getElementById('hireEmployee');

// Update UI
function updateUI() {
    revenueElement.textContent = formatMoney(revenue);
    bakedGoodsElement.textContent = bakedGoods;
    upgradeOvenButton.textContent = `Buy ($${ovenCost})`;
    hireEmployeeButton.textContent = `Hire ($${employeeCost})`;
}

// Format Money
function formatMoney(amount) {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Bake action
bakeButton.addEventListener('click', () => {
    bakedGoods += 1;
    revenue += bakeValue();
    updateUI();
});

// Upgrade Oven
upgradeOvenButton.addEventListener('click', () => {
    if (revenue >= ovenCost) {
        revenue -= ovenCost;
        ovenLevel += 1;
        ovenCost *= 1.5;
        ovenCost = formatMoney(ovenCost);
        updateUI();
    } else {
        alert('Not enough revenue to buy a better oven!');
    }
});

// Hire Employee
hireEmployeeButton.addEventListener('click', () => {
    if (revenue >= employeeCost) {
        revenue -= employeeCost;
        employeeCount += 1;
        employeeCost *= 1.5;
        employeeCost = formatMoney(employeeCost);
        updateUI();
    } else {
        alert('Not enough revenue to hire an employee!');
    }
});

// Automate revenue generation
setInterval(() => {
    revenue += revenuePerSecond();
    updateUI();
}, 1000);

// Initial UI update
updateUI();
