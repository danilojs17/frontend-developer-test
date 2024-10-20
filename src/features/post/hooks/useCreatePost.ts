import { useMutation } from "@tanstack/react-query";
import axios from "@/context/axios-interceptor";
import { IPost } from "../interfaces/Post";
import { URL_API_POST } from "@/constants/url-api.constants";
import { toastsManager } from "@/utilities";

export function useCreatePost() {
  return useMutation({
    mutationFn: async (data: IPost) => await axios.post<IPost>(URL_API_POST, data),
    onSuccess: () => {
      toastsManager.showToast("success", "Post publicado con éxito");
    },
    onError: () => {
      toastsManager.showToast("error", "Ups, lo sentimos, tuvimos un error al publicar el post, intenta nuevamente.");
    },
  });
}
