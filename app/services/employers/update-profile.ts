import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function updateEmployerProfile(
  data: {
    name: string;
    email: string;
    industry?: string;
    companySize?: string;
    yearFounded?: string;
    founder?: string;
    headquarters?: string;
    website?: string;
    description?: string;
    specialties?: string[];
    companyLogo?: File | null;
    photos?: File[] | null;
  },
  employerId: string
) {
  try {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.email) formData.append("email", data.email);
    if (data.industry) formData.append("industry", data.industry);
    if (data.companySize) formData.append("companySize", data.companySize);
    if (data.yearFounded) formData.append("yearFounded", data.yearFounded);
    if (data.founder) formData.append("founder", data.founder);
    if (data.headquarters) formData.append("headquarters", data.headquarters);
    if (data.website) formData.append("website", data.website);
    if (data.description) formData.append("description", data.description);
    if (data.companyLogo) formData.append("companyLogo", data.companyLogo);
    if (employerId) formData.append("employerId", employerId);
    if (data.specialties && data.specialties.length > 0) {
      data.specialties.forEach((special) => {
        formData.append("specialties", special);
      });
    }
    
    const res = await axios.post("/api/update-employer-details", formData);
    return res.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(axiosErr.response?.data?.error || "Something went wrong");
  }
}
