@echo off
echo ================================
echo  INSTALAR DEPENDENCIAS
echo ================================
echo.
echo Aguarde enquanto instala...
echo (pode demorar 2-3 minutos)
echo.

npm install

echo.
echo ================================
if %errorlevel%==0 (
    echo  INSTALACAO COMPLETA!
    echo.
    echo Proximos passos:
    echo   1. DEV.bat - Iniciar app
    echo   2. BUILD.bat - Build producao
) else (
    echo  ERRO NA INSTALACAO!
    echo.
    echo Verifica se Node.js esta instalado:
    echo   node --version
)
echo ================================
pause
