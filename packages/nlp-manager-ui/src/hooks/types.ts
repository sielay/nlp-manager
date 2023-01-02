import { UseQueryResult } from "react-query";
import { Action } from "@reduxjs/toolkit";

export type QueryHook<T> = (id?: string) => UseQueryResult<T | undefined>;

// Types below are based on @reduxjs/toolkit
export type CaseReducerActionsVoid<T> = {
  [Type in keyof T]: ActionCreatorForCaseReducerVoid<T[Type]>;
};

interface ActionCreatorWithoutPayload {
  (noArgument: void): void;
}

interface ActionCreatorWithPayload<P> {
  (payload: P): void;
}

type IsAny<T, True, False = never> = true | false extends (
  T extends never ? true : false
)
  ? True
  : False;
type IsUnknown<T, True, False = never> = unknown extends T
  ? IsAny<T, False, True>
  : False;
type IfVoid<P, True, False> = [void] extends [P] ? True : False;
type IfMaybeUndefined<P, True, False> = [undefined] extends [P] ? True : False;
interface ActionCreatorWithOptionalPayload<P> {
  (payload?: P): void;
}

interface ActionCreatorWithNonInferrablePayload<> {
  <PT extends unknown>(payload: PT): void;
}

type PayloadActionCreator<P = void> = IsAny<
  P,
  ActionCreatorWithPayload<any>,
  IsUnknown<
    P,
    ActionCreatorWithNonInferrablePayload,
    IfVoid<
      P,
      ActionCreatorWithoutPayload,
      IfMaybeUndefined<
        P,
        ActionCreatorWithOptionalPayload<P>,
        ActionCreatorWithPayload<P>
      >
    >
  >
>;

type ActionCreatorForCaseReducerVoid<CR> = CR extends (
  state: any,
  action: infer Action
) => any
  ? Action extends {
      payload: infer P;
    }
    ? PayloadActionCreator<P>
    : ActionCreatorWithoutPayload
  : ActionCreatorWithoutPayload;
