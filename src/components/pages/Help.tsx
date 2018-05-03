import React, { Fragment, SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

const HelpPage: SFC<{}> = () => {
  return (
    <PageTemplate header={<Header />}>
      <Fragment>
        <h2>Hilfe</h2>
        <p>
          Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und
          Konsonantien leben die Blindtexte. Abgeschieden wohnen sie in
          Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans.
        </p>
        <p>
          Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt
          sie mit den nötigen Regelialien. Es ist ein paradiesmatisches Land, in
          dem einem gebratene Satzteile in den Mund fliegen.
        </p>
        <p>
          Nicht einmal von der allmächtigen Interpunktion werden die Blindtexte
          beherrscht – ein geradezu unorthographisches Leben. Eines Tages aber
          beschloß eine kleine Zeile Blindtext, ihr Name war Lorem Ipsum, hinaus
          zu gehen in die weite Grammatik.
        </p>
        <p>
          Der große Oxmox riet ihr davon ab, da es dort wimmele von bösen
          Kommata, wilden Fragezeichen und hinterhältigen Semikoli, doch das
          Blindtextchen ließ sich nicht beirren. Es packte seine sieben
          Versalien, schob sich sein Initial in den Gürtel und machte sich auf
          den Weg.
        </p>
        <p>
          Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es
          einen letzten Blick zurück auf die Skyline seiner Heimatstadt
          Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner
          eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische
          Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf
          es eine Copy. Die Copy warnte das Blindtextchen, da, wo sie herkäme
          wäre sie
        </p>
      </Fragment>
    </PageTemplate>
  );
};

export default HelpPage;
