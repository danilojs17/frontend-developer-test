"use client";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useReducer, useState } from "react";
import { IPost } from "../interfaces/Post";
import postReducer, { ActionType } from "./post.reducer";

export interface PostContextType {
  openModalCreate: boolean;
  setOpenModalCreate: Dispatch<SetStateAction<boolean>>;
  openModalUpdate: boolean;
  setOpenModalUpdate: Dispatch<SetStateAction<boolean>>;
  postSelected: IPost | undefined;
  setPostSelected: Dispatch<SetStateAction<IPost | undefined>>;
  posts: IPost[];
  dispatchPost: Dispatch<ActionType>;
}

export const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [postSelected, setPostSelected] = useState<IPost | undefined>(undefined);
  const [posts, dispatchPost] = useReducer(postReducer, []);

  return (
    <PostContext.Provider
      value={{
        openModalCreate,
        setOpenModalCreate,
        openModalUpdate,
        setOpenModalUpdate,
        postSelected,
        setPostSelected,
        posts,
        dispatchPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
