import Renderer, { AnyItem } from "@/components/blocks/renderer";
import GithubSlugger from "github-slugger";
import { redirect } from "next/navigation";
import {
  findPathByTitles,
  formatStringArray,
  getMenu,
  toKebabCase,
} from "@/lib/utils";
import { PrevNext } from "@/components/prev-next";
import { getNode } from "@/services/get-node";
import { getDocBlocks } from "@/services/get-doc-blocks";
import { DateModified } from "@/components/date-modified";
import { NodesData } from "@/services/larkServices";
import { Aside } from "@/components/aside";
interface Props {
  params: {
    id: string[];
  };
}

async function getData(id: string) {
  const node = await getNode(id);

  if (node.obj_type === "docx") {
    return {
      data: await getDocBlocks(node.obj_token),
      docx_token: node.obj_token,
      edit_time: node.obj_edit_time,
    };
  } else {
    throw new Error("not supported");
  }
}

export default async function Document({ params }: Props) {
  const menu = await getMenu();
  const titleArr = formatStringArray(params.id);
  const { lastItemId: id } = findPathByTitles(menu, titleArr);
  if (!id) {
    redirect("/404");
  }
  const { data, edit_time } = await getData(id!);

  const slugger = new GithubSlugger();

  return (
    <main className="flex flex-col-reverse sm:flex-row">
      <div className="sm:w-2/3 w-full">
        {data?.map((item: AnyItem) => (
          <Renderer
            key={item.block_id}
            {...item}
            allItems={data}
            slugger={slugger}
          />
        ))}
        <PrevNext />
        <DateModified date={new Date(Number(edit_time) * 1000)} />
      </div>
      <Aside data={data} />
    </main>
  );
}

export async function generateStaticParams() {
  const menu = await getMenu();

  let paths: { id: string[] }[] = [];

  async function getParams(data: NodesData) {
    for (const i of data.items) {
      paths.push({ id: await getPath(i.node_token) });

      if (i.has_child) {
        for (const j of i.children) {
          await getParams(j);
        }
      }
    }
  }

  await getParams(menu);

  return paths;
}

async function getPath(id: string, path: string[] = []) {
  const { parent_node_token, title } = await getNode(id);

  if (parent_node_token) {
    return await getPath(parent_node_token, [toKebabCase(title), ...path]);
  } else {
    return [toKebabCase(title), ...path];
  }
}
