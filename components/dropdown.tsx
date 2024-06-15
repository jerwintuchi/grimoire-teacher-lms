// file: components/dropdown.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownMenuRadioGroupDemoProps {
  option: string;
  setOption: (position: string) => void;
}

export const DropdownMenuRadioGroupDemo: React.FC<
  DropdownMenuRadioGroupDemoProps
> = ({ option, setOption }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-[#853bce] hover:bg-[#4c2d69]">
          Choose what to search
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#853bce] border border-[#4c2d69] text-white">
        <DropdownMenuLabel>Select to Search</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={option} onValueChange={setOption}>
          <DropdownMenuRadioItem value="title">Title</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="code">Code</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="tier">Tier</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
