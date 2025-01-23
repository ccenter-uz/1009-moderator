import Swal from "sweetalert2";

export const AntDesignSwal = Swal.mixin({
  customClass: {
    popup: "ant-popup",
    title: "ant-title",
    confirmButton: "ant-confirm-button",
    cancelButton: "ant-cancel-button",
    icon: "ant-icon",
    input: "custom-input",
    footer: "ant-footer",
    actions: "ant-actions",
  },
  buttonsStyling: false,
});
