import { Box } from "./box";
import AppIcon from "@/assets/WH-MG-.ico";

const HeaderContainer = Box;

export const Header = () => {
  return (
    <HeaderContainer className="h-10 flex items-center p-2">
      <Box className="h-5 w-5 ">
        <img
          src={AppIcon}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>
    </HeaderContainer>
  );
};
