const Layout = () => import("@/layout/index.vue");

export default {
  path: "/teachingAids",
  name: "teachingAids",
  component: Layout,
  redirect: "/teachingAids/list",
  meta: {
    icon: "ri:table-line",
    title: "教辅资料",
    rank: 3
  },
  children: [
    {
      path: "/teachingAids/list",
      name: "teachingAidsList",
      component: () => import("@/views/teachingAids/index.vue"),
      meta: {
        title: "教辅资料"
      }
    }
  ]
} satisfies RouteConfigsTable;
