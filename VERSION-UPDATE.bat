@echo off
echo ================================
echo  NOVA VERSAO - UPDATE
echo ================================
echo.
echo Este script vai:
echo   1. Pedir numero da versao
echo   2. Pedir mudancas tecnicas (CHANGELOG.md)
echo   3. Pedir highlights users (RELEASE-NOTES.md)
echo   4. Commit e Push
echo.
pause

echo.
echo ================================
echo  VERSAO
echo ================================
echo.
echo Versao atual: v1.0.0
echo.
echo Digite a NOVA versao (ex: 1.1.0):
set /p VERSION=v

echo.
echo ================================
echo  CHANGELOG (tecnico)
echo ================================
echo.
echo Digite mudancas TECNICAS (developers)
echo Formato: "Added X" ou "Fixed Y" ou "Removed Z"
echo Digite "FIM" quando terminar
echo.

set COUNT=0

:LOOP1
set /p CHANGE=Mudanca %COUNT%: 
if "%CHANGE%"=="FIM" goto ENDLOOP1
if "%CHANGE%"=="fim" goto ENDLOOP1
if "%CHANGE%"=="" goto ENDLOOP1

set /a COUNT+=1
goto LOOP1

:ENDLOOP1

if %COUNT%==0 (
    echo Nenhuma mudanca tecnica!
    pause
    exit /b 1
)

echo.
echo ================================
echo  RELEASE NOTES (users)
echo ================================
echo.
echo Agora descreve para USERS (marketing)
echo O que ha de novo? Porque importa?
echo.
set /p HIGHLIGHTS=Highlights principais: 

echo.
echo ================================
echo  PREVIEW
echo ================================
echo.
echo Versao: APP-FINANCAS-PESSOAIS v%VERSION%
echo Data: %date%
echo.
echo CHANGELOG.md: Edita manualmente depois
echo RELEASE-NOTES.md: Edita manualmente depois
echo.
echo Confirma commit? (S/N)
set /p CONFIRM=

if /i not "%CONFIRM%"=="S" (
    echo Cancelado!
    pause
    exit /b 0
)

echo.
echo ================================
echo  NOTA IMPORTANTE
echo ================================
echo.
echo Depois do push, EDITA:
echo   1. CHANGELOG.md (adiciona detalhes tecnicos)
echo   2. RELEASE-NOTES.md (adiciona secao nova versao)
echo   3. package.json (atualiza "version": "%VERSION%")
echo.
pause

echo.
echo ================================
echo  Git Commit...
echo ================================

git add .
git commit -m "v%VERSION% - Release"

if %errorlevel% neq 0 (
    echo.
    echo Erro no commit!
    pause
    exit /b 1
)

echo.
echo ================================
echo  Git Push...
echo ================================

git push

if %errorlevel%==0 (
    echo.
    echo ================================
    echo  ✅ VERSAO %VERSION% PUSHED!
    echo ================================
    echo.
    echo GitHub: Atualizado
    echo Vercel: Deploy automatico em 2 min
    echo.
    echo PROXIMOS PASSOS:
    echo   1. Edita CHANGELOG.md (detalhes tecnicos)
    echo   2. Edita RELEASE-NOTES.md (highlights users)
    echo   3. Atualiza package.json version
    echo   4. Commit novamente: git add . ^&^& git commit -m "Update docs" ^&^& git push
) else (
    echo.
    echo Erro no push!
)

echo.
pause

