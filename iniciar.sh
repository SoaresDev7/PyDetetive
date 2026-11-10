#!/bin/bash
# Sobe um servidor local do PyDetetive na porta 8000 (Linux / macOS).
cd "$(dirname "${BASH_SOURCE[0]}")" || exit 1

echo "Iniciando PyDetetive..."
echo "Acesse: http://localhost:8000"
echo "Pressione Ctrl+C para parar o servidor."
echo

if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server 8000
else
  exec python -m http.server 8000
fi
