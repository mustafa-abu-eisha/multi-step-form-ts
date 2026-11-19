import { useState, type ChangeEvent, type JSX, type SubmitEvent } from "react";
import {
  type InfoStepPropsTypes,
  type UserErrors,
  type UserInfoTypes,
} from "../data_and_types/types";

export default function InfoStep({
  userInfo,
  handleChangeInputField,
  handleChangeSelectedStep,
}: InfoStepPropsTypes): JSX.Element {
  const [formErrors, setFormErrors] = useState<UserErrors>({
    fullName: null,
    emailAddress: null,
    phoneNumber: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof UserInfoTypes,
  ): void => {
    handleChangeInputField(e, name);
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = (
    rgx: RegExp,
    name: keyof UserInfoTypes,
    msg: string,
  ): string | null => {
    const trimmedValue = userInfo[name].trim();
    if (!trimmedValue) return "This field is required";
    if (!rgx.test(trimmedValue)) return `Please, enter a valid ${msg}`;
    return null;
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const nameRgx = /^[\p{L}]+(?:[\s'-][\p{L}]+)*$/u;
    const emailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
    const phoneRgx = /^\+?[1-9](?:[\s.-]?\d){6,14}$/;

    const updatedErrors: UserErrors = {
      fullName: validateForm(nameRgx, "fullName", "name"),
      emailAddress: validateForm(emailRgx, "emailAddress", "email"),
      phoneNumber: validateForm(phoneRgx, "phoneNumber", "phone number"),
    };

    setFormErrors(updatedErrors);

    const isValidated = Object.values(updatedErrors).every(
      (val: string | null) => !val,
    );

    if (isValidated) {
      handleChangeSelectedStep(2);
    }
  };
  return (
    <article className="step-card">
      <div className="info-card">
        <h2 className="step-title">Personal info</h2>
        <p className="step-body">
          Please provide your name, email address, and phone number.
        </p>
        <form id="info-step" className="form-space" onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="full-name" className="form-label">
                Name
              </label>
              {formErrors.fullName && (
                <p className="font-bold text-[0.9375rem] leading-4 text-primary-500">
                  {formErrors.fullName}
                </p>
              )}
            </div>
            <input
              type="text"
              id="full-name"
              placeholder="e.g. Stephen King"
              className={`form-input ${formErrors.fullName ? "input-error" : ""}`}
              autoComplete="off"
              value={userInfo.fullName}
              onChange={(e) => handleChange(e, "fullName")}
            />
          </div>
          <div className="mt-4 sm:mt-6">
            <div className="flex justify-between items-center">
              <label htmlFor="email-address" className="form-label">
                Email Address
              </label>
              {formErrors.emailAddress && (
                <p className="font-bold text-[0.9375rem] leading-4 text-primary-500">
                  {formErrors.emailAddress}
                </p>
              )}
            </div>
            <input
              type="text"
              id="email-address"
              placeholder="e.g. stephenking@lorem.com"
              className={`form-input ${formErrors.emailAddress ? "input-error" : ""}`}
              autoComplete="off"
              value={userInfo.emailAddress}
              onChange={(e) => handleChange(e, "emailAddress")}
            />
          </div>
          <div className="mt-4 sm:mt-6">
            <div className="flex justify-between items-center">
              <label htmlFor="phone-number" className="form-label">
                Phone Number
              </label>
              {formErrors.phoneNumber && (
                <p className="font-bold text-[0.9375rem] leading-4 text-primary-500">
                  {formErrors.phoneNumber}
                </p>
              )}
            </div>
            <input
              type="text"
              id="phone-number"
              placeholder="e.g. +1 234 567 890"
              className={`form-input ${formErrors.phoneNumber ? "input-error" : ""}`}
              autoComplete="off"
              value={userInfo.phoneNumber}
              onChange={(e) => handleChange(e, "phoneNumber")}
            />
          </div>
        </form>
      </div>
      <div className="btns-box justify-end">
        <button type="submit" form="info-step" className="flex-center form-btn">
          Next Step
        </button>
      </div>
    </article>
  );
}
