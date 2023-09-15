export interface User {
  id: string;
  name: string;
  lastName: string;
  isActive: boolean;
  routines: Routine[];
}

export interface Routine {
  startTime: string; //Review this type
  endTime: string; //Review this type
  exercises: string;
  day: string;
}

export interface UserApiResponse {
  data: {
    id: number;
    attributes: {
      name: string;
      lastName: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
