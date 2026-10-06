@echo off
REM Script para iniciar o servidor PyDetetive no Windows

echo.
echo 🚀 Iniciando PyDetetive...
echo 📂 Diretório: %CD%
echo 🌐 Acesse: http://localhost:8000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

python -m http.server 8000
pause
