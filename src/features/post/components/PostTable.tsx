/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { IPost } from "@/features/post/interfaces/Post";
import { IconButton, Stack, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DialogProperties } from "@/hooks/useDialogAlert";
import { usePostContext } from "../context/post.context";
import { useDeletePost } from "../hooks/useDeletePost";
import { Type } from "../interfaces/PostTypeAction.enum";

interface PostTableProps {
  post: IPost[];
  isLoading: boolean;
  onDeletePost: (properties: DialogProperties) => void;
}

export const PostTable: FC<PostTableProps> = ({ post, isLoading, onDeletePost }) => {
  const { setPostSelected, setOpenModalUpdate, dispatchPost } = usePostContext();
  const { mutateAsync: deletePost } = useDeletePost();

  const handleOpenEditModal = (post: IPost) => {
    setPostSelected(post);
    setOpenModalUpdate(true);
  };

  const handleDelete = ({ id }: IPost) => {
    onDeletePost({
      title: "Eliminar post",
      message: `¿Estás seguro de que quieres eliminar el post #${id}?`,
      onClick: async () => {
        try {
          const response = await deletePost(id);

          if (response.status !== 200) return;
          dispatchPost({ type: Type.DELETE, payload: id });
        } catch (error) {}
      },
    });
  };

  const columns = useMemo<MRT_ColumnDef<IPost>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        accessorFn: (row) => `#${row.id}`,
        maxSize: 60,
      },
      {
        accessorKey: "title",
        header: "Título",
      },
      {
        accessorKey: "body",
        header: "Cuerpo",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: post,
    enableGlobalFilter: true,
    enableStickyHeader: true,
    state: {
      showProgressBars: isLoading,
    },
    initialState: {
      showGlobalFilter: true,
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: "60vh",
      },
    },
    localization: MRT_Localization_ES,
    enableRowActions: true,
    renderRowActions: ({ row: { original } }) => {
      return (
        <Stack flexDirection="row" gap={1}>
          <Tooltip title="Editar">
            <IconButton onClick={() => handleOpenEditModal(original)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton color="error" onClick={() => handleDelete(original)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      );
    },
    positionActionsColumn: "last",
  });

  return <MaterialReactTable table={table} />;
};

export default PostTable;
