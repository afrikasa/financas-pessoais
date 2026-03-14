@echo off
echo ================================
echo  GIT - SETUP INICIAL
echo ================================
echo.
echo Este script vai:
echo   1. Inicializar Git
echo   2. Criar primeiro commit
echo   3. Preparar para GitHub
echo.
pause

echo.
echo ================================
echo  PASSO 1: Inicializar Git
echo ================================
git init

if %errorlevel% neq 0 (
    echo.
    echo ERRO: Git nao instalado!
    echo.
    echo Instala Git:
    echo   https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo.
echo ================================
echo  PASSO 2: Configurar Git
echo ================================
echo.
echo Digite seu nome (ex: Marcus Costa):
set /p GIT_NAME=Nome: 

echo Digite seu email do GitHub:
set /p GIT_EMAIL=Email: 

git config user.name "%GIT_NAME%"
git config user.email "%GIT_EMAIL%"

echo.
echo ✅ Git configurado!
echo    Nome: %GIT_NAME%
echo    Email: %GIT_EMAIL%

echo.
echo ================================
echo  PASSO 3: Primeiro Commit
echo ================================
echo.

git add .
git commit -m "🎉 Inicial commit - App Financas Pessoais"

echo.
echo ================================
echo  ✅ GIT PRONTO!
echo ================================
echo.
echo Proximo passo:
echo   1. Cria repositorio no GitHub
echo   2. Corre: GITHUB-PUSH.bat
echo.
echo OU usa: GITHUB-GUIDE.md
echo.
pause
