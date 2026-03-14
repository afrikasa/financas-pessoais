@echo off
echo ================================
echo  DEPLOY PARA VERCEL
echo ================================
echo.
echo Este script vai:
echo   1. Fazer build da app
echo   2. Fazer deploy na Vercel
echo.
echo Certifica-te que tens:
echo   - Conta Vercel criada
echo   - npm install -g vercel
echo.
pause

echo.
echo ================================
echo  PASSO 1: BUILD
echo ================================
echo.
call npm run build

if %errorlevel% neq 0 (
    echo.
    echo ERRO no build!
    pause
    exit /b 1
)

echo.
echo ================================
echo  PASSO 2: DEPLOY
echo ================================
echo.
echo Primeira vez? vai pedir login!
echo.

vercel deploy --prod

echo.
echo ================================
if %errorlevel%==0 (
    echo  DEPLOY COMPLETO!
    echo.
    echo A tua app esta online!
    echo URL vai aparecer acima ^^^
    echo.
    echo Guarda esse URL para usar no telemovel!
) else (
    echo  ERRO NO DEPLOY!
    echo.
    echo Instala Vercel CLI:
    echo   npm install -g vercel
)
echo ================================
pause
