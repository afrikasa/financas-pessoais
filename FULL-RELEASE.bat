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
echo TUDO AUTOMATICO! 🚀
echo.
pause

REM Verifica GitHub CLI
gh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ GitHub CLI nao instalado!
    echo Roda: SETUP-GITHUB-CLI.bat
    pause
    exit /b 1
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
echo Digite a NOVA versao (ex: 1.2.0):
set /p NEW_VERSION=v

echo.
echo ================================
echo  TIPO DE RELEASE
echo ================================
echo.
echo 1. PATCH (v1.1.X) - Bug fixes
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

echo ✅ package.json atualizado para v!NEW_VERSION!

echo.
echo ================================
echo  2. Criando release notes...
echo ================================

REM Cria ficheiro de release
set RELEASE_FILE=GITHUB-RELEASE-v!NEW_VERSION!.md

(
echo # !EMOJI! APP-FINANCAS-PESSOAIS v!NEW_VERSION!
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
echo ## 📥 How to Update
echo.
echo Refresh your browser ^(Ctrl+F5^) - update applies automatically!
echo.
echo ---
echo.
echo ## 🔗 Links
echo.
echo - **Live App:** https://financas-pessoais-two.vercel.app
echo - **Repository:** https://github.com/afrikasa/financas-pessoais
echo - **Changelog:** [CHANGELOG.md]^(CHANGELOG.md^)
echo.
echo ---
echo.
echo ⭐ **Star this repo!** • 💬 **Discussions** • 🐛 **Issues**
echo.
echo **Made with ❤️ by Marcus Costa**
) > "!RELEASE_FILE!"

echo ✅ Release notes criado: !RELEASE_FILE!

echo.
echo ================================
echo  3. Git commit + push...
echo ================================

git add .
git commit -m "v!NEW_VERSION! - !TITLE!"
git push

if %errorlevel% neq 0 (
    echo ❌ Erro no push!
    pause
    exit /b 1
)

echo ✅ Commit e push completos!

echo.
echo ================================
echo  4. Criando tag...
echo ================================

git tag -a v!NEW_VERSION! -m "!TITLE!"
git push origin v!NEW_VERSION!

if %errorlevel% neq 0 (
    echo ❌ Erro ao criar tag!
    pause
    exit /b 1
)

echo ✅ Tag v!NEW_VERSION! criada e enviada!

echo.
echo ================================
echo  5. Criando release GitHub...
echo ================================

gh release create v!NEW_VERSION! ^
    --title "!EMOJI! APP-FINANCAS-PESSOAIS v!NEW_VERSION!" ^
    --notes-file "!RELEASE_FILE!" ^
    --repo afrikasa/financas-pessoais ^
    --latest

if %errorlevel% neq 0 (
    echo ❌ Erro ao criar release!
    pause
    exit /b 1
)

echo.
echo ================================
echo  ✅ TUDO COMPLETO!
echo ================================
echo.
echo ✅ Version: v!CURRENT_VERSION! → v!NEW_VERSION!
echo ✅ package.json atualizado
echo ✅ Release notes criado
echo ✅ Git commit + push
echo ✅ Tag criada
echo ✅ GitHub release publicada
echo ✅ Vercel deploy iniciado
echo.
echo Release: https://github.com/afrikasa/financas-pessoais/releases/tag/v!NEW_VERSION!
echo.

start https://github.com/afrikasa/financas-pessoais/releases/tag/v!NEW_VERSION!

echo.
echo 🎉 RELEASE v!NEW_VERSION! ONLINE!
echo.
pause
