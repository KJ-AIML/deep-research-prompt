#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL_NAME = 'deep-research-prompt';
const SKILL_FILE = 'SKILL.md';

// Platform install paths (global = user profile, project = current directory)
const PLATFORMS = {
  claude: {
    name: 'Claude Code',
    globalDir: path.join(os.homedir(), '.claude', 'skills', SKILL_NAME),
    projectDir: path.join(process.cwd(), '.claude', 'skills', SKILL_NAME),
  },
  codex: {
    name: 'Codex',
    globalDir: path.join(os.homedir(), '.codex', 'skills', SKILL_NAME),
    projectDir: path.join(process.cwd(), '.codex', 'skills', SKILL_NAME),
  },
  opencode: {
    name: 'OpenCode',
    globalDir: path.join(os.homedir(), '.opencode', 'skills', SKILL_NAME),
    projectDir: path.join(process.cwd(), '.opencode', 'skills', SKILL_NAME),
  },
  cursor: {
    name: 'Cursor',
    globalDir: path.join(os.homedir(), '.cursor', 'skills', SKILL_NAME),
    projectDir: path.join(process.cwd(), '.cursor', 'skills', SKILL_NAME),
  },
  pi: {
    name: 'Pi coding agent',
    globalDir: path.join(os.homedir(), '.pi', 'agent', 'skills', SKILL_NAME),
    projectDir: path.join(process.cwd(), '.pi', 'agent', 'skills', SKILL_NAME),
  },
  kimi: {
    name: 'Kimi Code',
    globalDir: path.join(os.homedir(), '.kimi', 'skills', SKILL_NAME),
    projectDir: path.join(process.cwd(), '.kimi', 'skills', SKILL_NAME),
  },
  gemini: {
    name: 'Gemini CLI',
    globalDir: path.join(os.homedir(), '.gemini', 'skills', SKILL_NAME),
    projectDir: path.join(process.cwd(), '.gemini', 'skills', SKILL_NAME),
  },
  aider: {
    name: 'Aider',
    globalDir: path.join(os.homedir(), '.aider', 'skills', SKILL_NAME),
    projectDir: path.join(process.cwd(), '.aider', 'skills', SKILL_NAME),
  },
  trae: {
    name: 'Trae',
    globalDir: path.join(os.homedir(), '.trae', 'skills', SKILL_NAME),
    projectDir: path.join(process.cwd(), '.trae', 'skills', SKILL_NAME),
  },
};

function getSkillSource() {
  // When installed via npm/npx, look relative to this script
  const installed = path.join(__dirname, 'skill', SKILL_FILE);
  if (fs.existsSync(installed)) return installed;

  // Fallback for development (repo root)
  const dev = path.join(__dirname, SKILL_FILE);
  if (fs.existsSync(dev)) return dev;

  // Last resort: current working directory
  const local = path.join(process.cwd(), 'skill', SKILL_FILE);
  if (fs.existsSync(local)) return local;

  throw new Error(
    `Cannot find ${SKILL_FILE}. Make sure you're running from the repo root or have the package installed.`
  );
}

function getSkillZipSource() {
  const installed = path.join(__dirname, 'skill', `${SKILL_NAME}.skill`);
  if (fs.existsSync(installed)) return installed;

  const dev = path.join(__dirname, `${SKILL_NAME}.skill`);
  if (fs.existsSync(dev)) return dev;

  const local = path.join(process.cwd(), 'skill', `${SKILL_NAME}.skill`);
  if (fs.existsSync(local)) return local;

  return null;
}

