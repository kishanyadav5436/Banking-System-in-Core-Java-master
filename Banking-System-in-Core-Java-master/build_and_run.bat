@echo off
setlocal
echo Compiling Java sources...
javac *.java
if errorlevel 1 (
  echo Compilation failed.
  exit /b %errorlevel%
)
echo Running BankSystem...
java BankSystem
