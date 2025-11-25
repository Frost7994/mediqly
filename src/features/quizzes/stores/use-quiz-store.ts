import { MOCK, NO_OF_NUDGES, NO_OF_PROMPTS, NUDGE, OFFICIAL, PROMPT } from "@/constants";
import { toast } from "@/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Category = {
  id: string;
};

type Option = {
  id: string;
  text: string;
  correct: boolean;
};

type Question = {
  id: string;
  question: string;
  options: Option[];
};

type Answer = {
  questionId: string;
  optionId?: string;
};

type Flag = {
  questionId: string;
};

type Hint = {
  questionId: string;
  type: typeof NUDGE | typeof PROMPT;
  optionId: string;
};

type State = {
  isActive: boolean;
  type: typeof MOCK | typeof OFFICIAL;
  categories: Category[];

  questions: Question[];
  currentQuestion: Question | Record<string, never>;
  currentQuestionIndex: number;

  answers: Answer[];
  flags: Flag[];

  nudgesActive: boolean;
  promptsActive: boolean;
  hints: Hint[];

  timerActive: boolean;
  timeTaken: number;
};

type HandleStartClickProps = {
  type: typeof MOCK | typeof OFFICIAL;
  categories: Category[];
  questions: Question[];
  nudgesActive: boolean;
  promptsActive: boolean;
  timerActive: boolean;
};

type Actions = {
  handleStartClick: (props: HandleStartClickProps) => Promise<void>;
  handlePrevClick: () => void;
  handleNextClick: () => void;
  handleAnswerClick: (optionId: string) => void;
  handleFlagClick: () => void;
  handleNudgeClick: () => void;
  handlePromptClick: () => void;
  handleResetClick: () => Promise<void>;
};

const initialState: State = {
  isActive: false,
  type: MOCK,
  categories: [],

  questions: [],
  currentQuestion: {},
  currentQuestionIndex: 0,

  answers: [],
  flags: [],

  nudgesActive: false,
  promptsActive: false,
  hints: [],

  timerActive: false,
  timeTaken: 0,
};

