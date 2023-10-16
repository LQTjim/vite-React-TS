type todoData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default async function fetchTodos(): Promise<todoData[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  return res.json();
}
