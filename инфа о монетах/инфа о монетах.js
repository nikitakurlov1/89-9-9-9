// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);
const coinSymbol = urlParams.get('symbol') || 'BTC';

// Кэш для хранения данных
const cache = {
    prices: {},
    changes: {},
    lastUpdate: 0
};

// Данные о монетах
const coinData = {
    BTC: {
        name: 'Bitcoin',
        symbol: 'BTC',
        icon: '../фото/Bitcoin.svg.webp',
        description: 'Bitcoin (BTC) - первая и самая известная криптовалюта, созданная в 2009 году. Использует технологию блокчейн для безопасных и децентрализованных транзакций без посредников, обеспечивая финансовую независимость и защиту от инфляции.',
        stats: {
            marketCap: '₽65 трлн',
            volume: '₽2.5 трлн',
            maxSupply: '21 млн BTC',
            rank: '#1'
        },
        stakingRate: '4.2%'
    },
    ETH: {
        name: 'Ethereum',
        symbol: 'ETH',
        icon: '../фото/Ethereum-icon-purple.svg.png',
        description: 'Ethereum (ETH) - платформа для создания децентрализованных приложений и смарт-контрактов. Вторая по капитализации криптовалюта, предоставляющая инфраструктуру для DeFi, NFT и множества других блокчейн-приложений.',
        stats: {
            marketCap: '₽25 трлн',
            volume: '₽1.2 трлн',
            maxSupply: 'Не ограничено',
            rank: '#2'
        },
        stakingRate: '5.8%'
    },
    SOL: {
        name: 'Solana',
        symbol: 'SOL',
        icon: '../фото/Solana_cryptocurrency_two-900x675.jpg',
        description: 'Solana (SOL) - высокопроизводительный блокчейн, обеспечивающий до 65,000 транзакций в секунду с низкими комиссиями. Используется для DeFi, NFT и веб3-приложений, предлагая альтернативу Ethereum с лучшей масштабируемостью.',
        stats: {
            marketCap: '₽3.8 трлн',
            volume: '₽320 млрд',
            maxSupply: '489 млн SOL',
            rank: '#5'
        },
        stakingRate: '6.5%'
    },
    AVAX: {
        name: 'Avalanche',
        symbol: 'AVAX',
        icon: '../фото/Avalanche_logo_without_text.png',
        description: 'Avalanche (AVAX) - платформа для создания децентрализованных приложений с высокой пропускной способностью и низкими комиссиями. Предлагает инновационный консенсус и поддержку смарт-контрактов Ethereum.',
        stats: {
            marketCap: '₽1.2 трлн',
            volume: '₽150 млрд',
            maxSupply: '720 млн AVAX',
            rank: '#11'
        },
        stakingRate: '8.2%'
    },
    LTC: {
        name: 'Litecoin',
        symbol: 'LTC',
        icon: '../фото/litecoin1688206454758.png',
        description: 'Litecoin (LTC) - криптовалюта, созданная как "легкая" версия Bitcoin с более быстрыми транзакциями и меньшими комиссиями. Использует алгоритм Scrypt и предлагает более быстрое подтверждение блоков.',
        stats: {
            marketCap: '₽800 млрд',
            volume: '₽50 млрд',
            maxSupply: '84 млн LTC',
            rank: '#18'
        },
        stakingRate: '3.5%'
    },
    ADA: {
        name: 'Cardano',
        symbol: 'ADA',
        icon: '../фото/6304d4f7dcf54d0fb59743ba.png',
        description: 'Cardano (ADA) - платформа для создания смарт-контрактов с научным подходом к разработке и высокой безопасностью. Фокусируется на устойчивости, масштабируемости и обеспечивает доказуемую безопасность через экспертную оценку.',
        stats: {
            marketCap: '₽1.5 трлн',
            volume: '₽100 млрд',
            maxSupply: '45 млрд ADA',
            rank: '#9'
        },
        stakingRate: '4.8%'
    },
    DOGE: {
        name: 'Dogecoin',
        symbol: 'DOGE',
        icon: '../фото/5994.png',
        description: 'Dogecoin (DOGE) - криптовалюта, созданная на основе мема с собакой породы Сиба-ину. Изначально шуточный проект, который стал популярным и получил поддержку многих знаменитостей, включая Илона Маска.',
        stats: {
            marketCap: '₽950 млрд',
            volume: '₽85 млрд',
            maxSupply: 'Не ограничено',
            rank: '#14'
        },
        stakingRate: '2.1%'
    },
    SHIB: {
        name: 'Shiba Inu',
        symbol: 'SHIB',
        icon: '../фото/3890.png',
        description: 'Shiba Inu (SHIB) - токен на базе Ethereum, вдохновленный Dogecoin. Создан как "убийца Dogecoin" и управляется сообществом, развивающим целую экосистему, включая децентрализованную биржу ShibaSwap.',
        stats: {
            marketCap: '₽550 млрд',
            volume: '₽75 млрд',
            maxSupply: 'Квадриллион (с частичным сжиганием)',
            rank: '#20'
        },
        stakingRate: '3.0%'
    },
    MATIC: {
        name: 'Polygon',
        symbol: 'MATIC',
        icon: '../фото/1958.png',
        description: 'Polygon (MATIC) - решение второго уровня для Ethereum, обеспечивающее более быстрые и дешевые транзакции. Предлагает масштабируемую инфраструктуру для разработчиков, сохраняя безопасность основного блокчейна.',
        stats: {
            marketCap: '₽750 млрд',
            volume: '₽65 млрд',
            maxSupply: '10 млрд MATIC',
            rank: '#16'
        },
        stakingRate: '5.2%'
    },
    LINK: {
        name: 'Chainlink',
        symbol: 'LINK',
        icon: '../фото/1975.png',
        description: 'Chainlink (LINK) - децентрализованная сеть оракулов, соединяющая смарт-контракты с данными реального мира. Обеспечивает надежные данные для DeFi и других блокчейн-приложений.',
        stats: {
            marketCap: '₽650 млрд',
            volume: '₽45 млрд',
            maxSupply: '1 млрд LINK',
            rank: '#19'
        },
        stakingRate: '4.5%'
    },
    UNI: {
        name: 'Uniswap',
        symbol: 'UNI',
        icon: '../фото/uni-1.webp',
        description: 'Uniswap (UNI) - токен управления для Uniswap, ведущей децентрализованной биржи на Ethereum. Протокол позволяет автоматически обменивать токены без посредников, используя механизм автоматического маркет-мейкера.',
        stats: {
            marketCap: '₽480 млрд',
            volume: '₽40 млрд',
            maxSupply: '1 млрд UNI',
            rank: '#22'
        },
        stakingRate: '3.8%'
    },
    DOT: {
        name: 'Polkadot',
        symbol: 'DOT',
        icon: '../фото/Polkadot-Symbol.png',
        description: 'Polkadot (DOT) - инновационный мультичейн, соединяющий различные блокчейны в единую сеть. Позволяет обмениваться данными между разными блокчейнами и создавать специализированные парачейны.',
        stats: {
            marketCap: '₽870 млрд',
            volume: '₽55 млрд',
            maxSupply: '1.1 млрд DOT',
            rank: '#15'
        },
        stakingRate: '10.5%'
    }
};

