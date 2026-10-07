/**
 * Character System - SVG Characters para PyDetetive
 * 6 personagens principais: Helena, Caio, Bia, Otavio, Dalva, Lumi
 */

class CharacterSVG {
    static createHelena() {
        return `
            <svg viewBox="0 0 100 140" class="character-svg">
                <circle cx="50" cy="30" r="15" fill="#D4A574" stroke="#000" stroke-width="1"/>
                <path d="M 50 20 Q 55 15 60 20" fill="#8B6F47"/>
                <circle cx="45" cy="28" r="2" fill="#000"/>
                <circle cx="55" cy="28" r="2" fill="#000"/>
                <line x1="50" y1="30" x2="50" y2="36" stroke="#000" stroke-width="1"/>
                <path d="M 50 36 L 40 50 L 50 48 L 60 50 Z" fill="#FF6B6B"/>
                <rect x="35" y="50" width="30" height="40" fill="#8B4513" stroke="#000" stroke-width="1"/>
                <line x1="40" y1="50" x2="30" y2="75" stroke="#D4A574" stroke-width="2"/>
                <line x1="60" y1="50" x2="70" y2="75" stroke="#D4A574" stroke-width="2"/>
                <line x1="40" y1="90" x2="35" y2="130" stroke="#333" stroke-width="2"/>
                <line x1="60" y1="90" x2="65" y2="130" stroke="#333" stroke-width="2"/>
            </svg>
        `;
    }

    static createCaio() {
        return `
            <svg viewBox="0 0 100 140" class="character-svg">
                <circle cx="50" cy="30" r="15" fill="#C4956D" stroke="#000" stroke-width="1"/>
                <circle cx="45" cy="28" r="2.5" fill="#000"/>
                <circle cx="55" cy="28" r="2.5" fill="#000"/>
                <path d="M 48 32 Q 50 34 52 32" stroke="#000" stroke-width="1" fill="none"/>
                <rect x="35" y="50" width="30" height="40" fill="#4A90E2" stroke="#000" stroke-width="1"/>
                <line x1="40" y1="50" x2="25" y2="75" stroke="#C4956D" stroke-width="2"/>
                <line x1="60" y1="50" x2="75" y2="75" stroke="#C4956D" stroke-width="2"/>
                <line x1="40" y1="90" x2="35" y2="130" stroke="#222" stroke-width="2"/>
                <line x1="60" y1="90" x2="65" y2="130" stroke="#222" stroke-width="2"/>
            </svg>
        `;
    }

    static createBia() {
        return `
            <svg viewBox="0 0 100 140" class="character-svg">
                <circle cx="50" cy="30" r="15" fill="#E8B4A8" stroke="#000" stroke-width="1"/>
                <path d="M 35 28 Q 42 20 50 22 Q 58 20 65 28" fill="#FFB6C1" stroke="#000" stroke-width="0.5"/>
                <circle cx="44" cy="27" r="2" fill="#000"/>
                <circle cx="56" cy="27" r="2" fill="#000"/>
                <path d="M 45 32 Q 50 35 55 32" stroke="#000" stroke-width="1" fill="none"/>
                <rect x="35" y="50" width="30" height="40" fill="#FF69B4" stroke="#000" stroke-width="1"/>
                <line x1="40" y1="50" x2="28" y2="75" stroke="#E8B4A8" stroke-width="2"/>
                <line x1="60" y1="50" x2="72" y2="75" stroke="#E8B4A8" stroke-width="2"/>
                <line x1="40" y1="90" x2="35" y2="130" stroke="#333" stroke-width="2"/>
                <line x1="60" y1="90" x2="65" y2="130" stroke="#333" stroke-width="2"/>
            </svg>
        `;
    }

