@echo off
echo ================================
echo  PUSH PARA GITHUB
echo ================================
echo.
echo CERTIFICA-TE QUE:
echo   1. Criaste repositorio no GitHub
echo   2. Correste GIT-SETUP.bat
echo.
pause

echo.
echo Digite o URL do teu repositorio GitHub:
echo (ex: https://github.com/marcus-costa/financas-pessoais.git)
echo.
set /p REPO_URL=URL: 

echo.
echo ================================
echo  Adicionando remote...
echo ================================
git remote add origin %REPO_URL%

if %errorlevel% neq 0 (
    echo.
    echo Remote ja existe, atualizando...
    git remote set-url origin %REPO_URL%
)

echo.
echo ================================
echo  Fazendo push...
echo ================================
git branch -M main
git push -u origin main

if %errorlevel%==0 (
    echo.
    echo ================================
    echo  ✅ PUSH COMPLETO!
    echo ================================
    echo.
    echo Teu codigo esta no GitHub!
    echo URL: %REPO_URL%
    echo.
    echo Proximos passos:
    echo   - Conecta Vercel ao GitHub (auto-deploy)
    echo   - Ou usa GITHUB-UPDATE.bat para updates
) else (
    echo.
    echo ================================
    echo  ❌ ERRO NO PUSH!
    echo ================================
    echo.
    echo Possivel causa:
    echo   - Repositorio nao existe
    echo   - Sem permissoes
    echo   - Token necessario
    echo.
    echo Ver: GITHUB-GUIDE.md
)

echo.
pause
