/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormProvider, RHFUploadFile } from "../../components/hook-form";
import UploadSchema from "@/validations/upload.schema";

import {
  Box,
  Card,
  Grid2 as Grid,
  Typography,
  CircularProgress,
  FormHelperText
} from "@mui/material";
import api from "../service/api";
import Layout from "@/components/layout";

export default function Dashboard() {
  const methods = useForm({
    resolver: yupResolver(UploadSchema)
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors }
  } = methods;

  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<{
    message: string;
    time: string;
  } | null>(null);

  const onSubmit = async (data: any) => {
    setApiResponse(null);
    setIsLoading(true);
    const formData = new FormData();
    const file = data.file;

    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await api.post("/transactions/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setApiResponse(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "file",
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        );
        setFileName(file.name);
      }
    },
    [setValue]
  );

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 3 }}
          >
            Processar
          </Typography>

          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Card
              sx={{ p: 4, width: "100%", maxWidth: 500, textAlign: "center" }}
            >
              <Grid
                container
                spacing={3}
                justifyContent="center"
              >
                <Box
                  sx={{
                    display: "grid",
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: "repeat(1, 1fr)"
                  }}
                >
                  <RHFUploadFile
                    name="file"
                    accept=".txt, image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                  />
                  {errors.file && (
                    <FormHelperText error>{errors.file.message}</FormHelperText>
                  )}
                  {fileName && (
                    <Typography
                      variant="body1"
                      sx={{ mt: 2, fontWeight: "bold", color: "primary.main" }}
                    >
                      Arquivo enviado: {fileName}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Card>
            <Box sx={{ mt: 2 }}>
              {!isLoading && (
                <button
                  type="submit"
                  style={{ padding: "10px 20px", fontSize: "16px" }}
                >
                  Enviar
                </button>
              )}
              {isLoading && (
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                  <Typography sx={{ ml: 2 }}>
                    Processando o arquivo, por favor aguarde...
                  </Typography>
                </Box>
              )}

              {apiResponse && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="h6"
                    color="success.main"
                  >
                    {apiResponse.message}
                  </Typography>
                  <Typography variant="body1">
                    Tempo de processamento: {apiResponse.time} segundos
                  </Typography>
                </Box>
              )}
            </Box>
          </FormProvider>
        </Box>
      </Box>
    </Layout>
  );
}
