import Sortable from "sortablejs";
import { ref, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  materialDeleteApi,
  materialListApi,
  operationApi
} from "@/api/teachingAids";

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

export function uesTabTable(props: any) {
  const tableData = ref({
    list: [],
    isLoading: false
  });
  const searchModel = ref<any>({
    title: ""
  });
  if (props.isStarCoin) {
    searchModel.value.starCoin = "0";
  }
  function loadData() {
    tableData.value.isLoading = true;
    const data = {
      pageSize: 999999
    };
    for (let key in searchModel.value) {
      if (searchModel.value[key]) {
        data[key] = searchModel.value[key];
      }
    }
    materialListApi(data)
      .then(list => {
        tableData.value.list = list;
      })
      .finally(() => {
        tableData.value.isLoading = false;
      });
  }

  const rowDrop = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    nextTick(() => {
      const wrapper: HTMLElement = document.querySelector(
        ".el-table__body-wrapper tbody"
      );
      Sortable.create(wrapper, {
        animation: 300,
        handle: ".drag-btn",
        onEnd: ({ newIndex, oldIndex }) => {
          const currentRow = tableData.value.list.splice(oldIndex, 1)[0];
          tableData.value.list.splice(newIndex, 0, currentRow);
        }
      });
    });
  };
  const columns = ref<TableColumnList>([
    {
      type: "selection",
      align: "left"
    },
    {
      label: "序号",
      prop: "id",
      cellRenderer: ({ row }) => (
        <div class="flex items-center">
          <iconify-icon-online
            icon="icon-park-outline:drag"
            class="drag-btn cursor-grab"
            onMouseenter={(event: { preventDefault: () => void }) =>
              rowDrop(event)
            }
          />
          <p class="ml-[16px]">{row.id}</p>
        </div>
      )
    },
    {
      label: "封面",
      prop: "img",
      slot: "img",
      width: 60
    },
    {
      label: "名称",
      prop: "title",
      width: 300
    },
    {
      label: "一级分类",
      prop: "type1",
      headerSlot: "jointLevel1"
    },
    {
      label: "二级分类",
      prop: "type2",
      headerSlot: "jointLevel2"
    },
    {
      label: "三级分类",
      prop: "type3",
      headerSlot: "jointLevel3"
    },
    {
      label: "星币数",
      prop: "starCoin",
      cellRenderer: ({ row }) => {
        if (row.starCoin > 0) {
          return row.starCoin;
        } else {
          return "免费";
        }
      }
    },
    {
      label: "状态",
      prop: "state",
      cellRenderer: ({ row }) => {
        if (row.status) {
          return <el-tag type="primary">上架</el-tag>;
        } else {
          return <el-tag type="danger">下架</el-tag>;
        }
      }
    },
    {
      label: "大小",
      prop: "name"
    },
    {
      label: "更新日期",
      prop: "name"
    },
    {
      label: "操作",
      prop: "name",
      slot: "operation",
      width: 200
    }
  ]);
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
  function headOperationAll(type: "upper" | "lower" | "delete" | "free") {
    operationApi[type] &&
      operationApi[type]({ ids: JSON.stringify(ids.value) })?.then(() => {
        ElMessage.success("操作成功");
        loadData();
      });
  }
  const ids = ref([]);
  function handleSelectionChange(list) {
    ids.value = [];
    ids.value = list.map(({ _id }) => {
      return _id;
    });
  }
  function handUpper(id) {
    operationApi.upper({ ids: JSON.stringify([id]) }).then(() => {
      ElMessage.success("操作成功");
      loadData();
    });
  }
  function handLower(id) {
    operationApi.lower({ ids: JSON.stringify([id]) }).then(() => {
      ElMessage.success("操作成功");
      loadData();
    });
  }
  return {
    columns,
    options,
    handleSelectionChange,
    handDelete,
    loadData,
    tableData,
    searchModel,
    headOperationAll,
    handUpper,
    handLower
  };
}
