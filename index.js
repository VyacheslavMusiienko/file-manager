import { homedir } from 'os';
import { inputValue } from './src/inputVal.js';

const index = async (args) => {
  try {
    const usernameArgs = args.find(arg => arg.startsWith('--username='));
    process.chdir(homedir());

    if(!usernameArgs){
      throw new Error('Invalid input');
    }

    const username = usernameArgs.split('=')[1];

    console.log(`Welcome to the File Manager, ${username}!`);
    console.log(`You are currently in ${process.cwd()}`);

    process.stdin.on('data', inputValue);

    process.on('SIGINT', () => process.exit(0));

    process.on('exit', () => console.log(`Thank you for using File Manager, ${username}, goodbye!`));
  } catch (error) {
    console.error(error.message);
  }
}

index(process.argv.slice(2));