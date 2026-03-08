@echo off
echo ================================
echo  ATUALIZAR GITHUB
echo ================================
echo.
echo Este script vai:
echo   1. Add todas as mudancas
echo   2. Fazer commit
echo   3. Push para GitHub
echo.

echo Descreve as mudancas (ex: Adicionar graficos):
set /p COMMIT_MSG=Mensagem: 

if "%COMMIT_MSG%"=="" (
    set COMMIT_MSG=Update
)

echo.
echo ================================
echo  Git add...
echo ================================
git add .

echo.
echo ================================
echo  Git commit...
echo ================================
git commit -m "%COMMIT_MSG%"

if %errorlevel% neq 0 (
    echo.
    echo Sem mudancas para commit!
    pause
    exit /b 0
)

echo.
echo ================================
echo  Git push...
echo ================================
git push

if %errorlevel%==0 (
    echo.
    echo ================================
    echo  ✅ GITHUB ATUALIZADO!
    echo ================================
    echo.
    echo Mudancas enviadas!
    echo.
    echo Se Vercel conectado:
    echo   - Deploy automatico em 2 min
    echo   - Vercel.com para ver progresso
) else (
    echo.
    echo ================================
    echo  ❌ ERRO NO PUSH!
    echo ================================
    echo.
    echo Tenta: git push origin main
)

echo.
pause
