@echo off
setlocal enabledelayedexpansion

echo.
echo ============================================================
echo      FINANCAS PWA - FULL RELEASE DEPLOYMENT
echo           Deploy Completo GitHub + Vercel
echo ============================================================
echo.

echo [1/7] Verificando estado do repositorio...
git status
echo.

set /p VERSION="Digite a versao (ex: v1.8.4): "
if "%VERSION%"=="" (
    echo ERRO: Versao obrigatoria!
    pause
    exit /b 1
)

echo.
echo Tipo de release:
echo   1 = MAJOR (v2.0.0 - Breaking changes)
echo   2 = MINOR (v1.X.0 - Novas features)
echo   3 = PATCH (v1.8.X - Bug fixes)
echo.
set /p TYPE="Digite o tipo (1/2/3): "

set RELEASE_TYPE=
if "%TYPE%"=="1" set RELEASE_TYPE=MAJOR
if "%TYPE%"=="2" set RELEASE_TYPE=MINOR
if "%TYPE%"=="3" set RELEASE_TYPE=PATCH

if "%RELEASE_TYPE%"=="" (
    echo ERRO: Tipo invalido!
    pause
    exit /b 1
)

echo.
set /p TITLE="Digite o titulo da release: "
if "%TITLE%"=="" (
    echo ERRO: Titulo obrigatorio!
    pause
    exit /b 1
)

echo.
echo ============================================================
echo                CONFIRMACAO DE DEPLOY
echo ============================================================
echo.
echo   Versao: %VERSION%
echo   Tipo:   %RELEASE_TYPE%
echo   Titulo: %TITLE%
echo.
set /p CONFIRM="Confirmar deploy? (S/N): "

if /i not "%CONFIRM%"=="S" (
    echo.
    echo Deploy cancelado!
    pause
    exit /b 0
)

echo.
echo ============================================================
echo                INICIANDO DEPLOY...
echo ============================================================
echo.

echo [2/7] Adicionando arquivos...
git add .
if errorlevel 1 (
    echo ERRO ao adicionar arquivos!
    pause
    exit /b 1
)

echo [3/7] Criando commit...
git commit -m "%VERSION%: %TITLE%"
if errorlevel 1 (
    echo Nenhuma mudanca para commitar
    set /p CONTINUE="Continuar mesmo assim? (S/N): "
    if /i not "!CONTINUE!"=="S" (
        pause
        exit /b 0
    )
)

echo [4/7] Criando tag...
git tag -a %VERSION% -m "%RELEASE_TYPE%: %TITLE%"
if errorlevel 1 (
    echo ERRO ao criar tag!
    echo.
    echo Possivel tag duplicada. Deletar e recriar?
    set /p DELETE_TAG="Deletar tag existente? (S/N): "
    if /i "!DELETE_TAG!"=="S" (
        git tag -d %VERSION%
        git push origin :refs/tags/%VERSION%
        git tag -a %VERSION% -m "%RELEASE_TYPE%: %TITLE%"
    ) else (
        pause
        exit /b 1
    )
)

echo [5/7] Enviando para GitHub (main)...
git push origin main
if errorlevel 1 (
    echo ERRO ao enviar codigo!
    pause
    exit /b 1
)

echo [6/7] Enviando tags...
git push origin --tags
if errorlevel 1 (
    echo ERRO ao enviar tags!
    pause
    exit /b 1
)

echo [7/7] Deploy completo!
echo.
echo ============================================================
echo                DEPLOY CONCLUIDO!
echo ============================================================
echo.
echo   Codigo enviado para GitHub
echo   Tag criada: %VERSION%
echo   Vercel ira fazer deploy automatico
echo   Firebase: Sem mudancas necessarias
echo.
echo Proximos passos:
echo   1. Verificar build Vercel: https://vercel.com/dashboard
echo   2. Testar em: https://financas-pessoais-two.vercel.app
echo   3. Criar GitHub Release com RELEASE-NOTES
echo.
pause
