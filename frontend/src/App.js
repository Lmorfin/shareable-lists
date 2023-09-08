import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SharedUrl from "./components/SharedUrl";
import UpdateList from "./components/UpdateList";
import { ChakraProvider } from "@chakra-ui/react";


function App() {
  return (
    <ChakraProvider >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/lists/:uuid" element={<SharedUrl />} />
            <Route path="/api/update/:uuid" element={<UpdateList />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
