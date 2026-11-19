import type { PlansTypes } from "./types";

import arcadeIcon from "../assets/images/icon-arcade.svg";
import advancedIcon from "../assets/images/icon-advanced.svg";
import proIcon from "../assets/images/icon-pro.svg";

export const plans: PlansTypes[] = [
  { planName: "Arcade", monthlyPrice: 9, yearlyPrice: 90, icon: arcadeIcon },
  {
    planName: "Advanced",
    monthlyPrice: 12,
    yearlyPrice: 120,
    icon: advancedIcon,
  },
  { planName: "Pro", monthlyPrice: 15, yearlyPrice: 150, icon: proIcon },
];
