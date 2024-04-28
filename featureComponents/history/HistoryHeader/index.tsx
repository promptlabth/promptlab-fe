import { TFunction } from "i18next";

interface HistoryHeaderProps {
  translate: TFunction<"translation", undefined>;
}

export const HistoryHeader = (props: HistoryHeaderProps) => {
  const { translate } = props;
  return (
    <div className="bg-dark pb-2 pt-4">
      <figure className="text-center pb-1 pt-3 text-light">
        <h2>
          <b>{translate("history")}</b>
        </h2>
      </figure>
    </div>
  );
};
