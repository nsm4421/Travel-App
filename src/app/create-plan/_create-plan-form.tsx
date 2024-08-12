"use client";

import { AccompayType, BudgetType } from "@/constants/plan";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { ChangeEvent, useState } from "react";

interface BudgetMenu {
  type: BudgetType;
  emoji: string;
  label: string;
}

const budgetMenus: BudgetMenu[] = [
  {
    type: BudgetType.cheap,
    emoji: "💰",
    label: "CHEAP",
  },
  {
    type: BudgetType.moderate,
    emoji: "💵",
    label: "MODREATE",
  },
  {
    type: BudgetType.luxury,
    emoji: "💸",
    label: "LUXURY",
  },
];

interface AccompanyMenu {
  type: AccompayType;
  emoji: string;
  label: string;
}

const accompanyMenus: AccompanyMenu[] = [
  {
    type: AccompayType.solo,
    label: "SOLO",
    emoji: "🙋🏻‍♂️",
  },
  {
    type: AccompayType.couple,
    label: "COUPLE",
    emoji: "👩‍❤️‍👨",
  },
  {
    type: AccompayType.family,
    label: "FAMILY",
    emoji: "🧑‍🧑‍🧒🏡",
  },
  {
    type: AccompayType.friend,
    label: "FRIEND",
    emoji: "👭",
  },
];

export default function CreatePlanForm() {
  const [destination, setDestination] = useState<string>("");
  const [days, setDays] = useState<number>(1);
  const [budgetType, setBudgetType] = useState<BudgetType>(BudgetType.cheap);
  const [accompayType, setAccompayType] = useState<AccompayType>(
    AccompayType.solo
  );

  const handleDestination = (e: ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const handleChangeDays = (e: ChangeEvent<HTMLInputElement>) => {
    setDays(Math.max(Number(e.target.value), 1));
  };

  const handleBudgetType = (type: BudgetType) => () => {
    setBudgetType(type);
  };

  const handleAccompanyType = (type: AccompayType) => () => {
    setAccompayType(type);
  };

  // TODO
  const handleRecommend = () => {};

  return (
    <div>
      <ul className="flex flex-col gap-y-5 px-5">
        <li className="shadow-md px-5 py-3 rounded-lg flex flex-col gap-y-3">
          <label className="font-bold">DESTINATION</label>
          <Input
            value={destination}
            type="text"
            onChange={handleDestination}
            placeholder="Where do you want to go?"
          />
        </li>
        <li className="shadow-md px-5 py-3 rounded-lg flex flex-col gap-y-3">
          <label className="font-bold">DAYS</label>
          <Input
            value={days.toString()}
            type="number"
            onChange={handleChangeDays}
            placeholder="How may days to travel?"
          />
        </li>
        <li className="shadow-md px-5 py-3 rounded-lg flex flex-col gap-y-3">
          <label className="font-bold">Budget</label>
          <ul className="flex gap-x-3 justify-start">
            {budgetMenus.map((menu) => (
              <li key={menu.type}>
                <button
                  onClick={handleBudgetType(menu.type)}
                  className="p-3 shadow-md flex gap-x-2"
                >
                  <i>{menu.emoji}</i>
                  <label
                    className={`${
                      menu.type === budgetType
                        ? "text-teal-600 font-bold"
                        : "text-slate-600 font-thin"
                    } `}
                  >
                    {menu.label}
                  </label>
                </button>
              </li>
            ))}
          </ul>
        </li>

        <li className="shadow-md px-5 py-3 rounded-lg flex flex-col gap-y-3">
          <label className="font-bold">Accompay</label>
          <ul className="flex gap-x-3 justify-start">
            {accompanyMenus.map((menu) => (
              <li key={menu.type}>
                <button
                  onClick={handleAccompanyType(menu.type)}
                  className="p-3 shadow-md flex gap-x-2"
                >
                  <i>{menu.emoji}</i>
                  <label
                    className={`${
                      menu.type === accompayType
                        ? "text-teal-600 font-bold"
                        : "text-slate-600 font-thin"
                    } `}
                  >
                    {menu.label}
                  </label>
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <div className="mt-10 w-full">
        <Button
          className="w-full text-teal-600 font-extrabold text-xl"
          variant="shadow"
          onClick={handleRecommend}
        >
          Recommend
        </Button>
      </div>
    </div>
  );
}