// Функция для форматирования чисел
function formatNumber(num, maximumFractionDigits = 0) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: maximumFractionDigits
    }).format(num);
}

// Функция для получения всех данных одним запросом
async function getAllData() {
    try {
        const now = Date.now();
        // Обновляем данные только если прошло больше 30 секунд
        if (now - cache.lastUpdate < 30000 && Object.keys(cache.prices).length > 0) {
            return cache;
        }

        // В реальном приложении здесь было бы API с актуальными ценами
        // Симулируем получение данных для демонстрации
        const symbols = Object.keys(coinData);
        
        // Генерируем случайные цены и изменения для демонстрации
        symbols.forEach(symbol => {
            let basePrice;
            switch(symbol) {
                case 'BTC': basePrice = 2500000; break;
                case 'ETH': basePrice = 180000; break;
                case 'SOL': basePrice = 7800; break;
                case 'AVAX': basePrice = 3200; break;
                case 'LTC': basePrice = 8500; break;
                case 'ADA': basePrice = 45; break;
                case 'DOGE': basePrice = 12; break;
                case 'SHIB': basePrice = 0.0012; break;
                case 'MATIC': basePrice = 85; break;
                case 'LINK': basePrice = 1200; break;
                case 'UNI': basePrice = 450; break;
                case 'DOT': basePrice = 620; break;
                default: basePrice = 1000;
            }
            
            // Добавляем случайное отклонение ±5%
            const priceVariation = basePrice * (1 + (Math.random() * 0.1 - 0.05));
            cache.prices[symbol] = priceVariation;
            
            // Генерируем случайное изменение от -3% до +3%
            cache.changes[symbol] = Math.round((Math.random() * 6 - 3) * 100) / 100;
        });

        cache.lastUpdate = now;
        return cache;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return cache;
    }
}

