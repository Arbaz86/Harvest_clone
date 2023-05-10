import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    useToast,
    Text,
} from "@chakra-ui/react";
import IconHarvest from "../assets/IconHarvest.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const toast = useToast()
    const navigate = useNavigate()

    const handleSendLink = (e) => {
        e.preventDefault();

        axios.post("https://harvest-api.onrender.com/auth/forgotPassword", { email }).then(({ data }) => {
            toast({
                title: data.message,
                status: data.status ? "success" : 'fail',
                duration: 3000,
                isClosable: true,
                variant: "top-accent",
                position: "top",
            })

        }).catch((err) => {
            toast({
                title: err.message,
                status: 'fail',
                duration: 3000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            })
        })
    }


    return (
        <Container maxW="550px">
            <Box align="center" mt="15px" color="#1d1e1c">
                {/* <IconHarvest /> */}
                <Heading mt="70px" fontSize="30px" fontWeight="700" lineHeight="36px">
                    Forgot your password?
                </Heading>
            </Box>

            <Box
                border="1px solid rgb(255, 162, 108);"
                bgColor="rgb(255, 248, 241)"
                p="30px"
                mt="25px"
            >
                <Text fontWeight="500" color="#1d1e1c" mb="20px" lineHeight="22px" >
                    Enter the email address you use to sign in, and we’ll send you a link to reset your password.
                </Text>

                <Box>
                    <form onSubmit={handleSendLink}>
                        <Input
                            p="8px"
                            rounded="5px"
                            outline="1px solid #73737390"
                            isRequired
                            color="#333332"
                            fontSize="17px"
                            w="100%"
                            size="md"
                            bgColor="white"
                            focusBorderColor="black"
                            type="email"
                            placeholder="Work email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            mt="18px"
                            type="submit"
                            color="#fff"
                            _hover={{ bgColor: "#11742a" }}
                            _active={{ bgColor: "#07561b" }}
                            bgColor="#188433"
                            rounded="10px"
                            mr="10px"
                            fontWeight="700"
                            size='sm'
                        >
                            Send link
                        </Button>
                        <Button
                            onClick={() => navigate(-1)}
                            mt="18px"
                            type="button"
                            size='sm'
                            border="1px solid #a7a7a7"
                            color="#616161"
                            _hover={{ borderColor: "black" }}
                            _active={{ bgColor: "#fff8f1" }}
                            bgColor="white"
                            rounded="10px"
                            fontWeight="700">Cancel</Button>
                    </form>
                </Box>
            </Box>

        </Container>
    )
}
