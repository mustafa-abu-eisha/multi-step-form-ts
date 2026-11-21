import { useMemo, type JSX } from "react";
import type {
  AddOnsTypes,
  PlansTypes,
  SummaryStepPropsTypes,
} from "../data_and_types/types";
import { plans } from "../data_and_types/plans";
import StepTitle from "./StepTitle";

export default function SummaryStep({
  planName,
  paymentSystem,
  addOns,
  handleChangeSelectedStep,
  handleChangeConfirmStatus,
}: SummaryStepPropsTypes): JSX.Element {
  const planPrice = useMemo((): number => {
    const targetPlan: PlansTypes | undefined = plans.find(
      (plan: PlansTypes): boolean => plan.planName.toLowerCase() === planName,
    );
    return targetPlan ? targetPlan[`${paymentSystem}Price`] : 0;
  }, [paymentSystem, planName]);

  const filteredAddOns: AddOnsTypes[] = useMemo(
    (): AddOnsTypes[] =>
      addOns.filter((add: AddOnsTypes): boolean => add.checked),
    [addOns],
  );

  const total: number = useMemo(
    () =>
      filteredAddOns.reduce(
        (acc: number, add: AddOnsTypes): number =>
          acc + add[`${paymentSystem}Price`],
        planPrice || 0,
      ),
    [filteredAddOns, planPrice, paymentSystem],
  );

  const periodLabel = paymentSystem === "monthly" ? "mo" : "yr";
  return (
    <article className="step-card">
      <div className="info-card">
        <StepTitle>Finishing up</StepTitle>
        <p className="step-body">
          Double-check everything looks OK before confirming.
        </p>
        <div className="form-space px-4 sm:px-6 pt-4.5 pb-3.5 sm:pt-4.5 sm:pb-5  bg-secondary-200/20 rounded-lg">
          <div className="flex items-center justify-between pb-3 sm:pb-5.5 mb-3 sm:mb-4 border-b border-b-secondary-200/70">
            <div className="leading-[1.3] sm:leading-6">
              <h3 className="font-medium text-primary-950 text-[1rem] sm:text-lg capitalize">
                {`${planName}(${paymentSystem})`}
              </h3>
              <button
                type="button"
                className="text-secondary-500 underline rounded-sm sm:rounded-lg transition-colors duration-200 hover:cursor-pointer hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-950 focus-visible:text-primary-600"
                onClick={() => handleChangeSelectedStep(2)}
              >
                Change
              </button>
            </div>
            <p className="font-medium text-primary-950 text-[1rem] sm:text-lg">
              {`$${planPrice}/${periodLabel}`}
            </p>
          </div>

          {filteredAddOns.length > 0 && (
            <div className="flex flex-col gap-2 sm:gap-3.5">
              {filteredAddOns.map(
                (add: AddOnsTypes): JSX.Element => (
                  <div
                    key={add.title}
                    className="flex items-center justify-between"
                  >
                    <p className="text-[15px] sm:text-[1rem] text-secondary-500">
                      {add.title}
                    </p>
                    <p className="text-[15px] text-primary-950">{`+$${add[`${paymentSystem}Price`]}/${periodLabel}`}</p>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between p-4 sm:p-6">
          <p className="text-[15px] sm:text-[1rem] text-secondary-500">
            {`Total(${paymentSystem === "monthly" ? "per month" : "per year"})`}
          </p>
          <p className="text-lg sm:text-xl text-primary-600 font-bold">
            {`+$${total}/${periodLabel}`}
          </p>
        </div>
      </div>
      <div className="btns-box justify-between items-center">
        <button
          type="button"
          className="prev-btn"
          onClick={() => handleChangeSelectedStep(3)}
        >
          Go Back
        </button>
        <button
          type="button"
          className="flex-center form-btn bg-primary-600 hover:bg-primary-600/55 focus-visible:bg-primary-600/55 focus-visible:outline-primary-600"
          onClick={handleChangeConfirmStatus}
        >
          Confirm
        </button>
      </div>
    </article>
  );
}
