// Auto-generated minimal Radix replacements for simple React + Tailwind usage.
// These provide simple drop-in components used by the original files.
// They are intentionally minimal and aim to preserve prop shapes like
// .Root, .Trigger, .Content, .Item, etc. for compatibility.

import React, { createContext, useContext, useState } from "react";

export const AccordionPrimitive = {
  Root: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Item: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Trigger: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  Content: ({ children, ...props }: any) => <div {...props}>{children}</div>,
};

// Simple Dialog primitive with context
const DialogCtx = createContext<any>(null);
export const DialogPrimitive = {
  Root: ({ children, open: openProp, onOpenChange, defaultOpen, ...props }: any) => {
    const [open, setOpen] = useState(!!defaultOpen);
    const value = { open: openProp ?? open, setOpen: (v:any)=>{ setOpen(v); onOpenChange?.(v)} };
    return <DialogCtx.Provider value={value}><div {...props}>{children}</div></DialogCtx.Provider>;
  },
  Trigger: ({ children, ...props }: any) => {
    const ctx = useContext(DialogCtx);
    return <button onClick={()=>ctx?.setOpen?.(!ctx.open)} {...props}>{children}</button>;
  },
  Content: ({ children, className, ...props }: any) => {
    const ctx = useContext(DialogCtx);
    if (!ctx?.open) return null;
    return <div className={className} {...props}>{children}</div>;
  },
  Overlay: ({ children, ...props }: any) => {
    const ctx = useContext(DialogCtx);
    if (!ctx?.open) return null;
    return <div {...props}>{children}</div>;
  },
  Portal: ({ children }: any) => <>{children}</>,
};

export const AlertDialogPrimitive = DialogPrimitive;
export const PopoverPrimitive = {
  Root: DialogPrimitive.Root,
  Trigger: DialogPrimitive.Trigger,
  Content: DialogPrimitive.Content,
  Portal: DialogPrimitive.Portal,
  Arrow: ({...props}: any) => <div {...props} />
};

export const HoverCardPrimitive = {
  Root: ({children,...props}: any) => <div {...props}>{children}</div>,
  Trigger: ({children,...props}: any) => <div {...props}>{children}</div>,
  Content: ({children,...props}: any) => <div {...props}>{children}</div>,
};

export const TabsPrimitive = {
  Root: ({children,...props}: any) => <div {...props}>{children}</div>,
  List: ({children,...props}: any) => <div {...props}>{children}</div>,
  Trigger: ({children,...props}: any) => <button {...props}>{children}</button>,
  Content: ({children,...props}: any) => <div {...props}>{children}</div>,
};

export const SliderPrimitive = {
  Root: ({children,...props}: any) => <div {...props}>{children}</div>,
  Track: ({children,...props}: any) => <div {...props}>{children}</div>,
  Range: ({children,...props}: any) => <div {...props}>{children}</div>,
  Thumb: ({children,...props}: any) => <div {...props}>{children}</div>,
};

export const CheckboxPrimitive = {
  Root: (props:any) => <input type="checkbox" {...props} />,
  Indicator: ({children,...props}: any) => <span {...props}>{children}</span>,
};

export const SwitchPrimitive = {
  Root: (props:any) => <input type="checkbox" role="switch" {...props} />,
};

export const ScrollAreaPrimitive = {
  Root: ({children,...props}: any) => <div style={{overflow:'auto'}} {...props}>{children}</div>,
  Viewport: ({children,...props}: any) => <div {...props}>{children}</div>,
  Thumb: ({children,...props}: any) => <div {...props}>{children}</div>,
};

export const SeparatorPrimitive = ({...props}: any) => <hr {...props} />;

export const AvatarPrimitive = {
  Root: ({children,...props}: any) => <div {...props}>{children}</div>,
  Image: ({src, ...props}: any) => <img src={src} {...props}/>,
  Fallback: ({children,...props}: any) => <div {...props}>{children}</div>,
};

export const LabelPrimitive = ({children,...props}: any) => <label {...props}>{children}</label>;

export const AspectRatioPrimitive = ({children, ratio=1, className, ...props}: any) => (
  <div style={{position:'relative', width:'100%', paddingTop: `${100/ratio}%`}} className={className} {...props}>
    <div style={{position:'absolute', inset:0}}>{children}</div>
  </div>
);

export const NavigationMenuPrimitive = {
  Root: ({children,...props}: any) => <nav {...props}>{children}</nav>,
  List: ({children,...props}: any) => <div {...props}>{children}</div>,
  Item: ({children,...props}: any) => <div {...props}>{children}</div>,
  Trigger: ({children,...props}: any) => <button {...props}>{children}</button>,
  Content: ({children,...props}: any) => <div {...props}>{children}</div>,
};

// Generic dropdown / menu primitive
export const DropdownMenuPrimitive = {
  Root: DialogPrimitive.Root,
  Trigger: DialogPrimitive.Trigger,
  Content: DialogPrimitive.Content,
};

// Minimal select primitive mapping to native select
export const SelectPrimitive = {
  Root: ({children,...props}: any) => <select {...props}>{children}</select>,
  Item: ({children,...props}: any) => <option {...props}>{children}</option>,
};

// Export a slot passthrough
export const Slot = ({children, ...props}: any) => <>{children}</>;

// Tooltip - simple title fallback
export const TooltipPrimitive = ({children, content, ...props}: any) => <span title={content} {...props}>{children}</span>;

export default {} as any;
