export interface Note {
  content: string;
  createdAt: Date;
  deletedAt: Date | null;
  displayDate: string;
  id: string;
  tags: string[];
  updatedAt: Date;
}
