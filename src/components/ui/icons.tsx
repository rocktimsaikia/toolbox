const iconClassName = "inline-flex h-5 w-5 items-center justify-center text-xs font-semibold";

export const Icons = {
  type: <span className={iconClassName}>T</span>,
  hash: <span className={iconClassName}>#</span>,
  key: <span className={iconClassName}>K</span>,
  arrowUpDown: <span className={iconClassName}>AZ</span>,
  link: <span className={iconClassName}>L</span>,
  wifi: <span className={iconClassName}>IP</span>,
  code: <span className={iconClassName}>{"{}"}</span>,
  alignLeft: <span className={iconClassName}>A</span>,
  fileText: <span className={iconClassName}>F</span>,
  copy: <span className={iconClassName}>C</span>,
  clock: <span className={iconClassName}>12</span>,
  scissors: <span className={iconClassName}>X</span>,
  search: <span className={iconClassName}>?</span>,
  palette: <span className={iconClassName}>P</span>,
} as const;

export type IconName = keyof typeof Icons;
