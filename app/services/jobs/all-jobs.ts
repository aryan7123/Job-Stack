import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function fetchAllJobs() {
  try {
    const res = await axios.get("/api/all-jobs");
    return res.data;
  } catch (error: any) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(
      axiosErr.response?.data?.error || "Something went wrong"
    );
  }
}
