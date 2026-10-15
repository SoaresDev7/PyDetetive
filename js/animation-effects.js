/**
 * Animation Effects - Sistema de efeitos e animações
 * Gerencia animações do jogo de forma centralizada
 */

class AnimationEffects {
    constructor() {
        this.enabled = true;
        this.effects = new Map();
        this.initialized = false;
    }

    /**
     * Inicializa o sistema
     */
    initialize() {
        if (this.initialized) return;
        this.addAnimationStyles();
        this.initialized = true;
    }

    /**
     * Adiciona estilos de animação
     */
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }

            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes slideInDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.5);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            @keyframes scaleOut {
                from {
                    opacity: 1;
                    transform: scale(1);
                }
                to {
                    opacity: 0;
                    transform: scale(0.5);
                }
            }

            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
                20%, 40%, 60%, 80% { transform: translateX(2px); }
            }

            @keyframes flip {
                0% { transform: perspective(400px) rotateY(0); }
                100% { transform: perspective(400px) rotateY(360deg); }
            }

            @keyframes glow {
                0%, 100% {
                    box-shadow: 0 0 5px rgba(78, 205, 196, 0.5);
                }
                50% {
                    box-shadow: 0 0 20px rgba(78, 205, 196, 1);
                }
            }

            .animate-bounce { animation: bounce 0.6s ease-in-out; }
            .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
            .animate-fadeOut { animation: fadeOut 0.4s ease-out; }
            .animate-slideInUp { animation: slideInUp 0.4s ease-out; }
            .animate-slideInDown { animation: slideInDown 0.4s ease-out; }
            .animate-slideInLeft { animation: slideInLeft 0.4s ease-out; }
            .animate-slideInRight { animation: slideInRight 0.4s ease-out; }
            .animate-scaleIn { animation: scaleIn 0.4s ease-out; }
            .animate-scaleOut { animation: scaleOut 0.4s ease-out; }
            .animate-rotate { animation: rotate 1s linear infinite; }
            .animate-pulse { animation: pulse 1s ease-in-out infinite; }
            .animate-shake { animation: shake 0.5s ease-in-out; }
            .animate-flip { animation: flip 0.6s ease-out; }
            .animate-glow { animation: glow 1s ease-in-out infinite; }
        `;
        document.head.appendChild(style);
    }

    /**
     * Ativa animação em elemento
     */
    animate(element, animationType, duration = null) {
        if (!this.enabled) {
            element.style.display = 'block';
            return;
        }

        const className = `animate-${animationType}`;
        element.classList.add(className);

        if (duration) {
            setTimeout(() => {
                element.classList.remove(className);
            }, duration);
        }
    }

    /**
     * Cria efeito de confete
     */
    confetti(x = window.innerWidth / 2, y = window.innerHeight / 2) {
        if (!this.enabled) return;

        const colors = ['#4ECDC4', '#FFB700', '#FF6B6B', '#6BCF7F', '#A29BFE'];
        const confettiCount = 30;

        for (let i = 0; i < confettiCount; i++) {
            const confetto = document.createElement('div');
            confetto.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                animation: confettiAnimation 2s ease-out forwards;
                z-index: 9999;
            `;

            const angle = (Math.PI * 2 * i) / confettiCount;
            const velocity = 5 + Math.random() * 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 5;

            confetto.style.setProperty('--tx', vx + 'px');
            confetto.style.setProperty('--ty', vy + 'px');

            document.body.appendChild(confetto);

            setTimeout(() => confetto.remove(), 2000);
        }

        // Adicionar estilo de animação
        if (!document.querySelector('style[data-confetti]')) {
            const style = document.createElement('style');
            style.setAttribute('data-confetti', 'true');
            style.textContent = `
                @keyframes confettiAnimation {
                    to {
                        transform: translate(var(--tx), var(--ty)) rotateZ(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Cria efeito de explosão de partículas
     */
    particleExplosion(element, color = '#4ECDC4') {
        if (!this.enabled) return;

        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;

            const angle = (Math.PI * 2 * i) / 12;
            const velocity = 3 + Math.random() * 2;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.style.animation = `particleMove 0.8s ease-out forwards`;
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');

            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 800);
        }
    }

    /**
     * Cria efeito de digitação
     */
    typeWriter(element, text, speed = 50) {
        if (!this.enabled) {
            element.textContent = text;
            return;
        }

        element.textContent = '';
        let index = 0;

        const type = () => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, speed);
            }
        };

        type();
    }

    /**
     * Cria efeito de tremer
     */
    shake(element, intensity = 5, duration = 500) {
        if (!this.enabled) return;

        const start = Date.now();
        const shakeInterval = setInterval(() => {
            const elapsed = Date.now() - start;

            if (elapsed >= duration) {
                element.style.transform = '';
                clearInterval(shakeInterval);
                return;
            }

            const offset = Math.sin(elapsed / 30) * intensity;
            element.style.transform = `translateX(${offset}px)`;
        }, 16);
    }

    /**
     * Cria efeito de brilho
     */
    glow(element, color = '#4ECDC4', duration = 1000) {
        if (!this.enabled) return;

        element.style.boxShadow = `0 0 10px ${color}`;

        setTimeout(() => {
            element.style.boxShadow = '';
        }, duration);
    }

    /**
     * Cria efeito de pulso
     */
    pulse(element, count = 3) {
        if (!this.enabled) return;

        let current = 0;
        const scale = (value) => {
            element.style.transform = `scale(${value})`;
        };

        const pulse = () => {
            if (current < count * 2) {
                scale(current % 2 === 0 ? 1.1 : 1);
                current++;
                setTimeout(pulse, 150);
            } else {
                scale(1);
            }
        };

        pulse();
    }

    /**
     * Ativa/desativa animações
     */
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    /**
     * Verifica se animações estão ativadas
     */
    isEnabled() {
        return this.enabled;
    }
}

// Create global instance
const animationEffects = new AnimationEffects();
window.AnimationEffects = AnimationEffects;
window.animationEffects = animationEffects;
