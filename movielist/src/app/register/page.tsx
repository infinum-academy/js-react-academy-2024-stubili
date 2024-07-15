import { RegisterForm } from "@/components/features/auth/RegisterForm/RegisterForm";
import { Container } from "@chakra-ui/react";

export default function Register() {
    return (
        <Container padding={4} backgroundColor={"#460090"} width={"300px"} borderRadius={10} marginTop={"100px"}>
            <RegisterForm />
        </Container>
    )
}