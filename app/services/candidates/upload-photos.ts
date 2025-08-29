import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function updateCandidatePhotos(
  data: {
    profile_picture: File | null;
    background: File | null;
  },
  userId: string
) {
  try {
    const formData = new FormData();

    if(data.profile_picture) formData.append("profile_picture", data.profile_picture);
    if(data.background) formData.append("background", data.background);
    if(userId) formData.append("userId", userId);

    const res = await axios.post("/api/candidate-profile", formData);
    return res.data;
  } catch (error: any) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(axiosErr.response?.data?.error || "Something went wrong");
  }
}
