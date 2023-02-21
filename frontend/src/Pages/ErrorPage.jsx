import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "./HomepageComponents/components/footer/Footer";
import { Navbar } from "./HomepageComponents/components/navbar/Navbar";
import { useMediaQuery } from "@chakra-ui/react";

export const ErrorPage = () => {
  const [isSmallerThan540] = useMediaQuery("(max-width: 540px)");

  return (
    <Box>
      <Navbar />

      <Box
        m="0px 3%"
        bg="#fff8f1"
        pos="relative"
        h="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Heading
          pos="absolute"
          as="h1"
          fontSize="2vw"
          fontFamily="monospace"
          opacity="0.04"
          noOfLines={1}
        >
          404
        </Heading>

        <Box textAlign="center" fontFamily="unset">
          <Text
            fontSize={isSmallerThan540 ? "40px" : "50px"}
            color="#1d1e1c"
            m="0px 0px 20px"
          >
            Page not found
          </Text>
          <Text
            fontWeight="600"
            fontSize={isSmallerThan540 ? "18px" : "20px"}
            m="0px 0px 28px"
            color="#1d1e1c"
          >
            Sorry about that! The page you were looking for may have been moved
            or the address misspelled.
          </Text>
          <Flex
            flexWrap="wrap"
            m="20px"
            gap={isSmallerThan540 ? "3px" : "10px"}
            justifyContent="center"
            color="#1d1e1c"
            fontSize={isSmallerThan540 ? "18px" : "20px"}
          >
            <Link to="/">
              <Box
                _hover={{ textDecoration: "underline" }}
                color="#FA5D00"
                cursor="pointer"
              >
                Go to the Harvest homepage
              </Box>
            </Link>
            or
            <Link to="/">
              <Box
                _hover={{ textDecoration: "underline" }}
                color="#FA5D00"
                cursor="pointer"
              >
                contact us
              </Box>
            </Link>
          </Flex>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};
