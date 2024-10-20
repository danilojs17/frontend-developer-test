"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useGetAllPost } from "../hooks/useGetAllPost";
import PostTable from "./PostTable";
import { usePostContext } from "../context/post.context";
import PostCreateModal from "./PostCreateModal";
import PostUpdateModal from "./PostUpdateModal";
import DialogAlert from "@/components/dialog-alert/DialogAlert";
import { useDialogAlert } from "@/hooks/useDialogAlert";
import Grid from "@mui/material/Grid2";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Type } from "../interfaces/PostTypeAction.enum";
import { toastsManager } from "@/utilities";

const PostContainer = () => {
  const {
    openModalCreate,
    openModalUpdate,
    postSelected,
    setOpenModalCreate,
    setOpenModalUpdate,
    posts,
    dispatchPost,
    setPostSelected,
  } = usePostContext();
  const { isLoadingPost, data, isSuccessPost, isErrorPost } = useGetAllPost();
  const { onCancel, isOpen, openDialogAlert, dialogProperties } = useDialogAlert();

  useEffect(() => {
    if (isSuccessPost) dispatchPost({ type: Type.READ, payload: data });
    if (isErrorPost) {
      toastsManager.showToast("error", "Error al obtener los post, intenta más tarde.");
    }
  }, [isSuccessPost]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" textAlign="center">
            Post Manager
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">Lista de post</Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenModalCreate(true)}
              startIcon={<AddBoxIcon />}
            >
              Publicar
            </Button>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <PostTable isLoading={isLoadingPost} post={posts} onDeletePost={openDialogAlert} />
        </Grid>
      </Grid>
      <Box>
        {openModalCreate && <PostCreateModal open={openModalCreate} onClose={() => setOpenModalCreate(false)} />}
        {openModalUpdate && postSelected && (
          <PostUpdateModal
            open={openModalUpdate}
            post={postSelected}
            onClose={() => {
              setOpenModalUpdate(false);
              setPostSelected(undefined);
            }}
          />
        )}
        <DialogAlert {...dialogProperties} onCancel={onCancel} open={isOpen} />
      </Box>
    </Container>
  );
};

export default PostContainer;
