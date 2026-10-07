/**
 * Badges System - Sistema de badges e achievements
 * Reconhece e celebra progresso do aluno
 */

class BadgesSystem {
    constructor() {
        this.badges = {
            'hello-world': {
                id: 'hello-world',
                name: '🌍 Olá Mundo',
                description: 'Executou sua primeira instrução print()',
                icon: '🌍',
                color: '#FFB700'
            },
            'variables-pro': {
                id: 'variables-pro',
                name: '📦 Especialista em Variáveis',
                description: 'Completou todas as missões de variáveis',
                icon: '📦',
                color: '#4ECDC4'
            },
            'operations-master': {
                id: 'operations-master',
                name: '🧮 Mestre em Operações',
                description: 'Dominou operações matemáticas',
                icon: '🧮',
                color: '#FF6B6B'
            },
            'logic-wizard': {
                id: 'logic-wizard',
                name: '⚡ Mago da Lógica',
                description: 'Completou todas as missões de condições',
                icon: '⚡',
                color: '#A29BFE'
            },
            'loop-expert': {
                id: 'loop-expert',
                name: '🔄 Especialista em Loops',
                description: 'Dominou loops e iterações',
                icon: '🔄',
                color: '#00D2FC'
            },
            'list-guru': {
                id: 'list-guru',
                name: '📋 Guru de Listas',
                description: 'Aprendeu tudo sobre listas',
                icon: '📋',
                color: '#6BCF7F'
            },
            'functions-developer': {
                id: 'functions-developer',
                name: '⚙️ Desenvolvedor de Funções',
                description: 'Dominou funções e parâmetros',
                icon: '⚙️',
                color: '#FF9F43'
            },
            'detective-complete': {
                id: 'detective-complete',
                name: '🔍 Detetive Completo',
                description: 'Completou todas as 12 missões!',
                icon: '🔍',
                color: '#D4AF37'
            },
            'speed-runner': {
                id: 'speed-runner',
                name: '⚡ Speed Runner',
                description: 'Completou uma fase em menos de 10 minutos',
                icon: '⚡',
                color: '#FF1744'
            },
            'hint-master': {
                id: 'hint-master',
                name: '💡 Mestre de Dicas',
                description: 'Recebeu todas as dicas de uma missão',
                icon: '💡',
                color: '#FFEB3B'
            }
        };

        this.unlockedBadges = this.loadBadges();
    }

    /**
     * Carrega badges desbloqueadas
     */
    loadBadges() {
        const saved = localStorage.getItem('pydetetive_badges');
        return saved ? JSON.parse(saved) : [];
    }

    /**
     * Salva badges desbloqueadas
     */
    saveBadges() {
        localStorage.setItem('pydetetive_badges', JSON.stringify(this.unlockedBadges));
    }

    /**
     * Desbloqueia um badge
     */
    unlockBadge(badgeId) {
        if (this.unlockedBadges.includes(badgeId)) {
            return false; // Já desbloqueado
        }

        const badge = this.badges[badgeId];
        if (!badge) return false;

        this.unlockedBadges.push(badgeId);
        this.saveBadges();

        // Mostrar celebração
        this.showBadgeNotification(badge);

        return true;
    }

    /**
     * Mostra notificação de badge desbloqueado
     */
    showBadgeNotification(badge) {
        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, ${badge.color} 0%, ${this.darkenColor(badge.color, 20)} 100%);
            color: white;
            padding: 20px 30px;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: slideInUp 0.4s ease-out, slideOutDown 0.4s ease-out 3.6s forwards;
            font-weight: 600;
            text-align: center;
            max-width: 250px;
        `;

        const content = document.createElement('div');
        content.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 8px;">${badge.icon}</div>
            <div style="font-size: 14px;">${badge.name}</div>
            <div style="font-size: 12px; opacity: 0.9; margin-top: 4px;">${badge.description}</div>
        `;
        notification.appendChild(content);

        document.body.appendChild(notification);

        // Remover após animação
        setTimeout(() => notification.remove(), 4000);

        // Tocar som se disponível
        this.playUnlockSound();
    }

    /**
     * Retorna cor mais escura
     */
    darkenColor(color, percent) {
        // Simplificado - retorna o mesmo
        return color;
    }

    /**
     * Toca som de desbloquear (silent fail se não disponível)
     */
    playUnlockSound() {
        try {
            // Criar oscilador simples
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.2);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            // Silent fail
        }
    }

    /**
     * Retorna badges desbloqueados
     */
    getUnlockedBadges() {
        return this.unlockedBadges.map(id => this.badges[id]);
    }

    /**
     * Retorna todos os badges
     */
    getAllBadges() {
        return Object.values(this.badges);
    }

    /**
     * Verifica se badge está desbloqueado
     */
    isBadgeUnlocked(badgeId) {
        return this.unlockedBadges.includes(badgeId);
    }

    /**
     * Renderiza galeria de badges
     */
    renderBadgesGallery(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const gallery = document.createElement('div');
        gallery.className = 'badges-gallery';
        gallery.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 16px;
            padding: 16px;
        `;

        this.getAllBadges().forEach(badge => {
            const isUnlocked = this.isBadgeUnlocked(badge.id);
            const badgeEl = document.createElement('div');
            badgeEl.className = `badge-item ${isUnlocked ? 'unlocked' : 'locked'}`;
            badgeEl.style.cssText = `
                padding: 16px;
                border-radius: 8px;
                text-align: center;
                border: 2px solid ${isUnlocked ? badge.color : '#ccc'};
                background: ${isUnlocked ? 'rgba(' + this.hexToRgb(badge.color) + ', 0.1)' : '#f5f5f5'};
                opacity: ${isUnlocked ? 1 : 0.5};
                transition: all 0.3s ease;
                cursor: ${isUnlocked ? 'pointer' : 'default'};
            `;

            badgeEl.innerHTML = `
                <div style="font-size: 32px; margin-bottom: 8px;">${badge.icon}</div>
                <div style="font-weight: 600; font-size: 12px; margin-bottom: 4px;">${badge.name}</div>
                <div style="font-size: 11px; color: var(--text-light);">${badge.description}</div>
            `;

            if (isUnlocked) {
                badgeEl.style.boxShadow = `0 4px 12px rgba(${this.hexToRgb(badge.color)}, 0.3)`;
            }

            gallery.appendChild(badgeEl);
        });

        container.appendChild(gallery);
    }

    /**
     * Converte hex para RGB
     */
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return '212, 212, 212';
        return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
    }

    /**
     * Reseta todos os badges
     */
    resetBadges() {
        this.unlockedBadges = [];
        this.saveBadges();
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
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

    @keyframes slideOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }

    .badge-notification {
        animation: slideInUp 0.4s ease-out, slideOutDown 0.4s ease-out 3.6s forwards;
    }
`;
document.head.appendChild(style);

// Create global instance
const badgesSystem = new BadgesSystem();
window.BadgesSystem = BadgesSystem;
window.badgesSystem = badgesSystem;
