interface OpenFileOptions {
  accept?: string;
}

export type FileLikeData = string | ArrayBuffer | null | undefined;
export interface FileLike {
  name: string;
  type: string;
  content: FileLikeData;
}

export const openFile = ({ accept }: OpenFileOptions): Promise<FileLike[]> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    accept ? (input.accept = accept) : void 0;
    input.addEventListener("change", async () => {
      try {
        if (!input.files) return resolve([]);
        const promises = await Promise.all(
          Array.from(input.files).map(readFile)
        );
        resolve(promises);
      } catch (error) {
        reject(error);
      }
    });
    input.click();
  });
};

const TextTypes = ["application/json"] as readonly string[];

const JsonParseTypes = ["application/json"] as readonly string[];

export const readFile = (file: File): Promise<FileLike> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      try {
        const result = event?.target?.result;
        const content = JsonParseTypes.includes(file.type)
          ? JSON.parse(result as string)
          : result;
        resolve({
          name: file.name,
          type: file.type,
          content,
        });
      } catch (error) {
        reject(error);
      }
    });
    reader.addEventListener("error", (error) => reject(error));
    if (TextTypes.includes(file.type)) {
      return reader.readAsText(file);
    }
    reader.readAsDataURL(file);
  });
};
