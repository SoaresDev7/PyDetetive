/**
 * Python Syntax Highlighter
 * Fornece syntax highlighting para código Python
 */

class PythonSyntaxHighlighter {
    constructor() {
        this.keywords = [
            'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
            'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
            'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
            'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try',
            'while', 'with', 'yield'
        ];

        this.builtins = [
            'abs', 'all', 'any', 'ascii', 'bin', 'bool', 'breakpoint', 'bytearray',
            'bytes', 'callable', 'chr', 'classmethod', 'compile', 'complex',
            'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'exec',
            'filter', 'float', 'format', 'frozenset', 'getattr', 'globals',
            'hasattr', 'hash', 'hex', 'id', 'input', 'int', 'isinstance',
            'issubclass', 'iter', 'len', 'list', 'locals', 'map', 'max',
            'memoryview', 'min', 'next', 'object', 'oct', 'open', 'ord',
            'pow', 'print', 'property', 'range', 'repr', 'reversed', 'round',
            'set', 'setattr', 'slice', 'sorted', 'staticmethod', 'str', 'sum',
            'super', 'tuple', 'type', 'vars', 'zip'
        ];
    }

    /**
     * Tokeniza código Python
     */
    tokenize(code) {
        const tokens = [];
        let i = 0;

        while (i < code.length) {
            // Comments
            if (code[i] === '#') {
                let end = code.indexOf('\n', i);
                if (end === -1) end = code.length;
                tokens.push({
                    type: 'comment',
                    value: code.substring(i, end)
                });
                i = end;
                continue;
            }

            // Strings (double quotes)
            if (code[i] === '"') {
                let j = i + 1;
                while (j < code.length && code[j] !== '"') {
                    if (code[j] === '\\') j += 2;
                    else j++;
                }
                tokens.push({
                    type: 'string',
                    value: code.substring(i, j + 1)
                });
                i = j + 1;
                continue;
            }

            // Strings (single quotes)
            if (code[i] === "'") {
                let j = i + 1;
                while (j < code.length && code[j] !== "'") {
                    if (code[j] === '\\') j += 2;
                    else j++;
                }
                tokens.push({
                    type: 'string',
                    value: code.substring(i, j + 1)
                });
                i = j + 1;
                continue;
            }

            // Numbers
            if (/\d/.test(code[i])) {
                let j = i;
                while (j < code.length && /[\d\.]/.test(code[j])) j++;
                tokens.push({
                    type: 'number',
                    value: code.substring(i, j)
                });
                i = j;
                continue;
            }

            // Identifiers and keywords
            if (/[a-zA-Z_]/.test(code[i])) {
                let j = i;
                while (j < code.length && /[a-zA-Z0-9_]/.test(code[j])) j++;
                const word = code.substring(i, j);

                let type = 'identifier';
                if (this.keywords.includes(word)) {
                    type = 'keyword';
                } else if (this.builtins.includes(word)) {
                    type = 'builtin';
                }

                tokens.push({ type, value: word });
                i = j;
                continue;
            }

            // Operators and punctuation
            if (/[+\-*/%=<>!&|^~()[\]{}.,;:]/.test(code[i])) {
                let j = i;
                // Multi-character operators
                if (i + 1 < code.length) {
                    const two = code.substring(i, i + 2);
                    if (['==', '!=', '<=', '>=', '//', '**', '<<', '>>', '+=', '-=',
                         '*=', '/=', '%=', '&=', '|=', '^='].includes(two)) {
                        j = i + 2;
                    }
                }

                if (j === i) {
                    j = i + 1;
                }

                tokens.push({
                    type: 'operator',
                    value: code.substring(i, j)
                });
                i = j;
                continue;
            }

            // Whitespace
            if (/\s/.test(code[i])) {
                let j = i;
                while (j < code.length && /\s/.test(code[j]) && code[j] !== '\n') j++;
                tokens.push({
                    type: 'whitespace',
                    value: code.substring(i, j)
                });
                i = j;
                continue;
            }

            // Newlines
            if (code[i] === '\n') {
                tokens.push({
                    type: 'newline',
                    value: '\n'
                });
                i++;
                continue;
            }

            // Unknown
            tokens.push({
                type: 'unknown',
                value: code[i]
            });
            i++;
        }

        return tokens;
    }

    /**
     * Constrói HTML com cores de syntax highlighting
     */
    highlightToHTML(code) {
        const tokens = this.tokenize(code);
        const colors = {
            'keyword': '#C41E3A',     // Red for keywords
            'builtin': '#1C3A47',     // Blue for builtins
            'string': '#51CF66',      // Green for strings
            'number': '#FF9500',      // Orange for numbers
            'comment': '#718096',     // Gray for comments
            'operator': '#8B4513',    // Brown for operators
            'identifier': '#2D3748',  // Dark for identifiers
            'whitespace': 'inherit',
            'newline': 'inherit',
            'unknown': 'inherit'
        };

        return tokens.map(token => {
            if (token.value === '') return '';
            if (token.type === 'whitespace' || token.type === 'newline') {
                return token.value;
            }
            const color = colors[token.type] || 'inherit';
            const style = color !== 'inherit' ? `color: ${color};` : '';
            if (style) {
                return `<span style="${style}">${escapeHtml(token.value)}</span>`;
            }
            return escapeHtml(token.value);
        }).join('');
    }

    /**
     * Cria overlay de syntax highlighting
     */
    createHighlightLayer(code) {
        const html = this.highlightToHTML(code);
        return `<pre><code>${html}</code></pre>`;
    }
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Configura editor com syntax highlighting
 */
function setupSyntaxHighlighting() {
    const editor = document.getElementById('editor');
    if (!editor) return;

    const highlighter = new PythonSyntaxHighlighter();

    // Criar container de highlight
    const highlightDiv = document.createElement('div');
    highlightDiv.style.position = 'absolute';
    highlightDiv.style.top = '0';
    highlightDiv.style.left = '0';
    highlightDiv.style.width = '100%';
    highlightDiv.style.height = '100%';
    highlightDiv.style.padding = 'var(--spacing-md)';
    highlightDiv.style.fontFamily = "'Fira Code', monospace";
    highlightDiv.style.fontSize = '13px';
    highlightDiv.style.lineHeight = '1.6';
    highlightDiv.style.whiteSpace = 'pre-wrap';
    highlightDiv.style.wordWrap = 'break-word';
    highlightDiv.style.overflow = 'hidden';
    highlightDiv.style.pointerEvents = 'none';
    highlightDiv.style.color = 'transparent';
    highlightDiv.style.zIndex = '1';
    highlightDiv.id = 'highlightLayer';

    const wrapper = editor.parentElement;
    if (wrapper && wrapper.classList.contains('editor-wrapper')) {
        wrapper.style.position = 'relative';
        wrapper.appendChild(highlightDiv);

        // Update highlighting on input
        const updateHighlight = () => {
            highlightDiv.innerHTML = highlighter.createHighlightLayer(editor.value);
        };

        editor.addEventListener('input', updateHighlight);
        editor.addEventListener('scroll', () => {
            highlightDiv.scrollTop = editor.scrollTop;
            highlightDiv.scrollLeft = editor.scrollLeft;
        });

        // Initial highlight
        updateHighlight();
    }
}

// Create global instance
const pythonHighlighter = new PythonSyntaxHighlighter();
window.PythonSyntaxHighlighter = PythonSyntaxHighlighter;
window.setupSyntaxHighlighting = setupSyntaxHighlighting;
