import { createBrotliDecompress } from 'zlib'
import { createReadStream, createWriteStream } from 'fs'
import { access } from 'fs/promises'
import { resolve, join, parse } from 'path'

export const decompress = async (currentPath, pathToFile, pathToNewFile) => {
  try {
    if (!pathToFile || !pathToNewFile) {
      throw new Error("Invalid input");
    }
    let newPath = pathToFile;

    if (!newPath.includes(":")) {
      newPath = join(currentPath, newPath);
    }

    await access(resolve(pathToFile));
    await access(resolve(pathToNewFile));

    const parsePath = parse(pathToFile);

    const brotli = createBrotliDecompress();
    const rs = createReadStream (resolve(pathToFile));
    const ws = createWriteStream (resolve(pathToNewFile, parsePath.base));
    

    rs.pipe(brotli).pipe(ws);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log("Operation failed");
    } else {
      console.log(error.message);
    }
  }
};