import { http } from "@/utils/http";

export const handAddApi = data => {
  return http.request<any>("post", "/hand/add", { data });
};

export const handListApi = params => {
  return http.request<any>("get", "/hand/list", { params });
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

export const operationApi = {
  upper(data) {
    return http.request<any>("post", "/hand/on", { data });
  },
  lower(data) {
    return http.request<any>("post", "/hand/off", { data });
  },
  // delete() {},
  free(data) {
    return http.request<any>("post", "/hand/free", { data });
  }
};
