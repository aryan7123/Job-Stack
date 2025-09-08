import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function postJob(
  data: {
    job_title: string;
    job_category: string;
    industry: string;
    job_type: string;
    location: string;
    salary: string;
    experience: string;
    qualification: string;
    description: string;
  },
  employerId: string
) {
  try {
    const res = await axios.post("/api/add-jobs", { data, employerId });
    return res.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(axiosErr.response?.data?.error || "Something went wrong");
  }
}
