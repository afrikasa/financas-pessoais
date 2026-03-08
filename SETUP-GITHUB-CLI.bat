@echo off
echo ================================
echo  SETUP GITHUB CLI
echo ================================
echo.
echo Este script vai:
echo   1. Verificar se GitHub CLI esta instalado
echo   2. Se nao, instalar via winget
echo   3. Fazer login no GitHub
echo   4. Configurar permissoes
echo.
pause

echo.
echo ================================
echo  Verificando GitHub CLI...
echo ================================

gh --version >nul 2>&1
if %errorlevel%==0 (
    echo.
    echo ✅ GitHub CLI ja instalado!
    gh --version
    goto LOGIN
)

echo.
echo GitHub CLI nao encontrado.
echo Instalando via winget...
echo.

winget install --id GitHub.cli

if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO na instalacao!
    echo.
    echo Tenta instalar manualmente:
    echo   1. Vai a: https://cli.github.com
    echo   2. Download para Windows
    echo   3. Instala
    echo   4. Reinicia este script
    pause
    exit /b 1
)

echo.
echo ✅ GitHub CLI instalado!
echo.
echo IMPORTANTE: Fecha e reabre esta janela!
echo (Para que o PATH seja atualizado)
pause
exit /b 0

:LOGIN
echo.
echo ================================
echo  Login no GitHub
echo ================================
echo.
echo Vais fazer login com GitHub CLI.
echo.
echo O browser vai abrir para autenticar.
echo.
pause

gh auth login

if %errorlevel% neq 0 (
    echo.
    echo ❌ Erro no login!
    pause
    exit /b 1
)

echo.
echo ================================
echo  Verificando autenticacao...
echo ================================

gh auth status

echo.
echo ================================
echo  ✅ SETUP COMPLETO!
echo ================================
echo.
echo GitHub CLI configurado com sucesso!
echo.
echo Proximos passos:
echo   1. Usa AUTO-RELEASE.bat para criar releases
echo   2. Tudo automatico agora!
echo.
pause
