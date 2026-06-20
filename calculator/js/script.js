/**
 * DevCalc Pro - JavaScript Controller
 * Designed & Developed by Bhabani Sankar Biswal
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const expressionDisplay = document.getElementById('expression-display');
    const resultDisplay = document.getElementById('result-display');
    const equalsSign = document.querySelector('.equals-sign');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const historyToggleBtn = document.getElementById('history-toggle-btn');
    const historyCloseBtn = document.getElementById('history-close-btn');
    const historySidebar = document.getElementById('history-sidebar');
    const appContainer = document.querySelector('.app-container');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const gridButtons = document.querySelectorAll('.calculator-grid button');

    // --- State Variables ---
    let currentInput = '';
    let expression = '';
    let isEvaluated = false;
    let history = [];

    // --- Initialize Application ---
    initTheme();
    initHistory();
    setupEventListeners();

    // ==========================================
    // 1. Core Calculator logic
    // ==========================================

    function appendNumber(num) {
        if (isEvaluated) {
            // Start fresh if user presses number after equals
            currentInput = num;
            expression = '';
            isEvaluated = false;
        } else {
            // Avoid multiple leading zeros
            if (currentInput === '0' && num === '0') return;
            // Replace single zero with new number
            if (currentInput === '0') {
                currentInput = num;
            } else {
                currentInput += num;
            }
        }
        updateDisplay();
    }

    function appendDecimal() {
        if (isEvaluated) {
            currentInput = '0.';
            expression = '';
            isEvaluated = false;
        } else {
            if (currentInput.includes('.')) return;
            if (currentInput === '') {
                currentInput = '0.';
            } else {
                currentInput += '.';
            }
        }
        updateDisplay();
    }

    function handleOperator(op) {
        // If we evaluated and want to continue calculation with the result
        if (isEvaluated) {
            const tempResult = resultDisplay.textContent;
            if (tempResult !== 'Error' && tempResult !== 'Cannot divide by zero') {
                expression = tempResult + ' ' + op + ' ';
                currentInput = '';
                isEvaluated = false;
            } else {
                // If previous was error, start fresh with negative sign or ignore operator
                if (op === '-') {
                    currentInput = '-';
                    expression = '';
                    isEvaluated = false;
                } else {
                    return;
                }
            }
            updateDisplay();
            return;
        }

        // If currentInput is empty but we want to put a negative sign
        if (currentInput === '' && expression === '') {
            if (op === '-') {
                currentInput = '-';
                updateDisplay();
            }
            return;
        }

        // Standard operator insertion
        if (currentInput !== '') {
            // Check if last char of currentInput is a decimal, remove it
            if (currentInput.endsWith('.')) {
                currentInput = currentInput.slice(0, -1);
            }
            expression += currentInput + ' ' + op + ' ';
            currentInput = '';
        } else if (expression !== '') {
            // Replace the last operator if consecutive operator clicked
            const trimmedExp = expression.trim();
            const lastSpaceIdx = trimmedExp.lastIndexOf(' ');
            if (lastSpaceIdx !== -1) {
                expression = trimmedExp.substring(0, lastSpaceIdx) + ' ' + op + ' ';
            } else {
                expression = op + ' ';
            }
        }
        updateDisplay();
    }

    function handlePercentage() {
        if (isEvaluated) {
            const tempResult = resultDisplay.textContent;
            if (tempResult !== 'Error' && tempResult !== 'Cannot divide by zero') {
                currentInput = tempResult + '%';
                expression = '';
                isEvaluated = false;
            }
            updateDisplay();
            return;
        }

        if (currentInput !== '') {
            if (!currentInput.endsWith('%')) {
                currentInput += '%';
            }
        } else if (expression !== '') {
            // If operator was just entered, we can append percent to a new 0
            currentInput = '0%';
        }
        updateDisplay();
    }

    function backspace() {
        if (isEvaluated) {
            // If already evaluated, clear expression display and keep result
            expression = '';
            isEvaluated = false;
            updateDisplay();
            return;
        }

        if (currentInput !== '') {
            currentInput = currentInput.slice(0, -1);
        } else if (expression !== '') {
            // Pull the last parts from expression back to current input
            const parts = expression.trim().split(' ');
            if (parts.length > 0) {
                const lastPart = parts.pop();
                // If last part is an operator, remove it and load the previous number
                if (['+', '-', '×', '÷'].includes(lastPart)) {
                    expression = parts.join(' ') + (parts.length > 0 ? ' ' : '');
                    // Load the number before the operator
                    const prevNum = parts.pop() || '';
                    currentInput = prevNum;
                    expression = parts.join(' ') + (parts.length > 0 ? ' ' : '');
                } else {
                    currentInput = lastPart;
                }
            }
        }
        updateDisplay();
    }

    function clearCalculator() {
        currentInput = '';
        expression = '';
        isEvaluated = false;
        updateDisplay();
    }

    function evaluateExpression() {
        if (isEvaluated || (expression === '' && currentInput === '')) return;

        let fullExpression = expression + currentInput;
        fullExpression = fullExpression.trim();

        if (fullExpression === '') return;

        // Clean trailing operators if any
        const lastChar = fullExpression.slice(-1);
        if (['+', '-', '×', '÷'].includes(lastChar)) {
            fullExpression = fullExpression.slice(0, -1).trim();
        }

        try {
            const result = safeEvaluate(fullExpression);
            
            // Format displays
            expressionDisplay.textContent = fullExpression;
            resultDisplay.textContent = result;
            equalsSign.classList.add('show');
            
            // Add to history if valid calculation
            if (result !== 'Error' && result !== 'Cannot divide by zero') {
                addHistoryItem(fullExpression, result);
            }

            // Set states
            expression = fullExpression;
            currentInput = '';
            isEvaluated = true;
        } catch (error) {
            resultDisplay.textContent = 'Error';
            equalsSign.classList.remove('show');
            isEvaluated = true;
        }

        // Scroll displays to end
        expressionDisplay.scrollLeft = expressionDisplay.scrollWidth;
        resultDisplay.scrollLeft = resultDisplay.scrollWidth;
    }

    function safeEvaluate(exp) {
        // Replace displays to JavaScript match operators
        let sanitized = exp.replace(/×/g, '*').replace(/÷/g, '/');
        
        // Handle percentages
        // Converts "number%" -> "(number/100)"
        sanitized = sanitized.replace(/([0-9.]+)\s*%/g, '($1/100)');

        // Validate allowed characters (digits, decimals, basic operators, parenthesis, spaces)
        if (!/^[0-9+\-*/.()\s]+$/.test(sanitized)) {
            throw new Error('Invalid Expression');
        }

        // Evaluate safely
        const evalResult = new Function(`return (${sanitized})`)();

        if (evalResult === undefined || Number.isNaN(evalResult)) {
            throw new Error('Evaluation Error');
        }

        if (!Number.isFinite(evalResult)) {
            return 'Cannot divide by zero';
        }

        // Handle floating point precision issues (max 10 decimals, strip trailing zeros)
        return parseFloat(evalResult.toFixed(10));
    }

    function updateDisplay() {
        // Show expression and input
        expressionDisplay.textContent = expression;
        
        if (currentInput === '') {
            if (expression === '') {
                resultDisplay.textContent = '0';
            } else {
                // Peek current evaluation or just show active equation
                resultDisplay.textContent = '0';
            }
        } else {
            resultDisplay.textContent = currentInput;
        }

        // Show/hide equals sign helper
        if (isEvaluated) {
            equalsSign.classList.add('show');
        } else {
            equalsSign.classList.remove('show');
        }

        // Scroll to keep content visible
        expressionDisplay.scrollLeft = expressionDisplay.scrollWidth;
        resultDisplay.scrollLeft = resultDisplay.scrollWidth;
    }

    // ==========================================
    // 2. Keyboard Support & Animations
    // ==========================================

    function handleKeyboardInput(e) {
        // Prevent default browser search behavior for forward slash or quote
        if (e.key === '/' || e.key === "'") {
            e.preventDefault();
        }

        const key = e.key;
        let targetId = '';

        if (key >= '0' && key <= '9') {
            appendNumber(key);
            targetId = `key-${key}`;
        } else if (key === '.') {
            appendDecimal();
            targetId = 'key-decimal';
        } else if (key === '+') {
            handleOperator('+');
            targetId = 'key-add';
        } else if (key === '-') {
            handleOperator('-');
            targetId = 'key-subtract';
        } else if (key === '*') {
            handleOperator('×');
            targetId = 'key-multiply';
        } else if (key === '/') {
            handleOperator('÷');
            targetId = 'key-divide';
        } else if (key === '%') {
            handlePercentage();
            targetId = 'key-percent';
        } else if (key === 'Enter' || key === '=') {
            evaluateExpression();
            targetId = 'key-equals';
        } else if (key === 'Backspace') {
            backspace();
            targetId = 'key-backspace';
        } else if (key === 'Escape' || key.toLowerCase() === 'c') {
            clearCalculator();
            targetId = 'key-clear';
        }

        // Keypress styling feedback
        if (targetId) {
            const btn = document.getElementById(targetId);
            if (btn) {
                btn.classList.add('keyboard-active');
                setTimeout(() => {
                    btn.classList.remove('keyboard-active');
                }, 100);
            }
        }
    }

    // ==========================================
    // 3. Theme Toggle Manager
    // ==========================================

    function initTheme() {
        const savedTheme = localStorage.getItem('devcalc-theme');
        // Default to dark mode if not specified
        const theme = savedTheme ? savedTheme : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('devcalc-theme', newTheme);
    }

    // ==========================================
    // 4. Calculation History Manager
    // ==========================================

    function initHistory() {
        const savedHistory = localStorage.getItem('devcalc-history');
        if (savedHistory) {
            history = JSON.parse(savedHistory);
        }
        renderHistory();
    }

    function addHistoryItem(exp, res) {
        // Prevent duplicate consecutive additions
        if (history.length > 0 && history[0].expression === exp && history[0].result === res) {
            return;
        }

        history.unshift({ expression: exp, result: res });
        
        // Cap history at 50 items
        if (history.length > 50) {
            history.pop();
        }

        localStorage.setItem('devcalc-history', JSON.stringify(history));
        renderHistory();
    }

    function renderHistory() {
        // Clear list
        historyList.innerHTML = '';

        if (history.length === 0) {
            historyList.innerHTML = `
                <div class="history-empty">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="empty-icon">
                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>No history yet</p>
                </div>
            `;
            return;
        }

        history.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');
            historyItem.setAttribute('tabindex', '0');
            historyItem.setAttribute('role', 'button');
            historyItem.innerHTML = `
                <span class="history-item-exp">${item.expression}</span>
                <span class="history-item-res">${item.result}</span>
            `;

            // Load calculation back on click or enter key
            const loadHistory = () => {
                expression = item.expression;
                currentInput = '';
                resultDisplay.textContent = item.result;
                isEvaluated = true;
                updateDisplay();
                // Close sidebar on mobile after choosing
                if (window.innerWidth < 900) {
                    toggleHistory(false);
                }
            };

            historyItem.addEventListener('click', loadHistory);
            historyItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    loadHistory();
                }
            });

            historyList.appendChild(historyItem);
        });
    }

    function clearHistory() {
        history = [];
        localStorage.removeItem('devcalc-history');
        renderHistory();
    }

    function toggleHistory(forceState) {
        const shouldOpen = forceState !== undefined ? forceState : !historySidebar.classList.contains('open');
        
        if (shouldOpen) {
            historySidebar.classList.add('open');
            appContainer.classList.add('history-open');
        } else {
            historySidebar.classList.remove('open');
            appContainer.classList.remove('history-open');
        }
    }

    // ==========================================
    // 5. Event Listeners Setup
    // ==========================================

    function setupEventListeners() {
        // Grid button clicks
        gridButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.getAttribute('data-val');
                const action = btn.getAttribute('data-action');

                if (val) {
                    if (['+', '-', '×', '÷'].includes(val)) {
                        handleOperator(val);
                    } else if (val === '%') {
                        handlePercentage();
                    } else if (val === '.') {
                        appendDecimal();
                    } else {
                        appendNumber(val);
                    }
                } else if (action) {
                    if (action === 'clear') {
                        clearCalculator();
                    } else if (action === 'backspace') {
                        backspace();
                    } else if (action === 'equals') {
                        evaluateExpression();
                    }
                }

                // Add tactile focus-out blur
                btn.blur();
            });
        });

        // Theme Toggle Click
        themeToggleBtn.addEventListener('click', toggleTheme);

        // History Drawer Toggles
        historyToggleBtn.addEventListener('click', () => toggleHistory());
        if (historyCloseBtn) {
            historyCloseBtn.addEventListener('click', () => toggleHistory(false));
        }

        // Clear History Click
        clearHistoryBtn.addEventListener('click', clearHistory);

        // Keyboard Event Listener
        document.addEventListener('keydown', handleKeyboardInput);

        // Window resize adjustment
        window.addEventListener('resize', () => {
            // Adapt sidebars on viewport resize
            if (window.innerWidth >= 900) {
                if (historySidebar.classList.contains('open')) {
                    appContainer.classList.add('history-open');
                }
            } else {
                appContainer.classList.remove('history-open');
            }
        });
    }
});
