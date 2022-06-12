import { assign, createMachine } from "xstate";

interface Context {
  heroesBanned: number[];
  heroesPicked: number[];
  selectedHeroId: number | null;
  turn: number;
}

type Event =
  | { type: "PICK"; heroId: number }
  | { type: "BAN"; heroId: number }
  | {
      type: "SELECT_HERO";
      heroId: number;
    }
  | { type: "START_GAME" };

const captainsModeMachine = createMachine<Context, Event>(
  {
    id: "Captain's Mode",
    initial: "idle",
    context: {
      heroesBanned: [],
      heroesPicked: [],
      selectedHeroId: null,
      turn: 0,
    },
    states: {
      idle: {
        on: {
          START_GAME: {
            target: "game",
          },
        },
      },
      game: {
        initial: "banning",
        states: {
          picking: {
            on: {
              PICK: {
                target: "banning",
                cond: "isHeroSelected",
                actions: assign((context, event) => ({
                  heroesPicked: [...context.heroesPicked, event.heroId],
                  selectedHeroId: null,
                  turn: context.turn + 1,
                })),
              },
              SELECT_HERO: {
                actions: assign({
                  selectedHeroId: (context, event) =>
                    (context.selectedHeroId = event.heroId),
                }),
              },
            },
          },
          banning: {
            on: {
              BAN: {
                target: "picking",
                cond: "isHeroSelected",
                actions: assign((context, event) => ({
                  heroesBanned: [...context.heroesBanned, event.heroId],
                  selectedHeroId: null,
                  turn: context.turn + 1,
                })),
              },
              SELECT_HERO: {
                // Select hero
                actions: assign({
                  selectedHeroId: (context, event) =>
                    (context.selectedHeroId = event.heroId),
                }),
              },
            },
          },
        },
      },
    },
  },
  {
    guards: {
      isHeroSelected: (context) => !!context.selectedHeroId,
    },
  }
);

export default captainsModeMachine;
