export type Hall = {
  id: string;
  name: string;
  shortName: string;
  alternativeName: string;
  hallType: HallType;
  description?: string;
  width: number;
  height: number;
  capacity: number;
  cinemaId: string;
  screenX: number;
  screenY: number;
  screenType: string;
  screenWidth: number;
};

export type HallType = {
  id: string;
  name: string;
  description: string;
}
