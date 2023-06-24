
export const inputValue = async (value) => {
  try {
    const valueFilter = value.toString().trim().split(" ");
    const [command , ...args] = valueFilter;
    let currentPath = process.cwd();

    switch (command) {
      case '.exit':
        process.exit(0);

      case 'ls':
        const { ls } = await import('./ls.js');
        await ls();
        break;

      case 'up':
        const { cd: upperPath } = await import('./cd.js');
        currentPath = await upperPath(currentPath, '..');
        break;

      case 'cd':
        const { cd: changeDirectory } = await import('./cd.js');
        currentPath = await changeDirectory(currentPath, args[0]);
        break;

      case 'cat':
        const { cat } = await import ('./cat.js');
        await cat(args[0]);
        break;

      case 'add':
        console.log('add');
        break;
      case 'rn':
        console.log('rn');
        break;
      case 'cp':
        console.log('cp');
        break;
      case 'mv':
        console.log('mv');
        break;
      case 'rm':
        console.log('rm');
        break;

      case 'os':
        const { osFunc } = await import('./os.js');
        await osFunc(args[0]);
        break;

      case 'hash':
        console.log('hash');
        break;
      case 'compress':
        console.log('compress');
        break;
      case 'decompress':
        console.log('decompress');
        break;
      default:
        throw new Error('Invalid value');
    }

    console.log(`You are currently in ${currentPath}`);
  } catch (error) {
    console.error(error.message);
  }
}
