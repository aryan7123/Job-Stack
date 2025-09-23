import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function fetchRecentlyAppliedJobs(userId: string) {
    try {
        const response = await axios.post('/api/recently-applied-jobs', { userId });
        return response.data;
    }
    catch (error) {
        const axiosErr = error as AxiosError<ApiError>;
        throw new Error(axiosErr.response?.data?.error || "Something went wrong");
    }
}