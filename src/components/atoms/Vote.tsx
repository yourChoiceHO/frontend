import React, { forwardRef } from "react";

import Buergermeisterwahl from "@/components/pages/election/Vote/Buergermeisterwahl";
import Bundestagswahl from "@/components/pages/election/Vote/Bundestagswahl";
import Europawahl from "@/components/pages/election/Vote/Europawahl";
import Kommunalwahl from "@/components/pages/election/Vote/Kommunalwahl";
import Landtagswahl from "@/components/pages/election/Vote/Landtagswahl";
import LandtagswahlBW from "@/components/pages/election/Vote/LandtagswahlBW";
import LandtagswahlSL from "@/components/pages/election/Vote/LandtagswahlSL";
import Referendum from "@/components/pages/election/Vote/Referendum";

import { ElectionTypes, IElectionEntity } from "@/types/model";

const Vote = forwardRef(({ election }: { election: IElectionEntity }, ref) => {
  let VoteComponent;

  switch (election.typ) {
    case ElectionTypes.Buergermeisterwahl:
      VoteComponent = Buergermeisterwahl;
      break;

    case ElectionTypes.Bundestagswahl:
      VoteComponent = Bundestagswahl;
      break;

    case ElectionTypes.Europawahl:
      VoteComponent = Europawahl;
      break;

    case ElectionTypes.Kommunalwahl:
      VoteComponent = Kommunalwahl;
      break;

    case ElectionTypes.Landtagswahl:
      VoteComponent = Landtagswahl;
      break;

    case ElectionTypes.LandtagswahlBW:
      VoteComponent = LandtagswahlBW;
      break;

    case ElectionTypes.LandtagswahlSL:
      VoteComponent = LandtagswahlSL;
      break;

    case ElectionTypes.Referendum:
      VoteComponent = Referendum;
      break;

    default:
      return null;
  }

  return <VoteComponent election={election} ref={ref} />;
});

export default Vote;
