import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function sendJobApplication(data: {
  cover_letter: File | null;
  resume: File | null;
  userId: string | undefined;
  jobId: string | undefined;
}) {
  try {
    const formData = new FormData();

    if (data.userId) formData.append("userId", data.userId);
    if (data.jobId) formData.append("jobId", data.jobId);

    if (data.cover_letter) formData.append("cover_letter", data.cover_letter);
    if (data.resume) formData.append("resume", data.resume);

    const res = await axios.post("/api/send-application", formData);
    return res.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(axiosErr.response?.data?.error || "Something went wrong");
  }
}
