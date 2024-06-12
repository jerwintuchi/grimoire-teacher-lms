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

interface DropdownMenuRadioTierProps {
  option: string;
  setOption: (position: string) => void;
}

export const DropdownMenuRadioTier: React.FC<DropdownMenuRadioTierProps> = ({
  option,
  setOption,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-[#853bce] hover:bg-[#4c2d69]">Choose Tier</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#853bce] border border-[#4c2d69] text-white">
        <DropdownMenuLabel>Select Tier</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={option} onValueChange={setOption}>
          <DropdownMenuRadioItem value="Free">Free</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Academic">
            Academic
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Magister">
            Magister
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
