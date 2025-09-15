import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function sendUserComment(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const res = await axios.post("/api/send-comment", data);
    return res.data;
  } catch (error: any) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(
      axiosErr.response?.data?.error || "Something went wrong"
    );
  }
}
