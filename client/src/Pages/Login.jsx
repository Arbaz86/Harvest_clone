import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
// import { ReactComponent as IconHarvest } from "../assets/IconHarvest.svg";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { login } from "../Redux/AuthReducer/actions";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast()

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    dispatch(login(payload)).then((r) => {
      console.log(r, "logindata");
      if (r.type === "LOGIN_SUCCESS") {
        setEmail("");
        setPassword("");
        localStorage.setItem("name", JSON.stringify(email));
        toast({
          title: "Login Successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
          variant: "top-accent",
          position: "top",
        })

        setTimeout(() => {
          navigate("/manages");
        }, 3000)

      }
    });
  };

  useEffect(() => {
    document.title = "Sign in";
  }, []);

  return (
    <Container maxW="550px">
      <Box align="center" mt="15px" color="#1d1e1c">
        <svg xmlns="http://www.w3.org/2000/svg" width="137" height="26" fill="none" viewBox="0 0 324 65" aria-label="Harvest">
          <path fill="#fa5d00"
            d="M0 4.9v59.2h4a4 4 0 0 0 3.9-4V1h-4A4 4 0 0 0 0 4.9ZM63.2 1v59a4 4 0 0 1-4 4h-3.9V5A3.9 3.9 0 0 1 59.2 1h4ZM106 23.8c-6.2 0-10.8 2.7-12.7 7.5V9.6h-8v54.5h8V33a23 23 0 0 1 8.6-1.9c6.2 0 9.4 2.7 9.4 8.1v24.8h8V37.5c0-8.8-5-13.7-13.4-13.7ZM313.5 24.8H324v1.5c0 1.4-.5 2.8-1.4 3.8-1.1 1.2-2.6 1.8-5 1.8h-4v21c0 2.6 1.3 4 4 4h6.4V64h-7.6c-7 0-10.8-3.8-10.8-10.6V32h-6.1v-1.6c0-3.3 2.4-5.5 5.7-5.5h.4V14h8v10.8ZM274.5 36c0 2.6 1.7 4.3 4.7 4.4l7.7.5c7.7.5 12 4.5 12 11.4 0 7.7-6 12.7-15.7 12.7-9.8 0-16.6-5-17.2-12.7h8c.5 3.4 4 5.8 9 5.8 5.2 0 8.3-2.2 8.3-5.5 0-2.7-1.8-4.4-5.3-4.6l-7.6-.5c-7.4-.4-11.6-4.4-11.6-11.2 0-7.6 6.1-12.5 15.4-12.5 9 0 15 4.8 15.6 12.1H290c-.5-3.1-3.6-5.2-7.8-5.2-4.8 0-7.7 2-7.7 5.3Z">
          </path>
          <path fill="#fa5d00" fillRule="evenodd"
            d="M263.3 44.9c0-12.5-6.3-21-18.5-21-11.2 0-19 8.3-19 20.5 0 12 7.6 20.6 19.6 20.6 9.2 0 16-5 17.3-12.7H255c-1.2 3.5-5 5.7-9.5 5.7-7 0-10.9-4.6-11.7-11h29.5v-2.1Zm-28-2.7c-.9 1-1.4 2.1-1.6 3.4v-1.2c0-8 4.6-13.6 11.1-13.6 5.4 0 9.3 3.7 10.4 9.6h-14.4c-2.7 0-4.4.7-5.5 1.8Z"
            clipRule="evenodd"></path>
          <path fill="#fa5d00"
            d="m198 24.8 10.4 31 10.3-31h8.1L213.1 64h-9.9l-13.7-39.3h8.5ZM179.8 24.8c-3.4 0-4.8.5-5.9 1.4a8 8 0 0 0-2.4 4.6v-6h-8V64h8V32.5h8.7c3.5 0 5-.8 6.1-2 1-1 1.4-2.4 1.4-3.8v-2h-8Z">
          </path>
          <path fill="#fa5d00" fillRule="evenodd"
            d="M124.8 37.6c.4-8.3 7-13.8 16.8-13.8 9.5 0 15.6 5.4 15.6 13.7v26.6h-7.8v-6.6c-2 4.8-6.7 7.3-12.6 7.3-8.1 0-13-4.9-13-11.8 0-7.7 6-12.7 15-12.7 5.2 0 9.3 2 10.6 5v-6.9c0-4.6-3.2-7.6-8-7.6s-8.3 2.7-8.8 6.8h-7.8Zm7 14.8c0 3.6 2.7 5.9 7.2 5.9 4.4 0 7.8-2 10.4-5.9v-5.7h-10.6c-4.4 0-7 2.2-7 5.7Z"
            clipRule="evenodd"></path>
          <path fill="#fa5d00"
            d="M27.6 64V40.6h8a4 4 0 0 0 3.8-4V24.7H27.6a4 4 0 0 0-4 4V64h4ZM51.3 1h-3.9v15.8a4 4 0 0 0-4 3.9V64h4a4 4 0 0 0 3.9-4V1ZM15.8 64h-4V5a3.9 3.9 0 0 1 4-3.9h4v43.3a4 4 0 0 1-4 4V64Z">
          </path>
        </svg>
        <Heading mt="70px" fontSize="30px" fontWeight="700" lineHeight="36px">
          Sign in to Harvest ID
        </Heading>
      </Box>

      {/* google authentication */}
      <Box
        border="1px solid rgb(255, 162, 108);"
        bgColor="rgb(255, 248, 241)"
        p="30px"
        mt="25px"
      >
        <Box m="5px 0">
          <Button
            textAlign="left"
            fontSize="15px"
            bgColor="white"
            borderRadius="9px"
            fontWeight="500"
            color="#464646"
            border="1px solid #c2c2c2"
            _hover={{ border: "1px" }}
            maxH="40px"
            w="100%"
          >
            <Link to="">
              <Flex alignItems="center">
                <Icon as={FcGoogle} fontSize="23px" />
                <Text
                  fontSize="17px"
                  p="13px 7.5vw 0px 6.0vw"
                  _hover={{ textDecoration: "underline" }}
                >
                  Sign in with Google
                </Text>
              </Flex>
            </Link>
          </Button>
        </Box>
        <Box
          lineHeight="0"
          m="30px auto"
          textAlign="center"
          borderBottom="1px solid rgba(29,30,28,0.4)"
          color="#4a4b49"
          fontSize="15px"
          w="99%"
        >
          <Text p="0px 6px" display="inline" background="#fff8f1">
            or with your email below
          </Text>
        </Box>
        <Box>
          <form onSubmit={handleSubmit}>
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

            <Input
              p="8px"
              mt="10px"
              rounded="5px"
              outline="1px solid #73737390"
              isRequired
              color="#333332"
              fontSize="17px"
              w="100%"
              size="md"
              bgColor="white"
              focusBorderColor="black"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              mt="18px"
              w="100%"
              type="submit"
              color="#fff"
              _hover={{ bgColor: "#11742a" }}
              _active={{ bgColor: "#07561b" }}
              bgColor="#188433"
              rounded="10px"
              fontWeight="700"
            >
              Sign in
            </Button>
          </form>
        </Box>
      </Box>
      <Flex
        color="#1d1e1c9c"
        mt="20px"
        justify="center"
        columnGap="20px"
        flexWrap="wrap"
      >
        <Text _hover={{ textDecoration: "underline" }} cursor="pointer">
          <Link to="/password_reset/new">
            Forgot password?
          </Link>
        </Text>
        <Text _hover={{ textDecoration: "underline" }} cursor="pointer">
          Terms of service
        </Text>
        <Text _hover={{ textDecoration: "underline" }} cursor="pointer">
          Privacy policy
        </Text>
      </Flex>
    </Container>
  );
};
