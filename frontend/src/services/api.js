export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  await fetch("https://example-upload-endpoint", {
    method: "POST",
    body: formData,
  });
}

export async function getRecommendation(userId, scenario) {
  const resp = await fetch(
    `https://example.execute-api.eu-west-1.amazonaws.com/prod?userId=${userId}&scenario=${scenario}`
  );
  return resp.json();
}
