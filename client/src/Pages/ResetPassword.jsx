import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useToast,
  Text,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const toast = useToast();
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .patch(`http://localhost:8080/auth/resetPassword/${token}`, {
        password,
        passwordConfirm,
      })
      .then(({ data }) => {
        setLoading(false);
        if (data.status === true) {
          toast({
            title: "Your password has been updated successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
            variant: "top-accent",
            position: "top",
          });

          navigate("/login");
        } else {
          toast({
            title: data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            variant: "top-accent",
            position: "top",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast({
          title: err.response?.data?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          variant: "top-accent",
          position: "top",
        });
      });
  };

  return (
    <Container maxW="550px">
      <Box align="center" mt="15px" color="#1d1e1c">
        <Box>
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="137"
              height="26"
              fill="none"
              viewBox="0 0 324 65"
              aria-label="Harvest"
            >
              <path
                fill="#fa5d00"
                d="M0 4.9v59.2h4a4 4 0 0 0 3.9-4V1h-4A4 4 0 0 0 0 4.9ZM63.2 1v59a4 4 0 0 1-4 4h-3.9V5A3.9 3.9 0 0 1 59.2 1h4ZM106 23.8c-6.2 0-10.8 2.7-12.7 7.5V9.6h-8v54.5h8V33a23 23 0 0 1 8.6-1.9c6.2 0 9.4 2.7 9.4 8.1v24.8h8V37.5c0-8.8-5-13.7-13.4-13.7ZM313.5 24.8H324v1.5c0 1.4-.5 2.8-1.4 3.8-1.1 1.2-2.6 1.8-5 1.8h-4v21c0 2.6 1.3 4 4 4h6.4V64h-7.6c-7 0-10.8-3.8-10.8-10.6V32h-6.1v-1.6c0-3.3 2.4-5.5 5.7-5.5h.4V14h8v10.8ZM274.5 36c0 2.6 1.7 4.3 4.7 4.4l7.7.5c7.7.5 12 4.5 12 11.4 0 7.7-6 12.7-15.7 12.7-9.8 0-16.6-5-17.2-12.7h8c.5 3.4 4 5.8 9 5.8 5.2 0 8.3-2.2 8.3-5.5 0-2.7-1.8-4.4-5.3-4.6l-7.6-.5c-7.4-.4-11.6-4.4-11.6-11.2 0-7.6 6.1-12.5 15.4-12.5 9 0 15 4.8 15.6 12.1H290c-.5-3.1-3.6-5.2-7.8-5.2-4.8 0-7.7 2-7.7 5.3Z"
              ></path>
              <path
                fill="#fa5d00"
                fillRule="evenodd"
                d="M263.3 44.9c0-12.5-6.3-21-18.5-21-11.2 0-19 8.3-19 20.5 0 12 7.6 20.6 19.6 20.6 9.2 0 16-5 17.3-12.7H255c-1.2 3.5-5 5.7-9.5 5.7-7 0-10.9-4.6-11.7-11h29.5v-2.1Zm-28-2.7c-.9 1-1.4 2.1-1.6 3.4v-1.2c0-8 4.6-13.6 11.1-13.6 5.4 0 9.3 3.7 10.4 9.6h-14.4c-2.7 0-4.4.7-5.5 1.8Z"
                clipRule="evenodd"
              ></path>
              <path
                fill="#fa5d00"
                d="m198 24.8 10.4 31 10.3-31h8.1L213.1 64h-9.9l-13.7-39.3h8.5ZM179.8 24.8c-3.4 0-4.8.5-5.9 1.4a8 8 0 0 0-2.4 4.6v-6h-8V64h8V32.5h8.7c3.5 0 5-.8 6.1-2 1-1 1.4-2.4 1.4-3.8v-2h-8Z"
              ></path>
              <path
                fill="#fa5d00"
                fillRule="evenodd"
                d="M124.8 37.6c.4-8.3 7-13.8 16.8-13.8 9.5 0 15.6 5.4 15.6 13.7v26.6h-7.8v-6.6c-2 4.8-6.7 7.3-12.6 7.3-8.1 0-13-4.9-13-11.8 0-7.7 6-12.7 15-12.7 5.2 0 9.3 2 10.6 5v-6.9c0-4.6-3.2-7.6-8-7.6s-8.3 2.7-8.8 6.8h-7.8Zm7 14.8c0 3.6 2.7 5.9 7.2 5.9 4.4 0 7.8-2 10.4-5.9v-5.7h-10.6c-4.4 0-7 2.2-7 5.7Z"
                clipRule="evenodd"
              ></path>
              <path
                fill="#fa5d00"
                d="M27.6 64V40.6h8a4 4 0 0 0 3.8-4V24.7H27.6a4 4 0 0 0-4 4V64h4ZM51.3 1h-3.9v15.8a4 4 0 0 0-4 3.9V64h4a4 4 0 0 0 3.9-4V1ZM15.8 64h-4V5a3.9 3.9 0 0 1 4-3.9h4v43.3a4 4 0 0 1-4 4V64Z"
              ></path>
            </svg>
          </Link>
        </Box>
      </Box>

      <Box
        border="1px solid rgb(255, 162, 108);"
        bgColor="rgb(255, 248, 241)"
        p="30px"
        mt="5rem"
      >
        <Heading as="h4" size="md" color="#323231">
          Reset your password
        </Heading>
        <Text fontWeight="500" color="#1d1e1c" mb="0px" lineHeight="22px">
          Set a new password to sign in with the email address
        </Text>
        <Text mb="20px" fontWeight="bold">
          {email}
        </Text>

        <Box>
          <form onSubmit={handleResetPassword}>
            <Flex
              direction={isSmallerThan768 ? "column" : "row"}
              justifyContent="space-between"
              m="10px 0"
              alignItems={isSmallerThan768 ? "left" : "center"}
              color="#"
              fontWeight="500"
            >
              <label htmlFor="password">New password</label>
              <Input
                mt={isSmallerThan768 ? "5px" : ""}
                rounded="5px"
                outline="1px solid #73737390"
                isRequired
                color="#333332"
                fontSize="17px"
                fontWeight="500"
                w={isSmallerThan768 ? "100%" : "300px"}
                size="md"
                bgColor="white"
                focusBorderColor="black"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Flex>
            <Flex
              direction={isSmallerThan768 ? "column" : "row"}
              justifyContent="space-between"
              m="10px 0"
              alignItems={isSmallerThan768 ? "left" : "center"}
              fontWeight="500"
            >
              <label htmlFor="passwordConfirm">Confirm password</label>
              <Input
                mt={isSmallerThan768 ? "5px" : ""}
                rounded="5px"
                outline="1px solid #73737390"
                isRequired
                color="#333332"
                fontSize="17px"
                fontWeight="500"
                _placeholder={{ color: "black" }}
                w={isSmallerThan768 ? "100%" : "300px"}
                size="md"
                id="passwordConfirm"
                bgColor="white"
                focusBorderColor="black"
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </Flex>
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
              size="sm"
            >
              {loading ? "loading..." : "Reset password"}
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};
