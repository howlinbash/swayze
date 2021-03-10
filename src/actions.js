import { stop } from "./events";

export const spin = () => setTimeout(stop(), 1950);
