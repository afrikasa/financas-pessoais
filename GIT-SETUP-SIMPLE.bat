@echo off
echo ================================
echo  GIT - SETUP INICIAL
echo ================================
echo.
echo Este script vai:
echo   1. Inicializar Git
echo   2. Configurar user
echo   3. Criar primeiro commit
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
echo OK Git configurado!
echo    Nome: %GIT_NAME%
echo    Email: %GIT_EMAIL%

echo.
echo ================================
echo  PASSO 3: Primeiro Commit
echo ================================
echo.

git add .
git commit -m "v1.8.4: Temas Personalizaveis - Setup inicial"

echo.
echo ================================
echo  OK GIT PRONTO!
echo ================================
echo.
echo Proximo passo:
echo   Corre: GITHUB-PUSH.bat
echo.
pause
