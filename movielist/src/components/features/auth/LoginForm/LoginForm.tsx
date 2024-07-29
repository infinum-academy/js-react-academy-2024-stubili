'use client';

import { mutator } from "@/fetchers/mutators";
import { ViewIcon } from "@chakra-ui/icons";
import { Button, chakra, Flex, FormControl, Heading, IconButton, Input, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { PasswordInput } from "../components/PasswordInput";

export interface ILoginFormInputs {
    email: string,
    password: any,
}

export function LoginForm() {
    const {register, handleSubmit} = useForm<ILoginFormInputs>();
    const {trigger} = useSWRMutation("https://tv-shows.infinum.academy/users/sign_in", mutator);
    const [inputStyle, changeInputStyle] = useState("password");
    const onLogin = async (data: ILoginFormInputs) => {
        console.log(data);
        await trigger(data);
    }
    return (
        <chakra.form 
            display={"flex"} 
            flexDirection={"column"} 
            gap={10} 
            alignItems={"center"} 
            color={"white"}
            onSubmit={handleSubmit(onLogin)}
        >
            <Heading color={"white"}>TV show app</Heading>
            <FormControl isRequired={true}>
                <Input {...register('email')} required type="email" placeholder="Email"></Input>
            </FormControl>
            <FormControl isRequired={true}>
                <PasswordInput {...register('password')} />
            </FormControl>
            <Button type="submit">LOG IN</Button>
            <Text fontSize={"small"}>
                Don't have an account? <Link href="../register" fontWeight={"bold"}>Register</Link>
            </Text>
        </chakra.form>
    )
}