import React, { useState, useEffect, useCallback } from "react";
import * as listService from "../services/lists.service";
import {
  Heading,
  Text,
  Box,
  Stack,
  Button,
  VStack,
  Container,
  useToast,
  Icon,
  Flex,
  Divider,
  Badge,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiShare2, FiEdit2, FiPlus } from "react-icons/fi";

const SharedUrl = () => {
  const [posts, setPosts] = useState([]);
  const [bp, setBp] = useState([]);
  const [createdDate, SetCreatedDate] = useState("");
  const currentURL = window.location.href;
  const splitURL = currentURL.split("/api/lists/");
  const uniqueIdentifier = splitURL[1];
  const toast = useToast();

  // Dark theme colors
  const bgColor = useColorModeValue("gray.800", "gray.900");
  const cardBg = useColorModeValue("gray.700", "gray.800");
  const textColor = useColorModeValue("white", "gray.100");
  const itemBg = useColorModeValue("gray.600", "gray.700");
  const borderColor = useColorModeValue("gray.600", "gray.700");
  const hoverBg = useColorModeValue("gray.600", "gray.600");

  // Responsive styles
  const containerPadding = useBreakpointValue({ base: 4, md: 8 });
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const textSize = useBreakpointValue({ base: "sm", md: "md" });

  const fetchListData = useCallback(async () => {
    await listService
      .fetchList(uniqueIdentifier)
      .then((res) => {
        SetCreatedDate(formatDate(res.data[0].created_at));
        setPosts([res.data[0]]);
        setBp(res.data[0].bulletpoints);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Failed to fetch list data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(err);
      });
  }, [uniqueIdentifier, toast]);

  useEffect(() => {
    fetchListData();
  }, [fetchListData]);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Share this link with others",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box bg={bgColor} minH="100vh" py={4}>
      <Container maxW="container.md" px={containerPadding}>
        <Box
          shadow="2xl"
          borderRadius="xl"
          p={containerPadding}
          bg={cardBg}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack spacing={6} align="stretch">
            {posts.map((post) => (
              <Box key={post.id}>
                <Flex
                  justify="space-between"
                  align="center"
                  mb={2}
                  direction={{ base: "column", sm: "row" }}
                  gap={2}
                >
                  <Heading size={headingSize} color="blue.300">
                    {post.title}
                  </Heading>
                  <Badge colorScheme="blue" fontSize={textSize} bg="blue.500">
                    Created {createdDate}
                  </Badge>
                </Flex>
              </Box>
            ))}

            <Divider borderColor={borderColor} />

            <VStack spacing={4} align="stretch">
              {bp.map((item, index) => (
                <Box
                  key={index}
                  p={4}
                  bg={itemBg}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={borderColor}
                  _hover={{ bg: hoverBg }}
                >
                  <Text fontSize={textSize} color={textColor}>
                    {item}
                  </Text>
                </Box>
              ))}
            </VStack>

            <Stack spacing={4} mt={8}>
              <Button
                leftIcon={<Icon as={FiShare2} />}
                onClick={handleShare}
                colorScheme="blue"
                size={buttonSize}
                width="100%"
                bg="blue.500"
                _hover={{ bg: "blue.600" }}
              >
                Share List
              </Button>

              <Link
                to={`/api/update/${uniqueIdentifier}`}
                style={{ width: "100%" }}
              >
                <Button
                  leftIcon={<Icon as={FiEdit2} />}
                  colorScheme="green"
                  size={buttonSize}
                  width="100%"
                  bg="green.500"
                  _hover={{ bg: "green.600" }}
                >
                  Edit List
                </Button>
              </Link>

              <Link to="/" style={{ width: "100%" }}>
                <Button
                  leftIcon={<Icon as={FiPlus} />}
                  colorScheme="purple"
                  size={buttonSize}
                  width="100%"
                  bg="purple.500"
                  _hover={{ bg: "purple.600" }}
                >
                  Create New List
                </Button>
              </Link>
            </Stack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default SharedUrl;
