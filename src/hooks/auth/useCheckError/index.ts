import React from "react";
import { useMutation, UseMutationResult } from "react-query";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useLogout } from "@hooks";

export const useCheckError = (): UseMutationResult<
    void,
    string | undefined,
    unknown,
    unknown
> => {
    const { checkError: checkErrorFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const { mutate: logout } = useLogout<{ redirectPath?: string }>();

    const queryResponse = useMutation("useCheckError", checkErrorFromContext, {
        onError: (redirectPath?: string) => {
            logout({ redirectPath });
        },
    });

    return queryResponse;
};
