export interface Todo {
  id: number | string;
  userId: number | string;
  title: string;
  completed: boolean,
}
type RemoveAction  = { type: "REMOVE", payload: number | string }
type CompleteAction  = { type: "COMPLETED", payload: number | string }
type SubmitAction  = { type: "SUBMIT"}

export type ActionType = CompleteAction | RemoveAction | SubmitAction
