// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);
const coinSymbol = urlParams.get('coin') || 'BTC';
const betType = urlParams.get('type') || 'up';

// Данные о монетах
const coins = {
    BTC: { 
        name: 'Bitcoin', 
        price: 50000, 
        icon: '../фото/Bitcoin.svg.webp' 
    },
    ETH: { 
        name: 'Ethereum', 
        price: 3000, 
        icon: '../фото/Ethereum-icon-purple.svg.png' 
    },
    BNB: { 
        name: 'Binance Coin', 
        price: 400, 
        icon: '../фото/images.png' 
    },
    SOL: { 
        name: 'Solana', 
        price: 100, 
        icon: '../фото/Solana_cryptocurrency_two-900x675.jpg' 
    },
    AVAX: { 
        name: 'Avalanche', 
        price: 50, 
        icon: '../фото/Avalanche_logo_without_text.png' 
    },
    LTC: { 
        name: 'Litecoin', 
        price: 80, 
        icon: '../фото/litecoin1688206454758.png' 
    },
    ADA: { 
        name: 'Cardano', 
        price: 0.5, 
        icon: '../фото/6304d4f7dcf54d0fb59743ba.png' 
    },
    DOGE: { 
        name: 'Dogecoin', 
        price: 0.1, 
        icon: '../фото/5994.png' 
    },
    SHIB: { 
        name: 'Shiba Inu', 
        price: 0.00001, 
        icon: '../фото/3890.png' 
    },
    MATIC: { 
        name: 'Polygon', 
        price: 1, 
        icon: '../фото/1958.png' 
    },
    LINK: { 
        name: 'Chainlink', 
        price: 15, 
        icon: '../фото/1975.png' 
    },
    UNI: { 
        name: 'Uniswap', 
        price: 6, 
        icon: '../фото/uni-1.webp' 
    },
    DOT: { 
        name: 'Polkadot', 
        price: 7, 
        icon: '../фото/Polkadot-Symbol.png' 
    }
};

// Текущее состояние
let selectedTime = 10; // секунды
let betAmount = 0;
let timer = null;
let timeLeft = 0;
let startPrice = 0;
let endPrice = 0;

// Форматирование чисел
const formatNumber = (number) => {
    return new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
};

// Форматирование цены
const formatPrice = (price) => {
    return `$${formatNumber(price)}`;
};

// Инициализация страницы
function initPage() {
    // Устанавливаем информацию о монете
    const coin = coins[coinSymbol];
    const coinIcon = document.querySelector('.coin-icon');
    coinIcon.innerHTML = `<img src="${coin.icon}" alt="${coin.name}" style="width: 48px; height: 48px;">`;
    document.querySelector('.coin-details h2').textContent = `${coin.name} (${coinSymbol})`;
    document.querySelector('.coin-price').textContent = formatPrice(coin.price);
    
    // Устанавливаем тип ставки
    const betTypeIndicator = document.querySelector('.bet-type-indicator');
    betTypeIndicator.textContent = betType === 'up' ? 'Ставка на рост' : 'Ставка на падение';
    betTypeIndicator.classList.add(betType);
    
    // Устанавливаем начальную цену
    startPrice = coin.price;
    
    // Обработчики кнопок времени
    document.querySelectorAll('.time-option').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.time-option').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedTime = parseInt(button.dataset.time);
            updatePotentialWin();
        });
    });
    
    // Обработчик ввода суммы
    const amountInput = document.querySelector('.amount-input input');
    amountInput.addEventListener('input', (e) => {
        betAmount = parseFloat(e.target.value) || 0;
        updatePotentialWin();
    });
    
    // Обработчики быстрых сумм
    document.querySelectorAll('.quick-amount').forEach(button => {
        button.addEventListener('click', () => {
            betAmount = parseFloat(button.dataset.amount);
            amountInput.value = betAmount;
            updatePotentialWin();
        });
    });
    
    // Обработчик кнопки "Сделать ставку"
    document.querySelector('.place-bet-btn').addEventListener('click', placeBet);
    
    // Обработчик кнопки "Новая ставка"
    document.querySelector('.new-bet-btn').addEventListener('click', () => {
        document.querySelector('.betting-form').classList.remove('hidden');
        document.querySelector('.timer-section').classList.add('hidden');
        document.querySelector('.result-section').classList.add('hidden');
    });
    
    // Обработчик переключения темы
    document.querySelector('.theme-toggle').addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Восстанавливаем тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Обработчик кнопки "Назад"
    document.querySelector('.back-btn').addEventListener('click', () => {
        window.location.href = `../инфа о монетах/инфа о монетах.html?symbol=${coinSymbol}`;
    });
}

// Обновление потенциального выигрыша
function updatePotentialWin() {
    const multiplier = betType === 'up' ? 1.8 : 1.8; // 80% прибыль
    const potentialWin = betAmount * multiplier;
    document.querySelector('.potential-win').textContent = formatPrice(potentialWin);
}

// Размещение ставки
function placeBet() {
    if (betAmount <= 0) {
        alert('Пожалуйста, введите сумму ставки');
        return;
    }
    
    // Скрываем форму и показываем таймер
    document.querySelector('.betting-form').classList.add('hidden');
    document.querySelector('.timer-section').classList.remove('hidden');
    
    // Устанавливаем начальные значения
    timeLeft = selectedTime;
    updateTimer();
    
    // Запускаем таймер
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResult();
        }
    }, 1000);
}

// Обновление таймера
function updateTimer() {
    const timerValue = document.querySelector('.timer-value');
    const timerPath = document.querySelector('.timer-path');
    
    timerValue.textContent = timeLeft;
    
    // Обновляем круг таймера
    const circumference = 565.48;
    const offset = circumference - (timeLeft / selectedTime) * circumference;
    timerPath.style.strokeDashoffset = offset;
    
    // Обновляем текущую цену
    const priceChange = (Math.random() - 0.5) * 0.02; // Случайное изменение цены
    const currentPrice = startPrice * (1 + priceChange);
    document.querySelector('.price-value').textContent = formatPrice(currentPrice);
    
    // Сохраняем конечную цену
    if (timeLeft === 0) {
        endPrice = currentPrice;
    }
}

// Показ результата
function showResult() {
    const resultSection = document.querySelector('.result-section');
    const resultIcon = document.querySelector('.result-icon');
    const resultTitle = document.querySelector('.result-title');
    const resultMessage = document.querySelector('.result-message');
    
    // Определяем результат
    const priceChange = ((endPrice - startPrice) / startPrice) * 100;
    const isWin = (betType === 'up' && priceChange > 0) || (betType === 'down' && priceChange < 0);
    
    // Обновляем UI
    resultIcon.className = `result-icon ${isWin ? 'win' : 'lose'}`;
    resultIcon.innerHTML = isWin ? '🎉' : '😢';
    resultTitle.textContent = isWin ? 'Поздравляем!' : 'К сожалению...';
    resultMessage.textContent = isWin 
        ? `Вы выиграли ${formatPrice(betAmount * 0.8)}!`
        : `Вы проиграли ${formatPrice(betAmount)}.`;
    
    // Показываем результат
    document.querySelector('.timer-section').classList.add('hidden');
    resultSection.classList.remove('hidden');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initPage);
