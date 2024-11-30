import Sortable from "sortablejs";
import { ref, nextTick, computed } from "vue";
import { clone } from "@pureadmin/utils";
import dayjs from "dayjs";

const date = dayjs(new Date()).format("YYYY-MM-DD");
const tableData = [
  {
    date,
    name: "序号",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date,
    name: "Jack",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date,
    name: "Dick",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date,
    name: "Harry",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date,
    name: "Sam",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date,
    name: "Lucy",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date,
    name: "Mary",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date,
    name: "Mike",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date,
    name: "Mike1",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date,
    name: "Mike2",
    address: "No. 189, Grove St, Los Angeles"
  }
];
const tableDataDrag = clone(tableData, true).map((item, index) => {
  delete item.address;
  delete item.date;
  return Object.assign(item, {
    id: index + 1,
    date: `${dayjs(new Date()).format("YYYY-MM")}-${index + 1}`
  });
});

export function uesTabTable(props) {
  const dataList = ref(clone(tableDataDrag, true));

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
          const currentRow = dataList.value.splice(oldIndex, 1)[0];
          dataList.value.splice(newIndex, 0, currentRow);
        }
      });
    });
  };
  const columns = computed<TableColumnList>(() => {
    if (props.type == "1") {
      return [
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
          prop: "date"
        },
        {
          label: "编号",
          prop: "name"
        },
        {
          label: "标题",
          prop: "name",
          width: 300
        },
        {
          label: "一级分类",
          prop: "name",
          headerSlot: "jointLevel1"
        },
        {
          label: "二级分类",
          prop: "name",
          headerSlot: "jointLevel2"
        },
        {
          label: "三级分类",
          prop: "name",
          headerSlot: "jointLevel3"
        },
        {
          label: "格式",
          prop: "name"
        },
        {
          label: "更新日期",
          prop: "name"
        },
        {
          label: "操作",
          prop: "name",
          slot: "operation"
        }
      ];
    } else {
      return [
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
          label: "编号",
          prop: "date"
        },
        {
          label: "名称",
          prop: "name",
          width: 300
        },

        {
          label: "一级分类",
          prop: "name",
          headerSlot: "jointLevel1"
        },
        {
          label: "二级分类",
          prop: "name",
          headerSlot: "jointLevel2"
        },
        {
          label: "三级分类",
          prop: "name",
          headerSlot: "jointLevel3"
        },
        {
          label: "格式",
          prop: "name"
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
          slot: "operation"
        }
      ];
    }
  });
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

  return {
    columns,
    dataList,
    options
  };
}
