import { LoginForm } from "@/components/features/auth/LoginForm/LoginForm";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { Container } from "@chakra-ui/react";

export default function Register() {
    return (
        <>
        <AuthRedirect to="/" condition="loggedIn" />
        <Container padding={4} backgroundColor={"#460090"} width={"300px"} borderRadius={10} marginTop={"100px"}>
            <LoginForm />
        </Container>
        </>
    )
}