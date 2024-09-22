import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql, PostgreSQL } from "@codemirror/lang-sql";
import { material, materialLight } from "@uiw/codemirror-theme-material";
import { useTheme } from "@/theme/useTheme";

export function SqlEditor() {
  const [value, setValue] = React.useState("select 1");
  const { theme } = useTheme();
  const onChange = React.useCallback((val: string) => {
    console.log("val:", val);
    setValue(val);
  }, []);
  return (
    <CodeMirror
      theme={theme === "dark" ? material : materialLight}
      value={value}
      height="800px"
      width="800px"
      extensions={[sql({ dialect: PostgreSQL })]}
      onChange={onChange}
    />
  );
}
