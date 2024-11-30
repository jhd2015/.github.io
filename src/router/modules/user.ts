const Layout = () => import("@/layout/index.vue");

export default {
  path: "/user",
  name: "user",
  component: Layout,
  redirect: "/user/list",
  meta: {
    icon: "ri:admin-line",
    title: "用户列表",
    rank: 4
  },
  children: [
    {
      path: "/user/list",
      name: "userList",
      component: () => import("@/views/user/index.vue"),
      meta: {
        title: "用户列表"
      }
    }
  ]
} satisfies RouteConfigsTable;
