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

export const PickerStep = () => {
    const {
        stepCount,
        setStepCount,
        currentStep, 
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
        setFinale
    } = useContext(PickerContext);

    const finalsArray = [] as IShow[];

    useEffect(() => {
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
                                event.currentTarget.style.border = "5px solid black"
                            } else {
                                setStepCount(stepCount - 1);
                                setSelectedShows(selectedShows.filter((currentShow) => currentShow !== show));
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
            return (
                <Flex direction={"column"} alignItems={"center"} gap={3}>
                    <Heading>TONIGHT YOU ARE WATCHING:</Heading>
                    <Container overflow={"hidden"} width={"150px"} height={"fit-content"} padding={0} border={"none"}>
                        <Image 
                       _hover={{cursor: "pointer"}}
                        src={selectedShow.image_url} 
                        alt="Show poster" 
                        fallbackSrc='https://via.placeholder.com/150' 
                        height={"250px"} 
                        objectFit={"cover"}
                        />
                    </Container>
                    <Text>{selectedShows[0].title}</Text>
                    <Text>{selectedShows[0].average_rating ? `${selectedShows[0].average_rating} / 5` : "no ratings"}</Text>
                </Flex>
            )
        }

        if (selectedShows.length % 2 == 1) {
            setFinalRound([selectedShows[selectedShows.length - 1]]);
            setSelectedShows(selectedShows.filter((currentShow) => currentShow !== selectedShows[selectedShows.length - 1] ));
        }
        if (currentStep * 2 <= selectedShows.length){
            return (
                <Flex justifyContent={"space-between"}>
                    <Container overflow={"hidden"} width={"150px"} height={"fit-content"} padding={0} border={"none"}
                    onClick={() => {
                        setFinalRound(finalRoundShows.filter((currentShow) => currentShow !== selectedShows[currentStep * 2 - 1]));
                        setFinalRound([selectedShows[currentStep * 2 - 2],...finalRoundShows]);
                    }}
                    >
                        <Image 
                        _hover={{cursor: "pointer"}}
                        src={selectedShows[currentStep * 2 - 2].image_url} 
                        alt="Show poster" 
                        fallbackSrc='https://via.placeholder.com/150' 
                        height={"250px"} 
                        objectFit={"cover"}
                        />
                    </Container>
                    <Container overflow={"hidden"} width={"150px"} height={"fit-content"} padding={0} border={"none"}
                    onClick={() => {
                        setFinalRound(finalRoundShows.filter((currentShow) => currentShow !== selectedShows[currentStep * 2 - 2]));
                        setFinalRound([selectedShows[currentStep * 2 - 1],...finalRoundShows]);
                    }}
                    >
                        <Image 
                        _hover={{cursor: "pointer"}}
                        src={selectedShows[currentStep * 2 - 1].image_url} 
                        alt="Show poster" 
                        fallbackSrc='https://via.placeholder.com/150' 
                        height={"250px"} 
                        objectFit={"cover"}
                        />
                    </Container>
                </Flex>
            )
        } else {
            if(finalRoundShows.length == 1){
                setSelectedShow(finalRoundShows[0]);
                    return (
                        <Flex direction={"column"} alignItems={"center"} gap={3}>
                            <Heading>TONIGHT YOU ARE WATCHING:</Heading>
                            <Container overflow={"hidden"} width={"150px"} height={"fit-content"} padding={0} border={"none"}>
                                <Image 
                                _hover={{cursor: "pointer"}}
                                src={selectedShow.image_url} 
                                alt="Show poster" 
                                fallbackSrc='https://via.placeholder.com/150' 
                            height={"250px"} 
                            objectFit={"cover"}
                            />
                        </Container>
                        <Text>{selectedShows[0].title}</Text>
                        <Text>{selectedShows[0].average_rating ? `${selectedShows[0].average_rating} / 5` : "no ratings"}</Text>
                    </Flex>
                    )
            }
            if(finalRoundShows.length % 2 == 1) {
                setFinale([finalRoundShows[finalRoundShows.length - 1]]);
                setFinalRound(finalRoundShows.filter((currentShow) => currentShow !== finalRoundShows[finalRoundShows.length - 1]))
            }
            if (currentStep * 2 <= (selectedShows.length + finalRoundShows.length)){
                return (
                    <Flex justifyContent={"space-between"}>
                         <Container overflow={"hidden"} width={"150px"} height={"fit-content"} padding={0} border={"none"}
                        onClick={() => {
                            setFinale(finale.filter((currentShow) => currentShow !== finalRoundShows[0]));
                            setFinale([finalRoundShows[1],...finale]);
                        }}
                        >
                            <Image 
                            _hover={{cursor: "pointer"}}
                            src={finalRoundShows[1].image_url} 
                            alt="Show poster" 
                            fallbackSrc='https://via.placeholder.com/150' 
                            height={"250px"} 
                            objectFit={"cover"}
                            />
                        </Container>
                        <Container overflow={"hidden"} width={"150px"} height={"fit-content"} padding={0} border={"none"}
                        onClick={() => {
                            setFinale(finale.filter((currentShow) => currentShow !== finalRoundShows[1]));
                            setFinale([finalRoundShows[0],...finale]);
                        }}
                        >
                            <Image 
                            _hover={{cursor: "pointer"}}
                            src={finalRoundShows[0].image_url} 
                            alt="Show poster" 
                            fallbackSrc='https://via.placeholder.com/150' 
                            height={"250px"} 
                            objectFit={"cover"}
                            />
                        </Container>
                    </Flex>
                )
            } else {
                if(finale.length == 1){
                    setSelectedShow(finale[0]);
                        return (
                            <Flex direction={"column"} alignItems={"center"} gap={3}>
                                <Heading>TONIGHT YOU ARE WATCHING:</Heading>
                                <Container overflow={"hidden"} width={"150px"} height={"fit-content"} padding={0} border={"none"}>
                                    <Image 
                                    _hover={{cursor: "pointer"}}
                                    src={selectedShow.image_url} 
                                    alt="Show poster" 
                                    fallbackSrc='https://via.placeholder.com/150' 
                                height={"250px"} 
                                objectFit={"cover"}
                                />
                            </Container>
                            <Text>{selectedShows[0].title}</Text>
                            <Text>{selectedShows[0].average_rating ? `${selectedShows[0].average_rating} / 5` : "no ratings"}</Text>
                        </Flex>
                        )
                }
                if (currentStep * 2 <= selectedShows.length + finalRoundShows.length + finale.length) {
                    return (
                        <Flex justifyContent={"space-between"}>
                             <Container overflow={"hidden"} width={"150px"} height={"fit-content"} padding={0} border={"none"}
                            onClick={() => {
                                setSelectedShow(finale[1]);
                            }}
                            >
                                <Image 
                                _hover={{cursor: "pointer"}}
                                src={finale[1].image_url} 
                                alt="Show poster" 
                                fallbackSrc='https://via.placeholder.com/150' 
                                height={"250px"} 
                                objectFit={"cover"}
                                />
                            </Container>
                            <Container overflow={"hidden"} width={"150px"} height={"fit-content"} padding={0} border={"none"}
                            onClick={() => {
                                setSelectedShow(finale[0]);
                            }}
                            >
                                <Image 
                                _hover={{cursor: "pointer"}}
                                src={finale[1].image_url} 
                                alt="Show poster" 
                                fallbackSrc='https://via.placeholder.com/150' 
                                height={"250px"} 
                                objectFit={"cover"}
                                />
                            </Container>
                        </Flex>
                    )
                } else {
                    return (
                        <Flex direction={"column"} alignItems={"center"} gap={3}>
                            <Heading>TONIGHT YOU ARE WATCHING:</Heading>
                            <Container overflow={"hidden"} width={"150px"} height={"fit-content"} padding={0} border={"none"}>
                                <Image 
                                _hover={{cursor: "pointer"}}
                                src={selectedShow.image_url} 
                                alt="Show poster" 
                                fallbackSrc='https://via.placeholder.com/150' 
                            height={"250px"} 
                            objectFit={"cover"}
                            />
                        </Container>
                        <Text>{selectedShows[0].title}</Text>
                        <Text>{selectedShows[0].average_rating ? `${selectedShows[0].average_rating} / 5` : "no ratings"}</Text>
                    </Flex>
                    )
                }
            }
        }
    }
}