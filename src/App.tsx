import { Route, Routes } from "react-router-dom";
import "./App.css";
import TodoList from "./page/TodoList";
import About from "./page/About";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
