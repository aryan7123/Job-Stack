import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function fetchJobDetails(jobId: string) {
  try {
    const res = await axios.post('/api/job-details', { jobId });
    return res.data;
  } catch (error: any) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(
      axiosErr.response?.data?.error || "Something went wrong"
    );
  }
}
