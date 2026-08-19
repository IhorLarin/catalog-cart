export type FetchState<T> =
    | { status: "pending" }
    | { status: "success"; data: T }
    | { status: "error"; error: Error };
