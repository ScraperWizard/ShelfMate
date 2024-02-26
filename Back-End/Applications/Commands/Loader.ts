import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandsDir = path.join(__dirname, "../../", '/Routes');

const commands = {};

async function loadCommands(dir: string) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const res = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      await loadCommands(res);
    } else if (path.extname(file.name) === '.js') {
      const commandModule = await import(res.replace("C:", "file:\\C:"));
      const command = commandModule.default;
      const commandName = path.basename(file.name, '.js');
      commands[commandName] = command;
      console.log("Loaded command: " + commandName);
    }
  }
}

await loadCommands(commandsDir);

export default commands;