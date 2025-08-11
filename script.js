// モバイルナビゲーション切り替え
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // モバイルメニューの切り替え
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // ナビゲーションリンクをクリックした時にモバイルメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // スムーズスクロール
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ヘッダーの背景変更（スクロール時）
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // 顔文字のコピー機能
    const copyKaomoji = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            // コピー成功の通知
            showCopyNotification();
        }).catch(err => {
            console.error('コピーに失敗しました:', err);
        });
    };

    // コピー通知の表示
    const showCopyNotification = () => {
        const notification = document.createElement('div');
        notification.textContent = '顔文字をコピーしました！ (´∀｀)';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FFB6C1, #FF69B4);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3);
            z-index: 10000;
            font-family: 'Noto Sans JP', sans-serif;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    };

    // 顔文字要素にクリックイベントを追加
    const addKaomojiClickEvents = () => {
        const kaomojiElements = document.querySelectorAll('.demo-kaomoji, .category-examples span, .category-icon, .feature-icon');
        
        kaomojiElements.forEach(element => {
            element.addEventListener('click', function() {
                const text = this.textContent.trim();
                copyKaomoji(text);
                
                // クリック効果
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
            
            // ホバー効果の強化
            element.addEventListener('mouseenter', function() {
                this.style.cursor = 'pointer';
                this.title = 'クリックでコピー';
            });
        });
    };

    // 顔文字クリックイベントの初期化
    addKaomojiClickEvents();

    // スクロール時の要素アニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // アニメーション対象要素の監視
    const animatedElements = document.querySelectorAll('.category-card, .feature-card, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // アクティブナビゲーションリンクの設定
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // カードのホバー効果強化
    const cards = document.querySelectorAll('.category-card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ヒーロー顔文字のランダムアニメーション
    const heroKaomojis = document.querySelectorAll('.demo-kaomoji');
    setInterval(() => {
        const randomKaomoji = heroKaomojis[Math.floor(Math.random() * heroKaomojis.length)];
        randomKaomoji.style.animation = 'none';
        setTimeout(() => {
            randomKaomoji.style.animation = 'bounce 2s ease-in-out infinite';
        }, 100);
    }, 3000);

    // ボタンのリップル効果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // パーティクル効果（軽量版）
    const createParticle = () => {
        const particle = document.createElement('div');
        const kaomojis = ['(´∀｀)', '(^o^)', '(｡◕‿◕｡)', '(´｡• ᵕ •｡`)', '(=^･ω･^=)'];
        const randomKaomoji = kaomojis[Math.floor(Math.random() * kaomojis.length)];
        
        particle.textContent = randomKaomoji;
        particle.style.cssText = `
            position: fixed;
            pointer-events: none;
            color: rgba(255, 105, 180, 0.6);
            font-size: 1.5rem;
            z-index: 1000;
            animation: float 4s ease-out forwards;
        `;
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    };

    // 定期的にパーティクルを生成
    setInterval(createParticle, 5000);

    // タイピング効果（ヒーロータイトル用）
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // 少し遅延してからタイピング効果を開始
        setTimeout(typeWriter, 1000);
    }
});

// CSSアニメーションの追加
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #FF69B4 !important;
        background: rgba(255, 182, 193, 0.2) !important;
    }
    
    .nav-link.active::after {
        width: 80% !important;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

