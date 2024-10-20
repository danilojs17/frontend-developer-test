import PostContainer from "@/features/post/components/PostContainer";
import { PostProvider } from "@/features/post/context/post.context";

export default async function Page() {
  return (
    <PostProvider>
      <PostContainer />
    </PostProvider>
  );
}
