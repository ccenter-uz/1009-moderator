import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: 1,
      key: "1",
      title: {
        ru: "Kung-fu-Panda 4",
        uz: "Kung-fu-Panda 4",
        cy: "Kung-fu-Panda 4",
      },
      warning: {
        ru: "warning",
        uz: "warning",
        cy: "warning",
      },
      mention: {
        ru: "mention",
        uz: "mention",
        cy: "mention",
      },
      update_date: "10.10.2021",
      table: [
        {
          id: 1,
          key: "1",
          title: {
            ru: "title-ru",
            uz: "title-uz",
            cy: "title-cyrill",
          },
          content: {
            ru: "<table><tbody><tr><td><div>1</div></td><td><div>2</div></td><td><div>3</div></td></tr></tbody></table>",
            uz: "<table><tbody><tr><td><div>1</div></td><td><div>2</div></td><td><div>3</div></td></tr></tbody></table>",
            cy: "<table><tbody><tr><td><div>1</div></td><td><div>2</div></td><td><div>3</div></td></tr></tbody></table>",
          },
        },
      ],
      content: [
        {
          id: 1,
          content: {
            ru: "<div>editor-ru</div>",
            uz: "<div>editor-uz</div>",
            cy: "<div>editor-cyrill</div>",
          },
          title: {
            ru: "title-ru",
            uz: "title-uz",
            cy: "title-cyrill",
          },
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
