export interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  url?: string
  children?: FileItem[]
}

export const mockData: FileItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    children: [
      {
        id: "2",
        name: "Work",
        type: "folder",
        children: [
          {
            id: "3",
            name: "Project Proposal.docx",
            type: "file",
            url: "#",
          },
          {
            id: "4",
            name: "Budget.xlsx",
            type: "file",
            url: "#",
          },
          {
            id: "5",
            name: "Team",
            type: "folder",
            children: [
              {
                id: "6",
                name: "Meeting Notes.txt",
                type: "file",
                url: "#",
              },
            ],
          },
        ],
      },
      {
        id: "7",
        name: "Personal",
        type: "folder",
        children: [
          {
            id: "8",
            name: "Resume.pdf",
            type: "file",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "9",
    name: "Photos",
    type: "folder",
    children: [
      {
        id: "10",
        name: "Vacation.jpg",
        type: "file",
        url: "#",
      },
      {
        id: "11",
        name: "Family.jpg",
        type: "file",
        url: "#",
      },
    ],
  },
  {
    id: "12",
    name: "Project.zip",
    type: "file",
    url: "#",
  },
]

