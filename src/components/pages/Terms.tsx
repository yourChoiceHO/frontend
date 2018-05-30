import { Tabs } from "antd";
import { pathOr } from "ramda";
import React, { SFC } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

const { TabPane } = Tabs;

const TermsPage: SFC<RouteComponentProps<{ tab: string }>> = ({ match }) => {
  const tab = pathOr("bedingungen", ["params", "tab"], match);

  return (
    <PageTemplate header={<Header />}>
      <Tabs activeKey={tab} type="card">
        <TabPane tab={<Link to="/bedingungen">AGB</Link>} key="bedingungen">
          <h2>Latein</h2>
          <h3>De finibus bonorum et malorum &middot; Cicero</h3>
          <h4>Absatz 1.10.32 - 1.10.33</h4>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </p>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus id quod maxime placeat
            facere possimus, omnis voluptas assumenda est, omnis dolor
            repellendus. Temporibus autem quibusdam et aut officiis debitis aut
            rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint
            et molestiae non recusandae. Itaque earum rerum hic tenetur a
            sapiente delectus, ut aut reiciendis voluptatibus maiores alias
            consequatur aut perferendis doloribus asperiores repellat.
          </p>
        </TabPane>
        <TabPane
          tab={<Link to="/bedingungen/datenschutz">Datenschutz</Link>}
          key="datenschutz"
        >
          <h2>Deutsch</h2>
          <h3>Das höchste Gut und Uebel &middot; Cicero</h3>
          <h4>Absatz 1.10.32 - 1.10.33</h4>
          <p>
            Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist,
            und weshalb man die Lust anklagt und den Schmerz lobet, so will ich
            Euch Alles eröffnen und auseinander setzen, was jener Begründer der
            Wahrheit und gleichsam Baumeister des glücklichen Lebens selbst
            darüber gesagt hat. Niemand, sagt er, verschmähe, oder hasse, oder
            fliehe die Lust als solche, sondern weil grosse Schmerzen ihr
            folgen, wenn man nicht mit Vernunft ihr nachzugehen verstehe. Ebenso
            werde der Schmerz als solcher von Niemand geliebt, gesucht und
            verlangt, sondern weil mitunter solche Zeiten eintreten, dass man
            mittelst Arbeiten und Schmerzen eine grosse Lust sich zu verschaften
            suchen müsse. Um hier gleich bei dem Einfachsten stehen zu bleiben,
            so würde Niemand von uns anstrengende körperliche Uebungen
            vornehmen, wenn er nicht einen Vortheil davon erwartete. Wer dürfte
            aber wohl Den tadeln, der nach einer Lust verlangt, welcher keine
            Unannehmlichkeit folgt, oder der einem Schmerze ausweicht, aus dem
            keine Lust hervorgeht?
          </p>
          <p>
            Dagegen tadelt und hasst man mit Recht Den, welcher sich durch die
            Lockungen einer gegenwärtigen Lust erweichen und verführen lässt,
            ohne in seiner blinden Begierde zu sehen, welche Schmerzen und
            Unannehmlichkeiten seiner deshalb warten. Gleiche Schuld treffe Die,
            welche aus geistiger Schwäche, d.h. um der Arbeit und dem Schmerze
            zu entgehen, ihre Pflichten verabsäumen. Man kann hier leicht und
            schnell den richtigen Unterschied treffen; zu einer ruhigen Zeit, wo
            die Wahl der Entscheidung völlig frei ist und nichts hindert, das zu
            thun, was den Meisten gefällt, hat man jede Lust zu erfassen und
            jeden Schmerz abzuhalten; aber zu Zeiten trifft es sich in Folge von
            schuldigen Pflichten oder von sachlicher Noth, dass man die Lust
            zurückweisen und Beschwerden nicht von sich weisen darf. Deshalb
            trifft der Weise dann eine Auswahl, damit er durch Zurückweisung
            einer Lust dafür eine grössere erlange oder durch Uebernahme
            gewisser Schmerzen sich grössere erspare.
          </p>
        </TabPane>
      </Tabs>
    </PageTemplate>
  );
};

export default TermsPage;
