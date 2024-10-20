import { IPost } from "../interfaces/Post";
import { Type } from "../interfaces/PostTypeAction.enum";

export type ActionType =
  | {
      type: Type.CREATE;
      payload: IPost;
    }
  | {
      type: Type.READ;
      payload: IPost[];
    }
  | {
      type: Type.UPDATE;
      payload: IPost;
    }
  | {
      type: Type.DELETE;
      payload: number;
    };

const postReducer = (state: IPost[], action: ActionType) => {
  const { payload, type } = action;
  const optionsReducer: Record<Type, (state: IPost[], payload: any) => IPost[]> = {
    CREATE: (state: IPost[], payload: IPost) => {
      const listPost = [...state];

      if (payload.id > 100) {
        const lastPost = state.reduce((max, item) => (item.id > max.id ? item : max), state[0]);

        listPost.unshift({ ...payload, id: lastPost.id + 1 });
        return listPost;
      }
      listPost.unshift(payload);

      return listPost;
    },
    READ: (state: IPost[], payload: IPost[]) => {
      return [...state, ...payload];
    },
    UPDATE: (state: IPost[], payload: IPost) => {
      const findIndexPost = state.findIndex((post) => post.id === payload.id);

      if (findIndexPost === -1) return state;
      const listPost = [...state];

      listPost.splice(findIndexPost, 1, payload);

      return listPost;
    },
    DELETE: (state: IPost[], payload: number) => {
      const listPost = [...state].filter((post) => post.id !== payload);
      return listPost;
    },
  };

  const optionType = optionsReducer[type];

  if (optionType) {
    return optionType(state, payload);
  }

  return state;
};

export default postReducer;
