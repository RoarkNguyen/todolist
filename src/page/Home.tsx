import DoneTasks from "../components/DoneTasks";
import TodoList from "../components/TodoList";
import Layout from "../layout";
import useStore from "../stores/use-store";

export default function Home() {
  const { tabSelected } = useStore();

  return (
    <Layout>{tabSelected === "tasks" ? <TodoList /> : <DoneTasks />}</Layout>
  );
}
