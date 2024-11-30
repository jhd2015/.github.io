import { ref } from "vue";
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

export function uesTabTable() {
  const dataList = ref(clone(tableDataDrag, true));

  const columns = ref<TableColumnList>([
    {
      label: "序号",
      prop: "id"
    },
    {
      label: "手机号",
      prop: "date"
    },
    {
      label: "昵称",
      prop: "name"
    },
    {
      label: "会员",
      prop: "name"
    },

    {
      label: "会员时间",
      prop: "name",
      width: 300
    },
    {
      label: "状态",
      prop: "state",
      slot: "state"
    },
    {
      label: "星币",
      prop: "name"
    },
    {
      label: "链接数",
      prop: "name"
    },
    {
      label: "创建时间",
      prop: "name"
    },
    {
      label: "ip地址",
      prop: "name"
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
  return {
    columns,
    dataList,
    options,
    handleSelectionChange
  };
}
