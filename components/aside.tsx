"use client";

import { AnyItem } from "@/components/blocks/renderer";
import TableOfContents from "@/components/blocks/table-of-contents";
import { Collapse, ConfigProvider } from "antd";
import { Desktop, Mobile } from "./provider";
interface Props {
  data: AnyItem[];
}

export function Aside({ data }: Props) {
  const contentItems = [
    {
      key: "1",
      label: "On this page",
      children: <TableOfContents allItems={data} />,
    },
  ];
  const ifShowCollapse = data.filter(i =>
    [3, 4, 5, 6, 7, 8, 9, 10, 11].includes(i.block_type)
  ).length;
  return (
    <aside className="sm:w-1/3 w-full">
      <Mobile>
        {ifShowCollapse ? (
          <ConfigProvider
            theme={{
              token: {
                colorLink: "#000",
                fontFamily: "inherit",
              },
              components: {
                Collapse: {
                  contentPadding: "2px",
                },
              },
            }}
          >
            <Collapse
              className="wiki-collapse-container !mb-4"
              items={contentItems}
            ></Collapse>
          </ConfigProvider>
        ) : null}
      </Mobile>
      <Desktop>
        <div className="overflow-y-auto max-h-[calc(100vh-60px)] sticky top-20">
          <TableOfContents allItems={data} />
        </div>
      </Desktop>
    </aside>
  );
}
