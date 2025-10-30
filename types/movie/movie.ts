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

export type CrewAssignment = {
  id: string;
  roles: string[];
  teamMember: MovieMember;
};

export type MovieMember = {
  id: string;
  fullName: string;
  photo?: {
    id: string;
    path: string;
  };
};

export type Distributor = {
  id: string;
  name: string;
};

export type ProductionStudio = {
  id: string;
  name: string;
};
