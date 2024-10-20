import { useQuery } from "@tanstack/react-query";
import { URL_API_POST } from "@/constants/url-api.constants";
import axios from "@/context/axios-interceptor";
import { IPost } from "../interfaces/Post";

export function useGetAllPost() {
  const {
    data = [],
    isPending,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["getAllPost"],
    queryFn: async () => {
      const res = await axios.get<IPost[]>(URL_API_POST);

      return res.data;
    },
  });

  return { data, isLoadingPost: isPending, isSuccessPost: isSuccess, isErrorPost: isError };
}
