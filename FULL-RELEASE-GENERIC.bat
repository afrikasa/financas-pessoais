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
echo TUDO AUTOMATICO!
echo.
pause

REM Verifica GitHub CLI
gh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ================================
    echo  GitHub CLI NAO INSTALADO
    echo ================================
    echo.
    echo GitHub CLI necessario para release automatico.
    echo.
    echo Opcoes:
    echo   1. Instala: https://cli.github.com/
    echo   2. OU continua sem release automatico
    echo.
    set /p CONTINUE=Continuar sem GitHub CLI? (S/N): 
    
    if /i "!CONTINUE!" neq "S" (
        echo.
        echo Instala GitHub CLI primeiro.
        echo Depois corre novamente.
        pause
        exit /b 0
    )
    
    set NO_GH_CLI=1
)

echo.
echo ================================
echo  NOVA VERSAO
echo ================================
echo.

REM Le versao atual do package.json
for /f "tokens=2 delims=:, " %%a in ('findstr /C:"\"version\"" package.json') do (
    set CURRENT_VERSION=%%a
    set CURRENT_VERSION=!CURRENT_VERSION:"=!
)

echo Versao atual: v!CURRENT_VERSION!
echo.
echo Digite a NOVA versao (ex: 1.8.5, 1.9.0, 2.0.0):
set /p NEW_VERSION=v

echo.
echo ================================
echo  TIPO DE RELEASE
echo ================================
echo.
echo 1. PATCH (v1.8.X) - Bug fixes
echo 2. MINOR (v1.X.0) - Novas features
echo 3. MAJOR (v2.0.0) - Breaking changes
echo.
set /p TYPE=Escolhe (1/2/3): 

if "!TYPE!"=="1" (
    set TYPE_NAME=PATCH
    set EMOJI=🔧
)
if "!TYPE!"=="2" (
    set TYPE_NAME=MINOR
    set EMOJI=✨
)
if "!TYPE!"=="3" (
    set TYPE_NAME=MAJOR
    set EMOJI=🚀
)

echo.
echo ================================
echo  TITULO
echo ================================
echo.
set /p TITLE=Titulo da release: 

echo.
echo ================================
echo  PREVIEW
echo ================================
echo.
echo Versao: v!CURRENT_VERSION! → v!NEW_VERSION!
echo Tipo: !TYPE_NAME! (!EMOJI!)
echo Titulo: !TITLE!
echo.
set /p CONFIRM=Confirma? (S/N): 

if /i "!CONFIRM!" neq "S" (
    echo Cancelado.
    pause
    exit /b 0
)

echo.
echo ================================
echo  1. Atualizando package.json...
echo ================================

powershell -Command "(Get-Content package.json) -replace '\"version\": \".*\"', '\"version\": \"!NEW_VERSION!\"' | Set-Content package.json"

echo OK package.json atualizado para v!NEW_VERSION!

echo.
echo ================================
echo  2. Criando release notes...
echo ================================

set RELEASE_FILE=GITHUB-RELEASE-v!NEW_VERSION!.md

(
echo # !EMOJI! v!NEW_VERSION! - !TITLE!
echo.
echo **Released:** %date%
echo **Type:** !TYPE_NAME!
echo **Deploy:** https://financas-pessoais-two.vercel.app
echo.
echo ---
echo.
echo ## !EMOJI! !TITLE!
echo.
echo See [CHANGELOG.md]^(CHANGELOG.md^) for complete details.
echo.
echo ---
echo.
echo ## Como Atualizar
echo.
echo Refresh browser ^(Ctrl+F5^) - update automatico!
echo.
echo ---
echo.
echo ## Links
echo.
echo - **Live App:** https://financas-pessoais-two.vercel.app
echo - **Repository:** https://github.com/afrikasa/financas-pessoais
echo - **Changelog:** [CHANGELOG.md]^(CHANGELOG.md^)
echo.
echo ---
echo.
echo **Made with love by Marcus Costa**
) > "!RELEASE_FILE!"

echo OK Release notes criado: !RELEASE_FILE!

echo.
echo ================================
echo  3. Git commit + push...
echo ================================

git add .
git commit -m "v!NEW_VERSION!: !TITLE!"

if %errorlevel% neq 0 (
    echo Nenhuma mudanca para commitar
    set /p CONTINUE_PUSH=Continuar mesmo assim? (S/N): 
    if /i "!CONTINUE_PUSH!" neq "S" (
        pause
        exit /b 0
    )
)

git push origin main

if %errorlevel% neq 0 (
    echo ERRO no push!
    pause
    exit /b 1
)

echo OK Commit e push completos!

echo.
echo ================================
echo  4. Criando tag...
echo ================================

git tag -a v!NEW_VERSION! -m "!TYPE_NAME!: !TITLE!"
git push origin v!NEW_VERSION!

if %errorlevel% neq 0 (
    echo ERRO ao criar tag!
    echo.
    echo Tag ja existe?
    set /p DELETE_TAG=Deletar e recriar? (S/N): 
    if /i "!DELETE_TAG!"=="S" (
        git tag -d v!NEW_VERSION!
        git push origin :refs/tags/v!NEW_VERSION!
        git tag -a v!NEW_VERSION! -m "!TYPE_NAME!: !TITLE!"
        git push origin v!NEW_VERSION!
    ) else (
        pause
        exit /b 1
    )
)

echo OK Tag v!NEW_VERSION! criada e enviada!

if defined NO_GH_CLI (
    echo.
    echo ================================
    echo  GitHub Release MANUAL
    echo ================================
    echo.
    echo GitHub CLI nao instalado.
    echo.
    echo Cria release manual:
    echo   1. Vai: https://github.com/afrikasa/financas-pessoais/releases/new
    echo   2. Tag: v!NEW_VERSION!
    echo   3. Title: !EMOJI! v!NEW_VERSION! - !TITLE!
    echo   4. Descricao: [cola !RELEASE_FILE!]
    echo   5. Publish release
    echo.
    
    start https://github.com/afrikasa/financas-pessoais/releases/new
    
    goto :fim
)

echo.
echo ================================
echo  5. Criando GitHub Release...
echo ================================

gh release create v!NEW_VERSION! ^
    --title "!EMOJI! v!NEW_VERSION! - !TITLE!" ^
    --notes-file "!RELEASE_FILE!" ^
    --repo afrikasa/financas-pessoais ^
    --latest

if %errorlevel% neq 0 (
    echo ERRO ao criar release!
    echo.
    echo Cria manual em:
    echo   https://github.com/afrikasa/financas-pessoais/releases/new
    echo.
    start https://github.com/afrikasa/financas-pessoais/releases/new
    pause
    exit /b 1
)

echo OK GitHub Release criado!

:fim
echo.
echo ================================
echo  TUDO COMPLETO!
echo ================================
echo.
echo OK Version: v!CURRENT_VERSION! → v!NEW_VERSION!
echo OK package.json atualizado
echo OK Release notes criado
echo OK Git commit + push
echo OK Tag criada
if not defined NO_GH_CLI (
    echo OK GitHub release publicado
)
echo OK Vercel deploy iniciado
echo.
echo Release: https://github.com/afrikasa/financas-pessoais/releases/tag/v!NEW_VERSION!
echo.

if not defined NO_GH_CLI (
    start https://github.com/afrikasa/financas-pessoais/releases/tag/v!NEW_VERSION!
)

echo.
echo RELEASE v!NEW_VERSION! ONLINE!
echo.
pause
