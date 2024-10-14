import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: 1,
      key: "1",
      title: "Kung-fu-Panda 4",
      warning: "warning",
      mention: "mention",
      update_date: "10.10.2021",
      table: [
        {
          id: 1,
          key: "1",
          columns: [
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Age",
              dataIndex: "age",
              key: "age",
            },
            {
              title: "Address",
              dataIndex: "address",
              key: "address",
            },
          ],
          data: [
            {
              id: 1,
              name: "John Brown",
              age: 32,
              address: "New York No. 1 Lake Park",
              tags: ["nice", "developer"],
            },
            {
              id: 2,
              name: "Jim Green",
              age: 42,
              address: "London No. 1 Lake Park",
              tags: ["loser"],
            },
            {
              id: 3,
              name: "Joe Black",
              age: 32,
              address: "Sidney No. 1 Lake Park",
              tags: ["cool", "teacher"],
            },
          ],
        },
      ],
      editor: [
        {
          id: 1,
          content: "BLA BLA BLA text",
        },
        {
          id: 2,
          content: "FEJIFEIFJEIJFEJIF",
        },
      ],
    },
  ],
};

export const useAdditionalSlice = createSlice({
  name: "useAdditionalSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default useAdditionalSlice.reducer;
export const { setData } = useAdditionalSlice.actions;
