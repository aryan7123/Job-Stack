import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function updatePassword(data: {
    old_password: string, 
    new_password: string, 
    retype_password: string
}, userId: string) {
    try {
        const res = await axios.post("/api/update-candidate-password", { ...data, userId });
        return res.data;
    } catch (error) {
        const axiosErr = error as AxiosError<ApiError>;
        throw new Error(axiosErr.response?.data?.error || "Something went wrong");
    }
}