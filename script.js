// Sample transaction data
const sampleTransactions = [
    { id: 1, type: 'received', amount: 25.50, address: 'WZka1B2c3D4e5F6g7H8i9J0kL1m2N3o4P5q', date: '2025-10-15 14:30', status: 'completed', hash: 'a1b2c3d4e5f6...' },
    { id: 2, type: 'sent', amount: 12.75, address: 'WZkx1Y2z3A4b5C6d7E8f9G0hI1j2K3l4M5n', date: '2025-10-14 09:15', status: 'completed', hash: 'f6e5d4c3b2a1...' },
    { id: 3, type: 'received', amount: 45.25, address: 'WZko1P2q3R4s5T6u7V8w9X0yZ1a2B3c4D5e', date: '2025-10-12 16:45', status: 'completed', hash: '1a2b3c4d5e6f...' },
    { id: 4, type: 'mined', amount: 5.00, address: 'Mining Reward', date: '2025-10-10 11:20', status: 'completed', hash: 'abc123def456...' },
    { id: 5, type: 'sent', amount: 8.25, address: 'WZkf1G2h3I4j5K6l7M8n9O0pQ1r2S3t4U5v', date: '2025-10-08 13:05', status: 'completed', hash: '789xyz123abc...' },
    { id: 6, type: 'received', amount: 15.75, address: 'WZkm1N2o3P4q5R6s7T8u9V0wX1y2Z3a4B5c', date: '2025-10-05 10:30', status: 'completed', hash: 'def456abc789...' }
];

// Sample ledger data
const ledgerData = [
    { blockId: 1, timestamp: '2025-10-01 09:00:00', from: 'System', to: 'WZk1A2b3...', amount: 100.00, hash: '0a1b2c3d4e5f6g7h8i9j0' },
    { blockId: 2, timestamp: '2025-10-05 14:30:22', from: 'WZk1A2b3...', to: 'WZka1B2c3...', amount: 25.50, hash: '1b2c3d4e5f6g7h8i9j0k' },
    { blockId: 3, timestamp: '2025-10-08 11:15:47', from: 'WZkx1Y2z3...', to: 'WZk1A2b3...', amount: 45.25, hash: '2c3d4e5f6g7h8i9j0k1l' },
    { blockId: 4, timestamp: '2025-10-10 16:20:33', from: 'System', to: 'WZk1A2b3...', amount: 5.00, hash: '3d4e5f6g7h8i9j0k1l2m' },
    { blockId: 5, timestamp: '2025-10-12 08:45:19', from: 'WZk1A2b3...', to: 'WZkf1G2h3...', amount: 8.25, hash: '4e5f6g7h8i9j0k1l2m3n' },
    { blockId: 6, timestamp: '2025-10-15 13:20:05', from: 'WZkm1N2o3...', to: 'WZk1A2b3...', amount: 15.75, hash: '5f6g7h8i9j0k1l2m3n4o' }
];

// DOM Elements
const balanceElement = document.getElementById('balance');
const transactionList = document.getElementById('transaction-list');
const ledgerBody = document.getElementById('ledger-body');
const sendBtn = document.getElementById('send-btn');
const receiveBtn = document.getElementById('receive-btn');
const verifyBtn = document.getElementById('verify-btn');
const exportBtn = document.getElementById('export-btn');
const sendModal = document.getElementById('send-modal');
const receiveModal = document.getElementById('receive-modal');
const verifyModal = document.getElementById('verify-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const sendForm = document.getElementById('send-form');
const verifyHashBtn = document.getElementById('verify-hash-btn');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

// State variables
let balance = 125.50;
let currentPage = 'home';

// Initialize the page
function init() {
    renderTransactions();
    renderLedger();
    setupEventListeners();
    setupNavigation();
}

// Render transactions in the UI
function renderTransactions() {
    if (!transactionList) return;
    
    transactionList.innerHTML = '';
    
    sampleTransactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        
        const typeIcon = transaction.type === 'received' ? '⬇️' : 
                       transaction.type === 'sent' ? '⬆️' : '⛏️';
        
        const amountClass = transaction.type === 'sent' ? 'negative' : 'positive';
        const amountPrefix = transaction.type === 'sent' ? '-' : '+';
        
        transactionItem.innerHTML = `
            <div class="transaction-details">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span>${typeIcon}</span>
                    <div>
                        <div style="font-weight: 500;">${transaction.address.substring(0, 10)}...${transaction.address.substring(transaction.address.length - 5)}</div>
                        <div style="font-size: 0.85rem; color: #a0a0a0;">${transaction.date} | Hash: ${transaction.hash}</div>
                    </div>
                </div>
            </div>
            <div class="transaction-amount ${amountClass}">${amountPrefix}${transaction.amount} WKC</div>
        `;
        
        transactionList.appendChild(transactionItem);
    });
}

