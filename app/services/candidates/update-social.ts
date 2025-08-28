import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function updateSocialLinks(
  data: {
    twitter: string;
    instagram: string;
    linkedin: string;
    facebook: string;
  },
  userId: string
) {
  try {
    const formData = new FormData();

    if (userId) formData.append("userId", userId);
    if (data.twitter) formData.append("twitter", data.twitter);
    if (data.instagram) formData.append("instagram", data.instagram);
    if (data.linkedin) formData.append("linkedin", data.linkedin);
    if (data.facebook) formData.append("facebook", data.facebook);

    const res = await axios.post("/api/update-candidate-social", formData);
    return res.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(axiosErr.response?.data?.error || "Something went wrong");
  }
}
