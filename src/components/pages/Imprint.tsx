import React, { Fragment, SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

const ImprintPage: SFC<{}> = () => (
  <PageTemplate header={<Header />}>
    <Fragment>
      <h2>Impressum</h2>
      <p>
        Überall dieselbe alte Leier. Das Layout ist fertig, der Text lässt auf
        sich warten. Damit das Layout nun nicht nackt im Raume steht und sich
        klein und leer vorkommt, springe ich ein: der Blindtext.
      </p>
      <p>
        Genau zu diesem Zwecke erschaffen, immer im Schatten meines großen
        Bruders »Lorem Ipsum«, freue ich mich jedes Mal, wenn Sie ein paar
        Zeilen lesen. Denn esse est percipi - Sein ist wahrgenommen werden.
      </p>
      <p>
        Und weil Sie nun schon die Güte haben, mich ein paar weitere Sätze lang
        zu begleiten, möchte ich diese Gelegenheit nutzen, Ihnen nicht nur als
        Lückenfüller zu dienen, sondern auf etwas hinzuweisen, das es ebenso
        verdient wahrgenommen zu werden: Webstandards nämlich.
      </p>
      <p>
        Sehen Sie, Webstandards sind das Regelwerk, auf dem Webseiten aufbauen.
        So gibt es Regeln für HTML, CSS, JavaScript oder auch XML; Worte, die
        Sie vielleicht schon einmal von Ihrem Entwickler gehört haben.
      </p>
      <p>
        Diese Standards sorgen dafür, dass alle Beteiligten aus einer Webseite
        den größten Nutzen ziehen. Im Gegensatz zu früheren Webseiten müssen wir
        zum Beispiel nicht mehr zwei verschiedene Webseiten für den Internet
        Explorer und einen anderen Browser programmieren. Es reicht eine Seite,
        die - richtig angelegt - sowohl auf verschiedenen Browsern im Netz
        funktioniert, aber ebenso gut für den Ausdruck oder
      </p>
    </Fragment>
  </PageTemplate>
);

export default ImprintPage;
