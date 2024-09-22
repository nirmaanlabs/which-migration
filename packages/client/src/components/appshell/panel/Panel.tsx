import { cn } from "@/lib/utils";

import styles from "./panel.module.css";
import { useRef } from "react";
import { Box } from "@/components/ui/box";

export type PanelProps = {
  maximized: boolean;
  onClose: () => void;
  onMaximize: () => void;
  onMinimize: () => void;
};

export const Panel = ({
  maximized,
  onClose,
  onMaximize,
  onMinimize,
}: PanelProps) => {
  const ref = useRef(null!);

  return (
    <Box className="h-full w-full flex flex-col">
      <Box className="flex overflow-hidden justify-between px-2 h-9">
        <Box className="leading-7">
          <ul className="h-full w-full items-center p-0 mx-0 my-auto flex list-none">
            <li className="uppercase items-center  justify-center cursor-pointer relative text-sm px-1 py-2">
              <a
                className="rounded-sm p-1 text-sm "
                style={{ background: "none" }}
              >
                Results
              </a>
              <Box className={styles.activeItemIndicator} />
            </li>
          </ul>
        </Box>
        <Box>
          <ul className={styles.actionsContainer}>
            <li>
              {maximized ? (
                <a
                  className={cn(
                    "codicon codicon-chevron-down",
                    styles.actionLabel
                  )}
                  role="button"
                  title="Minimize Panel Size"
                  onClick={onMinimize}
                />
              ) : (
                <a
                  className={cn(
                    "codicon codicon-chevron-up",
                    styles.actionLabel
                  )}
                  role="button"
                  title="Maximize Panel Size"
                  onClick={onMaximize}
                />
              )}
            </li>
            <li>
              <a
                className={cn("codicon codicon-close", styles.actionLabel)}
                role="button"
                title="Close Panel"
                onClick={onClose}
              ></a>
            </li>
          </ul>
        </Box>
      </Box>
      <Box className={styles.content}>
        <Box ref={ref} className={styles.terminalWrapper}>
          "-" some results
        </Box>
      </Box>
    </Box>
  );
};
