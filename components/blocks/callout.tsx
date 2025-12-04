import { Item } from "./common";
import Renderer from "./renderer";

export interface Callout extends Item {
  block_type: 19;
  children: string[];
  callout: {
    background_color: number;
    border_color: number;
    emoji_id: string;
  };
}

export function Callout(props: Callout) {
  const allChildren = props.allItems.filter((i) =>
    props.children.includes(i.block_id)
  );

  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-5"
      role="alert"
    >
      {allChildren.map((i) => (
        <Renderer key={i.block_id} {...i} allItems={props.allItems} nested />
      ))}
    </div>
  );
}
