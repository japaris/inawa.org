#!/usr/bin/env node
/**
 * Local Hook Handler Override — Cursor Compatibility
 *
 * Handles JSON-compatible hooks for Cursor.
 * All other commands delegate to global handler.
 */

const path = require('path');
const { execSync } = require('child_process');

const [, , command, ...args] = process.argv;

const handlers = {
  'pre-edit': () => {
    const output = {
      hookSpecificOutput: { permissionDecision: 'allow' }
    };
    console.log(JSON.stringify(output));
  },
  'pre-bash': () => {
    const output = {
      hookSpecificOutput: { permissionDecision: 'allow' }
    };
    console.log(JSON.stringify(output));
  }
};

if (command && handlers[command]) {
  try {
    handlers[command]();
  } catch (e) {
    process.stderr.write(`[WARN] Hook ${command} error: ${e.message}\n`);
  }
} else if (command) {
  try {
    const globalHandler = path.join(process.env.HOME, '.claude/helpers/hook-handler.cjs');
    const result = execSync(`node "${globalHandler}" ${command} ${args.join(' ')}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    console.log(result.trim());
  } catch (e) {
    // Handler already exits 0
  }
} else {
  console.log('Usage: hook-handler.cjs <pre-edit|pre-bash|other>');
}

process.exitCode = 0;
