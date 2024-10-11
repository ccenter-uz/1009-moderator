export const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ header: 1 }, { header: 2 }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ size: [] }],
      [{ align: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["fullscreen"],
    ],
    handlers: {
      fullscreen: () => {
        console.log("omega is clicked");
      },
    },
  },
  // imageResize: {
  //   modules: ["Resize", "DisplaySize"],
  //   handleStyles: {
  //     backgroundColor: "#1677ff",
  //     border: "1px dashed #1677ff",
  //     color: "white",
  //   },
  // },
};
