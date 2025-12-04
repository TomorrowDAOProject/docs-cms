import { Item, Element } from "./common";

export interface Page extends Item {
  block_type: 1;
  children: string[];
  page: {
    elements: Element[];
    style: {
      align: number;
    };
  };
}

export function Page(props: Page) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {props.page.elements[0].text_run.content}
    </h1>
  );
}
