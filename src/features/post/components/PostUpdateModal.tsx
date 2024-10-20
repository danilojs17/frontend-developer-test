import React, { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import PostForm from "./PostForm";
import LoadingButton from "@mui/lab/LoadingButton";
import { IPost } from "../interfaces/Post";
import { useUpdatePost } from "../hooks/useUpdatePost";
import { usePostContext } from "../context/post.context";
import { Type } from "../interfaces/PostTypeAction.enum";

interface Props {
  open: boolean;
  onClose: () => void;
  post: IPost;
}

const PostUpdateModal: FC<Props> = ({ onClose, open, post }) => {
  const { dispatchPost } = usePostContext();
  const { mutateAsync: updatePost, isPending: isLoadingUpdatePost } = useUpdatePost();

  const onUpdatePost = async (data: IPost) => {
    try {
      const response = await updatePost(data);

      if (response.data.id) {
        dispatchPost({ type: Type.UPDATE, payload: response.data });

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
      <DialogTitle>Actualizar post</DialogTitle>
      <DialogContent dividers>
        <PostForm onSubmit={onUpdatePost} post={post} />
      </DialogContent>
      <DialogActions>
        <Stack flexDirection="row" gap={2}>
          <Button variant="outlined" disabled={isLoadingUpdatePost} onClick={onClose}>
            Cancelar
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoadingUpdatePost}
            form="form-post"
          >
            Guardar
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default PostUpdateModal;
