import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function fetchAllEmployers(page: number) {
  try {
    const res = await axios.get(`/api/all-employers?page=${page}&limit=5`);
    return res.data;
  } catch (error: any) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(
      axiosErr.response?.data?.error || "Something went wrong"
    );
  }
}
