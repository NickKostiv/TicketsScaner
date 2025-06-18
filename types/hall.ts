export type HallType = "DELUXE" | "VIP" | "STANDARD";

export type Hall = {
  id: string;
  name: string;
  shortName: string;
  alternativeName: string;
  hallTypeId: HallType;
  description: string;
  width: number;
  height: number;
  capacity: number;
};
