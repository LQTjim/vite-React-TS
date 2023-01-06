import {} from "react";
import Header from "./components/Header";

import Footer from "./components/Footer";
import List from "./components/List";

function App() {
  return (
    <div className="container mx-auto w-1/2 flex flex-col justify-center items-center mt-6 p-2 border-solid border-2 border-sky-500">
      <Header />
      <List />
      <Footer />
    </div>
  );
}

export default App;
