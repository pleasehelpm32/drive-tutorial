"use client";

import { useState } from "react";
import { type FileItem, mockData } from "./mockData";
import {
  FolderIcon,
  FileIcon,
  ChevronRightIcon,
  UploadIcon,
  HomeIcon,
} from "lucide-react";
import { Button } from "~/components/ui/button";

const Breadcrumbs = ({
  path,
  onNavigate,
}: {
  path: string[];
  onNavigate: (index: number) => void;
}) => {
  return (
    <nav className="mb-4 flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {path.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <ChevronRightIcon className="mx-1 h-4 w-4" />}
            <button
              onClick={() => onNavigate(index)}
              className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white"
            >
              {index === 0 ? <HomeIcon className="mr-2 h-4 w-4" /> : null}
              {item}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

const FileExplorer = ({
  items,
  onFolderClick,
}: {
  items: FileItem[];
  onFolderClick: (item: FileItem) => void;
}) => {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center space-x-2 rounded p-2 hover:bg-gray-800"
        >
          {item.type === "folder" ? (
            <FolderIcon className="h-5 w-5 text-yellow-500" />
          ) : (
            <FileIcon className="h-5 w-5 text-blue-500" />
          )}
          {item.type === "file" ? (
            <a href={item.url} className="text-blue-400 hover:underline">
              {item.name}
            </a>
          ) : (
            <button
              onClick={() => onFolderClick(item)}
              className="text-gray-300 hover:text-white"
            >
              {item.name}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default function DriveClone() {
  const [currentFolder, setCurrentFolder] = useState<FileItem>({
    id: "root",
    name: "My Drive",
    type: "folder",
    children: mockData,
  });
  const [path, setPath] = useState(["My Drive"]);

  const handleFolderClick = (folder: FileItem) => {
    setCurrentFolder(folder);
    setPath([...path, folder.name]);
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === 0) {
      setCurrentFolder({
        id: "root",
        name: "My Drive",
        type: "folder",
        children: mockData,
      });
      setPath(["My Drive"]);
    } else {
      const newPath = path.slice(0, index + 1);
      let newFolder = {
        id: "root",
        name: "My Drive",
        type: "folder" as const,
        children: mockData,
      };
      for (let i = 1; i < newPath.length; i++) {
        const found = newFolder.children.find(
          (item) => item.name === newPath[i],
        );
        if (!found || found.type !== "folder") continue;
        newFolder = found as {
          id: string;
          name: string;
          type: "folder";
          children: FileItem[];
        };
      }
      setCurrentFolder(newFolder);
      setPath(newPath);
    }
  };

  const handleUpload = () => {
    // Mock upload functionality
    const newFile: FileItem = {
      id: `${Date.now()}`,
      name: `Uploaded File ${currentFolder.children?.length ?? 0 + 1}.txt`,
      type: "file",
      url: "#",
    };
    setCurrentFolder((prev) => ({
      ...prev,
      children: [...(prev.children ?? []), newFile],
    }));
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Google Drive Clone</h1>
        <Button onClick={handleUpload} variant="outline">
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>
      <Breadcrumbs path={path} onNavigate={handleBreadcrumbClick} />
      <div className="rounded-lg bg-gray-800 p-6 shadow-md">
        <FileExplorer
          items={currentFolder.children ?? []}
          onFolderClick={handleFolderClick}
        />
      </div>
    </div>
  );
}
