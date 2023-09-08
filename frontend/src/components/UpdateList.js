import { useEffect, useState } from "react";
import { Stack, Input, Button, FormLabel, Center, Box } from "@chakra-ui/react";
import * as listService from "../services/lists.service";

const UpdateList = () => {
  const currentURL = window.location.href;
  const splitURL = currentURL.split("/update/");
  const redirectURL = splitURL[0];
  const uniqueIdentifier = splitURL[1];
  const [textFields, setTextFields] = useState([""]);
  const [post, setPost] = useState({ title: "", bulletpoints: [] });

  const handleAddTextField = () => {
    setTextFields([...textFields, ""]);
  };

  const getList = () => {
    listService
      .fetchList(uniqueIdentifier)
      .then((res) => {
        console.log(res);
        setPost({ ...res.data[0], bulletpoints: res.data[0].bulletpoints });
        setTextFields(res.data[0].bulletpoints);
      })
      .catch((err) => {
        console.log("Error Occurred:", err);
      });
  };

  const updateList = (updatedPost) => {
    console.log("new version:", updatedPost);

    console.log("URL:", redirectURL);

    listService
      .updateList(updatedPost)
      .then((res) => {
        console.log(res);

        window.location.assign(`${redirectURL}/lists/${uniqueIdentifier}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <Box shadow="md" align="center" className="url-list-container">
        <Stack className="list-container" h="100vh" spacing={3}>
          <Center>
            <FormLabel>List Name</FormLabel>
          </Center>
          <Center>
            <Input
              value={post.title}
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
            <Center key={index}>
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
            <Button width={360} onClick={() => updateList(post)}>
              Update List
            </Button>
          </Center>
        </Stack>
      </Box>
    </div>
  );
};

export default UpdateList;
