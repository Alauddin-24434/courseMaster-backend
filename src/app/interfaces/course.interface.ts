// interfaces/course.interface.ts

export interface ICategory {

  name: string;    
 
}


export interface ICourse {
  title: string;
  description?: string;
  thumbnail: string;
  previewVideo: string;
  price: number;
  category: string;
  tags?: string[];
  instructor: string;
  enrollCounts: string[];
  courseIncludes?: string[];
  isPublished?: boolean;
}
