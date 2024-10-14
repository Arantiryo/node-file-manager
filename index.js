import {
  sayHello,
  sayGoodbye,
  switchToHomeDir,
  printCWD,
} from "./src/utils.js";
import { handleCommand } from "./src/command_handler.js";

const userName = process.argv?.[2].split("=")?.[1] || "user";

// export const fileManager = new FileManager(userName);

// Change working directory
switchToHomeDir();

// Greet user
sayHello(userName);
printCWD();

// Say goodbye on exit
process.on("SIGINT", (code) => {
  sayGoodbye(userName);
});

// Handle commands
process.stdin.on("data", (data) => {
  const input = data.toString().trim();

  handleCommand(input);

  printCWD();
});
