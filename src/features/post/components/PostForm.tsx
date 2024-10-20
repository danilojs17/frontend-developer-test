import { TextField } from "@mui/material";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { IPost } from "../interfaces/Post";
import Grid from "@mui/material/Grid2";

interface Props {
  onSubmit: (data: IPost) => Promise<boolean>;
  post?: IPost;
}

const PostForm: FC<Props> = ({ onSubmit, post }) => {
  const { control, reset, handleSubmit } = useForm<IPost>({
    defaultValues: {
      body: post?.body ?? "",
      title: post?.title ?? "",
      userId: post?.userId ?? 1,
      ...(post ? { id: post.id } : {}),
    },
  });

  const handleOnSubmit = async (data: IPost) => {
    const response = await onSubmit(data);
    if (response) reset();
  };

  return (
    <form id="form-post" data-testid="form-post" onSubmit={handleSubmit(handleOnSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "El título es requerido" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Nombre"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="body"
            control={control}
            rules={{ required: "El cuerpo es requerido" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Cuerpo"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                maxRows={6}
                multiline
              />
            )}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;
