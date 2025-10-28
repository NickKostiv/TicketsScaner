import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";



export const useGetCinemaId = () => {

    const [cinemaId, setCinemaId] = useState<string | null>(null);

    useEffect(() => {
        const getCinemaId = async () => {
            const id = await AsyncStorage.getItem("cinemaId");
            setCinemaId(id);
        }
        getCinemaId();
    }, []);

    return { cinemaId };
}