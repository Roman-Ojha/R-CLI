import { RootState } from "../../types";
import {
  ActionContext,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";

export interface Tab {
  name: string;
}

export interface TabsState {
  numberOfTabs: number;
  activeTab: number;
  tabs: Tab[];
}

export enum TabsGettersType {
  ACTIVE_TAB = "ACTIVE_TAB",
  NUMBER_OF_TAB = "NUMBER_OF_TAB",
}

export interface Getters {
  activeTab(state: TabsState): number;
  numberOfTab(state: TabsState): number;
}

export enum TabsActionType {
  CHANGE_TAB = "CHANGE_TAB",
  OPEN_NEW_TAB = "OPEN_NEW_TAB",
}

export interface Actions {
  [TabsActionType.CHANGE_TAB](
    { commit }: AugmentedActionContext,
    todoNo: number
  ): void;
  [TabsActionType.OPEN_NEW_TAB]({ commit }: AugmentedActionContext): void;
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<TabsState, RootState>, "commit">;

export enum TabsMutationType {
  CHANGE_TAB = "CHANGE_TAB",
  OPEN_NEW_TAB = "OPEN_NEW_TAB",
}

export type Mutations<S = TabsState> = {
  [TabsMutationType.CHANGE_TAB](state: S, tabNo: number): void;
  [TabsMutationType.OPEN_NEW_TAB](state: S): void;
};

export type TabsStore<S = TabsState> = Omit<
  VuexStore<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
