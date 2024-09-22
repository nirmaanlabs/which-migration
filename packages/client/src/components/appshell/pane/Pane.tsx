import React, { useState } from "react";

import { cn } from "@/lib/utils";

import styles from "./pane.module.css";
import { Box } from "@/components/ui/box";

export type PaneProps = {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactElement;
};

export const Pane = ({ children, title, actions }: PaneProps) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <Box className={styles.pane}>
      <Box className={styles.paneHeader}>
        <Box className="flex" onClick={() => setExpanded(!expanded)}>
          <Box
            className={cn(
              styles.twistyContainer,
              "codicon",
              expanded ? "codicon-chevron-down" : "codicon-chevron-right"
            )}
          ></Box>
          <h3 className={styles.title}>{title}</h3>
        </Box>

        <Box className="db-actions">{actions}</Box>
      </Box>
      {expanded && <div className={styles.paneBody}>{children}</div>}
    </Box>
  );
};
