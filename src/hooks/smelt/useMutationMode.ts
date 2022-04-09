import { useContext } from "react";

import { SmeltContext } from "../../contexts/smelt";
import { ISmeltContext } from "../../interfaces";

type UseMutationModeType = () => {
    mutationMode: ISmeltContext["mutationMode"];
    undoableTimeout: ISmeltContext["undoableTimeout"];
};

export const useMutationMode: UseMutationModeType = () => {
    const { mutationMode, undoableTimeout } = useContext(SmeltContext);

    return { mutationMode, undoableTimeout };
};