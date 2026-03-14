@echo off
setlocal

echo.
echo ============================================================
echo           GIT SETUP - PRIMEIRA VEZ
echo ============================================================
echo.

echo Este script vai:
echo   1. Inicializar Git
echo   2. Conectar ao GitHub
echo   3. Fazer primeiro commit
echo   4. Criar tag v1.8.4
echo   5. Push tudo
echo.
set /p CONFIRM="Continuar? (S/N): "

if /i not "%CONFIRM%"=="S" (
    echo Cancelado!
    pause
    exit /b 0
)

echo.
echo [1/8] Inicializando Git...
git init
if errorlevel 1 (
    echo ERRO ao inicializar Git!
    pause
    exit /b 1
)

echo [2/8] Configurando branch main...
git branch -M main

echo [3/8] Adicionando remote GitHub...
git remote add origin https://github.com/afrikasa/financas-pessoais.git
if errorlevel 1 (
    echo Remote ja existe, atualizando...
    git remote set-url origin https://github.com/afrikasa/financas-pessoais.git
)

echo [4/8] Adicionando ficheiros...
git add .

echo [5/8] Criando commit inicial...
git commit -m "v1.8.4: Temas Personalizaveis - Setup inicial"

echo [6/8] Criando tag v1.8.4...
git tag -a v1.8.4 -m "MINOR: Temas Personalizaveis"

echo [7/8] Enviando para GitHub (primeira vez)...
git push -u origin main --force
if errorlevel 1 (
    echo ERRO ao enviar codigo!
    echo.
    echo Possiveis causas:
    echo   - Repo nao existe no GitHub
    echo   - Sem permissao
    echo   - Credenciais incorretas
    pause
    exit /b 1
)

echo [8/8] Enviando tags...
git push origin --tags

echo.
echo ============================================================
echo              SETUP COMPLETO!
echo ============================================================
echo.
echo   Git inicializado
echo   Conectado ao GitHub
echo   Codigo enviado
echo   Tag v1.8.4 criada
echo.
echo Proximos passos:
echo   1. Verifica: https://github.com/afrikasa/financas-pessoais
echo   2. Das proximas vezes usa: FULL-RELEASE.bat
echo.
pause