// Функция для обновления информации о монете
async function updateCoinInfo() {
    const coin = coinData[coinSymbol];
    if (!coin) {
        console.error('Монета не найдена:', coinSymbol);
        window.location.href = '../Торговля/Торговля.html';
        return;
    }

    // Добавляем класс для анимации
    document.querySelector('.dashboard').classList.add('fade-in');

    // Обновляем иконку и название
    const coinIcon = document.getElementById('coinIcon');
    if (coinIcon) {
        coinIcon.src = coin.icon;
        coinIcon.alt = coin.name;
    }
    
    // Обновляем название и символ
    document.getElementById('coinName').textContent = coin.name;
    document.getElementById('coinSymbol').textContent = coin.symbol;
    
    // Обновляем описание
    document.getElementById('description').textContent = coin.description;

    // Обновляем статистику
    document.getElementById('marketCap').textContent = coin.stats.marketCap;
    document.getElementById('volume').textContent = coin.stats.volume;
    document.getElementById('maxSupply').textContent = coin.stats.maxSupply;
    document.getElementById('rank').textContent = coin.stats.rank;
    
    // Обновляем ставку стейкинга
    document.getElementById('stakingRate').textContent = coin.stakingRate;

    // Получаем все данные
    const data = await getAllData();

    // Обновляем цену
    const price = data.prices[coinSymbol] || 0;
    const priceFormatted = formatNumber(price, price < 1 ? 4 : price < 10 ? 2 : 0);
    document.getElementById('coinPrice').textContent = priceFormatted;

    // Обновляем изменение цены
    const change = data.changes[coinSymbol] || 0;
    const changeElement = document.getElementById('coinChange');
    const prefix = change >= 0 ? '+' : '';
    changeElement.innerHTML = `<i class="fas fa-arrow-${change >= 0 ? 'up' : 'down'}"></i> ${prefix}${change.toFixed(2)}%`;
    changeElement.className = `change ${change >= 0 ? 'positive' : 'negative'}`;

    // Обновляем график
    updateChart(coinSymbol);
    
    // Обновляем состояние избранного
    updateFavoriteState();
}

// Функция для обновления графика
function updateChart(symbol, interval = '1h') {
    const chartElement = document.querySelector('.price-chart');
    if (!chartElement) return;
    
    // Удаляем старый график, если он существует
    if (window.priceChart) {
        window.priceChart.destroy();
    }

    // Генерируем данные в зависимости от выбранного интервала
    let labels = [];
    let dataPoints = [];
    let basePrice = cache.prices[symbol] || 100000;
    
    switch(interval) {
        case '1h':
            labels = Array.from({length: 60}, (_, i) => `${i}м`);
            for (let i = 0; i < 60; i++) {
                const volatility = 0.001; // Низкая волатильность для минутного графика
                const randomChange = Math.random() * volatility * 2 - volatility;
                if (i === 0) {
                    dataPoints.push(basePrice * (1 - cache.changes[symbol] / 100));
                } else {
                    dataPoints.push(dataPoints[i-1] * (1 + randomChange));
                }
            }
            break;
        case '4h':
            labels = Array.from({length: 24}, (_, i) => `${i * 10}м`);
            for (let i = 0; i < 24; i++) {
                const volatility = 0.004;
                const randomChange = Math.random() * volatility * 2 - volatility;
                if (i === 0) {
                    dataPoints.push(basePrice * (1 - cache.changes[symbol] / 100 * 2));
                } else {
                    dataPoints.push(dataPoints[i-1] * (1 + randomChange));
                }
            }
            break;
        case '1d':
            labels = Array.from({length: 24}, (_, i) => `${i}ч`);
            for (let i = 0; i < 24; i++) {
                const volatility = 0.008;
                const randomChange = Math.random() * volatility * 2 - volatility;
                if (i === 0) {
                    dataPoints.push(basePrice * (1 - cache.changes[symbol] / 100 * 4));
                } else {
                    dataPoints.push(dataPoints[i-1] * (1 + randomChange));
                }
            }
            break;
        case '1w':
            labels = Array.from({length: 7}, (_, i) => `Д${i+1}`);
            for (let i = 0; i < 7; i++) {
                const volatility = 0.015;
                const randomChange = Math.random() * volatility * 2 - volatility;
                if (i === 0) {
                    dataPoints.push(basePrice * (1 - cache.changes[symbol] / 100 * 7));
                } else {
                    dataPoints.push(dataPoints[i-1] * (1 + randomChange));
                }
            }
            break;
        case '1m':
            labels = Array.from({length: 30}, (_, i) => `${i+1}`);
            for (let i = 0; i < 30; i++) {
                const volatility = 0.025;
                const randomChange = Math.random() * volatility * 2 - volatility;
                if (i === 0) {
                    dataPoints.push(basePrice * (1 - cache.changes[symbol] / 100 * 15));
                } else {
                    dataPoints.push(dataPoints[i-1] * (1 + randomChange));
                }
            }
            break;
    }

    // Создаем градиент для заливки области графика
    const ctx = chartElement.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(108, 92, 231, 0.2)');
    gradient.addColorStop(1, 'rgba(108, 92, 231, 0)');

    // Создаем новый график
    window.priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Цена',
                data: dataPoints,
                borderColor: '#6C5CE7',
                backgroundColor: gradient,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#6C5CE7',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(33, 28, 80, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(172, 139, 255, 0.3)',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            return formatNumber(value, value < 1 ? 4 : value < 10 ? 2 : 0);
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgba(174, 176, 215, 0.6)',
                        font: {
                            size: 10
                        },
                        maxRotation: 0
                    }
                },
                y: {
                    display: true,
                    position: 'right',
                    grid: {
                        color: 'rgba(172, 139, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgba(174, 176, 215, 0.6)',
                        font: {
                            size: 10
                        },
                        callback: function(value) {
                            if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                            if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
                            return value;
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear'
                }
            }
        }
    });
}

