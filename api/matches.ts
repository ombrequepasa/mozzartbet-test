import makeRequest from "@/lib/makeRequest";

export const getMatches = async () => {
  const response = await makeRequest({
    method: "GET",
    url: `/matches`,
  });

  return response.matches ?? [];
};
