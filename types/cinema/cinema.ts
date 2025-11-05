export type Cinema = {
    id: string;
    name: string;
    city: string;
    address: string;
    status: StatusEnum;
    mapLink?: string;
    mapIframe?: string;
    logo?: { id: string; path: string };
    photo?: { id: string; path: string };
}

export enum StatusEnum {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED",
}