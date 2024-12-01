const Layout = () => import("@/layout/index.vue");

export default {
  path: "/lmitedTime",
  name: "lmitedTime",
  component: Layout,
  redirect: "/lmitedTime/tabs",
  meta: {
    icon: "ep:home-filled",
    title: "限时领取",
    rank: 1
  },
  children: [
    {
      path: "/lmitedTime/tabs",
      name: "lmitedTimeTabs",
      component: () => import("@/views/lmitedTime/index.vue"),
      meta: {
        title: "限时领取"
      }
    }
  ]
} satisfies RouteConfigsTable;
