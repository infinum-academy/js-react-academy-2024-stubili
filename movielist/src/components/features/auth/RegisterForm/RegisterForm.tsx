'use client';

import { mutator } from "@/fetchers/mutators";
import { ViewIcon } from "@chakra-ui/icons";
import { Button, chakra, Flex, FormControl, Heading, IconButton, Input, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { PasswordInput } from "../components/PasswordInput";

export interface IRegisterFormInputs {
    email: string,
    password: string,
    password_confirmation: string
}

export function RegisterForm() {
    const router = useRouter();
    const [inputStyle1, changeInputStyle1] = useState("password");
    const [inputStyle2, changeInputStyle2] = useState("password");
    const {register, handleSubmit} = useForm<IRegisterFormInputs>();
    const {trigger} = useSWRMutation("https://tv-shows.infinum.academy/users", mutator, {
        onSuccess(data, key, config) {
            router.push('/login');
        },
    })
    const onRegister = async (data: IRegisterFormInputs) => {
        if (data.password.length < 8){
            window.alert("Password is not long enough");
            return;
        }
        if (data.password !== data.password_confirmation) {
            window.alert("Passwords dont match");
            return;
        }
        await trigger(data);
    }
    return (
        <chakra.form 
            display={"flex"} 
            flexDirection={"column"} 
            gap={10} 
            alignItems={"center"} 
            color={"white"}
            onSubmit={handleSubmit(onRegister)}
        >
            <Heading color={"white"}>TV show app</Heading>
            <FormControl isRequired={true}>
                <Input {...register('email')} required type="email" placeholder="Email"></Input>
            </FormControl>
            <FormControl isRequired={true}>
                <PasswordInput {...register('password')} />
                <Text fontSize={"x-small"} marginTop={1} marginLeft={2}>At least 8 characters</Text>
            </FormControl>
            <FormControl isRequired={true}>
                <PasswordInput {...register('password_confirmation')}/>
            </FormControl>
            <Button type="submit">SIGN UP</Button>
            <Text fontSize={"small"}>
                Already have an account? <Link href="../login" fontWeight={"bold"}>Log in</Link>
            </Text>
        </chakra.form>
    )
}