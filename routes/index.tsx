import { define } from "../utils.ts";
import PortfolioHome from "../islands/PortfolioHome.tsx";

export default define.page(function Home(ctx) {
  return <PortfolioHome language={ctx.state.language} />;
});
