import { createDefine } from "fresh";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  shared: string;
  language: 'en' | 'de' | 'ja' | 'tr';
}

export const define = createDefine<State>();
