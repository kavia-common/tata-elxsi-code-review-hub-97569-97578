#!/bin/bash
cd /home/kavia/workspace/code-generation/tata-elxsi-code-review-hub-97569-97578/code_review_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

