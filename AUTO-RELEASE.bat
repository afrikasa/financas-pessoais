@echo off
setlocal enabledelayedexpansion

echo ================================
echo  AUTO RELEASE - 100%% AUTOMATICO
echo ================================
echo.

REM Verifica se GitHub CLI esta instalado
gh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ GitHub CLI nao instalado!
    echo.
    echo Roda primeiro: SETUP-GITHUB-CLI.bat
    pause
    exit /b 1
)

REM Verifica autenticacao
gh auth status >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Nao autenticado no GitHub!
    echo.
    echo Roda primeiro: SETUP-GITHUB-CLI.bat
    pause
    exit /b 1
)

echo ✅ GitHub CLI configurado
echo.

REM Le versao do package.json
for /f "tokens=2 delims=:, " %%a in ('findstr /C:"\"version\"" package.json') do (
    set VERSION=%%a
    set VERSION=!VERSION:"=!
)

echo Versao atual: v!VERSION!
echo.

REM Le ultima entrada do CHANGELOG.md para obter release notes
echo Lendo CHANGELOG.md...

REM Cria nome do ficheiro de release notes
set RELEASE_FILE=GITHUB-RELEASE-v!VERSION!.md

if not exist "%RELEASE_FILE%" (
    echo.
    echo ⚠️  Ficheiro %RELEASE_FILE% nao encontrado!
    echo.
    echo Opcoes:
    echo   1. Cria manualmente: CREATE-RELEASE.bat
    echo   2. Ou continua com CHANGELOG.md basico
    echo.
    set /p CONTINUE=Continuar com CHANGELOG basico? (S/N): 
    if /i "!CONTINUE!" neq "S" (
        echo Cancelado.
        pause
        exit /b 0
    )
    
    REM Usa CHANGELOG.md como base
    set NOTES_FILE=CHANGELOG.md
) else (
    set NOTES_FILE=%RELEASE_FILE%
)

echo.
echo ================================
echo  CRIAR RELEASE
echo ================================
echo.
echo Versao: v!VERSION!
echo Repositorio: afrikasa/financas-pessoais
echo Release notes: !NOTES_FILE!
echo.
echo Esta release sera criada no GitHub!
echo.
set /p CONFIRM=Confirma? (S/N): 

if /i "!CONFIRM!" neq "S" (
    echo Cancelado.
    pause
    exit /b 0
)

echo.
echo ================================
echo  Criando release no GitHub...
echo ================================
echo.

REM Cria release com GitHub CLI
if exist "%RELEASE_FILE%" (
    REM Usa ficheiro de release completo
    gh release create v!VERSION! ^
        --title "🔧 APP-FINANCAS-PESSOAIS v!VERSION!" ^
        --notes-file "%RELEASE_FILE%" ^
        --repo afrikasa/financas-pessoais ^
        --latest
) else (
    REM Usa notas do CHANGELOG
    gh release create v!VERSION! ^
        --title "APP-FINANCAS-PESSOAIS v!VERSION!" ^
        --notes "See CHANGELOG.md for details" ^
        --repo afrikasa/financas-pessoais ^
        --latest
)

if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO ao criar release!
    echo.
    echo Possiveis causas:
    echo   - Tag v!VERSION! ja existe
    echo   - Release v!VERSION! ja existe
    echo   - Sem permissoes
    echo.
    echo Tenta manualmente:
    echo   gh release create v!VERSION! --notes-file %RELEASE_FILE%
    pause
    exit /b 1
)

echo.
echo ================================
echo  ✅ RELEASE CRIADA!
echo ================================
echo.
echo Release: https://github.com/afrikasa/financas-pessoais/releases/tag/v!VERSION!
echo.
echo A release esta agora publica no GitHub! 🎉
echo.

REM Abre release no browser
set /p OPEN=Abrir release no browser? (S/N): 
if /i "!OPEN!"=="S" (
    start https://github.com/afrikasa/financas-pessoais/releases/tag/v!VERSION!
)

pause
