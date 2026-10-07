/**
 * Intro Sequence - Gerencia a sequência de introdução do jogo
 * 3 painéis narrativos com personagens e animações
 */

class IntroSequence {
    constructor() {
        this.currentPanel = 0;
        this.panels = [
            {
                title: "PyDetetive: O Roubo do Lumi",
                character: 'helena',
                dialog: 'Alguém levou o robô Lumi! Preciso da tua ajuda para resolver este mistério...',
                background: 'linear-gradient(135deg, #2C2416 0%, #8B4513 100%)'
            },
            {
                title: "O Caso do Lumi Desaparecido",
                character: 'caio',
                dialog: 'Temos algumas pistas. Precisamos analisar o código que foi deixado no local do roubo...',
                background: 'linear-gradient(135deg, #1A1410 0%, #4A4A4A 100%)'
            },
            {
                title: "Vamos Começar!",
                character: 'bia',
                dialog: 'Juntos conseguiremos! Completa as missões, aprenda Python e desvendar o mistério!',
                background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)'
            }
        ];
        this.initializeIntro();
    }

    /**
     * Inicializa a intro com animações
     */
    initializeIntro() {
        const panels = document.querySelectorAll('.intro-panel');
        if (panels.length === 0) return;

        panels.forEach((panel, idx) => {
            const panelData = this.panels[idx];
            if (!panelData) return;

            // Update background
            const content = panel.querySelector('.panel-content');
            if (content) {
                content.style.background = panelData.background;
            }

            // Add character SVG
            const illustration = panel.querySelector('.panel-illustration');
            if (illustration) {
                let characterSVG = '';
                switch (panelData.character) {
                    case 'helena':
                        characterSVG = CharacterSVG.createHelena();
                        break;
                    case 'caio':
                        characterSVG = CharacterSVG.createCaio();
                        break;
                    case 'bia':
                        characterSVG = CharacterSVG.createBia();
                        break;
                }

                if (characterSVG) {
                    illustration.innerHTML = characterSVG;
                    const svg = illustration.querySelector('svg');
                    if (svg) {
                        svg.style.animation = 'bounce 0.6s ease-out';
                        CharacterSVG.addBlink(svg);
                    }
                }
            }

            // Update dialog
            const dialog = panel.querySelector('.panel-dialog');
            if (dialog) {
                const character = panelData.character.charAt(0).toUpperCase() + panelData.character.slice(1);
                dialog.innerHTML = `<p><strong>${character}:</strong> "${panelData.dialog}"</p>`;
            }

            // Add transition animations
            panel.style.transition = 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out';
            panel.addEventListener('click', () => this.nextPanel());
        });

        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.nextPanel();
            if (e.key === 'ArrowLeft') this.prevPanel();
        });

        // Add CSS for animations
        this.addAnimationStyles();
    }

    /**
     * Adiciona estilos de animação
     */
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0% {
                    opacity: 0;
                    transform: scale(0.5) translateY(20px);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.1);
                }
                100% {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }

            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            .intro-panel.active .panel-header {
                animation: slideInLeft 0.4s ease-out;
            }

            .intro-panel.active .panel-illustration {
                animation: fadeInScale 0.6s ease-out;
            }

            .intro-panel.active .panel-dialog {
                animation: slideInRight 0.5s ease-out 0.2s both;
            }

            .intro-panel:hover .panel-content {
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Avança para próximo painel
     */
    nextPanel() {
        if (this.currentPanel < this.panels.length - 1) {
            this.goToPanel(this.currentPanel + 1);
        } else {
            this.completeIntro();
        }
    }

    /**
     * Volta para painel anterior
     */
    prevPanel() {
        if (this.currentPanel > 0) {
            this.goToPanel(this.currentPanel - 1);
        }
    }

    /**
     * Vai para um painel específico
     */
    goToPanel(index) {
        if (index < 0 || index >= this.panels.length) return;

        const panels = document.querySelectorAll('.intro-panel');
        const indicators = document.querySelectorAll('.indicator');

        // Saída do painel atual
        panels.forEach(p => p.classList.remove('active'));
        indicators.forEach(i => i.classList.remove('active'));

        // Entrada do novo painel
        if (panels[index]) {
            panels[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }

        this.currentPanel = index;

        // Update button states
        const prevBtn = document.getElementById('introPrevBtn');
        const nextBtn = document.getElementById('introNextBtn');
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.textContent = index === this.panels.length - 1 ? 'Começar! ▶' : 'Próximo →';
    }

    /**
     * Completa a intro e vai para o app
     */
    completeIntro() {
        const introScreen = document.getElementById('introScreen');
        if (introScreen) {
            introScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => {
                if (window.uiManager) {
                    window.uiManager.showScreen('app');
                }
            }, 500);
        }
    }
}

// Create global instance
let introSequence = null;

// Initialize when intro is active
document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('introScreen');
    if (introScreen && introScreen.classList.contains('active')) {
        introSequence = new IntroSequence();
    }
});

// Export
window.IntroSequence = IntroSequence;
window.introSequence = introSequence;
