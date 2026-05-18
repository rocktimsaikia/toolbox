import {
  AlignLeft,
  ArrowRightLeft,
  Braces,
  Clock3,
  Code2,
  Copy,
  FileJson2,
  FileText,
  Hash,
  KeyRound,
  Link2,
  Palette,
  Scissors,
  Search,
  Sparkles,
  Type,
  Wifi,
} from "lucide-react";

const iconClassName = "h-5 w-5";
const iconStrokeWidth = 2;

export const Icons = {
  type: <Type className={iconClassName} strokeWidth={iconStrokeWidth} />,
  textTools: <Sparkles className={iconClassName} strokeWidth={iconStrokeWidth} />,
  json: <FileJson2 className={iconClassName} strokeWidth={iconStrokeWidth} />,
  hash: <Hash className={iconClassName} strokeWidth={iconStrokeWidth} />,
  key: <KeyRound className={iconClassName} strokeWidth={iconStrokeWidth} />,
  arrowUpDown: <ArrowRightLeft className={iconClassName} strokeWidth={iconStrokeWidth} />,
  link: <Link2 className={iconClassName} strokeWidth={iconStrokeWidth} />,
  wifi: <Wifi className={iconClassName} strokeWidth={iconStrokeWidth} />,
  code: <Code2 className={iconClassName} strokeWidth={iconStrokeWidth} />,
  alignLeft: <AlignLeft className={iconClassName} strokeWidth={iconStrokeWidth} />,
  fileText: <FileText className={iconClassName} strokeWidth={iconStrokeWidth} />,
  copy: <Copy className={iconClassName} strokeWidth={iconStrokeWidth} />,
  clock: <Clock3 className={iconClassName} strokeWidth={iconStrokeWidth} />,
  scissors: <Scissors className={iconClassName} strokeWidth={iconStrokeWidth} />,
  search: <Search className={iconClassName} strokeWidth={iconStrokeWidth} />,
  palette: <Palette className={iconClassName} strokeWidth={iconStrokeWidth} />,
  braces: <Braces className={iconClassName} strokeWidth={iconStrokeWidth} />,
} as const;

export type IconName = keyof typeof Icons;
