#!/usr/bin/env python3
"""
Build script: python build.py
Creates dist/applicants_app.exe (Windows) or dist/applicants_app (Linux/macOS)
"""
import subprocess
import sys
import os

def build():
    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--onefile",
        "--windowed",
        "--name", "applicants_app",
        "--add-data", "templates:templates",
        "--add-data", "static:static",
        "--hidden-import", "uvicorn.logging",
        "--hidden-import", "uvicorn.loops",
        "--hidden-import", "uvicorn.loops.auto",
        "--hidden-import", "uvicorn.protocols",
        "--hidden-import", "uvicorn.protocols.http",
        "--hidden-import", "uvicorn.protocols.http.auto",
        "--hidden-import", "uvicorn.protocols.websockets",
        "--hidden-import", "uvicorn.protocols.websockets.auto",
        "--hidden-import", "uvicorn.lifespan",
        "--hidden-import", "uvicorn.lifespan.on",
        "--hidden-import", "fastapi",
        "--hidden-import", "jinja2",
        "--hidden-import", "openpyxl",
        "--hidden-import", "multipart",
        "main.py"
    ]
    print("Running PyInstaller...")
    result = subprocess.run(cmd, check=True)
    print("Build complete. Check the dist/ folder.")

if __name__ == "__main__":
    build()
