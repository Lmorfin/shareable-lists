import * as listService from "../services/lists.service";
import { useState } from "react";
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
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const CreateList = () => {
  const [post, setPost] = useState({ title: "", bulletpoints: [] });
  const { title } = post;
  const [textFields, setTextFields] = useState([""]);
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

  const createList = (post) => {
    if (!title.trim()) {
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
      .postList(post)
      .then((res) => {
        toast({
          title: "List created!",
          description: "Your list has been created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        let uuid = res.data[0].uuid;
        const currentURL = window.location.href;
        window.location.assign(`${currentURL}api/lists/${uuid}`);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Failed to create list. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log("Error Occurred:", err);
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
            <Heading size={headingSize} textAlign="center" color="blue.300">
              Create New List
            </Heading>

            <Box>
              <FormLabel fontWeight="medium" color={textColor}>
                List Name
              </FormLabel>
              <Input
                value={title}
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
              onClick={() => createList(post)}
              colorScheme="blue"
              size={buttonSize}
              width="100%"
              mt={4}
              bg="blue.500"
              _hover={{ bg: "blue.600" }}
            >
              Create List
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateList;
