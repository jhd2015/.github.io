import { http } from "@/utils/http";

export const materialAddApi = data => {
  return http.request<any>("post", "/material/add", { data });
};

export const materialListApi = data => {
  return http.request<any>("get", "/material/list", { data });
};
export const materialDeleteApi = data => {
  return http.request<any>("post", "/material/delete", { data });
};
export const materialUpdateApi = data => {
  return http.request<any>("post", "/material/update", { data });
};

export const materialUploadApi = data => {
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
    return http.request<any>("post", "/material/on", { data });
  },
  lower(data) {
    return http.request<any>("post", "/material/off", { data });
  },
  // delete() {},
  free(data) {
    return http.request<any>("post", "/material/free", { data });
  }
};
