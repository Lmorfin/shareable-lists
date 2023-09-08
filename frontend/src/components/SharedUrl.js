import React, { useState, useEffect } from "react";
import * as listService from "../services/lists.service";
import {
  Heading,
  Text,
  Box,
  Stack,
  Button,
  VStack,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SharedUrl = () => {
  const [posts, setPosts] = useState([]);
  const [bp, setBp] = useState([]);
  const [createdDate, SetCreatedDate] = useState("");
  const currentURL = window.location.href;
  const splitURL = currentURL.split("/api/lists/");
  const uniqueIdentifier = splitURL[1];

  useEffect(() => {
    fetchListData();
  }, []);

  const fetchListData = async () => {
    await listService
      .fetchList(uniqueIdentifier)
      .then((res) => {
        console.log(res);
        console.log("Title:", res.data[0].title);
        console.log("work?", formatDate(res.data[0].created_at));
        SetCreatedDate(formatDate(res.data[0].created_at));
        setPosts([res.data[0]]);
        setBp(res.data[0].bulletpoints);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(posts);
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    // <div>
    // {posts.map((post) => (
    //   <div key={post.id}>
    //     <ul>
    //       <h3>{post.title}</h3>
    //     </ul>
    //   </div>
    // ))}

    // {bp.map((post) => (
    //   <div key={post}>
    //     <ul>
    //       <li>{post}</li>
    //     </ul>
    //   </div>
    // ))}
    // </div>

    // <Card>
    //   <CardHeader>
    //     <Heading>
    //       {posts.map((post) => (
    //         <span key={post.id}>{createdDate}</span>
    //       ))}
    //     </Heading>
    //   </CardHeader>

    //   <CardBody>
    //     <Stack divider={<StackDivider />} spacing="4">

    // {posts.map((post) => (
    //   <div key={post.id}>
    //     <Heading>
    //       {posts.map((post) => (
    //         <Text key={post.id}>{post.title}</Text>
    //       ))}
    //     </Heading>
    //   </div>
    // ))}

    //       {bp.map((post) => (
    //         <Box key={post}>
    //           <Text>{post}</Text>
    //         </Box>
    //       ))}

    // <Link to="/">
    //   <Button>Create a new List</Button>
    // </Link>
    //     </Stack>
    //   </CardBody>
    // </Card>

    <Box shadow="md" align="center" className="url-list-container">
      <Stack className="list-container" h="100vh" spacing={3}>
        <Center>
          <Text fontWeight="bold" fontSize="lg">
            {posts.map((post) => (
              <div key={post.id}>
                <Heading>
                  {posts.map((post) => (
                    <Text key={post.id}>{post.title}</Text>
                  ))}
                </Heading>
              </div>
            ))}
          </Text>
        </Center>

        <VStack spacing={2}>
          {bp.map((item) => (
            <Text key={item.id} fontSize="md">
              {item}
            </Text>
          ))}
        </VStack>
        <Stack>
          <Center>
            <Button width={280} mt={25}>
              Share List
            </Button>
          </Center>

          <Center>
            <Link to={`/api/update/${uniqueIdentifier}`}>
              <Button width={280} mt={25}>
                Edit List
              </Button>
            </Link>
          </Center>

          <Center>
            <Link to="/">
              <Button width={280} mt={25}>
                Create a new List
              </Button>
            </Link>
          </Center>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedUrl;
