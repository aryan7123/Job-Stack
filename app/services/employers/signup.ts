import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function registerEmployer(data: {
  your_name: string;
  email: string;
  password: string;
  confirm_password: string;
  terms_conditions: boolean;
}) {
  try {
    const res = await axios.post("/api/employer-signup", data);
    return res.data;
  } catch (error: any) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(
      axiosErr.response?.data?.error || "Something went wrong"
    );
  }
}
