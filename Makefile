.PHONY: help serve clean test

help:
	@echo "PyDetetive - Plataforma de Ensino de Python"
	@echo ""
	@echo "Comandos disponíveis:"
	@echo "  make serve   - Inicia servidor HTTP local na porta 8000"
	@echo "  make clean   - Remove arquivos temporários"
	@echo "  make help    - Mostra esta mensagem"
	@echo ""
	@echo "Para usar a ferramenta:"
	@echo "  1. Execute: make serve"
	@echo "  2. Abra: http://localhost:8000"
	@echo "  3. Selecione uma fase"
	@echo "  4. Escreva código Python e clique em Executar"

serve:
	python -m http.server 8000

clean:
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete 2>/dev/null || true
	find . -type f -name ".DS_Store" -delete 2>/dev/null || true
