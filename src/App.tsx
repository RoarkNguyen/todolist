import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
