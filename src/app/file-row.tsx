<<<<<<< Updated upstream
import { Folder as FolderIcon, FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

import type { folders_table, files_table } from "~/server/db/schema";

export function FileRow(props: { file: typeof files_table.$inferSelect }) {
=======
import { File, Folder } from "../lib/mock-data";
import {
  Folder as FolderIcon,
  File as FileIcon,
  Upload,
  ChevronRight,
} from "lucide-react";

import { Button } from "~/components/ui/button";

export function FileRow(props: { file: File }) {
>>>>>>> Stashed changes
  const { file } = props;
  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
<<<<<<< Updated upstream
            href={file.url}
=======
            href={file.url ?? "#"}
>>>>>>> Stashed changes
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
<<<<<<< Updated upstream
        <div className="col-span-2 text-gray-400">{"file"}</div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
        <div className="col-span-1 text-gray-400">
          {/* <Button
            variant="ghost"
            onClick={() => deleteFile(file.id)}
            aria-label="Delete file"
          >
            <Trash2Icon size={20} />
          </Button> */}
        </div>
=======
        <div className="col-span-3 text-gray-400">{"file"}</div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
>>>>>>> Stashed changes
      </div>
    </li>
  );
}

export function FolderRow(props: {
<<<<<<< Updated upstream
  folder: typeof folders_table.$inferSelect;
}) {
  const { folder } = props;
=======
  folder: Folder;
  handleFolderClick: () => void;
}) {
  const { folder, handleFolderClick } = props;
>>>>>>> Stashed changes
  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
<<<<<<< Updated upstream
          <Link
            href={`/f/${folder.id}`}
=======
          <button
            onClick={() => handleFolderClick()}
>>>>>>> Stashed changes
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
<<<<<<< Updated upstream
          </Link>
=======
          </button>
>>>>>>> Stashed changes
        </div>
        <div className="col-span-3 text-gray-400"></div>
        <div className="col-span-3 text-gray-400"></div>
      </div>
    </li>
  );
}
