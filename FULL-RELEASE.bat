@echo off
setlocal enabledelayedexpansion

echo ================================
echo  WORKFLOW COMPLETO AUTOMATICO
echo ================================
echo.
echo Este script vai:
echo   1. Pedir nova versao
echo   2. Atualizar package.json
echo   3. Criar release notes
echo   4. Commit + Push
echo   5. Criar tag
echo   6. Criar release GitHub
echo.
echo TUDO AUTOMATICO
echo.
pause

REM Verifica GitHub CLI
gh --version >nul 2>&1
if %errorlevel% neq 0 (
    set NO_GH_CLI=1
    echo GitHub CLI nao instalado - release sera manual
    echo.
    pause
)

echo.
echo ================================
echo  NOVA VERSAO
echo ================================
echo.

REM Le versao atual
for /f "tokens=2 delims=:, " %%a in ('findstr /C:"\"version\"" package.json') do (
    set CURRENT_VERSION=%%a
    set CURRENT_VERSION=!CURRENT_VERSION:"=!
)

echo Versao atual: v!CURRENT_VERSION!
echo.
set /p NEW_VERSION=Digite a NOVA versao (ex 1.8.4): v

echo.
echo ================================
echo  TIPO DE RELEASE
echo ================================
echo.
echo 1. PATCH - Bug fixes
echo 2. MINOR - Novas features
echo 3. MAJOR - Breaking changes
echo.
set /p TYPE=Escolhe (1/2/3): 

if "!TYPE!"=="1" set TYPE_NAME=PATCH
if "!TYPE!"=="2" set TYPE_NAME=MINOR
if "!TYPE!"=="3" set TYPE_NAME=MAJOR

echo.
set /p TITLE=Titulo da release: 

echo.
echo ================================
echo  PREVIEW
echo ================================
echo.
echo Versao: v!CURRENT_VERSION! para v!NEW_VERSION!
echo Tipo: !TYPE_NAME!
echo Titulo: !TITLE!
echo.
set /p CONFIRM=Confirma? (S/N): 

if /i not "!CONFIRM!"=="S" (
    echo Cancelado
    pause
    exit /b 0
)

echo.
echo ================================
echo  Atualizando package.json
echo ================================

powershell -Command "(Get-Content package.json) -replace '\"version\": \".*\"', '\"version\": \"!NEW_VERSION!\"' | Set-Content package.json"

echo OK - package.json atualizado

echo.
echo ================================
echo  Criando release notes
echo ================================

set RELEASE_FILE=GITHUB-RELEASE-v!NEW_VERSION!.md

echo # v!NEW_VERSION! - !TITLE! > "!RELEASE_FILE!"
echo. >> "!RELEASE_FILE!"
echo **Released:** %date% >> "!RELEASE_FILE!"
echo **Type:** !TYPE_NAME! >> "!RELEASE_FILE!"
echo. >> "!RELEASE_FILE!"
echo ## !TITLE! >> "!RELEASE_FILE!"
echo. >> "!RELEASE_FILE!"
echo See CHANGELOG.md for details >> "!RELEASE_FILE!"

echo OK - Release notes criado

echo.
echo ================================
echo  Git commit + push
echo ================================

git add .
git commit -m "v!NEW_VERSION!: !TITLE!"
git push origin main

echo OK - Codigo enviado

echo.
echo ================================
echo  Criando tag
echo ================================

git tag -d v!NEW_VERSION! >nul 2>&1
git push origin :refs/tags/v!NEW_VERSION! >nul 2>&1
git tag -a v!NEW_VERSION! -m "!TYPE_NAME!: !TITLE!"
git push origin v!NEW_VERSION!

echo OK - Tag criada

if defined NO_GH_CLI (
    echo.
    echo ================================
    echo  Criar release MANUAL
    echo ================================
    echo.
    echo Vai para:
    echo https://github.com/afrikasa/financas-pessoais/releases/new
    echo.
    echo Tag: v!NEW_VERSION!
    echo Title: v!NEW_VERSION! - !TITLE!
    echo Descricao: [cola !RELEASE_FILE!]
    echo.
    start https://github.com/afrikasa/financas-pessoais/releases/new
    goto fim
)

echo.
echo ================================
echo  Criando GitHub Release
echo ================================

gh release create v!NEW_VERSION! --title "v!NEW_VERSION! - !TITLE!" --notes-file "!RELEASE_FILE!" --repo afrikasa/financas-pessoais --latest

if %errorlevel% neq 0 (
    echo Erro - cria manual
    start https://github.com/afrikasa/financas-pessoais/releases/new
    pause
    exit /b 1
)

echo OK - Release publicado
start https://github.com/afrikasa/financas-pessoais/releases/tag/v!NEW_VERSION!

:fim
echo.
echo ================================
echo  COMPLETO
echo ================================
echo.
echo Versao v!NEW_VERSION! publicada
echo.
pause
