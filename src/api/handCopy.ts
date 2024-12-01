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
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};

export const operationApi = {
  upper(data) {
    return http.request<any>(
      "post",
      "/hand/on",
      { data },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
  },
  lower(data) {
    return http.request<any>(
      "post",
      "/hand/off",
      { data },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
  },
  // delete() {},
  free(data) {
    return http.request<any>(
      "post",
      "/hand/free",
      { data },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
  }
};
