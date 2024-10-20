import React, { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import PostForm from "./PostForm";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreatePost } from "../hooks/useCreatePost";
import { IPost } from "../interfaces/Post";
import { usePostContext } from "../context/post.context";
import { Type } from "../interfaces/PostTypeAction.enum";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PostCreateModal: FC<Props> = ({ onClose, open }) => {
  const { dispatchPost } = usePostContext();
  const { mutateAsync: createPost, isPending: isLoadingCreatePost } = useCreatePost();

  const onCreatePost = async (data: IPost) => {
    try {
      const response = await createPost(data);

      if (response.data.id) {
        dispatchPost({ type: Type.CREATE, payload: response.data });
        onClose();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Publicar un post</DialogTitle>
      <DialogContent dividers>
        <PostForm onSubmit={onCreatePost} />
      </DialogContent>
      <DialogActions>
        <Stack flexDirection="row" gap={2}>
          <Button variant="outlined" disabled={isLoadingCreatePost} onClick={onClose}>
            Cancelar
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoadingCreatePost}
            form="form-post"
          >
            Guardar
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default PostCreateModal;
