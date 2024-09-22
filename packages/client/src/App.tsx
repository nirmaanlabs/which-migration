import { Appshell } from "@components/appshell";
import { Box } from "@components/ui/box";
import { Toaster } from "@components/ui/toaster";
import { ThemeProvider } from "./theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Box className="w-[90vw] h-[90vh] overflow-scroll resize font-sans">
        <Appshell />
        <Toaster />
      </Box>
    </ThemeProvider>
  );
}

export default App;
