import { AccompayType, BudgetType } from "@/constants/plan";
import chatSession from "@/lib/gemini-ai-service";

interface Props {
  destination: string;
  accompanyType: AccompayType;
  budgetType: BudgetType;
  days: number;
}

function createPrompt(props: Props) {
  return (
    "generate travel plan." +
    `destination is ${props.destination}.` +
    `stay ${props.days} days for ${props.accompanyType} with ${props.budgetType} budget. ` +
    `give me hotels list to stay with name, address, geo coordiante, price, image url, rating, description. ` +
    `also suggest itinerary with place name, detail, image url, geo coordinate, price of ticekt` +
    `each travel of location for 2 days with each day plan with best time to visit.` +
    `answer me with json format`
  );
}

export default async function createTravelPlanAction(props: Props) {
  return await chatSession
    .sendMessage(createPrompt(props))
    .then((res) => res.response.text());
}
