import { createReadStream, createWriteStream } from 'fs';
import { access, readdir } from 'fs/promises';
import { join, parse } from 'path';
import { pipeline } from 'stream';

export const cp = async (currentPath, pathToFile, newFileName) => {
  try {
    if (!pathToFile || !newFileName) {
      throw new Error("Invalid input");
    }

    let sourceFile, targetDir;
    if (pathToFile.search(/^[a-zA-Z][:]/gm) === 0) {
      sourceFile = pathToFile;
    } else {
      sourceFile = join(currentPath, pathToFile);
    }
    if (newFileName.search(/^[a-zA-Z][:]/gm) === 0) {
      targetDir = newFileName;
    } else {
      targetDir = join(currentPath, newFileName);
    }

    await access(sourceFile);

    const { base: sourceBase } = parse(sourceFile);

    const targetFilePath = join(targetDir, sourceBase);

    const targetDirListing = await readdir(targetDir);
    if (targetDirListing.includes(sourceBase)) {
      throw new Error("Operation failed. File already exists");
    }

    const sourceStream = createReadStream(sourceFile);
    const targetStream = createWriteStream(targetFilePath);

    await new Promise((resolve, reject) => {
      pipeline(sourceStream, targetStream, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    console.log('File copied');
    return true;
  } catch (error) {
    if (error.message.includes("ENOENT")) {
      console.log("Operation failed:", error.message);
      return false;
    } else {
      console.log(error.message);
      return false;
    }
  }
};