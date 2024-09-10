import "./App.css";
import { Appshell } from "@components/appshell";
import styles from "./app.module.css";
import { Box } from "@components/ui/box";
import { Toaster } from "@components/ui/toaster";

function App() {
  return (
    <Box className={styles.appShellContainer}>
      <Appshell />
      <Toaster />
    </Box>
  );
}

export default App;
