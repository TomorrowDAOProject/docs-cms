import { Item } from "./common";
import Renderer from "./renderer";

export interface Quote extends Item {
  block_type: 34;
  children: string[];
  quote_container: {};
}

export function Quote(props: Quote) {
  const allChildren = props.allItems.filter((i) =>
    props.children.includes(i.block_id)
  );

  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      {allChildren.map((i) => (
        <Renderer key={i.block_id} {...i} allItems={props.allItems} nested />
      ))}
    </blockquote>
  );
}
