import "./App.css";
import { Appshell } from "@components/appshell";
import styles from "./app.module.css";
import { Box } from "@components/ui/box";

function App() {
  return (
    <Box className={styles.appShellContainer}>
      <Appshell />
    </Box>
  );
}

export default App;
