import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const fetchStatus = async () => {
    const res = await fetch("http://localhost:1337/api/v1/ping");
    const responseData = await res.json();
    setData(responseData);
  };

  // console.log(data);
  // useEffect(() => {
  //   fetchStatus();
  // }, []);

  return (
    <>
      <button onClick={fetchStatus}>Check status </button>
      <h1>Data: {JSON.stringify(data)}</h1>
    </>
  );
}

export default App;
