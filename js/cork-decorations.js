/**
 * Cork Decorations - Decorações visuais para o quadro de cortiça
 * Adiciona tachinhas, barbantes e efeitos visuais autênticos
 */

class CorkDecorations {
    constructor() {
        this.pins = [];
        this.strings = [];
        this.initialized = false;
    }

    /**
     * Inicializa decorações de cortiça
     */
    initializeDecorations() {
        if (this.initialized) return;

        this.addPinStyles();
        this.addStringStyles();
        this.decorated = true;
        this.initialized = true;
    }

    /**
     * Adiciona estilos para tachinhas
     */
    addPinStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cork-pin {
                position: absolute;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                cursor: pointer;
                transition: transform 0.2s ease;
                z-index: 10;
            }

            .cork-pin:hover {
                transform: scale(1.1);
            }

            .cork-pin::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(200, 100, 50, 0.9));
                box-shadow:
                    inset -2px -2px 4px rgba(0, 0, 0, 0.4),
                    0 4px 8px rgba(0, 0, 0, 0.3),
                    0 0 0 2px rgba(0, 0, 0, 0.2);
            }

            .cork-pin.red::before {
                background: radial-gradient(circle at 30% 30%, rgba(255, 200, 200, 0.9), rgba(200, 50, 50, 1));
            }

            .cork-pin.blue::before {
                background: radial-gradient(circle at 30% 30%, rgba(200, 230, 255, 0.9), rgba(50, 100, 200, 1));
            }

            .cork-pin.yellow::before {
                background: radial-gradient(circle at 30% 30%, rgba(255, 255, 150, 0.9), rgba(200, 180, 50, 1));
            }

            .cork-pin.green::before {
                background: radial-gradient(circle at 30% 30%, rgba(200, 255, 200, 0.9), rgba(50, 200, 100, 1));
            }

            .cork-pin::after {
                content: '';
                position: absolute;
                top: 8px;
                left: 50%;
                transform: translateX(-50%);
                width: 2px;
                height: 12px;
                background: linear-gradient(to bottom, rgba(100, 50, 50, 0.8), rgba(100, 50, 50, 0.6));
            }

            .cork-string {
                position: absolute;
                height: 2px;
                background: repeating-linear-gradient(
                    90deg,
                    #8B7355 0px,
                    #8B7355 8px,
                    #A0825C 8px,
                    #A0825C 16px
                );
                box-shadow:
                    0 1px 2px rgba(0, 0, 0, 0.3),
                    0 -1px 2px rgba(255, 255, 255, 0.1);
                z-index: 5;
            }

            .cork-string.curved {
                border-top: 2px solid #8B7355;
                background: none;
            }

            .cork-decoration-layer {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 8;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Adiciona estilos para barbantes
     */
    addStringStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes stringWave {
                0%, 100% {
                    transform: scaleY(1);
                }
                50% {
                    transform: scaleY(1.02);
                }
            }

            .cork-string.wave {
                animation: stringWave 4s ease-in-out infinite;
            }

            .cork-string.diagonal {
                transform-origin: top left;
            }

            svg.cork-string-svg {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 5;
            }

            .cork-string-line {
                stroke: #8B7355;
                stroke-width: 2;
                fill: none;
                filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Adiciona tachinhas em posições aleatórias
     */
    addRandomPins(containerId, count = 6) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const colors = ['red', 'blue', 'yellow', 'green'];

        for (let i = 0; i < count; i++) {
            const pin = document.createElement('div');
            pin.className = `cork-pin ${colors[Math.floor(Math.random() * colors.length)]}`;

            // Posição aleatória
            const x = Math.random() * 80 + 10;
            const y = Math.random() * 70 + 5;

            pin.style.left = x + '%';
            pin.style.top = y + '%';

            container.appendChild(pin);
            this.pins.push(pin);
        }
    }

    /**
     * Adiciona tachinha em posição específica
     */
    addPin(containerId, x, y, color = 'red') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const pin = document.createElement('div');
        pin.className = `cork-pin ${color}`;
        pin.style.left = x + '%';
        pin.style.top = y + '%';

        container.appendChild(pin);
        this.pins.push(pin);

        return pin;
    }

    /**
     * Adiciona barbante entre dois pontos usando SVG
     */
    addString(containerId, x1, y1, x2, y2, curved = false) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Criar SVG overlay se não existir
        let svgContainer = container.querySelector('svg.cork-string-svg');
        if (!svgContainer) {
            svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgContainer.classList.add('cork-string-svg');
            svgContainer.setAttribute('viewBox', '0 0 100 100');
            container.appendChild(svgContainer);
        }

        // Criar linha ou curva
        let element;
        if (curved) {
            // Usar caminho quadrático de Bézier
            const cp1x = (x1 + x2) / 2 + Math.random() * 10 - 5;
            const cp1y = (y1 + y2) / 2 - 20;
            const d = `M ${x1} ${y1} Q ${cp1x} ${cp1y} ${x2} ${y2}`;
            element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            element.setAttribute('d', d);
        } else {
            element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            element.setAttribute('x1', x1);
            element.setAttribute('y1', y1);
            element.setAttribute('x2', x2);
            element.setAttribute('y2', y2);
        }

        element.classList.add('cork-string-line');
        svgContainer.appendChild(element);

        this.strings.push(element);
        return element;
    }

    /**
     * Adiciona barbantes decorativos padrão
     */
    addDecorativeStrings(containerId) {
        // Barbantes diagonais
        this.addString(containerId, 20, 15, 40, 35, true);
        this.addString(containerId, 60, 20, 80, 40, true);
        this.addString(containerId, 15, 60, 35, 80, true);
        this.addString(containerId, 70, 65, 85, 85, true);
    }

    /**
     * Cria efeito de documento fixado com tachinhas e barbante
     */
    createPinnedDocument(containerId, title, x, y) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const doc = document.createElement('div');
        doc.className = 'pinned-document';
        doc.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: 120px;
            padding: 12px;
            background: linear-gradient(135deg, #FFF8DC 0%, #F5DEB3 100%);
            border: 1px solid #8B7355;
            box-shadow:
                0 4px 8px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.5);
            border-radius: 2px;
            font-size: 11px;
            line-height: 1.3;
            color: #2D3748;
            z-index: 7;
        `;
        doc.innerHTML = `<strong>${title}</strong>`;

        container.appendChild(doc);

        // Adicionar tachinhas nos cantos
        this.addPin(containerId, x - 2, y - 1, 'red');
        this.addPin(containerId, x + 12, y - 1, 'blue');

        return doc;
    }

    /**
     * Remove todas as decorações
     */
    clearDecorations() {
        this.pins.forEach(pin => pin.remove());
        this.strings.forEach(string => string.remove());
        this.pins = [];
        this.strings = [];
    }

    /**
     * Adiciona efeito de sombra ao quadro
     */
    enhanceCorkBoardShadow(boardSelector) {
        const boards = document.querySelectorAll(boardSelector);
        boards.forEach(board => {
            board.style.boxShadow = `
                0 2px 4px rgba(0, 0, 0, 0.1),
                0 8px 16px rgba(0, 0, 0, 0.15),
                inset 0 -2px 4px rgba(0, 0, 0, 0.1),
                inset 1px 1px 0 rgba(255, 255, 255, 0.3)
            `;
        });
    }

    /**
     * Adiciona textura de cortiça ao fundo
     */
    enhanceCorkTexture(boardSelector) {
        const boards = document.querySelectorAll(boardSelector);
        boards.forEach(board => {
            const style = window.getComputedStyle(board);
            const bg = style.backgroundColor;

            board.style.backgroundImage = `
                radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(139, 69, 19, 0.03) 0%, transparent 30%)
            `;
        });
    }
}

// Create global instance
const corkDecorations = new CorkDecorations();
window.CorkDecorations = CorkDecorations;
window.corkDecorations = corkDecorations;
