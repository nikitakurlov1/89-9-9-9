// Список всех доступных криптовалют
const allCoins = [
    { 
        symbol: 'BTC', 
        name: 'Bitcoin', 
        icon: '../фото/Bitcoin.svg.webp', 
        price: 2500000, 
        change: 2.5,
        volume: 14500000000,
        marketCap: 870000000000,
        favorite: true
    },
    { 
        symbol: 'ETH', 
        name: 'Ethereum', 
        icon: '../фото/Ethereum-icon-purple.svg.png', 
        price: 180000, 
        change: 1.8,
        volume: 8200000000,
        marketCap: 345000000000,
        favorite: true
    },
    { 
        symbol: 'SOL', 
        name: 'Solana', 
        icon: '../фото/Solana_cryptocurrency_two-900x675.jpg', 
        price: 7800, 
        change: 3.7,
        volume: 3600000000,
        marketCap: 42000000000,
        favorite: true
    },
    { 
        symbol: 'AVAX', 
        name: 'Avalanche', 
        icon: '../фото/Avalanche_logo_without_text.png', 
        price: 3200, 
        change: -0.5,
        volume: 980000000,
        marketCap: 14500000000,
        favorite: false
    },
    { 
        symbol: 'LTC', 
        name: 'Litecoin', 
        icon: '../фото/litecoin1688206454758.png', 
        price: 8500, 
        change: 0.7,
        volume: 750000000,
        marketCap: 6800000000,
        favorite: false
    },
    { 
        symbol: 'ADA', 
        name: 'Cardano', 
        icon: '../фото/6304d4f7dcf54d0fb59743ba.png', 
        price: 45, 
        change: -1.2,
        volume: 520000000,
        marketCap: 20500000000,
        favorite: false
    },
    { 
        symbol: 'DOGE', 
        name: 'Dogecoin', 
        icon: '../фото/5994.png', 
        price: 12, 
        change: 5.3,
        volume: 1250000000,
        marketCap: 17800000000,
        favorite: false
    },
    { 
        symbol: 'SHIB', 
        name: 'Shiba Inu', 
        icon: '../фото/3890.png', 
        price: 0.0012, 
        change: 3.1,
        volume: 960000000,
        marketCap: 8600000000,
        favorite: false
    },
    { 
        symbol: 'MATIC', 
        name: 'Polygon', 
        icon: '../фото/1958.png', 
        price: 85, 
        change: -0.8,
        volume: 480000000,
        marketCap: 10800000000,
        favorite: false
    },
    { 
        symbol: 'LINK', 
        name: 'Chainlink', 
        icon: '../фото/1975.png', 
        price: 1200, 
        change: 1.5,
        volume: 680000000,
        marketCap: 7900000000,
        favorite: false
    },
    { 
        symbol: 'UNI', 
        name: 'Uniswap', 
        icon: '../фото/uni-1.webp', 
        price: 450, 
        change: -2.1,
        volume: 420000000,
        marketCap: 5200000000,
        favorite: false
    },
    { 
        symbol: 'DOT', 
        name: 'Polkadot', 
        icon: '../фото/Polkadot-Symbol.png', 
        price: 620, 
        change: -0.5, 
        volume: 850000000,
        marketCap: 9200000000,
        favorite: false
    }
];

// Форматирование чисел
function formatNumber(num, maximumFractionDigits = 2) {
    return new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: maximumFractionDigits,
        useGrouping: true
    }).format(num);
}

// Форматирование цены с учетом размера числа
function formatPrice(price) {
    if (price >= 1000) {
        return formatNumber(price) + ' ₽';
    } else if (price >= 1) {
        return formatNumber(price, 2) + ' ₽';
    } else {
        return formatNumber(price, 4) + ' ₽';
    }
}

// Форматирование процентного изменения
function formatChange(change) {
    const prefix = change >= 0 ? '+' : '';
    return `${prefix}${change.toFixed(2)}%`;
}

// Форматирование для больших чисел (миллиарды, миллионы)
function formatLargeNumber(num) {
    if (num >= 1000000000) {
        return formatNumber(num / 1000000000, 2) + ' млрд';
    } else if (num >= 1000000) {
        return formatNumber(num / 1000000, 2) + ' млн';
    } else {
        return formatNumber(num);
    }
}

