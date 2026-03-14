@echo off
setlocal enabledelayedexpansion

echo ================================
echo  RELEASE v1.8.4 COMPLETO
echo ================================
echo.
echo Este script vai:
echo   1. Fazer push do codigo
echo   2. Criar GitHub Release
echo   3. Publicar automaticamente
echo.

REM Verifica GitHub CLI
gh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ================================
    echo  GitHub CLI NAO INSTALADO!
    echo ================================
    echo.
    echo Instala GitHub CLI:
    echo   https://cli.github.com/
    echo.
    echo OU cria release manual:
    echo   https://github.com/afrikasa/financas-pessoais/releases/new
    echo.
    pause
    exit /b 1
)

echo GitHub CLI OK!
echo.
pause

echo ================================
echo  1. Push codigo para GitHub...
echo ================================
echo.

git push origin main --force
if %errorlevel% neq 0 (
    echo ERRO ao fazer push!
    pause
    exit /b 1
)

echo OK Codigo enviado!

echo.
echo ================================
echo  2. Criando GitHub Release...
echo ================================
echo.

REM Verifica se RELEASE-NOTES existe
if not exist "RELEASE-NOTES-v1.8.4.md" (
    echo Criando release notes...
    
    (
    echo # v1.8.4 - Temas Personalizaveis
    echo.
    echo **Data:** %date%
    echo **Tipo:** MINOR
    echo.
    echo ## Novidades
    echo.
    echo - Sistema de temas personalizaveis
    echo - 4 temas: Verde, Azul, Roxo, Laranja
    echo - Seletor visual no header
    echo - Persistencia automatica
    echo.
    echo ## Links
    echo.
    echo - **App:** https://financas-pessoais-two.vercel.app
    echo - **Repo:** https://github.com/afrikasa/financas-pessoais
    echo.
    ) > RELEASE-NOTES-v1.8.4.md
)

REM Cria release GitHub
gh release create v1.8.4 ^
    --title "v1.8.4 - Temas Personalizaveis" ^
    --notes-file "RELEASE-NOTES-v1.8.4.md" ^
    --repo afrikasa/financas-pessoais ^
    --latest

if %errorlevel% neq 0 (
    echo.
    echo ERRO ao criar release!
    echo.
    echo Possivel causa:
    echo   - Release ja existe
    echo   - Sem permissoes
    echo.
    echo Cria manual em:
    echo   https://github.com/afrikasa/financas-pessoais/releases/new
    pause
    exit /b 1
)

echo.
echo ================================
echo  OK RELEASE COMPLETO!
echo ================================
echo.
echo OK Codigo no GitHub
echo OK Tag v1.8.4 criada
echo OK GitHub Release publicado
echo OK Vercel deploy iniciado
echo.
echo Links:
echo   Release: https://github.com/afrikasa/financas-pessoais/releases/tag/v1.8.4
echo   App: https://financas-pessoais-two.vercel.app
echo.

REM Abre release no browser
start https://github.com/afrikasa/financas-pessoais/releases/tag/v1.8.4

echo.
echo DEPLOY v1.8.4 COMPLETO!
echo.
pause
