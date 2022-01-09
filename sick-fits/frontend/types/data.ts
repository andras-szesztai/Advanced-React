export interface IProduct {
  id: string;
  name: string;
  price: number;
  description?: string;
  photo: {
    image: {
      publicUrlTransformed: string;
    };
  };
}
