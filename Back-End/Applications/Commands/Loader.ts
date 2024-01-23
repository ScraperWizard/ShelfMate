import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandsDir = path.join(__dirname,"../../../", '/Routes');
const commandFiles = fs.readdirSync(commandsDir);
const commands = {};

for (const file of commandFiles) {
    if (path.extname(file) === '.js') {
        const commandModule = await import(path.join(commandsDir, file));
        const command = commandModule.default;
        const commandName = path.basename(file, '.js');
        commands[commandName] = command;
        console.log("Loaded command: " + commandName);
    }
}

export default commands;