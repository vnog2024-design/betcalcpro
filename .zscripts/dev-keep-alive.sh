#!/bin/bash
cd /home/z/my-project
while true; do
  echo "[$(date)] Starting dev server..."
  node node_modules/.bin/next dev -p 3000 &
  SERVER_PID=$!
  for i in $(seq 1 30); do
    if curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
      echo "[$(date)] Dev server ready (PID: $SERVER_PID)"
      break
    fi
    sleep 1
  done
  wait $SERVER_PID 2>/dev/null
  echo "[$(date)] Server exited, restarting in 3s..."
  sleep 3
done
