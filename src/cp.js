import { access, readFile, readdir, writeFile } from 'fs/promises';
import { join, parse } from 'path';

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

    const targetDirListing = await readdir(targetDir);
    if (targetDirListing.includes(sourceBase)) {
      throw new Error("Operation failed. File already exists");
    }

    const fileData = await readFile(sourceFile);
    await writeFile(join(targetDir, sourceBase), fileData);

    console.log('File cope');
  } catch (error) {
    if (error.message.includes("ENOENT")) {
      console.log("Operation failed ;", error.message);
    } else {
      console.log(error.message);
    }
  }
};