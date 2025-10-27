import { Hall } from "./hall";

export interface HallSession {
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


export type MovieTypeResponse = MovieInfoApiResponse &
  MovieDetailsApiResponse &
  MovieMediaApiResponse;


  export type MovieInfoApiResponse = {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    genres: string[];
    duration: number;
    trailerDuration: number;
    countries: string[];
    year: number;
    ageLimit: number;
    hasAccessibilitySupport: boolean;
    premiereDate: Date;
    vatPercentage?: number;
  };
  
  export type MovieDetailsApiResponse = {
    originalTitle?: string | null;
    distributor?: Distributor | null;
    productionStudios?: ProductionStudio | null;
    language?: string | null;
    imdbRating?: number | null;
    rottenTomatoesRating?: number | null;
    officialSiteUrl?: string | null;
    socialMediaLinks?: string[] | null;
    formats?: string[] | null;
    endDate?: Date | null;
    crewAssignments?: CrewAssignment[] | null;
  };
  
  export type MovieMediaApiResponse = {
    posterUrl?: string;
    verticalPosterUrl?: string;
    horizontalPosterUrl?: string;
    trailerUrl?: string;
    media?: MovieMedia[] | null;
  };

  export type MovieMedia = {
    id: string;
    type:
      | "poster"
      | "verticalPoster"
      | "horizontalPoster"
      | "trailer"
      | "backdrop"
      | "gallery";
    movieId: string;
    fileId: string;
    path: string;
    createdAt: Date;
    updatedAt: Date;
  };

  export interface Distributor {
    id: string;
    name: string;
  }

  export interface ProductionStudio {
    id: string;
    name: string;
  }

  export interface CrewAssignment {
    id: string;
    roles: string[];
    teamMember: MovieMember;
  }

  export interface MovieMember {
    id: string;
    fullName: string;
    photo?: {
      id: string;
      path: string;
    };
  }

  export type PriceSchema = {
    id: string;
    name: string;
    startTime: string;
    startDate: string | null;
    endTime: string;
    endDate: string | null;
    days: WeekDay[];
    infinite: boolean;
    descriptions: PriceSchemaDescription[];
  };

  export enum WeekDay {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 0,
  }

  export type PriceSchemaDescription = {
    id: string;
    seatType: SeatType;
    ticketType: TicketType;
    price: number;
  };

  export type SeatType = {
    id: string;
    name: string;
    width: number;
    height: number;
    icon: string;
    color: string;
    hall?: Hall;
    capacity?: number;
  };

  export interface TicketType {
    id: string;
    name: string;
    description: string;
    percentage?: number;
  }