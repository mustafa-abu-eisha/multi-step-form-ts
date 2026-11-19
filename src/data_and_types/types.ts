import type { ChangeEvent } from "react";

type BillingCycle = "monthly" | "yearly";

export interface StepTypes {
  id: number;
  name: string;
}

export interface UserInfoTypes {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
}

export type UserErrors = Record<keyof UserInfoTypes, string | null>;

export interface InfoStepPropsTypes {
  userInfo: UserInfoTypes;
  handleChangeInputField: (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof UserInfoTypes,
  ) => void;
  handleChangeSelectedStep: (num: number) => void;
}

export interface AddOnsTypes {
  title: string;
  body: string;
  monthlyPrice: number;
  yearlyPrice: number;
  checked: boolean;
}

export interface PaymentInfoTypes {
  userInfo: UserInfoTypes;
  planName: string;
  paymentSystem: BillingCycle;
  addOns: AddOnsTypes[];
}

export interface PlansStepPropsType {
  planName: string;
  paymentSystem: BillingCycle;
  handleChangePlan: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangePaymentSystem: () => void;
  handleChangeSelectedStep: (num: number) => void;
}

export interface PlansTypes {
  planName: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: string;
}

export interface AddOnsStepPropsTypes {
  addOns: AddOnsTypes[];
  paymentSystem: BillingCycle;
  handleChangeAddOnsStatus: (
    e: ChangeEvent<HTMLInputElement>,
    title: string,
  ) => void;
  handleChangeSelectedStep: (num: number) => void;
}

export interface SummaryStepPropsTypes {
  planName: string;
  paymentSystem: BillingCycle;
  addOns: AddOnsTypes[];
  handleChangeSelectedStep: (num: number) => void;
  handleChangeConfirmStatus: () => void;
}
