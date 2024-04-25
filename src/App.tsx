import { Route, Routes } from "react-router-dom";
import "./App.css";
import TodoList from "./page/TodoList";
import DoneTasks from "./page/DoneTasks";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/done-tasks" element={<DoneTasks />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
