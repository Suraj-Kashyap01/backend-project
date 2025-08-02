import fs from "fs/promises";
export const readFileCustom = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.log(error);

    return null;
  }
}
export const writeFileCustom = async (Filepath, data) => {
  try {
    await fs.writeFile(Filepath, JSON.stringify(data))
    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }
}
