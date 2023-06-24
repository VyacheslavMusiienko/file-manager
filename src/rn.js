import { access, readdir, rename } from 'fs/promises';
import {join, parse} from 'path';

export const rn = async (currentPath, pathToFile, newFileName) => {
  try {
    if (!newFileName || !pathToFile) {
      throw new Error('Invalid input');
    }

    let filePath;
    if (pathToFile.search(/^[a-zA-Z][:]/gm) === 0) {
      filePath = pathToFile;
    } else {
      filePath = join(currentPath, pathToFile);
    }

    await access(filePath);

    const { dir } = parse(filePath);
    const targetDirListing = await readdir(dir);

    if (targetDirListing.includes(newFileName)) {
      throw new Error("Operation failed. File already exists");
    }

    await rename(filePath, newFileName);
    console.log("File successfully renamed");
  } catch (error) {
    console.error(error.message);
  }
};