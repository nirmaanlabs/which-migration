import { cn } from "@/lib/utils";

import styles from "./panel.module.css";
import { useRef } from "react";

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
    <div className={styles.panel}>
      <div className={styles.title}>
        <div className={styles.actionBar}>
          <ul className={styles.actionsContainer}>
            <li className={cn(styles.actionItem, "checked")}>
              <a className={styles.actionLabel} style={{ background: "none" }}>
                Results
              </a>
              <div className={styles.activeItemIndicator} />
            </li>
          </ul>
        </div>
        <div>
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
        </div>
      </div>
      <div className={styles.content}>
        <div ref={ref} className={styles.terminalWrapper}></div>
      </div>
    </div>
  );
};
