import React from "react";

import { cn } from "@/lib/utils";

import styles from "./pane.module.css";

export type PaneProps = {
  children: React.ReactNode;
  expanded: boolean;
  title: string;
};

export const Pane = ({ children, expanded, title }: PaneProps) => {
  return (
    <div className={styles.pane}>
      <div className={styles.paneHeader}>
        <div
          className={cn(
            styles.twistyContainer,
            "codicon",
            expanded ? "codicon-chevron-down" : "codicon-chevron-up"
          )}
        ></div>
        <h3 className={styles.title}>{title}</h3>
      </div>
      {expanded && <div className={styles.paneBody}>{children}</div>}
    </div>
  );
};
