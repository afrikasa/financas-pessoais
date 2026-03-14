@echo off
echo ================================
echo  PUSH PARA GITHUB
echo ================================
echo.
echo CERTIFICA-TE QUE:
echo   1. Criaste repositorio no GitHub
echo   2. Correste GIT-SETUP-SIMPLE.bat
echo.
pause

echo.
echo Digite o URL do teu repositorio GitHub:
echo (ex: https://github.com/afrikasa/financas-pessoais.git)
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
echo  Criando tag v1.8.4...
echo ================================
git tag -a v1.8.4 -m "MINOR: Temas Personalizaveis"

echo.
echo ================================
echo  Fazendo push...
echo ================================
git branch -M main
git push -u origin main
git push origin --tags

if %errorlevel%==0 (
    echo.
    echo ================================
    echo  OK PUSH COMPLETO!
    echo ================================
    echo.
    echo Teu codigo esta no GitHub!
    echo Tag v1.8.4 criada!
    echo.
    echo Vercel vai fazer deploy automatico
    echo.
    echo Proximos passos:
    echo   1. Ver: https://github.com/afrikasa/financas-pessoais
    echo   2. Criar GitHub Release manual
    echo   3. Testar: https://financas-pessoais-two.vercel.app
) else (
    echo.
    echo ================================
    echo  ERRO NO PUSH!
    echo ================================
    echo.
    echo Possivel causa:
    echo   - Repositorio nao existe
    echo   - Sem permissoes
    echo   - Credenciais incorretas
    echo.
)

echo.
pause
