export const mv = async (currentPath, pathToFile, pathToNewFile) => {
  try {
    if (!pathToFile || !pathToNewFile) {
      throw new Error("Invalid input");
    }
    const { cp } = await import('./cp.js');

    if(await cp(currentPath, pathToFile, pathToNewFile)){
      const { rm } = await import('./rm.js');
      await rm(currentPath, pathToFile);
    }
  } catch (error) {
    console.error(error.message);
  }
}