// Функция для обновления списка криптовалют
function updatePairsList(coins, viewType = 'grid') {
    const pairsList = document.getElementById('pairsList');
    if (!pairsList) return;

    // Обновляем класс для отображения сетки или списка
    pairsList.className = `pairs-list ${viewType}-view`;

    pairsList.innerHTML = coins.map(coin => {
        if (viewType === 'grid') {
            return `
                <div class="pair-item" data-symbol="${coin.symbol}">
                    <div class="pair-info">
                        <img src="${coin.icon}" alt="${coin.name}" class="coin-icon">
                        <div class="coin-details">
                            <span class="coin-name">${coin.name}</span>
                            <span class="coin-symbol">${coin.symbol}</span>
                        </div>
                    </div>
                    <div class="pair-price">
                        <span class="price">${formatPrice(coin.price)}</span>
                        <span class="change ${coin.change >= 0 ? 'positive' : 'negative'}">
                            <i class="fas fa-arrow-${coin.change >= 0 ? 'up' : 'down'}"></i>
                            ${formatChange(coin.change)}
                        </span>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="pair-item" data-symbol="${coin.symbol}">
                    <div class="pair-info">
                        <img src="${coin.icon}" alt="${coin.name}" class="coin-icon">
                        <div class="coin-details">
                            <span class="coin-name">${coin.name}</span>
                            <span class="coin-symbol">${coin.symbol}</span>
                        </div>
                    </div>
                    <div class="pair-price">
                        <span class="price">${formatPrice(coin.price)}</span>
                        <span class="change ${coin.change >= 0 ? 'positive' : 'negative'}">
                            <i class="fas fa-arrow-${coin.change >= 0 ? 'up' : 'down'}"></i>
                            ${formatChange(coin.change)}
                        </span>
                    </div>
                </div>
            `;
        }
    }).join('');

    // Добавляем обработчики клика
    document.querySelectorAll('.pair-item').forEach(item => {
        item.addEventListener('click', () => {
            const symbol = item.dataset.symbol;
            const selectedCoin = allCoins.find(coin => coin.symbol === symbol);
            updateCoinDetails(selectedCoin);
            
            // Обновляем выбранную монету в селекте быстрой торговли
            const coinSelect = document.getElementById('coinSelect');
            if (coinSelect) {
                coinSelect.value = symbol;
                updateSelectedCoinIcon(symbol);
            }
        });
    });
}

// Функция для обновления иконки выбранной монеты
function updateSelectedCoinIcon(symbol) {
    const selectedCoin = allCoins.find(coin => coin.symbol === symbol);
    const iconElement = document.getElementById('selectedCoinIcon');
    
    if (selectedCoin && iconElement) {
        iconElement.src = selectedCoin.icon;
        iconElement.alt = selectedCoin.name;
    }
}

// Функция для обновления деталей о монете (будет использоваться в будущем)
function updateCoinDetails(coin) {
    console.log('Выбрана монета:', coin);
    // Перенаправляем на страницу с информацией о монете
    window.location.href = `../инфа о монетах/инфа о монетах.html?symbol=${coin.symbol}`;
}

// Функция для заполнения выпадающего списка монет
function populateCoinSelect() {
    const coinSelect = document.getElementById('coinSelect');
    if (!coinSelect) return;

    coinSelect.innerHTML = allCoins.map(coin => 
        `<option value="${coin.symbol}">${coin.name} (${coin.symbol})</option>`
    ).join('');
    
    // Установка обработчика изменения
    coinSelect.addEventListener('change', (e) => {
        updateSelectedCoinIcon(e.target.value);
    });
}

// Функция для обработки переключения типа отображения (сетка/список)
function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const currentView = localStorage.getItem('pairsView') || 'grid';
    
    // Установка активного вида
    viewButtons.forEach(btn => {
        if (btn.dataset.view === currentView) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Обновление списка с сохраненным видом
    const filteredCoins = getFilteredCoins();
    updatePairsList(filteredCoins, currentView);
    
    // Обработчики
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            localStorage.setItem('pairsView', view);
            updatePairsList(getFilteredCoins(), view);
        });
    });
}

// Функция получения отфильтрованных монет на основе активной вкладки
function getFilteredCoins() {
    const activeTab = document.querySelector('.market-tab.active');
    if (!activeTab) return allCoins;
    
    const tabType = activeTab.dataset.tab;
    
    switch(tabType) {
        case 'favorites':
            return allCoins.filter(coin => coin.favorite);
        case 'trending':
            return [...allCoins].sort((a, b) => b.volume - a.volume).slice(0, 5);
        case 'gainers':
            return [...allCoins].sort((a, b) => b.change - a.change).slice(0, 5);
        case 'losers':
            return [...allCoins].sort((a, b) => a.change - b.change).slice(0, 5);
        default:
            return allCoins;
    }
}

