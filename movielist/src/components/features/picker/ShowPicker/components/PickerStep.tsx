import {Flex, Text, Image, Container, Heading} from '@chakra-ui/react'
import { PickerContext } from '../ShowPicker'
import { useContext, useEffect } from 'react';
import { IShow } from '@/typings/show';

function pickRandomTvShows(shows: Array<IShow>) {
    const randomShowsIndex = []
    while (randomShowsIndex.length < 6){
        const randomIndex = Math.floor(Math.random() * shows.length);
        if (randomShowsIndex.indexOf(randomIndex) === -1) randomShowsIndex.push(randomIndex);
    }
    const randomShows = [];
    randomShowsIndex.forEach((index) => {
        randomShows.push(shows[index]);
    })
    return randomShows;
}

function showFinalShow(show: IShow) {
    return (
        <Flex direction={"column"} alignItems={"center"} gap={3}>
            <Heading>TONIGHT YOU ARE WATCHING:</Heading>
            <Container overflow={"hidden"} width={"150px"} height={"fit-content"} padding={0} border={"none"}>
                <Image 
               _hover={{cursor: "pointer"}}
                src={show.image_url} 
                alt="Show poster" 
                fallbackSrc='https://via.placeholder.com/150' 
                height={"250px"} 
                objectFit={"cover"}
                />
            </Container>
            <Text>{show.title}</Text>
            <Text>{show.average_rating ? `${show.average_rating} / 5` : "no ratings"}</Text>
        </Flex>
    )
}


function showsVersus(show1: IShow, show2: IShow, show1Function: () => void, show2Function: () => void){
    return (
        <Flex justifyContent={"space-between"}>
            <Container overflow={"hidden"} width={"150px"} height={"fit-content"} padding={0}
            onClick={show1Function}
            >
                <Image 
                _hover={{cursor: "pointer"}}
                src={show1.image_url} 
                alt="Show poster" 
                fallbackSrc='https://via.placeholder.com/150' 
                height={"250px"} 
                objectFit={"cover"}
                />
            </Container>
            <Container overflow={"hidden"} width={"150px"} height={"fit-content"} padding={0}
            onClick={show2Function}
            >
                <Image 
                _hover={{cursor: "pointer"}}
                src={show2.image_url} 
                alt="Show poster" 
                fallbackSrc='https://via.placeholder.com/150' 
                height={"250px"} 
                objectFit={"cover"}
                />
            </Container>
        </Flex>
    )
}

export const PickerStep = () => {
    const {
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
        pickFinalShow
    } = useContext(PickerContext);

    const finalsArray = [] as IShow[];

    useEffect(() => {
        setCurrentStep(0)
        setStepCount(0);
        setOfferedShows(pickRandomTvShows(shows));
        setSelectedShows([]);
        setFinalRound([]);
        setFinale([]);
    }, [])

    if (currentStep == 0){

        return (
            <Flex flexWrap={"wrap"} gap={3}>
                {offeredShows.map((show) => {
                    return (
                        <Container 
                        overflow={"hidden"} 
                        width={"150px"} 
                        height={"fit-content"} 
                        padding={0}
                        border= {selectedShows.indexOf(show) != -1 ? "5px solid black":"none"} 
                        onClick={(event) => {
                            if (selectedShows.indexOf(show) == -1) {
                                setStepCount(stepCount + 1);
                                setSelectedShows([...selectedShows,show]);
                                setFinalRound([]);
                                setFinale([]);
                                event.currentTarget.style.border = "5px solid black"
                            } else {
                                setStepCount(stepCount - 1);
                                setSelectedShows(selectedShows.filter((currentShow) => currentShow !== show));
                                setFinalRound([]);
                                setFinale([]);
                                event.currentTarget.style.border = "none";
                            }
                        }}
                        >
                            <Image 
                            _hover={{cursor: "pointer"}}
                            src={show.image_url} 
                            alt="Show poster" 
                            fallbackSrc='https://via.placeholder.com/150' 
                            height={"250px"} 
                            objectFit={"cover"}
                            />
                        </Container>
                )})}
            </Flex>
        )
    } else {
        if (selectedShows.length == 1){
            setSelectedShow(selectedShows[0]);
            return showFinalShow(selectedShow);
        }

        if (selectedShows.length % 2 == 1) {
            if (finalRoundShows.indexOf(selectedShows[selectedShows.length - 1]) === -1){
                setFinalRound([selectedShows[selectedShows.length - 1],...finalRoundShows]);
            }
        }
        if (currentStep * 2 <= selectedShows.length){
            return showsVersus(
                selectedShows[currentStep * 2 - 2],
                selectedShows[currentStep * 2 - 1],
                () => {
                    const filteredShows = finalRoundShows.filter((currentShow: IShow) => 
                        (currentShow !== selectedShows[currentStep * 2 - 1] && currentShow !== selectedShows[currentStep * 2 - 2])
                    )                        
                    filteredShows.push(selectedShows[currentStep * 2 - 2]);
                    setFinalRound(filteredShows);
                    setFinale([]);
                },
                () => {
                    const filteredShows = finalRoundShows.filter((currentShow) => 
                        (currentShow !== selectedShows[currentStep * 2 - 1] && currentShow !== selectedShows[currentStep * 2 - 2])
                    )
                    filteredShows.push(selectedShows[currentStep * 2 - 1]);
                    setFinalRound(filteredShows);
                    setFinale([]);
                }
            )
        } else {
            if(finalRoundShows.length == 1){
                setSelectedShow(finalRoundShows[0]);
                return showFinalShow(selectedShow);
            }
            if(finalRoundShows.length % 2 == 1) {
                if (finale.indexOf(finalRoundShows[finalRoundShows.length - 1]) === -1){
                    setFinale([finalRoundShows[finalRoundShows.length - 1],...finale]);
                }
            }
            if (currentStep * 2 <= ((selectedShows.length - selectedShows.length % 2) + (finalRoundShows.length - finalRoundShows.length % 2))){
                return showsVersus(
                    finalRoundShows[0],
                    finalRoundShows[1],
                    () => {
                        const filteredShows = finale.filter((currentShow) => 
                            (currentShow != finalRoundShows[0] && currentShow != finalRoundShows[1])
                        )                        
                        filteredShows.push(finalRoundShows[0]);
                        setFinale(filteredShows);
                    },
                    () => {
                        const filteredShows = finale.filter((currentShow) => 
                            (currentShow != finalRoundShows[0] && currentShow != finalRoundShows[1])
                        )                        
                        filteredShows.push(finalRoundShows[1]);
                        setFinale(filteredShows);
                    }
                )
            } else {
                if(finale.length == 1){
                    setSelectedShow(finale[0]);
                    return showFinalShow(selectedShow);
                }
                if (currentStep * 2 <= (selectedShows.length - selectedShows.length % 2) + (finalRoundShows.length - finalRoundShows.length % 2) + finale.length) {
                    return showsVersus(
                        finale[0],
                        finale[1],
                        () => {
                            setSelectedShow(finale[0]);
                            pickFinalShow(1);
                        },
                        () => {
                            setSelectedShow(finale[1]);
                            pickFinalShow(1);
                        }
                    )
                } else {
                    return showFinalShow(selectedShow);
                }
            }
        }
    }
}