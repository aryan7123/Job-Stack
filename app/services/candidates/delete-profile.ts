import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function deleteCandidateProfile(data: { candidateId: string }) {
  try {
    const res = await axios.post("/api/delete-candidate-profile", data);
    return res.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(axiosErr.response?.data?.error || "Something went wrong");
  }
}
