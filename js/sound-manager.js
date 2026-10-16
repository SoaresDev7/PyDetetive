/**
 * Sound Manager - Gerenciador de sons e efeitos sonoros
 * Produz sons usando Web Audio API
 */

class SoundManager {
    constructor() {
        this.enabled = true;
        this.volume = 0.3;
        this.audioContext = null;
        this.sounds = new Map();
        this.initialized = false;
    }

    /**
     * Inicializa o gerenciador de som
     */
    initialize() {
        if (this.initialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API não disponível');
        }

        this.initialized = true;
    }

    /**
     * Define volume (0-1)
     */
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    /**
     * Ativa/desativa sons
     */
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    /**
     * Toca som de sucesso
     */
    playSuccess() {
        this.playNote([523, 659, 784], [0.1, 0.1, 0.2]);
    }

    /**
     * Toca som de erro
     */
    playError() {
        this.playNote([200, 150], [0.15, 0.15]);
    }

    /**
     * Toca som de clique
     */
    playClick() {
        this.playTone(1000, 0.05, 0.2);
    }

    /**
     * Toca som de desbloqueio
     */
    playUnlock() {
        this.playNote([400, 533, 666], [0.1, 0.1, 0.15]);
    }

    /**
     * Toca som de moeda/crédito
     */
    playPickup() {
        this.playNote([800, 600], [0.05, 0.1]);
    }

    /**
     * Toca som de alerta
     */
    playAlert() {
        this.playTone(600, 0.1, 0.3);
        setTimeout(() => this.playTone(600, 0.1, 0.3), 150);
    }

    /**
     * Toca sequência de notas
     */
    playNote(frequencies, durations) {
        if (!this.enabled || !this.audioContext) return;

        frequencies.forEach((freq, index) => {
            const startTime = this.audioContext.currentTime + (durations.slice(0, index).reduce((a, b) => a + b, 0));
            const duration = durations[index];

            this.playTone(freq, duration, this.volume, startTime);
        });
    }

    /**
     * Toca tom simples
     */
    playTone(frequency, duration, volume = null, startTime = null) {
        if (!this.enabled || !this.audioContext) return;

        volume = volume !== null ? volume : this.volume;
        startTime = startTime !== null ? startTime : this.audioContext.currentTime;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const bandpass = this.audioContext.createBiquadFilter();

            oscillator.connect(bandpass);
            bandpass.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, startTime);

            gainNode.gain.setValueAtTime(volume, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        } catch (e) {
            // Silent fail
        }
    }

    /**
     * Toca som de tipo de máquina de escrever
     */
    playTypewriter() {
        if (!this.enabled || !this.audioContext) return;

        const frequencies = [150 + Math.random() * 50, 180 + Math.random() * 50];
        this.playNote(frequencies, [0.05, 0.05]);
    }

    /**
     * Toca som de vitória
     */
    playVictory() {
        const notes = [523, 659, 784, 1047];
        const durations = [0.15, 0.15, 0.15, 0.3];
        this.playNote(notes, durations);
    }

    /**
     * Toca som de derrota
     */
    playDefeat() {
        const notes = [400, 350, 300, 250];
        const durations = [0.2, 0.2, 0.2, 0.4];
        this.playNote(notes, durations);
    }

    /**
     * Toca melodia de intro
     */
    playIntro() {
        const notes = [392, 440, 494, 523, 587];
        const durations = [0.2, 0.2, 0.2, 0.2, 0.4];
        this.playNote(notes, durations);
    }

    /**
     * Toca som de transição
     */
    playTransition() {
        if (!this.enabled || !this.audioContext) return;

        const notes = [659, 784, 659];
        const durations = [0.1, 0.2, 0.15];
        this.playNote(notes, durations);
    }

    /**
     * Cria tom de teste
     */
    playTest() {
        this.playTone(440, 0.5, 0.2);
    }

    /**
     * Toca som ambient/background
     */
    playAmbient(duration = 3) {
        if (!this.enabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const lowpass = this.audioContext.createBiquadFilter();

            oscillator.connect(lowpass);
            lowpass.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + duration);

            gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0, this.audioContext.currentTime + duration);

            lowpass.frequency.setValueAtTime(100, this.audioContext.currentTime);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            // Silent fail
        }
    }

    /**
     * Toca som para resposta correta
     */
    playCorrect() {
        this.playSuccess();
    }

    /**
     * Toca som para resposta incorreta
     */
    playIncorrect() {
        this.playError();
    }

    /**
     * Para todos os sons em execução
     */
    stopAll() {
        if (this.audioContext && this.audioContext.state === 'running') {
            this.audioContext.suspend();
            this.audioContext.resume();
        }
    }

    /**
     * Cria efeito de eco simples
     */
    playEcho(frequency, count = 3, decay = 0.5) {
        if (!this.enabled || !this.audioContext) return;

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.playTone(frequency, 0.1, this.volume * (1 - (i / count)));
            }, i * 200);
        }
    }

    /**
     * Toca glissando (efeito de deslizamento)
     */
    playGlissando(startFreq, endFreq, duration) {
        if (!this.enabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(startFreq, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(endFreq, this.audioContext.currentTime + duration);

            gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            // Silent fail
        }
    }
}

// Create global instance
const soundManager = new SoundManager();
window.SoundManager = SoundManager;
window.soundManager = soundManager;
