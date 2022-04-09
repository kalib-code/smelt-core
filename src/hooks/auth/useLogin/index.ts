import React from "react";
import { useMutation, UseMutationResult } from "react-query";

import { AuthContext } from "../../../contexts/auth";

import { IAuthContext, TLoginData } from "../../../interfaces";


export const useLogin = <TVariables = {}>(): UseMutationResult<
    TLoginData,
    Error,
    TVariables,
    unknown
> => {
    const { login: loginFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const queryResponse = useMutation<TLoginData, Error, TVariables, unknown>(
        "useLogin",
        loginFromContext,
        {
            onSuccess: (redirectPathFromAuth) => {
               
            },
            onError: (error: any) => {
               
            },
        },
    );

    return queryResponse;
};