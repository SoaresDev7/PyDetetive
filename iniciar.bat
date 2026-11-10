@echo off
REM Sobe um servidor local do PyDetetive na porta 8000 (Windows).
cd /d "%~dp0"

echo.
echo Iniciando PyDetetive...
echo Acesse: http://localhost:8000
echo Pressione Ctrl+C para parar o servidor.
echo.

where py >nul 2>nul
if %errorlevel%==0 (
  py -3 -m http.server 8000
) else (
  python -m http.server 8000
)
if errorlevel 1 (
  echo.
  echo Nao foi possivel iniciar o servidor. Instale o Python em https://www.python.org/downloads/
  echo marcando a opcao "Add python.exe to PATH" e tente novamente.
  pause
)
