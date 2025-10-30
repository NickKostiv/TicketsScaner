import { Hall } from "../hall/hall";
import { MovieTypeResponse } from "../movie/movie";
import { PriceSchema } from "../priceSchema/priceSchema";


export type HallSession = {
  id: string;
  start: string;
  end: string;
  block: boolean;
  isEnable: boolean;
  sitePurchase: boolean;
  canceled: boolean;
  bookingDeadline: number;
  cleaningTime: number;
  adsTime: number;
  createdAt: string;
  updatedAt: string;
  hall: Hall;
  movie: MovieTypeResponse;
  priceScheme: PriceSchema;
}





 

  

 

  

  

  

  

 