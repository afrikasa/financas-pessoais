@echo off
echo ================================
echo  BUILD PARA PRODUCAO
echo ================================
echo.
echo Criando versao otimizada...
echo.

npm run build

echo.
echo ================================
if %errorlevel%==0 (
    echo  BUILD COMPLETO!
    echo.
    echo Ficheiros em: dist/
    echo.
    echo Para testar localmente:
    echo   npm run preview
    echo.
    echo Para deploy:
    echo   - Upload da pasta dist/
) else (
    echo  ERRO NO BUILD!
)
echo ================================
pause
