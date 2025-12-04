import { key } from "@/lib/utils";
import { Item, TextStyle, Element } from "./common";

export interface Ordered extends Item {
  block_type: 13;
  ordered: {
    elements: Array<Element>;
    style: TextStyle;
  };
}

export function Ordered(props: Ordered) {
  return (
    <li>
      {props.ordered.elements.map((i) => (
        <Element key={key()} {...i} />
      ))}
    </li>
  );
}
