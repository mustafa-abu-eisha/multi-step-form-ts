import { useState, type ChangeEvent, type JSX } from "react";

import {
  type AddOnsTypes,
  type PaymentInfoTypes,
  type StepTypes,
  type UserInfoTypes,
} from "./data_and_types/types";

import InfoStep from "./components/InfoStep";
import PlansStep from "./components/PlansStep";
import AddOnsStep from "./components/AddOnsStep";
import SummaryStep from "./components/SummaryStep";
import ThanksCard from "./components/ThanksCard";

const formSteps: StepTypes[] = [
  { id: 1, name: "Your info" },
  { id: 2, name: "Select plan" },
  { id: 3, name: "Add-ons" },
  { id: 4, name: "Summary" },
];

function App(): JSX.Element {
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoTypes>({
    userInfo: {
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
    },
    planName: "arcade",
    paymentSystem: "monthly",
    addOns: [
      {
        title: "Online service",
        body: "Access to multiplayer games",
        monthlyPrice: 1,
        yearlyPrice: 10,
        checked: true,
      },
      {
        title: "Larger storage",
        body: "Extra 1TB of cloud save",
        monthlyPrice: 2,
        yearlyPrice: 20,
        checked: true,
      },
      {
        title: "Customizable Profile",
        body: "Custom theme on your profile",
        monthlyPrice: 2,
        yearlyPrice: 20,
        checked: false,
      },
    ],
  });
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const handleChangeSelectedStep = (num: number): void => {
    if (num <= 4 && isConfirmed) setIsConfirmed(false);
    setSelectedStep(num);
  };

  const handleChangeInputField = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof UserInfoTypes,
  ): void => {
    setPaymentInfo((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, [name]: e.target.value },
    }));
  };

  const handleChangePlan = (e: ChangeEvent<HTMLInputElement>): void => {
    setPaymentInfo((prev) => ({ ...prev, planName: e.target.value }));
  };

  const handleChangePaymentSystem = (): void => {
    setPaymentInfo((prev) => ({
      ...prev,
      paymentSystem: prev.paymentSystem === "monthly" ? "yearly" : "monthly",
    }));
  };

  const handleChangeAddOnsStatus = (
    e: ChangeEvent<HTMLInputElement>,
    title: string,
  ): void => {
    const updatedAddOns: AddOnsTypes[] = paymentInfo.addOns.map(
      (add: AddOnsTypes): AddOnsTypes => {
        if (add.title === title) return { ...add, checked: e.target.checked };
        else return add;
      },
    );
    setPaymentInfo((prev) => ({ ...prev, addOns: updatedAddOns }));
  };
  const handleChangeConfirmStatus = (): void => {
    setIsConfirmed(true);
  };
  return (
    <main className="sm:p-4 h-full sm:h-fit sm:bg-white max-w-235 sm:rounded-xl flex-1 flex flex-col sm:flex-row sm:shadow-[0px_8px_15px_-6px_hsl(213deg_96%_18%/10%)]">
      <h1 className="sr-only">Multi-Step Form</h1>
      <aside className="w-full sm:w-68.5 h-43 sm:h-142 px-8 py-8 sm:py-10 flex sm:flex-col items-start justify-center sm:justify-start gap-4 sm:gap-7.5 bg-(image:--sidebar-mobile-bg) sm:bg-(image:--sidebar-desktop-bg) bg-cover bg-center bg-no-repeat">
        {formSteps.map(
          (step: StepTypes): JSX.Element => (
            <button
              type="button"
              key={step.id}
              className="group flex items-center gap-4 hover:cursor-pointer focus-visible:outline-0 disabled:hover:cursor-no-drop"
              onClick={() => handleChangeSelectedStep(step.id)}
              disabled={step.id > selectedStep}
            >
              <span
                className={`flex-center size-8.5 rounded-full border ${step.id === selectedStep ? "border-primary-200 bg-primary-200 text-primary-950" : "border-white bg-transparent text-white"} font-medium group-hover:border-primary-200 group-hover:bg-primary-200 group-hover:text-primary-950 group-focus-visible:border-primary-200 group-focus-visible:bg-primary-200 group-focus-visible:text-primary-950 transition-colors duration-200`}
              >
                {step.id}
              </span>
              <span className="uppercase text-start leading-[1.2] hidden sm:inline">
                <span className="block text-secondary-500 text-sm tracking-tight">{`Step ${step.id}`}</span>
                <span className="block font-medium text-white tracking-wider">
                  {step.name}
                </span>
              </span>
            </button>
          ),
        )}
      </aside>
      <section className="flex-1 flex flex-col sm:flex-row sm:pt-10.5 sm:pb-4">
        {selectedStep === 1 && (
          <InfoStep
            userInfo={paymentInfo.userInfo}
            handleChangeInputField={handleChangeInputField}
            handleChangeSelectedStep={handleChangeSelectedStep}
          />
        )}
        {selectedStep === 2 && (
          <PlansStep
            planName={paymentInfo.planName}
            paymentSystem={paymentInfo.paymentSystem}
            handleChangePlan={handleChangePlan}
            handleChangePaymentSystem={handleChangePaymentSystem}
            handleChangeSelectedStep={handleChangeSelectedStep}
          />
        )}
        {selectedStep === 3 && (
          <AddOnsStep
            addOns={paymentInfo.addOns}
            paymentSystem={paymentInfo.paymentSystem}
            handleChangeAddOnsStatus={handleChangeAddOnsStatus}
            handleChangeSelectedStep={handleChangeSelectedStep}
          />
        )}
        {selectedStep === 4 && !isConfirmed && (
          <SummaryStep
            planName={paymentInfo.planName}
            paymentSystem={paymentInfo.paymentSystem}
            addOns={paymentInfo.addOns}
            handleChangeSelectedStep={handleChangeSelectedStep}
            handleChangeConfirmStatus={handleChangeConfirmStatus}
          />
        )}
        {selectedStep === 4 && isConfirmed && <ThanksCard />}
      </section>
    </main>
  );
}

export default App;
