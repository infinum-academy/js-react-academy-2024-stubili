'use client';

import { Button, Flex, Modal , ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Text, useDisclosure} from "@chakra-ui/react"
import { createContext, useState } from "react";
import { PickerProgress } from "./components/PickerProgress";
import { PickerButtons } from "./components/PickerButtons";
import { PickerStep } from "./components/PickerStep";
import useSWR from "swr";
import { getShowsList } from "@/fetchers/show";
import { IShow } from "@/typings/show";

interface IPickerContext {
    stepCount: number;
    setStepCount: (value: number) => void;
    currentStep: number;
    setCurrentStep: (newStep: number) => void;
    shows: Array<IShow>;
    offeredShows: Array<IShow>;
    setOfferedShows: (newOffer: Array<IShow>) => void;
    selectedShows: Array<IShow>;
    setSelectedShows: (newSelection: Array<IShow>) => void;
    selectedShow: IShow;
    setSelectedShow: (newShow: IShow) => void;
    finalRoundShows: Array<IShow>;
    setFinalRound: (newFinal: Array<IShow>) => void;
    finale: Array<IShow>;
    setFinale: (newFinale: Array<IShow>) => void;
    finalShowChosen: number;
    pickFinalShow: (chosen: number) => void;
}

export const PickerContext = createContext<IPickerContext>({} as IPickerContext);

export const ShowPicker = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [stepCount, setStepCount] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [offeredShows, setOfferedShows] = useState([] as IShow[]);
    const [selectedShows, setSelectedShows] = useState([] as IShow[]);
    const [finalRoundShows, setFinalRound] = useState([] as IShow[]);
    const [finale, setFinale] = useState([] as IShow[]);
    const [finalShowChosen, pickFinalShow] = useState(0);
    const {data: showsList} = useSWR('/shows', getShowsList);

    const shows = showsList?.shows;

    const selectedShowPlaceHolder = {
        show: {
            id: 9999,
            title: 'placeholder',
            description: 'placeholder',
            average_rating: 3,
            no_of_reviews: 0,
            image_url: 'placeholder'
        }
    }
    const  [selectedShow, setSelectedShow] = useState(selectedShowPlaceHolder);
    
    if (!shows) {
        return null;
    }


    return (
        <>
            <PickerContext.Provider 
                value={{
                    stepCount,
                    setStepCount,
                    currentStep,
                    setCurrentStep,
                    shows,
                    offeredShows,
                    setOfferedShows,
                    selectedShows,
                    setSelectedShows,
                    selectedShow,
                    setSelectedShow,
                    finalRoundShows,
                    setFinalRound,
                    finale,
                    setFinale,
                    finalShowChosen,
                    pickFinalShow
                }}
            >
                <Text onClick={onOpen} variant="mainPage" _hover={{cursor: "pointer", bg: "#371687"}}>Show picker</Text>
                <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Show picker</ModalHeader>
                        <ModalBody>
                            <PickerStep />
                        </ModalBody>
                        <ModalFooter>
                            <Flex direction={"column"} width={"100%"} gap={3}>
                                <PickerProgress />
                                <PickerButtons />
                            </Flex>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </PickerContext.Provider>
        </>
    )
}