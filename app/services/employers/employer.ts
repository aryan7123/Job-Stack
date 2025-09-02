import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function employerProfile(employerId: string) {
  try {
    const res = await axios.post("/api/employer-profile", { employerId });
    return res.data;
  } catch (error: any) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(
      axiosErr.response?.data?.error || "Something went wrong"
    );
  }
}
