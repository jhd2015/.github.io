import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { materialDeleteApi } from "@/api/teachingAids";
import { getUserList } from "@/api/user";
import type { PaginationProps } from "@pureadmin/table";

export function uesTabTable() {
  const tableData = ref({
    list: [],
    isLoading: false
  });
  const searchModel = ref("");
  const pagination = reactive<PaginationProps>({
    pageSize: 20,
    currentPage: 1,
    pageSizes: [20, 40, 60],
    total: 0,
    align: "right",
    background: true,
    size: "default"
  });
  function onSizeChange() {
    loadData();
  }
  function onCurrentChange() {
    loadData();
  }
  function loadData() {
    tableData.value.isLoading = true;

    getUserList({
      pageSize: pagination.pageSize,
      pageNum: pagination.currentPage,
      phoneNumber: searchModel.value
    })
      .then(res => {
        tableData.value.list = res.list;
        pagination.total = res.total;
      })
      .finally(() => {
        tableData.value.isLoading = false;
      });
  }

  const columns = ref<TableColumnList>([
    { type: "index", label: "序号", width: 100 },
    {
      label: "手机号",
      prop: "phone_info.phoneNumber",
      width: 150
    },
    {
      label: "状态",
      prop: "state",
      slot: "state"
    },
    {
      label: "星币",
      prop: "myCoin"
    },
    {
      label: "购买数",
      prop: "likes",
      cellRenderer({ row }: any) {
        return row?.buysMaterial?.length + row?.buys?.length;
      }
    },
    {
      label: "手抄报点赞",
      prop: "likes",
      cellRenderer({ row }: any) {
        return row?.likes?.length;
      }
    },
    {
      label: "教辅资料点赞",
      prop: "likes",
      cellRenderer({ row }: any) {
        return row?.likesMaterial?.length;
      }
    },
    {
      label: "创建时间",
      prop: "date",
      cellRenderer({ row }: any) {
        return row?.date?.slice(0, 10);
      }
    },
    {
      label: "操作",
      prop: "name",
      slot: "operation"
    }
  ]);
  const options = [
    {
      value: 1,
      label: "Asia",
      children: [
        {
          value: 2,
          label: "China",
          children: [
            { value: 3, label: "Beijing" },
            { value: 4, label: "Shanghai" },
            { value: 5, label: "Hangzhou" }
          ]
        },
        {
          value: 6,
          label: "Japan",
          children: [
            { value: 7, label: "Tokyo" },
            { value: 8, label: "Osaka" },
            { value: 9, label: "Kyoto" }
          ]
        },
        {
          value: 10,
          label: "Korea",
          children: [
            { value: 11, label: "Seoul" },
            { value: 12, label: "Busan" },
            { value: 13, label: "Taegu" }
          ]
        }
      ]
    },
    {
      value: 14,
      label: "Europe",
      children: [
        {
          value: 15,
          label: "France",
          children: [
            { value: 16, label: "Paris" },
            { value: 17, label: "Marseille" },
            { value: 18, label: "Lyon" }
          ]
        },
        {
          value: 19,
          label: "UK",
          children: [
            { value: 20, label: "London" },
            { value: 21, label: "Birmingham" },
            { value: 22, label: "Manchester" }
          ]
        }
      ]
    },
    {
      value: 23,
      label: "North America",
      children: [
        {
          value: 24,
          label: "US",
          children: [
            { value: 25, label: "New York" },
            { value: 26, label: "Los Angeles" },
            { value: 27, label: "Washington" }
          ]
        },
        {
          value: 28,
          label: "Canada",
          children: [
            { value: 29, label: "Toronto" },
            { value: 30, label: "Montreal" },
            { value: 31, label: "Ottawa" }
          ]
        }
      ]
    }
  ];
  function handleSelectionChange(val) {
    console.log(val);
  }
  function handDelete(id) {
    ElMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        materialDeleteApi({ id }).then(() => {
          ElMessage.success("删除成功");
          loadData();
        });
      })
      .catch(() => {
        ElMessage.info("已取消删除");
      });
  }
  return {
    columns,
    loadData,
    options,
    tableData,
    handDelete,
    handleSelectionChange,
    searchModel,
    pagination,
    onSizeChange,
    onCurrentChange
  };
}
