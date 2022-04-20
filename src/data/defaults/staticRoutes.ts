import { games } from "./games";

export const staticRoutes = {
  games: games.map(({ internalUrl }) => internalUrl)
};
