import React from "react";
import { useMutation, UseMutationResult } from "react-query";

import { AuthContext } from "../../../contexts/auth";
import { IAuthContext, TLogoutData } from "../../../interfaces";


export const useLogout = <TVariables = void>(): UseMutationResult<
    TLogoutData,
    Error,
    TVariables,
    unknown
> => {
    const { logout: logoutFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const queryResponse = useMutation<TLogoutData, Error, TVariables, unknown>(
        "useLogout",
        logoutFromContext,
        {
            onSuccess: () => {
               
            },
            onError: (error: Error) => {
               console.log(error)
            },
        },
    );

    return queryResponse;
};