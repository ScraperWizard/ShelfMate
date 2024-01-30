import fs from 'fs/promises'; // Using fs.promises for async file operations
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandsDir = path.join(__dirname, '../../', '/Routes');
const commandFiles = await fs.readdir(commandsDir);
const commands = {};
for (const file of commandFiles) {
    if (path.extname(file) === '.js') {
        const filePath = path.join(commandsDir, file);
        const commandModule = await import(filePath);
        const command = commandModule.default;
        const commandName = path.basename(file, '.js');
        commands[commandName] = command;
        console.log("Loaded command: " + commandName);
    }
}
export default commands;
//# sourceMappingURL=Loader.js.map