// Функция для обработки переключения вкладок
function setupTabToggle() {
    const marketTabs = document.querySelectorAll('.market-tab');
    
    marketTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            marketTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filteredCoins = getFilteredCoins();
            const currentView = localStorage.getItem('pairsView') || 'grid';
            updatePairsList(filteredCoins, currentView);
        });
    });
}

// Функция для настройки поиска
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query === '') {
            const filteredCoins = getFilteredCoins();
            const currentView = localStorage.getItem('pairsView') || 'grid';
            updatePairsList(filteredCoins, currentView);
            return;
        }
        
        const searchResults = allCoins.filter(coin => 
            coin.name.toLowerCase().includes(query) || 
            coin.symbol.toLowerCase().includes(query)
        );
        
        const currentView = localStorage.getItem('pairsView') || 'grid';
        updatePairsList(searchResults, currentView);
    });
}

// Функция для настройки переключения темы
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.checked = true;
    } else {
        document.body.classList.remove('light-theme');
        themeToggle.checked = false;
    }
    
    themeToggle.addEventListener('change', function() {
        // Добавляем класс для анимации при переключении
        document.body.classList.add('theme-transition');
        
        if (this.checked) {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
        
        // Удаляем класс анимации после завершения
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
    });
}

// Функция для настройки мобильного меню
function setupMobileNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (!menuToggle || !sidebar) return;
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Закрывать меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.sidebar') && !event.target.closest('.menu-toggle') && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

// Функция для настройки быстрой торговли
function setupQuickTrade() {
    const buyButton = document.querySelector('.trade-btn.buy');
    const sellButton = document.querySelector('.trade-btn.sell');
    const tradeAmountInput = document.getElementById('tradeAmount');
    const coinSelect = document.getElementById('coinSelect');
    
    if (!buyButton || !sellButton || !tradeAmountInput || !coinSelect) return;
    
    // Обработчик для кнопки покупки
    buyButton.addEventListener('click', () => {
        const amount = parseFloat(tradeAmountInput.value);
        const selectedCoin = coinSelect.value;
        
        if (isNaN(amount) || amount <= 0) {
            alert('Пожалуйста, введите корректную сумму');
            return;
        }
        
        const coinData = allCoins.find(coin => coin.symbol === selectedCoin);
        if (!coinData) return;
        
        const coinAmount = amount / coinData.price;
        
        alert(`Вы успешно купили ${coinAmount.toFixed(8)} ${selectedCoin} на сумму ${formatNumber(amount)} ₽`);
        tradeAmountInput.value = '';
    });
    
    // Обработчик для кнопки продажи
    sellButton.addEventListener('click', () => {
        const amount = parseFloat(tradeAmountInput.value);
        const selectedCoin = coinSelect.value;
        
        if (isNaN(amount) || amount <= 0) {
            alert('Пожалуйста, введите корректную сумму');
            return;
        }
        
        const coinData = allCoins.find(coin => coin.symbol === selectedCoin);
        if (!coinData) return;
        
        const coinAmount = amount / coinData.price;
        
        alert(`Вы успешно продали ${coinAmount.toFixed(8)} ${selectedCoin} на сумму ${formatNumber(amount)} ₽`);
        tradeAmountInput.value = '';
    });
}

// Анимация для кнопки обновления
function setupRefreshButton() {
    const refreshBtn = document.querySelector('.refresh-btn');
    if (!refreshBtn) return;
    
    refreshBtn.addEventListener('click', function() {
        this.classList.add('refreshing');
        
        // Имитация обновления данных
        setTimeout(() => {
            // Обновляем случайные значения цен и изменений
            allCoins.forEach(coin => {
                const randomChange = (Math.random() * 2 - 1) * 2; // От -2% до +2%
                coin.change = Math.max(Math.min(coin.change + randomChange, 10), -10);
                coin.price = coin.price * (1 + randomChange / 100);
            });
            
            // Обновляем отображение
            const filteredCoins = getFilteredCoins();
            const currentView = localStorage.getItem('pairsView') || 'grid';
            updatePairsList(filteredCoins, currentView);
            
            this.classList.remove('refreshing');
        }, 1000);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setupViewToggle();
    setupTabToggle();
    setupSearch();
    setupThemeToggle();
    setupMobileNavigation();
    populateCoinSelect();
    setupQuickTrade();
    setupRefreshButton();
    
    // Инициализация с первой вкладкой и видом по умолчанию
    const filteredCoins = getFilteredCoins();
    const currentView = localStorage.getItem('pairsView') || 'grid';
    updatePairsList(filteredCoins, currentView);
});
