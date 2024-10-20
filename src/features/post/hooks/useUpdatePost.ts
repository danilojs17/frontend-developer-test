import { useMutation } from "@tanstack/react-query";
import axios from "@/context/axios-interceptor";
import { IPost } from "../interfaces/Post";
import { URL_API_POST } from "@/constants/url-api.constants";
import { toastsManager } from "@/utilities";

export function useUpdatePost() {
  return useMutation({
    mutationFn: async ({ id, ...data }: IPost) => await axios.put<IPost>(`${URL_API_POST}/${id}`, data),
    onSuccess: (_, variables) => {
      toastsManager.showToast("success", `Post #${variables.id.toString()}  actualizado con éxito`);
    },
    onError: () => {
      toastsManager.showToast("error", "Ups, lo sentimos, tuvimos un error al actualizar el post, intenta nuevamente.");
    },
  });
}
