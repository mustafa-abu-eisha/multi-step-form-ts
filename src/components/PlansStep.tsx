import type { JSX } from "react";

import { plans } from "../data_and_types/plans";
import type { PlansStepPropsType, PlansTypes } from "../data_and_types/types";
import StepTitle from "./StepTitle";

export default function PlansStep({
  planName,
  paymentSystem,
  handleChangePlan,
  handleChangePaymentSystem,
  handleChangeSelectedStep,
}: PlansStepPropsType): JSX.Element {
  const isYearly = paymentSystem === "yearly";
  return (
    <article className="step-card">
      <div className="info-card">
        <StepTitle>Select your plan</StepTitle>
        <p className="step-body">
          You have the option of monthly or yearly billing.
        </p>
        <div className="form-space">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4.5">
            {plans.map((plan: PlansTypes): JSX.Element => {
              const inputId = plan.planName.toLowerCase();

              return (
                <div
                  key={plan.planName}
                  className="relative flex-1 flex sm:flex-col sm:justify-between items-start px-4 py-4 sm:pt-5 sm:pb-4 gap-3.5 sm:gap-0 leading-[1.1] sm:leading-[1.3] border border-secondary-200 rounded-lg transition-colors duration-200 has-checked:border-primary-600 has-checked:bg-secondary-200/20 hover:border-primary-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary-600"
                >
                  <img src={plan.icon} alt="" className="mt-1 sm:mt-0" />

                  <input
                    type="radio"
                    name="plan"
                    id={inputId}
                    value={inputId}
                    className="sr-only"
                    checked={inputId === planName}
                    onChange={handleChangePlan}
                  />
                  <label
                    htmlFor={inputId}
                    className="absolute inset-0 cursor-pointer"
                    aria-label={plan.planName}
                  ></label>
                  <div className="pt-0 sm:pt-8.25">
                    <h3 className="font-medium text-primary-950 text-lg">
                      {plan.planName}
                    </h3>
                    <p className="text-secondary-500">
                      {`$${plan[`${paymentSystem}Price`]}/${
                        isYearly ? "yr" : "mo"
                      }`}
                    </p>
                    {isYearly && (
                      <p className="text-primary-950 leading-[1.3] text-sm mt-0.5">
                        2 months free
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex-center gap-6 p-3.5 rounded-lg bg-secondary-200/20 mt-8 font-medium text-secondary-500">
            <p
              className={`transition-transform duration-200 ${!isYearly ? "text-primary-950" : "text-secondary-500"}`}
            >
              Monthly
            </p>
            <button
              type="button"
              role="switch"
              aria-checked={isYearly}
              aria-label="Switching The Payment System"
              className="flex items-center w-9.5 h-5 bg-primary-950 rounded-r-full rounded-l-full cursor-pointer focus-visible:outline-2 outline-primary-950 outline-offset-2"
              onClick={handleChangePaymentSystem}
            >
              <span
                className={`size-3 rounded-full bg-white transition-transform duration-200 ${paymentSystem === "monthly" ? "translate-x-1" : "translate-x-5.5"}`}
              ></span>
            </button>
            <p
              className={`transition-transform duration-200 ${isYearly ? "text-primary-950" : "text-secondary-500"}`}
            >
              Yearly
            </p>
          </div>
        </div>
      </div>
      <div className="btns-box justify-between items-center">
        <button
          type="button"
          className="prev-btn"
          onClick={() => handleChangeSelectedStep(1)}
        >
          Go Back
        </button>
        <button
          type="button"
          className="flex-center form-btn"
          onClick={() => handleChangeSelectedStep(3)}
        >
          Next Step
        </button>
      </div>
    </article>
  );
}
