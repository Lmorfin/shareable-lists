import * as listService from "../services/lists.service";
import { useState } from "react";
import { Stack, Input, Button, FormLabel, Center, Box } from "@chakra-ui/react";

const CreateList = () => {
  const [post, setPost] = useState({ title: "", bulletpoints: [] });

  const { title } = post;

  const [textFields, setTextFields] = useState([""]);

  const handleAddTextField = () => {
    setTextFields([...textFields, ""]);
  };

  const createList = (post) => {
    listService
      .postList(post)
      .then((res) => {
        console.log(res);
        let uuid = res.data[0].uuid;
        const currentURL = window.location.href;
        window.location.assign(`${currentURL}api/lists/${uuid}`);
      })
      .catch((err) => {
        console.log("Error Occurred:", err);
      });
  };

  return (
    <Box shadow="md" align="center" className="url-list-container">
      <Stack className="list-container" h="100vh" spacing={3}>
        <Center>
          <FormLabel>List Name</FormLabel>
        </Center>
        <Center>
          <Input
            value={title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Title"
            size="md"
            width={750}
          />
        </Center>

        <Center>
          <FormLabel>Items</FormLabel>
        </Center>

        {textFields.map((text, index) => (
          <Center>
            <Input
              width={750}
              key={index}
              type="text"
              value={text}
              placeholder="Item.."
              onChange={(e) => {
                const updatedTextFields = [...textFields];
                updatedTextFields[index] = e.target.value;
                setTextFields(updatedTextFields);
                setPost({ ...post, bulletpoints: updatedTextFields });
              }}
            />
          </Center>
        ))}

        <Center>
          <Button width={360} onClick={handleAddTextField}>
            Add
          </Button>
        </Center>

        <Center>
          <Button width={360} onClick={() => createList(post)}>
            Create List
          </Button>
        </Center>
      </Stack>
    </Box>
  );
};

export default CreateList;
