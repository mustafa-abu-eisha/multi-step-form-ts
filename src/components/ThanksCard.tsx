import type { JSX } from "react";

import thanksIcon from "../assets/images/icon-thank-you.svg";

export default function ThanksCard(): JSX.Element {
  return (
    <article className="step-card text-center justify-start sm:justify-center max-w-full sm:max-w-110">
      <div className="info-card flex flex-col justify-center h-100 sm:h-auto">
        <img src={thanksIcon} alt="" className="mx-auto w-14 sm:w-auto" />
        <h2 className="step-title text-[2rem] mt-6 sm:mt-8 mb-3 sm:mb-3.5">
          Thank you!
        </h2>
        <p className="text-secondary-500">
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>
      </div>
    </article>
  );
}
