#!/bin/bash
cd "$(dirname "$0")"
npm run dev
echo ""
echo "App is running! Open http://localhost:5173 in your browser."
echo "Press Ctrl+C to stop, or close this window."
read -p "Press Enter to close..."
