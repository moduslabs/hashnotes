export interface Note {
  content: string;
  createdAt: Date;
  deletedAt: Date | null;
  displayDate: string;
  hashtags: string[];
  id: string;
  updatedAt: Date;
}
