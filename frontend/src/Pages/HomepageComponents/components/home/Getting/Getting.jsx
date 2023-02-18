import React from "react";
import { Box, Image, Text, Button, Flex } from "@chakra-ui/react";
import styles from "./getting.module.css";

export const Getting = () => {
  const GettingObj = [
    {
      img: "https://www.getharvest.com/hubfs/raw_assets/public/harvest-theme/images/homepage/test/feature-invoice.svg",
      heading: "Create a project",
      desc: "Create entries for your projects and tasks, or import them via one of our integrations.",
    },
    {
      img: "https://www.getharvest.com/hubfs/raw_assets/public/harvest-theme/images/homepage/test/feature-time.svg",
      heading: "Track time",
      desc: "Click start to begin tracking time. Stop and start timers as you switch tasks.",
    },
    {
      img: "https://www.getharvest.com/hubfs/raw_assets/public/harvest-theme/images/homepage/test/feature-report.svg",
      heading: "Generate reports & invoices",
      desc: "Easily convert time entries into internal reporting or client invoices.",
    },
  ];

  return (
    <Box textAlign="center" overflow="hidden">
      <Box className={styles.border} width="102%"></Box>
      <Box className={styles.box}>
        <Text
          fontSize="42px"
          color="#1d1e1c"
          fontWeight="300"
          lineHeight="50px"
          fontFamily="MuotoWeb, sans-serif"
        >
          Getting Started
        </Text>
        <Text
          fontSize="26px"
          fontWeight="300"
          color="#1d1e1c"
          fontFamily="MuotoWeb-300"
          marginTop="1rem"
        >
          Time tracking so easy, your team will actually use it.
        </Text>
      </Box>
      <Flex
        className={styles.started}
        justifyContent="center"
        textAlign="center"
      >
        {GettingObj.map((el, i) => (
          <Box key={i} bg="white" p="20px" borderRadius="8px">
            <Image src={el.img} m="auto" />
            <Text
              _hover={{ color: "#FA5D00" }}
              cursor="pointer"
              fontWeight="700"
              className={styles.started_heading}
            >
              {el.heading}
            </Text>
            <Text fontWeight="500" className={styles.started_desc}>
              {el.desc}
            </Text>
          </Box>
        ))}
      </Flex>
      <Button
        bgColor="#fa5d00"
        _hover={{ cursor: "pointer", bgColor: "#ea753f" }}
        color="white"
        marginTop="2rem"
        borderRadius="15px"
        width="11rem"
        padding="1.5rem"
        fontSize="18px"
      >
        Get Started {">"}
      </Button>
    </Box>
  );
};
