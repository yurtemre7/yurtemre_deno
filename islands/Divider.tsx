/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Divider() {
  return (
    <div class={tw`bg-gray-500 h-0.5 w-20 mx-auto rounded-sm`}></div>
  );
}
