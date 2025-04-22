// Создание данных для отображения
const allCoins = [
    { symbol: 'BTC', name: 'Bitcoin', icon: '../фото/Bitcoin.svg.webp', price: 3750000, change: 2.4, balance: 0.48 },
    { symbol: 'ETH', name: 'Ethereum', icon: '../фото/Ethereum-icon-purple.svg.png', price: 245000, change: 1.8, balance: 5.2 },
    { symbol: 'SOL', name: 'Solana', icon: '../фото/Solana_cryptocurrency_two-900x675.jpg', price: 7800, change: 3.7, balance: 14.6 },
    { symbol: 'LTC', name: 'Litecoin', icon: '../фото/litecoin1688206454758.png', price: 6800, change: 3.2, balance: 12.8 },
    { symbol: 'DOT', name: 'Polkadot', icon: '../фото/Polkadot-Symbol.png', price: 620, change: -0.5, balance: 95 }
];

// Создание данных для отображения последних транзакций
const recentTransactions = [
    { type: 'deposit', title: 'Пополнение Bitcoin', amount: '+0.025 BTC', amountRub: '+93,750 ₽', date: '25 сентября, 14:32', status: 'completed' },
    { type: 'withdraw', title: 'Вывод Ethereum', amount: '-1.2 ETH', amountRub: '-294,000 ₽', date: '23 сентября, 10:15', status: 'completed' },
    { type: 'swap', title: 'Обмен LTC → SOL', amount: '-2.5 LTC / +3.5 SOL', amountRub: '-17,000 ₽', date: '21 сентября, 18:47', status: 'completed' }
];

// Функция для форматирования чисел
function formatNumber(num, maximumFractionDigits = 2) {
    return new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: maximumFractionDigits,
        useGrouping: true
    }).format(num);
}

// Функция для форматирования баланса в рублях
function formatBalanceToRub(balance, price) {
    const totalRub = balance * price;
    return `${formatNumber(totalRub)} ₽`;
}

// Функция для обновления списка активов
function updateAssetsList(viewType = 'grid') {
    const assetsView = document.getElementById('assetsView');
    if (!assetsView) return;

    // Обновляем класс контейнера в зависимости от типа отображения
    assetsView.className = `assets-view ${viewType}-view`;

    // Сортируем монеты по общему балансу в рублях (в порядке убывания)
    const sortedCoins = [...allCoins].sort((a, b) => (b.balance * b.price) - (a.balance * a.price));

    assetsView.innerHTML = sortedCoins.map(coin => {
        const totalValue = coin.balance * coin.price;
        
        if (viewType === 'grid') {
            return `
                <div class="asset-item" data-symbol="${coin.symbol}">
                    <img src="${coin.icon}" alt="${coin.name}" class="asset-icon">
                    <div class="asset-info">
                        <h4 class="asset-name">${coin.name}</h4>
                        <span class="asset-symbol">${coin.symbol}</span>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="asset-item list-item" data-symbol="${coin.symbol}">
                    <img src="${coin.icon}" alt="${coin.name}" class="asset-icon">
                    <div class="asset-info">
                        <h4 class="asset-name">${coin.name}</h4>
                        <span class="asset-symbol">${coin.symbol} • ${formatNumber(coin.balance, 8)}</span>
                    </div>
                    <div class="asset-value">
                        <div class="asset-total">${formatNumber(totalValue)} ₽</div>
                        <div class="asset-change ${coin.change >= 0 ? 'positive' : 'negative'}">
                            <i class="fas fa-arrow-${coin.change >= 0 ? 'up' : 'down'}"></i>
                            ${Math.abs(coin.change)}%
                        </div>
                    </div>
                </div>
            `;
        }
    }).join('');

    // Добавляем обработчик клика для перехода на страницу с информацией о монете
    document.querySelectorAll('.asset-item').forEach(item => {
        item.addEventListener('click', () => {
            const symbol = item.dataset.symbol;
            console.log(`Переход на страницу с информацией о ${symbol}`);
            // window.location.href = `../инфа о монетах/инфа о монетах.html?symbol=${symbol}`;
        });
    });
}

// Функция для создания графика баланса
function createBalanceChart() {
    const chartElement = document.getElementById('balanceChart');
    if (!chartElement) return;

    const options = {
        series: [{
            name: 'Баланс',
            data: [2450000, 2520000, 2490000, 2580000, 2610000, 2550000, 2680000]
        }],
        chart: {
            height: 150,
            type: 'area',
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            }
        },
        colors: ['#6C5CE7'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.1,
                stops: [0, 90, 100]
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        grid: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2023-09-20',
                '2023-09-21',
                '2023-09-22',
                '2023-09-23',
                '2023-09-24',
                '2023-09-25',
                '2023-09-26'
            ],
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM'
            },
            y: {
                formatter: function(value) {
                    return formatNumber(value) + ' ₽';
                }
            },
            theme: 'dark'
        }
    };

    const chart = new ApexCharts(chartElement, options);
    chart.render();
}