    static createOtavio() {
        return `
            <svg viewBox="0 0 100 140" class="character-svg">
                <circle cx="50" cy="30" r="15" fill="#A0826D" stroke="#000" stroke-width="1"/>
                <path d="M 48 18 L 52 18 L 54 22 L 46 22 Z" fill="#333"/>
                <circle cx="45" cy="29" r="2" fill="#000"/>
                <circle cx="55" cy="29" r="2" fill="#000"/>
                <path d="M 50 32 L 50 38" stroke="#000" stroke-width="1"/>
                <rect x="35" y="50" width="30" height="40" fill="#2F4F4F" stroke="#000" stroke-width="1"/>
                <line x1="40" y1="50" x2="28" y2="78" stroke="#A0826D" stroke-width="2"/>
                <line x1="60" y1="50" x2="72" y2="78" stroke="#A0826D" stroke-width="2"/>
                <line x1="40" y1="90" x2="33" y2="130" stroke="#1C1C1C" stroke-width="2"/>
                <line x1="60" y1="90" x2="67" y2="130" stroke="#1C1C1C" stroke-width="2"/>
            </svg>
        `;
    }

    static createDalva() {
        return `
            <svg viewBox="0 0 100 140" class="character-svg">
                <circle cx="50" cy="30" r="15" fill="#D9C5A8" stroke="#000" stroke-width="1"/>
                <circle cx="35" cy="22" r="8" fill="#FFF" stroke="#000" stroke-width="0.5"/>
                <circle cx="65" cy="22" r="8" fill="#FFF" stroke="#000" stroke-width="0.5"/>
                <circle cx="45" cy="28" r="2" fill="#000"/>
                <circle cx="55" cy="28" r="2" fill="#000"/>
                <path d="M 48 32 Q 50 34 52 32" stroke="#000" stroke-width="1" fill="none"/>
                <rect x="35" y="50" width="30" height="40" fill="#9B6B47" stroke="#000" stroke-width="1"/>
                <line x1="40" y1="50" x2="30" y2="75" stroke="#D9C5A8" stroke-width="2"/>
                <line x1="60" y1="50" x2="70" y2="75" stroke="#D9C5A8" stroke-width="2"/>
                <line x1="40" y1="90" x2="36" y2="130" stroke="#654321" stroke-width="2"/>
                <line x1="60" y1="90" x2="64" y2="130" stroke="#654321" stroke-width="2"/>
            </svg>
        `;
    }

    static createLumi() {
        return `
            <svg viewBox="0 0 100 140" class="character-svg">
                <rect x="32" y="15" width="36" height="36" rx="4" fill="#FFD700" stroke="#000" stroke-width="2"/>
                <circle cx="42" cy="30" r="3" fill="#000"/>
                <circle cx="58" cy="30" r="3" fill="#000"/>
                <path d="M 45 38 L 55 38 L 52 42 L 48 42 Z" fill="#FF6B6B" stroke="#000" stroke-width="1"/>
                <rect x="35" y="55" width="12" height="25" fill="#FFD700" stroke="#000" stroke-width="1"/>
                <rect x="53" y="55" width="12" height="25" fill="#FFD700" stroke="#000" stroke-width="1"/>
                <rect x="40" y="85" width="20" height="35" fill="#FFD700" stroke="#000" stroke-width="1"/>
                <circle cx="43" cy="125" r="3" fill="#000"/>
                <circle cx="57" cy="125" r="3" fill="#000"/>
            </svg>
        `;
    }

    /**
     * Anima blink dos olhos
     */
    static addBlink(element) {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink-${Date.now()} {
                0%, 90%, 100% { opacity: 1; }
                95% { opacity: 0.3; }
            }
            .character-svg { animation: blink-${Date.now()} 4s infinite; }
        `;
        document.head.appendChild(style);
    }

    /**
     * Anima wave (aceno)
     */
    static addWave(element) {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes wave-${Date.now()} {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-15deg); }
                75% { transform: rotate(15deg); }
            }
            .character-svg { animation: wave-${Date.now()} 0.8s ease-in-out; transform-origin: 60% 40%; }
        `;
        document.head.appendChild(style);
    }
}

// Export global
window.CharacterSVG = CharacterSVG;
