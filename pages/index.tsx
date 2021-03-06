import { useMachine } from "@xstate/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "react-query";
import Container from "../components/Container";
import GameButton, { Variant } from "../components/GameButton";
import HeroPortrait from "../components/HeroPortrait";
import captainsModeMachine from "../state";
import group from "../utils/group";

export interface Hero {
  id: number;
  img: string;
  localized_name: string;
  primary_attr: "agi" | "int" | "str";
}

const Home: NextPage = () => {
  const { data } = useQuery<{ [key: string]: Hero }>(["heroes"], async () => {
    return fetch("https://api.opendota.com/api/constants/heroes").then((data) =>
      data.json()
    );
  });

  const heroes = data
    ? group(Object.values(data), ({ primary_attr }) => primary_attr)
    : null;

  const [state, send] = useMachine(captainsModeMachine);

  return (
    <>
      <Head>
        <title>Webtains mode</title>
        <meta name="description" content="webtains-mode, a Dota 2 Captains Mode drafting game on web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <div className="grid grid-cols-[3fr,1fr] gap-4">
            <div className="">
              {heroes ? (
                <div className="flex flex-col gap-8">
                  {Object.entries(heroes).map(([group, heroGroup]) => (
                    <ul className="flex flex-wrap gap-4" key={group}>
                      {heroGroup.map((hero) => (
                        <li key={hero.id}>
                          <HeroPortrait
                            disabled={
                              state.matches("idle") ||
                              state.context.heroesBanned.includes(hero.id) ||
                              state.context.heroesPicked.includes(hero.id)
                            }
                            hero={hero}
                            isSelected={
                              hero.id === state.context.selectedHeroId
                            }
                            onClick={() => {
                              send({ type: "SELECT_HERO", heroId: hero.id });
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="space-y-4 p-4 bg-slate-600 text-white">
              <p>Turn: {state.context.turn}</p>
              {state.matches("idle") && (
                <GameButton
                  variant={Variant.DEFAULT}
                  disabled={false}
                  text="Start game"
                  onClick={() => send("START_GAME")} />
              )}
              {
                state.matches("game.banning")
                && (
                  <GameButton
                    variant={
                      state.context.selectedHeroId ? Variant.BAN
                        : Variant.DEFAULT}
                    disabled={
                      state.context.selectedHeroId ? false : true}
                    text={
                      data ? Object.values(data).find(
                        (hero) => hero.id === state.context.selectedHeroId
                      )?.localized_name
                        ?? "Select a hero to ban"
                        : ""}
                    onClick={() =>
                      state.context.selectedHeroId
                        ? send({
                          type: "BAN",
                          heroId: state.context.selectedHeroId,
                        })
                        : undefined
                    } >
                  </GameButton>
                )}
              {state.matches("game.picking") && (
                <GameButton
                  variant={
                    state.context.selectedHeroId ? Variant.PICK
                      : Variant.DEFAULT}
                  disabled={
                    state.context.selectedHeroId ? false : true}
                  text={
                    data ? Object.values(data).find(
                      (hero) => hero.id === state.context.selectedHeroId
                    )?.localized_name
                      ?? "Select a hero to pick"
                      : ""}
                  onClick={() =>
                    state.context.selectedHeroId
                      ? send({
                        type: "PICK",
                        heroId: state.context.selectedHeroId,
                      })
                      : undefined
                  } >
                </GameButton>
              )}
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Home;
