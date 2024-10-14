import { FileManager } from "./src/file_manager.js";

const userName = process.argv?.[2].split("=")?.[1] || "user";

export const fileManager = new FileManager(userName);

// Change working directory
fileManager.switchToHomeDir();

// Greet user
fileManager.sayHello();
FileManager.printCWD();

// Say goodbye on exit
process.on("SIGINT", (code) => {
  fileManager.sayGoodbye();
});

// Handle commands
process.stdin.on("data", (data) => {
  const input = data.toString().trim();

  fileManager.handleCommand(input);

  FileManager.printCWD();
});
