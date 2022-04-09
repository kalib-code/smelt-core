export type BaseKey = string | number;
export type BaseRecord = {
    id?: BaseKey;
    [key: string]: any;
};
export * from "../contexts/data/IDataContext";
export * from "./metaData";
export * from "./HttpError";
export * from "./queryKey";
export * from "./mutationMode";

export * from "../contexts/smelt";
export * from "../contexts/smelt/ISmeltContext";
export * from "../contexts/auth/IAuthContext";