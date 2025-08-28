import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function updateProfile(data: {
  your_name: string;
  email: string;
  occupation: string;
  location: string;
  education: string;
  experience: string;
  phone: string;
  website_url: string;
  skills: string[];
  resume: File | null;
  description: string;
}, userId: string) {
  try {
    const formData = new FormData();

    if (data.your_name) formData.append("your_name", data.your_name);
    if (data.email) formData.append("email", data.email);
    if (data.occupation) formData.append("occupation", data.occupation);
    if (data.location) formData.append("location", data.location);
    if (data.education) formData.append("education", data.education);
    if (data.experience) formData.append("experience", data.experience);
    if (data.phone) formData.append("phone", data.phone);
    if (data.website_url) formData.append("website_url", data.website_url);
    if (data.description) formData.append("description", data.description);
    if (userId) formData.append("userId", userId);

    if (data.skills.length > 0) {
      data.skills.forEach((skill) => {
        formData.append("skills", skill);
      });
    }

    if (data.resume) {
      formData.append("resume", data.resume);
    }

    const res = await axios.post("/api/update-candidate-details", formData);
    return res.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(axiosErr.response?.data?.error || "Something went wrong");
  }
}
