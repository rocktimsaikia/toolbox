import { Type, Hash, Key, ArrowUpDown, Link as LinkIcon, Wifi, Code, AlignLeft, FileText, Copy } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

const iconStyle = { width: '1.25rem', height: '1.25rem' };

export const Icons = {
  type: <Type style={iconStyle} />,
  hash: <Hash style={iconStyle} />,
  key: <Key style={iconStyle} />,
  arrowUpDown: <ArrowUpDown style={iconStyle} />,
  link: <LinkIcon style={iconStyle} />,
  wifi: <Wifi style={iconStyle} />,
  code: <Code style={iconStyle} />,
  alignLeft: <AlignLeft style={iconStyle} />,
  fileText: <FileText style={iconStyle} />,
  copy: <Copy style={iconStyle} />,
} as const;

export type IconName = keyof typeof Icons;
