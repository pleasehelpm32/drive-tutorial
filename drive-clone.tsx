"use client"

import { useState } from "react"
import { type FileItem, mockData } from "./mockData"
import { FolderIcon, FileIcon, ChevronRightIcon, UploadIcon, HomeIcon } from "lucide-react"
import { Button } from "~/components/ui/button"

const Breadcrumbs = ({ path, onNavigate }: { path: string[]; onNavigate: (index: number) => void }) => {
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {path.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <ChevronRightIcon className="w-4 h-4 mx-1" />}
            <button
              onClick={() => onNavigate(index)}
              className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white"
            >
              {index === 0 ? <HomeIcon className="w-4 h-4 mr-2" /> : null}
              {item}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}

const FileExplorer = ({ items, onFolderClick }: { items: FileItem[]; onFolderClick: (item: FileItem) => void }) => {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
          {item.type === "folder" ? (
            <FolderIcon className="w-5 h-5 text-yellow-500" />
          ) : (
            <FileIcon className="w-5 h-5 text-blue-500" />
          )}
          {item.type === "file" ? (
            <a href={item.url} className="text-blue-400 hover:underline">
              {item.name}
            </a>
          ) : (
            <button onClick={() => onFolderClick(item)} className="text-gray-300 hover:text-white">
              {item.name}
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function DriveClone() {
  const [currentFolder, setCurrentFolder] = useState<FileItem>({
    id: "root",
    name: "My Drive",
    type: "folder",
    children: mockData,
  })
  const [path, setPath] = useState(["My Drive"])

  const handleFolderClick = (folder: FileItem) => {
    setCurrentFolder(folder)
    setPath([...path, folder.name])
  }

  const handleBreadcrumbClick = (index: number) => {
    if (index === 0) {
      setCurrentFolder({ id: "root", name: "My Drive", type: "folder", children: mockData })
      setPath(["My Drive"])
    } else {
      const newPath = path.slice(0, index + 1)
      let newFolder = { id: "root", name: "My Drive", type: "folder", children: mockData }
      for (let i = 1; i < newPath.length; i++) {
        newFolder = newFolder.children?.find((item) => item.name === newPath[i]) as FileItem
      }
      setCurrentFolder(newFolder)
      setPath(newPath)
    }
  }

  const handleUpload = () => {
    // Mock upload functionality
    const newFile: FileItem = {
      id: `${Date.now()}`,
      name: `Uploaded File ${currentFolder.children?.length ?? 0 + 1}.txt`,
      type: "file",
      url: "#",
    }
    setCurrentFolder((prev) => ({
      ...prev,
      children: [...(prev.children ?? []), newFile],
    }))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Google Drive Clone</h1>
        <Button onClick={handleUpload} variant="outline">
          <UploadIcon className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>
      <Breadcrumbs path={path} onNavigate={handleBreadcrumbClick} />
      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <FileExplorer items={currentFolder.children ?? []} onFolderClick={handleFolderClick} />
      </div>
    </div>
  )
}

