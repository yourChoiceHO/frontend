import { equals } from "ramda";

import { ElectionTypes } from "@/types/model";
import { reduceWithOr } from "@/utils";

export const isEuropawahl = equals(ElectionTypes.Europawahl);
export const isBundestagswahl = equals(ElectionTypes.Bundestagswahl);
export const isLandtagswahl = equals(ElectionTypes.Landtagswahl);
export const isBuergermeisterwahl = equals(ElectionTypes.Buergermeisterwahl);
export const isReferendum = equals(ElectionTypes.Referendum);
export const isKommunalwahl = equals(ElectionTypes.Kommunalwahl);
export const isLandtagswahlBW = equals(ElectionTypes.LandtagswahlBW);
export const isLandtagswahlSL = equals(ElectionTypes.LandtagswahlSL);

export const shouldShowPartyList = type =>
  reduceWithOr([
    isEuropawahl(type),
    isBundestagswahl(type),
    isLandtagswahl(type),
    isLandtagswahlSL(type)
  ]);

export const shouldShowCandidateList = type =>
  reduceWithOr([
    isBundestagswahl(type),
    isLandtagswahl(type),
    isKommunalwahl(type),
    isBuergermeisterwahl(type),
    isLandtagswahlBW(type)
  ]);

export const shouldShowTopicList = type => reduceWithOr([isReferendum(type)]);
