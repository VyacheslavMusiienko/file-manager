
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
        const { add } = await import('./add.js');
        await add(args[0]);
        break;

      case 'rn':
        const { rn } = await import('./rn.js');
        await rn(currentPath, args[0], args[1]);
        break;

      case 'cp':
        const { cp } = await import('./cp.js');
        await cp(currentPath, args[0], args[1]);
        break;

      case 'mv':
        const { mv } = await import('./mv.js');
        await mv(currentPath, args[0], args[1]);
        break;

      case 'rm':
        const { rm } = await import('./rm.js');
        await rm(currentPath, args[0]);
        break;

      case 'os':
        const { osFunc } = await import('./os.js');
        await osFunc(args[0]);
        break;

      case 'hash':
        const { hash } = await import('./hash.js');
        await hash(args[0]);
        break;

      case 'compress':
        const { compress } = await import('./compress.js');
        await compress(currentPath, args[0], args[1]);
        break;

      case 'decompress':
        const { decompress } = await import('./decompress.js');
        await decompress(currentPath, args[0], args[1]);
        break;

      default:
        throw new Error('Invalid value');
    }

    console.log(`You are currently in ${currentPath}`);
  } catch (error) {
    console.error(error.message);
  }
}
