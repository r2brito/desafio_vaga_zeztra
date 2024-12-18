/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext, Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import UploadFile from "../upload";

interface RHFUploadProps {
  name: string;
  [key: string]: any;
}

export function RHFUploadFile({ name, ...other }: RHFUploadProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <UploadFile
            file={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText
                  error
                  sx={{ px: 2 }}
                >
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}
