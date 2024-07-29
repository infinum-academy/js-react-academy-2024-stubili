'use client';

import { Button, Flex } from "@chakra-ui/react"
import { useContext } from "react"
import { PickerContext } from "../ShowPicker"
import NextLink from 'next/link'
import { useRouter } from "next/navigation"

export const PickerButtons = () => {
    const router = useRouter();
    const {currentStep, setCurrentStep, shows, selectedShows, selectedShow, stepCount,finalRoundShows,finale, finalShowChosen} = useContext(PickerContext);

    return (
        <Flex width={"100%"} justifyContent={"space-between"}>
            <Button onClick={() => {if (currentStep > 0) setCurrentStep(currentStep - 1)}}>Previous</Button>
            <NextLink href={`/all-shows/${shows[Math.floor(Math.random() * shows.length)].id}`}>
                <Button>Random show</Button>
            </NextLink>
            <Button 
            onClick={() => {
                if (selectedShows.length > 0){
                    if (currentStep == Math.max(stepCount,1)){
                        router.push(`/all-shows/${selectedShow.id}`)
                    } else {
                        if (((finalRoundShows.length - (finalRoundShows.length == 3 && finale.length >= 1 ? 1 : 0) + finale.length + finalShowChosen) >= (currentStep + selectedShows.length % 2)) || currentStep == 0){
                            setCurrentStep(currentStep + 1);
                        }
                    }
            }}}
            >{currentStep == Math.max(stepCount,1) ? "Go to show": "Next"}</Button>
        </Flex>
    )
}