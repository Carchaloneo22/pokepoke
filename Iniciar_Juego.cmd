@echo off
chcp 65001 >nul
title Pokemon Hoenn - Launcher
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo =====================================================
echo    POKEMON HOENN / MONSTER-TAMER - INICIAR JUEGO
echo =====================================================
echo.

:: ------------------------------------------------------------------
:: 1) BUSCAR PYTHON
:: ------------------------------------------------------------------
where python >nul 2>nul
if errorlevel 1 (
    where py >nul 2>nul
    if errorlevel 1 (
        echo [ERROR] No se encontro Python.
        echo   Instalalo desde https://www.python.org/downloads/
        echo   IMPORTANTE: marca la casilla "Add Python to PATH".
        echo Installando con winget...
        winget install --id Python.Python.3.12 -e --accept-package-agreements --accept-source-agreements >nul 2>nul
        where python >nul 2>nul
        if errorlevel 1 (
            pause
            exit /b 1
        )
    )
)

:: ------------------------------------------------------------------
:: 2) VERIFICAR E INSTALAR DEPENDENCIAS
:: ------------------------------------------------------------------
echo [1/4] Verificando dependencias...
python -c "import fastapi, uvicorn, pydantic, requests, websockets" >nul 2>nul
if errorlevel 1 (
    echo   Instalando dependencias...
    python -m pip install --upgrade pip >nul 2>nul
    python -m pip install fastapi uvicorn pydantic requests websockets
    if errorlevel 1 (
        echo.
        echo [ERROR] No se pudieron instalar las dependencias.
        pause
        exit /b 1
    )
) else (
    echo   Dependencias ya instaladas. OK.
)

:: ------------------------------------------------------------------
:: 3) VERIFICAR DATOS DEL JUEGO (pokemon_todos.json)
:: ------------------------------------------------------------------
echo [2/4] Verificando base de datos de Pokemon...
if not exist "data\pokemon_todos.json" (
    echo   Generando base de datos completa desde PokeAPI...
    python generar_pokedex_completa.py
    if errorlevel 1 (
        echo.
        echo [ERROR] No se pudo generar la base de datos. Revisa tu conexion a internet.
        pause
        exit /b 1
    )
) else (
    echo   Base de datos presente. OK.
)

:: ------------------------------------------------------------------
:: 4) INICIAR SERVIDOR Y ABRIR NAVEGADOR
:: ------------------------------------------------------------------
echo [3/4] Iniciando servidor...
echo [4/4] Abriendo el navegador...
echo   Si no se abre solo, entra a: http://127.0.0.1:8000/admin.html
echo.
echo =====================================================
echo   SERVIDOR ACTIVO - Presiona CTRL+C para cerrar
echo =====================================================
echo.
python launcher.py
pause