// Функция для обновления состояния кнопки избранного
function updateFavoriteState() {
    const favoriteBtn = document.querySelector('.favorite-btn i');
    
    // Получаем список избранных из localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Проверяем, есть ли текущая монета в избранных
    if (favorites.includes(coinSymbol)) {
        favoriteBtn.className = 'fas fa-star';
    } else {
        favoriteBtn.className = 'far fa-star';
    }
}

// Функция для переключения состояния избранного
function toggleFavorite() {
    // Получаем список избранных из localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Проверяем, есть ли текущая монета в избранных
    const index = favorites.indexOf(coinSymbol);
    
    if (index === -1) {
        // Добавляем в избранные
        favorites.push(coinSymbol);
    } else {
        // Удаляем из избранных
        favorites.splice(index, 1);
    }
    
    // Сохраняем обновленный список
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Обновляем состояние кнопки
    updateFavoriteState();
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

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    // Обновляем информацию о монете
    updateCoinInfo();
    
    // Устанавливаем обработчики для контролов графика
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            btn.classList.add('active');
            
            // Обновляем график с выбранным интервалом
            updateChart(coinSymbol, btn.dataset.interval);
        });
    });
    
    // Обработчик для кнопки "Назад"
    document.querySelector('.back-btn').addEventListener('click', () => {
        window.location.href = '../Торговля/Торговля.html';
    });
    
    // Обработчик для кнопки "Избранное"
    document.querySelector('.favorite-btn').addEventListener('click', toggleFavorite);
    
    // Обработчик для кнопки "Купить"
    document.querySelector('.buy-btn').addEventListener('click', () => {
        const amount = document.getElementById('tradeAmount').value;
        
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert('Пожалуйста, введите корректную сумму для покупки');
            return;
        }
        
        const price = cache.prices[coinSymbol];
        const coinAmount = parseFloat(amount) / price;
        
        alert(`Вы успешно купили ${coinAmount.toFixed(8)} ${coinSymbol} на сумму ${formatNumber(parseFloat(amount))}`);
        document.getElementById('tradeAmount').value = '';
    });
    
    document.querySelector('.sell-btn').addEventListener('click', () => {
        const amount = document.getElementById('tradeAmount').value;
        
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert('Пожалуйста, введите корректную сумму для продажи');
            return;
        }
        
        const price = cache.prices[coinSymbol];
        const coinAmount = parseFloat(amount) / price;
        
        alert(`Вы успешно продали ${coinAmount.toFixed(8)} ${coinSymbol} на сумму ${formatNumber(parseFloat(amount))}`);
        document.getElementById('tradeAmount').value = '';
    });
    
    // Обработчики кнопок ставок
    document.querySelector('.up-btn').addEventListener('click', () => {
        const coinSymbol = document.querySelector('.coin-symbol').textContent;
        window.location.href = `../бейтинг/бейтинг.html?coin=${coinSymbol}&type=up`;
    });
    
    document.querySelector('.down-btn').addEventListener('click', () => {
        const coinSymbol = document.querySelector('.coin-symbol').textContent;
        window.location.href = `../бейтинг/бейтинг.html?coin=${coinSymbol}&type=down`;
    });
    
    // Настройка переключения темы
    setupThemeToggle();
    
    // Настройка мобильного меню
    setupMobileNavigation();
    
    // Обновляем данные каждые 30 секунд
    setInterval(updateCoinInfo, 30000);
});
