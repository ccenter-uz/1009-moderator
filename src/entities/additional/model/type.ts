export interface getAdditionalsType {
  result: {
    data: {
      id: string;
      name: { ru: string; uz: string; en: string };
      status: number;
    }[];
    totalDocs: number;
  };
}
