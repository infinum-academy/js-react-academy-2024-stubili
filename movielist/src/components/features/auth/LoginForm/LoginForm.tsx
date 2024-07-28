'use client';

import { mutator } from "@/fetchers/mutators";
import { Button, chakra, Flex, FormControl, Heading, Input, Link, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";

export interface ILoginFormInputs {
    email: string,
    password: string,
}

export function LoginForm() {
    const {register, handleSubmit} = useForm<ILoginFormInputs>();
    const {trigger} = useSWRMutation("https://tv-shows.infinum.academy/users/sign_in", mutator)
    const onLogin = async (data: ILoginFormInputs) => {
        await trigger(data);
    }
    return (
        <chakra.form 
            display={"flex"} 
            flexDirection={"column"} 
            gap={3} 
            alignItems={"center"} 
            color={"white"}
            onSubmit={handleSubmit(onLogin)}
        >
            <Heading color={"white"}>TV show app</Heading>
            <FormControl isRequired={true}>
                <Input {...register('email')} required type="email" placeholder="Email"></Input>
            </FormControl>
            <FormControl isRequired={true}>
                <Input {...register('password')} required type="password" placeholder="Password"></Input>
            </FormControl>
            <Button type="submit">Log in</Button>
            <Text fontSize={"small"}>
                Don't have an account? <Link href="../register" fontWeight={"bold"}>Register</Link>
            </Text>
        </chakra.form>
    )
}