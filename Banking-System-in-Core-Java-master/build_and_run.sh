#!/usr/bin/env bash
# Compile all Java source files and run the main class
find . -name "*.java" > sources.txt
javac @sources.txt
# Run the main class (adjust if different)
java BankSystem