// Функция для создания диаграммы распределения портфеля
function createPortfolioDistribution() {
    const chartElement = document.getElementById('portfolioDistribution');
    if (!chartElement) return;

    // Расчет распределения портфеля
    const portfolioData = allCoins.map(coin => ({
        name: coin.name,
        value: coin.balance * coin.price
    })).sort((a, b) => b.value - a.value);

    const series = portfolioData.map(item => item.value);
    const labels = portfolioData.map(item => item.name);
    const colors = ['#6C5CE7', '#A29BFE', '#00D9A3', '#FFC107', '#FF5E7D'];

    const options = {
        series: series,
        labels: labels,
        colors: colors,
        chart: {
            type: 'donut',
            height: 200,
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%'
                }
            }
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            labels: {
                colors: '#AEB0D7'
            },
            markers: {
                width: 10,
                height: 10,
                radius: 12
            },
            itemMargin: {
                horizontal: 8,
                vertical: 5
            }
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function(value) {
                    return formatNumber(value) + ' ₽';
                }
            },
            theme: 'dark'
        }
    };

    const chart = new ApexCharts(chartElement, options);
    chart.render();
}

// Функция для обновления списка последних транзакций
function updateRecentActivity() {
    const activityList = document.getElementById('recentActivity');
    if (!activityList) return;

    activityList.innerHTML = recentTransactions.map(transaction => {
        let iconClass = 'deposit';
        let icon = 'arrow-down';
        
        if (transaction.type === 'withdraw') {
            iconClass = 'withdraw';
            icon = 'arrow-up';
        } else if (transaction.type === 'swap') {
            iconClass = 'swap';
            icon = 'exchange-alt';
        }
        
        return `
            <div class="activity-item">
                <div class="activity-icon ${iconClass}">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div class="activity-info">
                    <div class="activity-title">${transaction.title}</div>
                    <div class="activity-details">
                        <span class="transaction-date">${transaction.date}</span>
                        <span class="transaction-status">${transaction.status === 'completed' ? 'Завершено' : 'В обработке'}</span>
                    </div>
                </div>
                <div class="activity-amount ${transaction.type === 'deposit' ? 'positive' : transaction.type === 'withdraw' ? 'negative' : ''}">
                    ${transaction.amountRub}
                </div>
            </div>
        `;
    }).join('');
}

// Обновление текущей даты
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (!dateElement) return;
    
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('ru-RU', options);
}

// Обработчик переключения валюты
function setupCurrencySelector() {
    const currencySelect = document.getElementById('currencySelect');
    const balanceElement = document.getElementById('totalBalance');
    
    if (!currencySelect || !balanceElement) return;
    
    currencySelect.addEventListener('change', function() {
        const currency = this.value;
        let balanceValue = 2680000;
        
        if (currency === 'USD') {
            balanceValue = balanceValue / 92;
            balanceElement.textContent = `$ ${formatNumber(balanceValue)}`;
        } else if (currency === 'EUR') {
            balanceValue = balanceValue / 99;
            balanceElement.textContent = `€ ${formatNumber(balanceValue)}`;
        } else {
            balanceElement.textContent = `${formatNumber(balanceValue)} ₽`;
        }
    });
}

// Обработчики для переключения вида отображения активов
function setupViewToggle() {
    const viewToggles = document.querySelectorAll('.view-toggle');
    
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Снимаем active со всех переключателей
            viewToggles.forEach(t => t.classList.remove('active'));
            // Добавляем active на текущий переключатель
            this.classList.add('active');
            // Обновляем список активов
            updateAssetsList(this.dataset.view);
        });
    });
}

// Обработчики для переключения темы
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'light'; // По умолчанию светлая тема
    
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

// Обработчики для мобильного меню
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateAssetsList('grid');
    updateRecentActivity();
    updateCurrentDate();
    setupCurrencySelector();
    setupViewToggle();
    setupThemeToggle();
    setupMobileNavigation();
    
    // Инициализация графиков
    if (typeof ApexCharts !== 'undefined') {
        createBalanceChart();
        createPortfolioDistribution();
    }
    
    // Обработчики для кнопок
    document.querySelector('.action-btn.deposit')?.addEventListener('click', function() {
        console.log('Открыть форму пополнения');
        // Здесь будет код для открытия модального окна с формой пополнения
    });
    
    document.querySelector('.action-btn.withdraw')?.addEventListener('click', function() {
        console.log('Открыть форму вывода');
        // Здесь будет код для открытия модального окна с формой вывода
    });
    
    document.querySelector('.action-btn.swap')?.addEventListener('click', function() {
        console.log('Открыть форму обмена');
        // Здесь будет код для открытия формы обмена
    });
    
    // Анимация обновления
    document.querySelector('.refresh-btn')?.addEventListener('click', function() {
        this.classList.add('refreshing');
        setTimeout(() => {
            this.classList.remove('refreshing');
        }, 1000);
        // Здесь будет код для обновления данных
    });
});
