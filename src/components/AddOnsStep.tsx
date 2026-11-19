import type { JSX } from "react";
import type {
  AddOnsStepPropsTypes,
  AddOnsTypes,
} from "../data_and_types/types";

import checkMark from "../assets/images/icon-checkmark.svg";

export default function AddOnsStep({
  addOns,
  paymentSystem,
  handleChangeAddOnsStatus,
  handleChangeSelectedStep,
}: AddOnsStepPropsTypes): JSX.Element {
  return (
    <article className="step-card">
      <div className="info-card">
        <h2 className="step-title">Pick add-ons</h2>
        <p className="step-body">
          Add-ons help enhance your gaming experience.
        </p>
        <div className="form-space">
          <div className="flex flex-col gap-4">
            {addOns.map((add: AddOnsTypes): JSX.Element => {
              const inputId = add.title.replaceAll(" ", "-").toLowerCase();
              return (
                <div
                  key={add.title}
                  className="relative flex items-center px-4 sm:px-6 py-3.5 rounded-lg border border-secondary-200 has-checked:border-primary-600 has-checked:bg-secondary-200/20 hover:border-primary-600"
                >
                  <label
                    htmlFor={inputId}
                    className="absolute inset-0 cursor-pointer"
                  ></label>
                  <div className="relative leading-0">
                    <input
                      type="checkbox"
                      name="add-ons"
                      id={inputId}
                      value={inputId}
                      checked={add.checked}
                      onChange={(e) => handleChangeAddOnsStatus(e, add.title)}
                      className="peer appearance-none size-5 rounded-sm border border-secondary-200 transition-colors duration-200 checked:bg-primary-600 checked:border-primary-600"
                    />
                    <img
                      src={checkMark}
                      alt=""
                      className="absolute top-1/2 left-1/2 -translate-1/2"
                    />
                  </div>
                  <div className="leading-[1.4] ml-4 sm:ml-6">
                    <h3 className="text-[1rem] sm:text-lg font-medium text-primary-950">
                      {add.title}
                    </h3>
                    <p className="text-[13px] sm:text-[1rem] text-secondary-500">
                      {add.body}
                    </p>
                  </div>
                  <p className="ml-auto text-[12px] font-medium sm:text-[1rem] text-primary-600">
                    {`+$${add[`${paymentSystem}Price`]}/${paymentSystem === "monthly" ? "mo" : "yr"}`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="btns-box justify-between items-center">
        <button
          type="button"
          className="prev-btn"
          onClick={() => handleChangeSelectedStep(2)}
        >
          Go Back
        </button>
        <button
          type="button"
          className="flex-center form-btn"
          onClick={() => handleChangeSelectedStep(4)}
        >
          Next Step
        </button>
      </div>
    </article>
  );
}
