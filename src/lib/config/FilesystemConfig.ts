export interface FilesystemConfig {
  readonly postRootPath: string;
  readonly categoryFilename: string;
  readonly reservedFilenames: string[];
}

export function newFilesystemConfig({
  postRootPath,
  categoryFilename,
  reservedFilenames,
}: {
  postRootPath: string;
  categoryFilename: string;
  reservedFilenames: string[];
}) {
  return {
    postRootPath,
    categoryFilename,
    reservedFilenames,
  } as const;
}
