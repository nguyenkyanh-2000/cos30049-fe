export type ActionResult<T> = {
  success: boolean | null;
  message?: string | null;
  payload?: T | null;
};
