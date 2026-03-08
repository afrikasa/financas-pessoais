@echo off
echo ================================
echo  CRIAR NOVA RELEASE
echo ================================
echo.
echo Este script vai:
echo   1. Pedir versao e tipo
echo   2. Gerar release notes
echo   3. Criar ficheiro Markdown
echo   4. Criar tag Git
echo.
pause

echo.
echo ================================
echo  VERSAO
echo ================================
echo.
echo Versao atual no package.json:
type package.json | findstr "version"
echo.
echo Digite a NOVA versao (ex: 1.2.0):
set /p VERSION=v

echo.
echo ================================
echo  TIPO DE RELEASE
echo ================================
echo.
echo 1. MAJOR (v2.0.0) - Breaking changes
echo 2. MINOR (v1.X.0) - Novas features
echo 3. PATCH (v1.1.X) - Bug fixes
echo.
set /p RELEASE_TYPE=Escolhe (1/2/3): 

if "%RELEASE_TYPE%"=="1" (
    set TYPE_NAME=MAJOR
    set TYPE_EMOJI=🚀
    set TYPE_DESC=Breaking Changes
)
if "%RELEASE_TYPE%"=="2" (
    set TYPE_NAME=MINOR
    set TYPE_EMOJI=✨
    set TYPE_DESC=New Features
)
if "%RELEASE_TYPE%"=="3" (
    set TYPE_NAME=PATCH
    set TYPE_EMOJI=🔧
    set TYPE_DESC=Bug Fixes
)

echo.
echo ================================
echo  TITULO DA RELEASE
echo ================================
echo.
echo Exemplos:
echo   - Cloud Sync
echo   - Dark Mode
echo   - Firebase Integration
echo   - Performance Improvements
echo.
set /p TITLE=Titulo: 

echo.
echo ================================
echo  HIGHLIGHTS
echo ================================
echo.
echo Digite os highlights (um por linha)
echo Digite "FIM" quando terminar
echo.

set COUNT=0
set /a HIGHLIGHT_COUNT=0

:LOOP_HIGHLIGHTS
set /p HIGHLIGHT=Highlight %COUNT%: 
if "%HIGHLIGHT%"=="FIM" goto END_HIGHLIGHTS
if "%HIGHLIGHT%"=="fim" goto END_HIGHLIGHTS
if "%HIGHLIGHT%"=="" goto END_HIGHLIGHTS

set HIGHLIGHTS[%COUNT%]=%HIGHLIGHT%
set /a COUNT+=1
goto LOOP_HIGHLIGHTS

:END_HIGHLIGHTS
set /a HIGHLIGHT_COUNT=%COUNT%

if %HIGHLIGHT_COUNT%==0 (
    echo Nenhum highlight adicionado!
    pause
    exit /b 1
)

echo.
echo ================================
echo  PREVIEW
echo ================================
echo.
echo Versao: v%VERSION%
echo Tipo: %TYPE_NAME% (%TYPE_EMOJI% %TYPE_DESC%)
echo Titulo: %TITLE%
echo.
echo Highlights:
for /L %%i in (0,1,%COUNT%) do (
    if defined HIGHLIGHTS[%%i] echo   - !HIGHLIGHTS[%%i]!
)
echo.
echo Confirma? (S/N)
set /p CONFIRM=

if /i not "%CONFIRM%"=="S" (
    echo Cancelado!
    pause
    exit /b 0
)

echo.
echo ================================
echo  CRIANDO RELEASE NOTES...
echo ================================

set FILENAME=GITHUB-RELEASE-v%VERSION%.md

(
echo # %TYPE_EMOJI% APP-FINANCAS-PESSOAIS v%VERSION%
echo.
echo **Released:** %date%
echo **Type:** %TYPE_DESC%
echo **Deploy:** https://financas-pessoais-two.vercel.app
echo.
echo ---
echo.
echo ## %TYPE_EMOJI% %TITLE%
echo.
echo ### What's New
echo.
) > %FILENAME%

REM Add highlights
for /L %%i in (0,1,%COUNT%) do (
    if defined HIGHLIGHTS[%%i] echo - ✅ !HIGHLIGHTS[%%i]! >> %FILENAME%
)

(
echo.
echo ---
echo.
echo ## 📥 How to Update
echo.
echo ### For Existing Users:
echo Simply refresh your browser ^(Ctrl+F5^). The update applies automatically!
echo.
echo ### New Installation:
echo Visit https://financas-pessoais-two.vercel.app
echo.
echo ---
echo.
echo ## 📋 Full Changelog
echo.
echo See [CHANGELOG.md]^(CHANGELOG.md^) for complete technical details.
echo.
echo ---
echo.
echo ## 🔗 Links
echo.
echo - **Live App:** https://financas-pessoais-two.vercel.app
echo - **Repository:** https://github.com/afrikasa/financas-pessoais
echo - **Documentation:** [README.md]^(README.md^)
echo.
echo ---
echo.
echo ## 📊 Version History
echo.
echo ```
echo v%VERSION% ^(%date%^) - %TITLE%
echo ```
echo.
echo ---
echo.
echo ⭐ **Star this repo if you find it useful!**
echo.
echo 💬 **Share feedback in Discussions**
echo.
echo 🐛 **Report bugs in Issues**
echo.
echo ---
echo.
echo **Made with ❤️ by Marcus Costa**
) >> %FILENAME%

echo.
echo ✅ Release notes criado: %FILENAME%
echo.

echo.
echo ================================
echo  CRIAR TAG GIT?
echo ================================
echo.
echo Queres criar tag Git agora? (S/N)
set /p CREATE_TAG=

if /i "%CREATE_TAG%"=="S" (
    echo.
    echo Criando tag v%VERSION%...
    git tag -a v%VERSION% -m "%TITLE%"
    
    echo.
    echo Tag criada! Push para GitHub? (S/N)
    set /p PUSH_TAG=
    
    if /i "!PUSH_TAG!"=="S" (
        git push origin v%VERSION%
        echo.
        echo ✅ Tag v%VERSION% enviada para GitHub!
    )
)

echo.
echo ================================
echo  ✅ RELEASE PRONTA!
echo ================================
echo.
echo Ficheiro criado: %FILENAME%
echo.
echo Proximos passos:
echo   1. Abre %FILENAME%
echo   2. Revê e edita se necessário
echo   3. Vai a: github.com/afrikasa/financas-pessoais/releases
echo   4. Create new release
echo   5. Choose tag: v%VERSION%
echo   6. Copia conteúdo de %FILENAME%
echo   7. Publish release!
echo.
echo Lembra-te de atualizar:
echo   - package.json version
echo   - CHANGELOG.md
echo   - RELEASE-NOTES.md
echo.
pause
