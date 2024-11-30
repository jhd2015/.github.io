import { http } from "@/utils/http";

export const handAddApi = data => {
  return http.request<any>("post", "/hand/add", { data });
};

export const handListApi = data => {
  return http.request<any>("get", "/hand/list", { data });
};
export const handDeleteApi = data => {
  return http.request<any>("post", "/hand/delete", { data });
};
export const handUpdateApi = data => {
  return http.request<any>("post", "/hand/update", { data });
};

export const handUploadApi = data => {
  return http.request<any>(
    "post",
    "/upload",
    { data },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};
