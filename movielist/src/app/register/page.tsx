import { RegisterForm } from "@/components/features/auth/RegisterForm/RegisterForm";
import { Container } from "@chakra-ui/react";

export default function Register() {
    return (
        <Container marginTop={"100px"} bg={["#1B004C","#371687"]}>
            <RegisterForm />
        </Container>
    )
}