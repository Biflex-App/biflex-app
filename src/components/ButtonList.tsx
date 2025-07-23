'use client';

import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";


interface BaseItemConfig {
  type: 'link' | 'action'
  label: ReactNode
  icon?: ReactNode
  className?: string
}

interface LinkItemConfig extends BaseItemConfig {
  type: 'link'
  href: string
}

interface ActionItemConfig extends BaseItemConfig {
  type: 'action'
  onClick: () => (void | Promise<void>)
}

type ItemConfig = LinkItemConfig | ActionItemConfig

function ButtonListBaseItem({
  config: {
    label,
    icon,
    className,
  },
  onClick,
  isLoading,
}: {
  config: BaseItemConfig
  onClick?: () => (void | Promise<void>)
  isLoading?: boolean
}) {
  return (
    <Button
      className={cn('w-full h-12 justify-center bg-secondary-background', className)}
      onClick={onClick}
      disabled={isLoading}
    >
      {
        isLoading
        ? (
          <Spinner size='md'/>
        )
        : icon ? (
          <div className="flex flex-row justify-center items-center gap-2">
            <div className="grow-0 w-8 h-8 flex items-center justify-center">
              {icon}
            </div>
            <div className="grow-0">
              {label}
            </div>
          </div>
        ) : (
          label
        )
      }
    </Button>
  );
}

function ButtonListLinkItem(config: LinkItemConfig) {
  return (
    <Link href={config.href} className="w-full">
      <ButtonListBaseItem config={config}/>
    </Link>
  );
}

function ButtonListActionItem(config: ActionItemConfig) {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    const click = config.onClick();
    if (click instanceof Promise) {
      setIsLoading(true);
      await click;
      setIsLoading(false);
    }
  }

  return (
    <ButtonListBaseItem
      config={config}
      onClick={onClick}
      isLoading={isLoading}
    />
  );
}

export default function ButtonList({
  items
}: {
  items: ItemConfig[]
}) {
  return (
    <div className="grid grid-cols-1 gap-4 place-items-center p-4 w-full">
      {
        items.map((item, id) => (
          item.type === 'link'
            ? <ButtonListLinkItem key={id} {...item}/>
            : item.type === 'action'
            ? <ButtonListActionItem key={id} {...item}/>
            : null
        ))
      }
    </div>
  );
}
