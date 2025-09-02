import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function loginEmployer(data: {
  email: string;
  password: string;
}) {
  try {
    const res = await axios.post("/api/employer-login", data);
    return res.data;
  } catch (error: any) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(
      axiosErr.response?.data?.error || "Something went wrong"
    );
  }
}
