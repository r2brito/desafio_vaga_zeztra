import { useDropzone, DropzoneOptions } from "react-dropzone";
import { styled } from "@mui/material/styles";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(5, 5),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: "white",
  border: `1px dashed grey`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": { opacity: 0.72, cursor: "pointer" }
}));

interface UploadFileProps extends DropzoneOptions {
  error?: boolean;
  file?: File | string | null;
  helperText?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function UploadFile({
  helperText,
  sx,
  ...other
}: UploadFileProps) {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    ...other
  });

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle {...getRootProps()}>
        <input {...getInputProps()} />
        <CloudUploadOutlined sx={{ fontSize: 48, color: "grey.600" }} />{" "}
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 2 }}
        >
          Arraste e solte o arquivo aqui ou clique para selecionar
        </Typography>
      </DropZoneStyle>

      {helperText && helperText}
    </Box>
  );
}