function install(platformKey, { project = false, zip = false } = {}) {
  const platform = PLATFORMS[platformKey];
  if (!platform) {
    console.error(`❌ Unknown platform: ${platformKey}`);
    console.error(`Supported platforms: ${Object.keys(PLATFORMS).join(', ')}`);
    process.exit(1);
  }

  const destDir = project ? platform.projectDir : platform.globalDir;
  const destFile = path.join(destDir, SKILL_FILE);

  const src = zip ? getSkillZipSource() : getSkillSource();
  if (zip && !src) {
    console.error(`❌ Cannot find ${SKILL_NAME}.skill ZIP file.`);
    process.exit(1);
  }

  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, destFile);

  const scope = project ? 'project' : 'global';
  const format = zip ? '.skill (ZIP)' : 'SKILL.md';
  console.log(`✅ Installed deep-research-prompt (${format}) for ${platform.name} (${scope})`);
  console.log(`   → ${destFile}`);

  if (project) {
    console.log(`\n💡 Tip: Commit the skill file so your team gets it too.`);
  }
}

function uninstall(platformKey, { project = false } = {}) {
  const platform = PLATFORMS[platformKey];
  if (!platform) {
    console.error(`❌ Unknown platform: ${platformKey}`);
    process.exit(1);
  }

  const destDir = project ? platform.projectDir : platform.globalDir;
  const destFile = path.join(destDir, SKILL_FILE);

  if (fs.existsSync(destFile)) {
    fs.unlinkSync(destFile);
    // Clean up empty dirs
    try {
      fs.rmdirSync(destDir);
      fs.rmdirSync(path.dirname(destDir));
    } catch {
      // ignore if not empty
    }
    console.log(`✅ Removed from ${platform.name}`);
  } else {
    console.log(`⚠️  Not installed for ${platform.name}`);
  }
}

function uninstallAll({ project = false } = {}) {
  Object.keys(PLATFORMS).forEach((key) => {
    uninstall(key, { project });
  });
}

function printHelp() {
  console.log(`
deep-research-prompt CLI
Install the deep-research-prompt skill into any AI coding assistant.

USAGE:
  deep-research-prompt install [options]       Install the skill
  deep-research-prompt uninstall [options]     Remove the skill
  deep-research-prompt list                    List supported platforms
  deep-research-prompt --version               Show version
  deep-research-prompt --help                  Show this help

OPTIONS:
  -p, --platform <name>   Target platform (default: claude)
  --project               Install into current project only
  --zip                   Install the .skill ZIP instead of SKILL.md

PLATFORMS:
  ${Object.entries(PLATFORMS)
    .map(([k, v]) => `${k.padEnd(10)} — ${v.name}`)
    .join('\n  ')}

EXAMPLES:
  npx deep-research-prompt install
  npx deep-research-prompt install --platform pi
  npx deep-research-prompt install --platform codex --project
  npx deep-research-prompt install --platform cursor --zip
  npx deep-research-prompt uninstall
  npx deep-research-prompt uninstall --platform kimi
`);
}

function printVersion() {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  console.log(pkg.version);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const result = { command: null, platform: 'claude', project: false, zip: false };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case 'install':
      case 'uninstall':
      case 'list':
        result.command = arg;
        break;
      case '-p':
      case '--platform':
        result.platform = args[++i];
        break;
      case '--project':
        result.project = true;
        break;
      case '--zip':
        result.zip = true;
        break;
      case '-h':
      case '--help':
        printHelp();
        process.exit(0);
      case '-v':
      case '--version':
        printVersion();
        process.exit(0);
      default:
        if (arg.startsWith('-')) {
          console.error(`Unknown option: ${arg}`);
          process.exit(1);
        }
        break;
    }
  }

  return result;
}

function main() {
  if (process.argv.length <= 2) {
    printHelp();
    process.exit(0);
  }

  const args = parseArgs();

  switch (args.command) {
    case 'install':
      install(args.platform, { project: args.project, zip: args.zip });
      break;
    case 'uninstall':
      if (args.platform === 'all') {
        uninstallAll({ project: args.project });
      } else {
        uninstall(args.platform, { project: args.project });
      }
      break;
    case 'list':
      Object.entries(PLATFORMS).forEach(([k, v]) => {
        console.log(`${k.padEnd(10)} — ${v.name}`);
      });
      break;
    default:
      printHelp();
      process.exit(1);
  }
}

main();
