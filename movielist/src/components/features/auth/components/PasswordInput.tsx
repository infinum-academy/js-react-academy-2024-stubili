import { ViewIcon } from "@chakra-ui/icons";
import { Flex, Input, IconButton, InputProps, forwardRef } from "@chakra-ui/react";
import { useState } from "react";

interface IPasswordInputProps extends InputProps {

}

export const PasswordInput = forwardRef(({...rest}: IPasswordInputProps,ref) => {
    const [inputStyle, changeInputStyle] = useState("password");
    return (
        <Flex gap={2}>
                    <Input ref={ref} {...rest} required type={inputStyle} placeholder="Password"/>
                    <IconButton aria-label={""} width={"auto"} icon={<ViewIcon/>} borderRadius={"10px"} onClick={() => {
                        if (inputStyle === "password"){
                            changeInputStyle("text");
                        } else {
                            changeInputStyle("password");
                        }
                    }}/>
        </Flex>
    )
})