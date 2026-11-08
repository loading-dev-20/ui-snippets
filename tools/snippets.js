#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const snippetsDir = path.join(root, 'js', 'snippets');
const indexFile = path.join(root, 'index.html');

function relative(file) {
  return path.relative(root, file).split(path.sep).join('/');
}

function readSnippetFiles() {
  const files = [];
  try {
    const index = fs.readFileSync(indexFile, 'utf8');
    const pattern = /<script[^>]*src=["'](js\/snippets\/[^"']+)["'][^>]*><\/script>/g;
    let match;
    while ((match = pattern.exec(index))) {
      files.push(path.resolve(root, match[1]));
    }
  } catch (error) {
    // Fall back to reading the folder when index.html is unavailable.
  }

  if (files.length) return [...new Set(files)];

  const fallback = fs.readdirSync(snippetsDir)
    .filter((name) => name.endsWith('.js'))
    .sort((a, b) => {
      if (a === 'base.js') return -1;
      if (b === 'base.js') return 1;
      return a.localeCompare(b);
    })
    .map((name) => path.join(snippetsDir, name));

  if (!fallback.length) throw new Error('No snippet files found in ' + relative(snippetsDir) + '.');
  return fallback;
}

function lineNumberAt(source, index) {
  return source.slice(0, index).split(/\r\n|\r|\n/).length;
}

