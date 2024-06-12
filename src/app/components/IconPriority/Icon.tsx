
import React from "react";

import Low from "@/app/assets/iconPriority/lowPriority.svg"
import Medium from "@/app/assets/iconPriority/mediumPriority.svg"
import High from "@/app/assets/iconPriority/highPriority.svg"
import Image from "next/image";

type PriorityIcons = {[key: string]: string};
type IconPriorityProps = {
  name: string
}

const icons: PriorityIcons = {
    'low': Low,
    'medium': Medium,
    'high': High,
  };

const IconPriority = ({name}: IconPriorityProps)  => {
    return <Image 
    src={icons[name]}
    alt={icons[name]}
    width={13}
    height={13}
    />;
  };

export default IconPriority;