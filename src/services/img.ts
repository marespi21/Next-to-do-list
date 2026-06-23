
export const getImgs = async () => {
  const res = await fetch("/api/img");
  const data = await res.json();
  return data;
};

export const postImg = async (
  title: string,
  description: string,
  file: File,
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("img", file);

  const res = await fetch("/api/img", {
    method: "POST",
    body: formData,
  });

  return res;
};