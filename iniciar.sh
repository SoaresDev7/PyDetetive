#!/bin/bash
# Script para iniciar o servidor PyDetetive

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "🚀 Iniciando PyDetetive..."
echo "📂 Diretório: $(pwd)"
echo "🌐 Acesse: http://localhost:8000"
echo ""
echo "Pressione Ctrl+C para parar o servidor"
echo ""

python -m http.server 8000