const useQuizStore = create<State & Actions>()(
  devtools(
    persist(
      immer((set, get) => ({
        // state
        ...initialState,

        // actions
        handleStartClick: async (props) => {
          // clear state
          await get().handleResetClick();

          set({
            isActive: true,
            currentQuestion: props.questions[0],
            ...props,
          });
        },

        handlePrevClick: () => {
          if (get().currentQuestionIndex <= 0) return;

          set((state) => ({
            currentQuestionIndex: state.currentQuestionIndex - 1,
            currentQuestion: state.questions[state.currentQuestionIndex - 1],
          }));
        },

        handleNextClick: () => {
          if (get().currentQuestionIndex >= get().questions.length - 1) return;

          set((state) => ({
            currentQuestionIndex: state.currentQuestionIndex + 1,
            currentQuestion: state.questions[state.currentQuestionIndex + 1],
          }));
        },

        handleAnswerClick: (optionId: string) => {
          // check if a hint exists for the selected option
          const hintExists = get().hints.some(
            (hint) => hint.questionId === get().currentQuestion.id && hint.optionId === optionId
          );

          //  if hint exists, do not allow selecting the option
          if (hintExists) {
            toast({ message: "You cannot select an option that has been removed as a hint." });
            return;
          }

          // check if flag exists
          const flagIndex = get().flags.findIndex((f) => f.questionId === get().currentQuestion.id);

          // if flag exists, remove the flag
          if (flagIndex !== -1) {
            set((state) => {
              state.flags.splice(flagIndex, 1);
            });
          }

          // check if answer exists
          const answerIndex = get().answers.findIndex(
            (a) => a.questionId === get().currentQuestion.id
          );

          // if answer exists, update the answer
          if (answerIndex !== -1) {
            set((state) => {
              state.answers[answerIndex].optionId = optionId;
            });

            // go to next question
            get().handleNextClick();
            return;
          }

          // if answer does not exist, create a new answer
          set((state) => {
            state.answers.push({
              questionId: get().currentQuestion.id,
              optionId,
            });
          });

          // go to next question
          get().handleNextClick();
          return;
        },

        handleFlagClick: () => {
          // check if an answer exists for the current question
          const answerIndex = get().answers.findIndex(
            (a) => a.questionId === get().currentQuestion.id
          );

          // if answer exists, remove the answer
          if (answerIndex !== -1) {
            set((state) => {
              state.answers.splice(answerIndex, 1);
            });
          }

          // check if flag exists
          const flagIndex = get().flags.findIndex((f) => f.questionId === get().currentQuestion.id);

          // if flag exists, remove the flag
          if (flagIndex !== -1) {
            set((state) => {
              state.flags.splice(flagIndex, 1);
            });

            return;
          }

          // if flag does not exist, create a new flag
          set((state) => {
            state.flags.push({
              questionId: state.currentQuestion.id,
            });
          });

          // go to next question
          get().handleNextClick();
        },

        handleNudgeClick: () => {
          // check if user can use nudge
          if (!get().nudgesActive) {
            toast({ message: "Nudges are not active for this quiz." });
            return;
          }

          // check if user has any nudges left
          if (get().hints.filter((hint) => hint.type === NUDGE).length >= NO_OF_NUDGES) {
            toast({ message: "You have used all your nudges for this quiz." });
            return;
          }

          // get all hint ids for the current question
          const hintIds = get()
            .hints.filter((hint) => hint.questionId === get().currentQuestion.id)
            .map((hint) => hint.optionId);

          // check if the question can be nudged any more
          if (hintIds.length >= 3) {
            toast({ message: "You cannot get any more hints on this question." });
            return;
          }

          // get incorrect option ids for the current question
          const optionIds = get()
            .currentQuestion.options.filter((opt) => !opt.correct)
            .map((opt) => opt.id);

          // filter out option ids that have already been hinted
          const remainingOptionIds = optionIds.filter((id) => !hintIds.includes(id));

          // randomly select an option id from the remaining option ids
          const randomOptionId =
            remainingOptionIds[Math.floor(Math.random() * remainingOptionIds.length)];

          // add the nudge hint to the store
          set((state) => {
            state.hints.push({
              questionId: state.currentQuestion.id,
              type: NUDGE,
              optionId: randomOptionId,
            });
          });

          set((state) => {
            state.answers.push({
              questionId: state.currentQuestion.id,
            });
          });
        },

        handlePromptClick: () => {
          // check if user can use prompt
          if (!get().promptsActive) {
            toast({ message: "Prompts are not active for this quiz." });
            return;
          }

          // check if user has any prompts left
          // x2 because each prompt gives two hints
          if (get().hints.filter((hint) => hint.type === PROMPT).length >= NO_OF_PROMPTS * 2) {
            toast({ message: "You have used your prompts for this quiz." });
            return;
          }

          console.log(get().hints.filter((hint) => hint.type === PROMPT).length);

          // get all hint ids for the current question
          const hintIds = get()
            .hints.filter((hint) => hint.questionId === get().currentQuestion.id)
            .map((hint) => hint.optionId);

          // check if the question can be prompted any more
          if (hintIds.length > 1) {
            toast({ message: "You cannot get any more hints on this question." });
            return;
          }

          // get incorrect option ids for the current question
          const optionIds = get()
            .currentQuestion.options.filter((opt) => !opt.correct)
            .map((opt) => opt.id);

          // filter out option ids that have already been hinted
          const remainingOptionIds = optionIds.filter((id) => !hintIds.includes(id));

          // randomly select two option ids from the remaining option ids
          const shuffledOptionIds = remainingOptionIds.sort(() => 0.5 - Math.random());
          const selectedOptionIds = shuffledOptionIds.slice(0, 2);

          // add the prompt hint to the store
          set((state) => {
            selectedOptionIds.forEach((optionId) => {
              state.hints.push({
                questionId: state.currentQuestion.id,
                type: PROMPT,
                optionId,
              });
            });
          });

          set((state) => {
            state.answers.push({
              questionId: state.currentQuestion.id,
            });
          });
        },

        handleResetClick: async () => {
          set(() => initialState);
        },
      })),
      { name: "mediqly-quiz-store" }
    )
  )
);

export { useQuizStore };
