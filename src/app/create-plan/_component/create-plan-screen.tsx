"use client";

import { ChangeEvent, useEffect, useState } from "react";
import createTravelPlanAction from "@/action/create-plan/create-travel-plan";
import { AccompayType, BudgetType } from "@/constants/plan";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { toast } from "sonner";

interface BudgetMenu {
  type: BudgetType;
  emoji: string;
  label: string;
}

const budgetMenus: BudgetMenu[] = [
  {
    type: BudgetType.CHEAP,
    emoji: "💰",
    label: "CHEAP",
  },
  {
    type: BudgetType.MODERATE,
    emoji: "💵",
    label: "MODREATE",
  },
  {
    type: BudgetType.LUXURY,
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
    type: AccompayType.SOLO,
    label: "SOLO",
    emoji: "🙋🏻‍♂️",
  },
  {
    type: AccompayType.COUPLE,
    label: "COUPLE",
    emoji: "👩‍❤️‍👨",
  },
  {
    type: AccompayType.FAMILY,
    label: "FAMILY",
    emoji: "🧑‍🧑‍🧒🏡",
  },
  {
    type: AccompayType.FRIEND,
    label: "FRIEND",
    emoji: "👭",
  },
];

export default function CreatePlanScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [destination, setDestination] = useState<string>("");
  const [days, setDays] = useState<number>(1);
  const [budgetType, setBudgetType] = useState<BudgetType>(BudgetType.CHEAP);
  const [accompanyType, setAccompanyType] = useState<AccompayType>(
    AccompayType.SOLO
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isLoading]);

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
    setAccompanyType(type);
  };

  const handleSubmit = async () => {
    // validation
    if (!destination) {
      toast.warning("destination is not given", {
        position: "top-center",
      });
      return;
    }
    try {
      setIsLoading(true);
      const res = await createTravelPlanAction({
        destination,
        days,
        budgetType,
        accompanyType,
      });
      // TODO : show result
    } catch (error) {
      console.error(error);
      toast.error("error occurs", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
          <div className="animate-spin rounded-full h-16 w-16 border-t-5 border-r-5 border-teal-500"></div>
        </div>
      )}

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
              <li
                key={menu.type}
                className={`${
                  menu.type === budgetType
                    ? "text-teal-600 font-bold shadow-lg"
                    : "text-slate-600 font-thin"
                } `}
              >
                <button
                  onClick={handleBudgetType(menu.type)}
                  className="p-3 shadow-md flex gap-x-2"
                >
                  <i>{menu.emoji}</i>
                  <label>{menu.label}</label>
                </button>
              </li>
            ))}
          </ul>
        </li>

        <li className="shadow-md px-5 py-3 rounded-lg flex flex-col gap-y-3">
          <label className="font-bold">Accompay</label>
          <ul className="flex gap-x-3 justify-start">
            {accompanyMenus.map((menu) => (
              <li
                key={menu.type}
                className={`${
                  menu.type === accompanyType
                    ? "text-teal-600 font-bold shadow-lg"
                    : "text-slate-600 font-thin"
                }`}
              >
                <button
                  onClick={handleAccompanyType(menu.type)}
                  className="p-3 shadow-md flex gap-x-2"
                >
                  <i>{menu.emoji}</i>
                  <label>{menu.label}</label>
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <div className="mt-10 w-full">
        <Button
          disabled={isLoading}
          className="w-full text-teal-600 font-extrabold text-xl"
          variant={isLoading ? "ghost" : "ghost"}
          onClick={handleSubmit}
        >
          {isLoading ? "Loadings..." : "Recommend"}
        </Button>
      </div>
    </div>
  );
}
