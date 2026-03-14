@echo off
echo ================================
echo  FIREBASE - INSTALACAO
echo ================================
echo.
echo Este script vai instalar Firebase.
echo.
pause

echo.
echo ================================
echo  Instalando Firebase...
echo ================================
npm install firebase

if %errorlevel%==0 (
    echo.
    echo ================================
    echo  ✅ FIREBASE INSTALADO!
    echo ================================
    echo.
    echo Proximos passos:
    echo   1. Cria projeto Firebase
    echo   2. Configura credenciais
    echo   3. Ver: FIREBASE-SETUP.md
) else (
    echo.
    echo Erro na instalacao!
)

echo.
pause
