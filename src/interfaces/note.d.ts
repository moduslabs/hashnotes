export interface Note {
  content: string;
  createdAt: Date;
  deletedAt: Date | null;
  displayDate: string;
  id: string;
  updatedAt: Date;
}
