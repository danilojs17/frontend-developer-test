import { useMutation } from "@tanstack/react-query";
import axios from "@/context/axios-interceptor";
import { IPost } from "../interfaces/Post";
import { URL_API_POST } from "@/constants/url-api.constants";
import { toastsManager } from "@/utilities";

export function useDeletePost() {
  return useMutation({
    mutationFn: async (id: number) => await axios.delete<IPost>(`${URL_API_POST}/${id}`),
    onSuccess: (_, variables) => {
      toastsManager.showToast("success", `Post #${variables.toString()} eliminado con éxito`);
    },
    onError: () => {
      toastsManager.showToast("error", "Ups, lo sentimos, tuvimos un error al eliminar el post, intenta nuevamente.");
    },
  });
}
