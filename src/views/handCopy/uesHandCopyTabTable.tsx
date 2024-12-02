import Sortable from "sortablejs";
import { ref, nextTick } from "vue";
import { handListApi, operationApi } from "@/api/handCopy";
import { ElMessage, ElMessageBox } from "element-plus";
import { handDeleteApi } from "../../api/handCopy";
import { copyTextToClipboard } from "@/utils";

export function uesTabTable() {
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
  const tableData = ref({
    list: [],
    isLoading: false
  });
  const searchModel = ref({
    title: "",
    month: "",
    baiduLink: ""
  });
  function loadData() {
    tableData.value.isLoading = true;

    handListApi(searchModel.value)
      .then(list => {
        tableData.value.list = list.map(item => {
          if (typeof item.img === "string") {
            // const array = item.img
            //   .match(/'([^']+)'/g)
            //   .map(item => item.slice(1, -1));
            // console.log(array);
            item.img = item.img.split(",");
          }
          return item;
        });
      })
      .finally(() => {
        tableData.value.isLoading = false;
      });
  }
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
      slot: "img"
    },
    {
      label: "编号",
      prop: "number"
    },
    {
      label: "标题",
      prop: "title",
      width: 300
    },
    {
      label: "一级分类",
      prop: "month",
      headerSlot: "jointLevel1"
    },
    {
      label: "二级分类",
      prop: "festival",
      headerSlot: "jointLevel2"
    },
    {
      label: "三级分类",
      prop: "name",
      headerSlot: "jointLevel3"
    },
    {
      label: "格式",
      prop: "starCoin"
    },
    {
      label: "格式",
      prop: "name"
    },
    {
      label: "状态",
      prop: "status",
      cellRenderer: ({ row }) => {
        if (row.status) {
          return <el-tag type="primary">上架</el-tag>;
        } else {
          return <el-tag type="danger">下架</el-tag>;
        }
      }
    },
    {
      label: "更新日期",
      prop: "name"
    },
    {
      label: "操作",
      prop: "name",
      width: 200,
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
  const ids = ref([]);
  function handleSelectionChange(list) {
    ids.value = [];
    ids.value = list.map(({ _id }) => {
      return _id;
    });
  }

  function handDelete(id) {
    ElMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        handDeleteApi({ id }).then(() => {
          ElMessage.success("删除成功");
          loadData();
        });
      })
      .catch(() => {
        ElMessage.info("已取消删除");
      });
  }
  /**
    *
    *  <el-button @click="headOperationAll('upper')" >批量上架</el-button>
        <el-button @click="headOperationAll('lower')">批量下架</el-button>
        <el-button @click="headOperationAll('delete')">批量删除</el-button>
        <el-button @click="headOperationAll('free')" type="primary">设置免费</el-button>

  **/
  function headOperationAll(type: "upper" | "lower" | "delete" | "free") {
    // type === "upper";
    // const formData = new FormData();
    // formData.append(`ids`, JSON.stringify(ids.value));
    operationApi[type] &&
      operationApi[type]({ ids: JSON.stringify(ids.value) })?.then(() => {
        ElMessage.success("操作成功");
        loadData();
      });
  }

  return {
    columns,
    tableData,
    options,
    searchModel,
    handleSelectionChange,
    loadData,
    copyTextToClipboard,
    handDelete,
    headOperationAll
  };
}