// Render ledger data
function renderLedger() {
    if (!ledgerBody) return;
    
    ledgerBody.innerHTML = '';
    
    ledgerData.forEach(block => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${block.blockId}</td>
            <td>${block.timestamp}</td>
            <td>${block.from.substring(0, 8)}...</td>
            <td>${block.to.substring(0, 8)}...</td>
            <td>${block.amount} WKC</td>
            <td style="font-family: monospace; font-size: 0.85rem;">${block.hash}</td>
        `;
        
        ledgerBody.appendChild(row);
    });
}

// Setup page navigation
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            
            // Show selected page
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
            
            currentPage = pageId;
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Modal open buttons
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            sendModal.style.display = 'flex';
        });
    }
    
    if (receiveBtn) {
        receiveBtn.addEventListener('click', () => {
            receiveModal.style.display = 'flex';
        });
    }
    
    if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
            verifyModal.style.display = 'flex';
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            alert('Wallet data exported to Excel successfully!');
        });
    }
    
    // Modal close buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            sendModal.style.display = 'none';
            receiveModal.style.display = 'none';
            verifyModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === sendModal) sendModal.style.display = 'none';
        if (e.target === receiveModal) receiveModal.style.display = 'none';
        if (e.target === verifyModal) verifyModal.style.display = 'none';
    });
    
    // Send form submission
    if (sendForm) {
        sendForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const recipient = document.getElementById('recipient').value;
            const amount = parseFloat(document.getElementById('amount').value);
            
            if (!recipient || !amount) {
                alert('Please fill in all fields');
                return;
            }
            
            if (amount > balance) {
                alert('Insufficient balance');
                return;
            }
            
            // Update balance
            balance -= amount;
            if (balanceElement) balanceElement.textContent = `${balance.toFixed(6)} WKC`;
            
            // Add transaction to history
            const newTransaction = {
                id: sampleTransactions.length + 1,
                type: 'sent',
                amount: amount,
                address: recipient,
                date: new Date().toLocaleString(),
                status: 'completed',
                hash: generateHash()
            };
            
            sampleTransactions.unshift(newTransaction);
            renderTransactions();
            
            // Add to ledger
            const newBlock = {
                blockId: ledgerData.length + 1,
                timestamp: new Date().toLocaleString(),
                from: 'WZk1A2b3...',
                to: recipient.substring(0, 8) + '...',
                amount: amount,
                hash: newTransaction.hash
            };
            
            ledgerData.unshift(newBlock);
            renderLedger();
            
            // Close modal and reset form
            sendModal.style.display = 'none';
            sendForm.reset();
            
            alert(`Successfully sent ${amount} WKC to ${recipient.substring(0, 10)}...`);
        });
    }
    
    // Verify hash button
    if (verifyHashBtn) {
        verifyHashBtn.addEventListener('click', () => {
            const hash = document.getElementById('transaction-hash').value;
            if (!hash) {
                alert('Please enter a transaction hash');
                return;
            }
            
            // Simulate verification
            const isValid = Math.random() > 0.2; // 80% chance of being valid
            
            if (isValid) {
                alert('✅ Transaction verified successfully! This transaction exists in the Excel ledger and has valid hash chaining.');
            } else {
                alert('❌ Transaction verification failed. This hash does not match any transaction in the ledger.');
            }
        });
    }
}

// Generate a random hash (simulation)
function generateHash() {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 16; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash + '...';
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);