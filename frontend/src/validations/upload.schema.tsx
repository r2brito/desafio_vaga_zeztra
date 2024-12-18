import * as Yup from "yup";

const UploadSchema = Yup.object().shape({
  file: Yup.mixed()
    .required("O arquivo é obrigatório")
    .test("fileType", "O arquivo deve ser do tipo .txt", (value) => {
      if (!value) return false;
      return value && value.type === "text/plain";
    })
    .test("fileSize", "O arquivo deve ter no máximo 2MB", (value) => {
      if (!value) return false;
      return value && value.size <= 2 * 1024 * 1024;
    })
});

export default UploadSchema;
