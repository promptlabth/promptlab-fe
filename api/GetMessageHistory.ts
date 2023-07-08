import axios from 'axios';

async function getMessageHistoryWithUserId(id: string | undefined) {
    const apiUrl = `https://prompt-lab-be-dev-uu4qhhj35a-as.a.run.app/get-caption/${id}`
    try {

        const requestOption = { 
            headers: { 
                "Authorization": `Bearer ${localStorage.getItem("at")}`,
                "RefreshToken": localStorage.getItem("rt")
            },
        }
        const response = await axios.get(
            apiUrl,
            // UserGenerateMessage,
            requestOption
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return 'Error Please try again'
    }
}

export { getMessageHistoryWithUserId }
