import { useEffect, useState } from "react";
import {
  Input,
  Button,
  FormLabel,
  Box,
  Container,
  Heading,
  VStack,
  useToast,
  IconButton,
  Flex,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as listService from "../services/lists.service";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const UpdateList = () => {
  const currentURL = window.location.href;
  const splitURL = currentURL.split("/update/");
  const redirectURL = splitURL[0];
  const uniqueIdentifier = splitURL[1];
  const [textFields, setTextFields] = useState([""]);
  const [post, setPost] = useState({ title: "", bulletpoints: [] });
  const toast = useToast();

  // Dark theme colors
  const bgColor = useColorModeValue("gray.800", "gray.900");
  const cardBg = useColorModeValue("gray.700", "gray.800");
  const textColor = useColorModeValue("white", "gray.100");
  const inputBg = useColorModeValue("gray.600", "gray.700");
  const borderColor = useColorModeValue("gray.600", "gray.700");
  const hoverBg = useColorModeValue("gray.600", "gray.600");

  // Responsive styles
  const containerPadding = useBreakpointValue({ base: 4, md: 8 });
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const inputSize = useBreakpointValue({ base: "md", md: "lg" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const iconButtonSize = useBreakpointValue({ base: "md", sm: "lg" });

  const handleAddTextField = () => {
    setTextFields([...textFields, ""]);
  };

  const handleRemoveTextField = (index) => {
    const newTextFields = textFields.filter((_, i) => i !== index);
    setTextFields(newTextFields);
    setPost({ ...post, bulletpoints: newTextFields });
  };

  const getList = () => {
    listService
      .fetchList(uniqueIdentifier)
      .then((res) => {
        setPost({ ...res.data[0], bulletpoints: res.data[0].bulletpoints });
        setTextFields(res.data[0].bulletpoints);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Failed to fetch list data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log("Error Occurred:", err);
      });
  };

  const updateList = (updatedPost) => {
    if (!updatedPost.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your list",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    listService
      .updateList(updatedPost)
      .then((res) => {
        toast({
          title: "List updated!",
          description: "Your list has been updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        window.location.assign(`${redirectURL}/lists/${uniqueIdentifier}`);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Failed to update list",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(err);
      });
  };

  useEffect(() => {
    getList();
  }, []);

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
            <Heading size={headingSize} textAlign="center" color="blue.300">
              Edit List
            </Heading>

            <Box>
              <FormLabel fontWeight="medium" color={textColor}>
                List Name
              </FormLabel>
              <Input
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                placeholder="Enter a title for your list"
                size={inputSize}
                bg={inputBg}
                color={textColor}
                borderColor={borderColor}
                _hover={{ bg: hoverBg }}
                _focus={{ bg: hoverBg, borderColor: "blue.300" }}
                _placeholder={{ color: "gray.400" }}
              />
            </Box>

            <Box>
              <FormLabel fontWeight="medium" color={textColor}>
                Items
              </FormLabel>
              <VStack spacing={3}>
                {textFields.map((text, index) => (
                  <Flex
                    key={index}
                    gap={2}
                    width="100%"
                    direction={{ base: "column", sm: "row" }}
                  >
                    <Input
                      value={text}
                      placeholder={`Item ${index + 1}`}
                      onChange={(e) => {
                        const updatedTextFields = [...textFields];
                        updatedTextFields[index] = e.target.value;
                        setTextFields(updatedTextFields);
                        setPost({ ...post, bulletpoints: updatedTextFields });
                      }}
                      size={inputSize}
                      bg={inputBg}
                      color={textColor}
                      borderColor={borderColor}
                      _hover={{ bg: hoverBg }}
                      _focus={{ bg: hoverBg, borderColor: "blue.300" }}
                      _placeholder={{ color: "gray.400" }}
                    />
                    {textFields.length > 1 && (
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleRemoveTextField(index)}
                        aria-label="Remove item"
                        _hover={{ bg: "red.900" }}
                        size={iconButtonSize}
                      />
                    )}
                  </Flex>
                ))}
              </VStack>
            </Box>

            <Button
              leftIcon={<AddIcon />}
              onClick={handleAddTextField}
              colorScheme="blue"
              variant="outline"
              size={buttonSize}
              width="100%"
              _hover={{ bg: "blue.600" }}
            >
              Add Item
            </Button>

            <Button
              onClick={() => updateList(post)}
              colorScheme="green"
              size={buttonSize}
              width="100%"
              mt={4}
              bg="green.500"
              _hover={{ bg: "green.600" }}
            >
              Update List
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default UpdateList;
