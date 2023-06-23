import { join } from 'path';

export const cd = async (currentPath, pathArg) => {
  try {
    if (!pathArg) {
      throw new Error("Invalid input argument");
    }

    let newPath = pathArg;

    if (!newPath.includes(":")) {
      newPath = join(currentPath, newPath);
    }

    process.chdir(newPath);
    return newPath;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log("Operation failed");
    } else {
      console.log(error.message);
    }
  }
}