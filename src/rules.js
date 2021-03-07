import { bruce, hilary, jeff, meryl, pat, will } from "./faces";

const rules = [
  {
    alpha: jeff,
    beta: pat,
    charlie: will,
    round: "ONE",
  },
  {
    alpha: bruce,
    beta: pat,
    charlie: meryl,
    round: "TWO",
  },
  {
    alpha: will,
    beta: hilary,
    charlie: pat,
    round: "THREE",
  },
  {
    alpha: jeff,
    beta: jeff,
    charlie: jeff,
    round: "FOUR",
  }
]

export default rules;
