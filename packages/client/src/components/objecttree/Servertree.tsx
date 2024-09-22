// @ts-nocheck

import { Check, ChevronDown, ChevronRight, Database } from "lucide-react";
import { NodeApi, NodeRendererProps, Tree } from "react-arborist";
import { Box } from "../ui/box";

type TreeNode = {
  id: string;
  name: string;
  children: TreeNode[];
};

const testData = [
  {
    id: "1",
    name: "localhost:5432:DEV",
    children: [
      {
        id: "C1",
        name: "Schemas",
        children: [],
      },
      {
        id: "C2",
        name: "Catalogs",
        children: [],
      },
      {
        id: "C3",
        name: "Casts",
        children: [],
      },
      {
        id: "C4",
        name: "Event Triggers",
        children: [],
      },
    ],
  },
];

// const defaultServerChildren = [
//   { id: "C1", name: "Schemas" },
//   { id: "C2", name: "Catalogs" },
//   { id: "C3", name: "Casts" },
//   { id: "C4", name: "Event Triggers" },
// ];

const MyCustomNode = ({
  node,
  style,
  dragHandle,
}: NodeRendererProps<TreeNode>) => {
  return (
    <Box
      style={style}
      className="flex items-center h-full whitespace-nowrap leading-5"
      ref={dragHandle}
      onClick={() => {
        if (node.isInternal) {
          node.toggle();
        }
      }}
    >
      <Box className="node-content flex gap-1">
        <ChevronArrow node={node} />
        <Icon node={node} />
        <Box className="node-text">
          <p className="text-sm">{node.data.name}</p>
        </Box>
      </Box>
    </Box>
  );
};

function Icon({ node }: { node: NodeApi<TreeNode> }) {
  if (node.id === "1") {
    return (
      <Box className="flex justify-center items-center">
        <Check size={12} color="rgb(74 222 128)" strokeWidth={"5px"} />
        <Database size={16} color={"rgb(107 114 128)"} />
      </Box>
    );
  }
  return null;
}

function ChevronArrow({ node }: { node: NodeApi<TreeNode> }) {
  if (node.isLeaf) return <span></span>;
  return (
    <span>
      {node.isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </span>
  );
}

export const ServerTree = () => {
  // const { dbServers, isConnected } = useAuth();

  // const treeNodes = useMemo(() => {
  //   const nodesAfterAuthSuccess = [];
  //   dbServers.forEach((server) => {
  //     nodesAfterAuthSuccess.push({
  //       id: 1,
  //       name: server,
  //       children: defaultServerChildren,
  //     });
  //   });

  //   return nodesAfterAuthSuccess;
  // }, [dbServers]);

  return (
    <Box className="pt-2">
      <Tree openByDefault={false} initialData={testData}>
        {MyCustomNode}
      </Tree>
    </Box>
  );

  // if (isConnected) {
  //   return (
  //     <Tree openByDefault={false} initialData={testData}>
  //       {MyCustomNode}
  //     </Tree>
  //   );
  // }
  // return <Box>No Connection</Box>;
};
