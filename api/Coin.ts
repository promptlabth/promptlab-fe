import axios from "axios";

// TODO: this is not implemented in the backend yet
export async function getCoinByID(id: number) {
    try {
        const apiUrl = `https://url.com/coin/${id}`
        
        const response = await axios.get(apiUrl);

        return response.data;
    } catch (e) {
        console.error(e);
    }
}

// TODO: this is not implemented in the backend yet
export async function updateCoinByID(id: number, total: number) {
    try {
        const apiUrl = `https://url.com/coin/${id}`
        
        const response = await axios.patch(apiUrl, { total });

        return response.data;
    } catch (e) {
        console.error(e);
    }
}

// TODO: this is not implemented in the backend yet
export async function addCoin(){
    try {
        const apiUrl = `https://url.com/coins`
        
        const response = await axios.post(apiUrl, {});

        return response.data;
    } catch (e) {
        console.error(e);
    }
}