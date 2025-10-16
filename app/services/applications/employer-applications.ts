import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function fetchEmployerApplication(employerId: string) {
    try {
        const response = await axios.post('/api/employer-applications', { employerId });
        return response.data;
    }
    catch (error) {
        const axiosErr = error as AxiosError<ApiError>;
        throw new Error(axiosErr.response?.data?.error || "Something went wrong");
    }
}