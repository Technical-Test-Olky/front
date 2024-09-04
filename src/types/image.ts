export interface Image {
  id: string;
  name: string;
  mediaLink: string;
  selfLink: string;
  prediction: string;
}

export type ApiImage = {
  currentItems: number;
  currentPage: number;
  dataList: Image[];
  totalItems: number;
  totalPages: number;
};
