const Layout = () => import("@/layout/index.vue");

export default {
  path: "handCopy",
  name: "handCopy",
  component: Layout,
  redirect: "/handCopy/list",
  meta: {
    icon: "ri:list-check",
    title: "手抄报",
    rank: 2
  },
  children: [
    {
      path: "/handCopy/list",
      name: "thandCopyList",
      component: () => import("@/views/handCopy/index.vue"),
      meta: {
        title: "手抄报"
        /** 路由组件缓存（开启 `true`、关闭 `false`）`可选` */
        // keepAlive: true
      }
    }
  ]
} satisfies RouteConfigsTable;
