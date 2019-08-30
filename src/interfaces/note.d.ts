export interface Note {
  content: string;
  createdAt: Date;
  deletedAt: Date | null;
  id: string;
  updatedAt: Date;
}
