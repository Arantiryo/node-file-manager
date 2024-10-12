import { printCWD } from "./src/utils.js";
import { FileManager } from "./src/file_manager.js";

const currentPath = process.argv[1];
const userName = process.argv?.[2].split("=")?.[1];

export const fileManager = new FileManager(userName);

// Greet user
fileManager.sayHello();
printCWD();

// Say goodbye
process.on("SIGINT", (code) => {
  fileManager.sayGoodbye();
});

// Handle commands
process.stdin.on("data", (data) => {
  const input = data.toString().trim();

  fileManager.handleCommand(input);

  printCWD();
});
