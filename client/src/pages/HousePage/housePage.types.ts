export type HousePageType = {
  id: string;
  title: string;
  price: number;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  transaction: string;
  property: string;
  features: {
    general: {
      utilities: boolean;
      petPolicy: boolean;
      income: boolean;
    };
    sizes: {
      house: number;
      bedrooms: number;
      bathrooms: number;
    };
    nearbyPlaces: { key: string; value: string }[];
  };
  images: {
    filename: string;
    url: string;
    public_id: string;
  }[];
  user: {
    id: string;
    username: string;
    fullname: string;
    email: string;
    avatar: {
      url: string;
    } | null;
  };
};
