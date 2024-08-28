import { useState } from "react";
import "./App.css";
import { Button } from "@components/ui/button";
import { Appshell } from "./components/ui/appshell/appshell";
import { AppshellHeader } from "./components/ui/appshell/appshellheader";
import { AppshellNavbar } from "./components/ui/appshell/appshellnavbar";
import { AppshellMain } from "./components/ui/appshell/appshellmain";
import { AppshellFooter } from "./components/ui/appshell/appshellfooter";
import { Navbar } from "./components/ui/navbar";
import { Header } from "./components/ui/header";

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
      <Appshell
        headerHeight={{ height: "1rem" }}
        navbarWidth={{ width: "1rem" }}
      >
        <AppshellHeader>
          <Header />
        </AppshellHeader>
        <AppshellNavbar>
          <Navbar />
        </AppshellNavbar>
        <AppshellMain>
          <Button onClick={fetchStatus}>Check status</Button>
          <h1>Data: {JSON.stringify(data)}</h1>{" "}
        </AppshellMain>
        <AppshellFooter> Footer</AppshellFooter>
      </Appshell>
    </>
  );
}

export default App;
