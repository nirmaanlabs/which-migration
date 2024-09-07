import { Box } from "@components/ui/box";

export const Statusbar = () => {
  return (
    <Box className="statusbar h-[40px] bg-violet-700">
      <Box className="flex justify-between items-center h-full p-2">
        <Box className="flex gap-2">
          <Box>Stat 1</Box>
          <Box>Stat 2</Box>
          <Box>Stat 3</Box>
        </Box>
        <Box className="flex gap-2">
          <Box>0 rows</Box>
          <Box>00:00:00 time </Box>
          <Box>Stat 3</Box>
        </Box>
      </Box>
    </Box>
  );
};