function loadSnippets() {
  const files = readSnippetFiles();
  const context = { window: {} };

  files.forEach((file) => {
    try {
      vm.runInNewContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
    } catch (error) {
      throw new Error('Could not load ' + relative(file) + ': ' + error.message);
    }
  });

  const entries = context.window.UI_SNIPPETS || [];
  const locations = new Map();

  files.forEach((file) => {
    const source = fs.readFileSync(file, 'utf8');
    const pattern = /\bid\s*:\s*(['"])([^'"]+)\1/g;
    let match;
    while ((match = pattern.exec(source))) {
      const id = match[2];
      if (!locations.has(id)) {
        locations.set(id, {
          file,
          line: lineNumberAt(source, match.index)
        });
      }
    }
  });

  return entries.map((entry) => {
    const location = locations.get(entry.id) || { file: null, line: null };
    return {
      id: entry.id,
      title: entry.title,
      category: entry.category,
      file: location.file,
      line: location.line
    };
  });
}

function locationText(snippet) {
  if (!snippet.file) return 'location not found';
  return relative(snippet.file) + ':' + snippet.line;
}

function filterSnippets(snippets, query) {
  const needle = String(query || '').trim().toLowerCase();
  if (!needle) return snippets;

  return snippets.filter((snippet) => {
    return [snippet.id, snippet.title, snippet.category, snippet.file ? relative(snippet.file) : '']
      .some((value) => String(value).toLowerCase().includes(needle));
  });
}

function printTable(snippets) {
  if (!snippets.length) return;

  const rows = snippets.map((snippet) => ({
    id: snippet.id,
    category: snippet.category,
    location: locationText(snippet),
    title: snippet.title
  }));

  const idWidth = Math.max(2, ...rows.map((row) => row.id.length));
  const categoryWidth = Math.max(8, ...rows.map((row) => row.category.length));
  const locationWidth = Math.max(8, ...rows.map((row) => row.location.length));

  console.log(
    'ID'.padEnd(idWidth) +
    '  ' + 'CATEGORY'.padEnd(categoryWidth) +
    '  ' + 'LOCATION'.padEnd(locationWidth) +
    '  TITLE'
  );
  console.log(
    '-'.repeat(idWidth) +
    '  ' + '-'.repeat(categoryWidth) +
    '  ' + '-'.repeat(locationWidth) +
    '  ' + '-'.repeat(5)
  );

  rows.forEach((row) => {
    console.log(
      row.id.padEnd(idWidth) +
      '  ' + row.category.padEnd(categoryWidth) +
      '  ' + row.location.padEnd(locationWidth) +
      '  ' + row.title
    );
  });
}

function usage() {
  console.log(`UI Snippets source finder

Usage:
  node tools/snippets.js list [filter]
  node tools/snippets.js find <query>
  node tools/snippets.js open <id or query> [--print]

Examples:
  node tools/snippets.js list cards
  node tools/snippets.js find nav
  node tools/snippets.js open product-card

Windows shortcut:
  .\\snippets.cmd open product-card

The open command uses VS Code when its "code" command is available.
Use --print to only print the file and line.`);
}

function findCodeCommand() {
  if (process.platform !== 'win32') return 'code';

  const candidates = [];
  if (process.env.VSCODE_CMD) candidates.push(process.env.VSCODE_CMD);
  if (process.env.LOCALAPPDATA) {
    candidates.push(path.join(process.env.LOCALAPPDATA, 'Programs', 'Microsoft VS Code', 'bin', 'code.cmd'));
  }
  if (process.env.ProgramFiles) {
    candidates.push(path.join(process.env.ProgramFiles, 'Microsoft VS Code', 'bin', 'code.cmd'));
  }
  if (process.env['ProgramFiles(x86)']) {
    candidates.push(path.join(process.env['ProgramFiles(x86)'], 'Microsoft VS Code', 'bin', 'code.cmd'));
  }

  const existing = candidates.find((candidate) => fs.existsSync(candidate));
  if (existing) return existing;

  const where = spawnSync('where.exe', ['code'], { encoding: 'utf8', windowsHide: true });
  if (where.status === 0) {
    const lines = String(where.stdout || '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const command = lines.find((line) => /\.cmd$/i.test(line)) || lines[0];
    if (command) return command;
  }

  return null;
}

function launchCode(codeCommand, file, line) {
  const target = file + ':' + line;

  if (process.platform === 'win32') {
    const result = spawnSync(
      process.env.ComSpec || 'cmd.exe',
      ['/d', '/c', codeCommand, '-g', target],
      { stdio: 'ignore', windowsHide: true }
    );
    return !result.error && result.status === 0;
  }

  const result = spawnSync(codeCommand, ['-g', target], { stdio: 'ignore' });
  return !result.error && result.status === 0;
}

function openSnippet(query, printOnly) {
  const snippets = loadSnippets();
  const exact = snippets.find((snippet) => snippet.id.toLowerCase() === query.toLowerCase());
  let target = exact;

  if (!target) {
    const matches = filterSnippets(snippets, query);
    if (matches.length === 1) {
      target = matches[0];
    } else if (matches.length > 1) {
      console.log('"' + query + '" matches ' + matches.length + ' snippets:');
      console.log('');
      printTable(matches);
      console.log('');
      console.log('Use an exact id, for example: node tools/snippets.js open ' + matches[0].id);
      process.exitCode = 1;
      return;
    } else {
      console.log('No snippet matched "' + query + '".');
      console.log('Run "node tools/snippets.js list" to see every component.');
      process.exitCode = 1;
      return;
    }
  }

  if (!target.file) {
    console.log('Found ' + target.id + ', but could not locate its source file.');
    process.exitCode = 1;
    return;
  }

  console.log(locationText(target));

  if (printOnly) return;

  const codeCommand = findCodeCommand();
  if (!codeCommand) {
    console.log('VS Code\'s "code" command was not found. Open the file at line ' + target.line + '.');
    return;
  }

  if (launchCode(codeCommand, target.file, target.line)) {
    console.log('Opened in VS Code.');
  } else {
    console.log('Could not launch VS Code. Open the file at line ' + target.line + ' manually.');
  }
}

function main() {
  const args = process.argv.slice(2);
  const command = args.shift();

  if (!command || command === '-h' || command === '--help' || command === 'help') {
    usage();
    return;
  }

  const printOnly = args.includes('--print') || args.includes('-p');
  const query = args
    .filter((argument) => argument !== '--print' && argument !== '-p')
    .join(' ')
    .trim();

  if (command === 'list' || command === 'ls') {
    const snippets = loadSnippets();
    const matches = filterSnippets(snippets, query);
    if (!matches.length) {
      console.log('No snippets matched "' + query + '".');
      process.exitCode = 1;
      return;
    }
    printTable(matches);
    console.log('');
    console.log(matches.length + ' snippet' + (matches.length === 1 ? '' : 's') + (query ? ' matching "' + query + '"' : '') + '.');
    return;
  }

  if (command === 'find' || command === 'search') {
    if (!query) {
      console.log('Add a search term, for example: node tools/snippets.js find nav');
      process.exitCode = 1;
      return;
    }
    const snippets = loadSnippets();
    const matches = filterSnippets(snippets, query);
    if (!matches.length) {
      console.log('No snippets matched "' + query + '".');
      process.exitCode = 1;
      return;
    }
    printTable(matches);
    return;
  }

  if (command === 'open' || command === 'edit') {
    if (!query) {
      console.log('Add an id or search term, for example: node tools/snippets.js open product-card');
      process.exitCode = 1;
      return;
    }
    openSnippet(query, printOnly);
    return;
  }

  console.log('Unknown command: ' + command);
  console.log('');
  usage();
  process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
