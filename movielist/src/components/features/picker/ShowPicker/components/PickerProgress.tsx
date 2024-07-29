import { Progress } from "@chakra-ui/react"
import { useContext } from "react";
import { PickerContext } from "../ShowPicker";

export const PickerProgress = () => {
    const {currentStep, selectedShows, stepCount} = useContext(PickerContext);
    const progress = (currentStep / Math.max(1,stepCount)) * 100;
    return (
        <Progress value={progress} borderRadius={6} />
    )
}