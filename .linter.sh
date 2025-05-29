#!/bin/bash
cd /home/kavia/workspace/code-generation/neuroquest-the-goal-conqueror-25659-a1715297/neuroquest
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
 if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

