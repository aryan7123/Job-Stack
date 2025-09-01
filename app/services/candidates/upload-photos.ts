export async function updateCandidatePhotos(
  data: {
    profile_picture: File | null;
    background: File | null;
  },
  userId: string
) {
  try {
    const formData = new FormData();

    if (data.profile_picture) formData.append("profile_picture", data.profile_picture);
    if (data.background) formData.append("background", data.background);
    if (userId) formData.append("userId", userId);

    const res = await fetch("/api/upload-candidate-photos", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Something went wrong");
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}
