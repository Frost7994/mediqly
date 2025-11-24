CREATE TYPE "public"."hintType" AS ENUM('nudge', 'prompt');--> statement-breakpoint
CREATE TYPE "public"."resultType" AS ENUM('mock', 'official');--> statement-breakpoint
CREATE TABLE "answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionId" uuid NOT NULL,
	"resultId" uuid NOT NULL,
	"optionId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "flags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"questionId" uuid NOT NULL,
	"resultId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "hintType" DEFAULT 'nudge',
	"resultId" uuid NOT NULL,
	"answerId" uuid NOT NULL,
	"optionId" uuid,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" varchar NOT NULL,
	"correct" boolean DEFAULT false NOT NULL,
	"questionId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" varchar NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "resultType" DEFAULT 'mock',
	"percentage" integer NOT NULL,
	"nudgesActive" boolean DEFAULT false NOT NULL,
	"promptsActive" boolean DEFAULT false NOT NULL,
	"timerActive" boolean DEFAULT false NOT NULL,
	"timeTaken" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categoriesOnQuestions" (
	"categoryId" uuid NOT NULL,
	"questionId" uuid NOT NULL,
	CONSTRAINT "categoriesOnQuestions_categoryId_questionId_pk" PRIMARY KEY("categoryId","questionId")
);
--> statement-breakpoint
CREATE TABLE "categoriesOnResults" (
	"categoryId" uuid NOT NULL,
	"resultId" uuid NOT NULL,
	CONSTRAINT "categoriesOnResults_categoryId_resultId_pk" PRIMARY KEY("categoryId","resultId")
);
--> statement-breakpoint
CREATE TABLE "questionsOnResults" (
	"questionId" uuid NOT NULL,
	"resultId" uuid NOT NULL,
	CONSTRAINT "questionsOnResults_questionId_resultId_pk" PRIMARY KEY("questionId","resultId")
);
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_questionId_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_resultId_results_id_fk" FOREIGN KEY ("resultId") REFERENCES "public"."results"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_optionId_options_id_fk" FOREIGN KEY ("optionId") REFERENCES "public"."options"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flags" ADD CONSTRAINT "flags_questionId_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flags" ADD CONSTRAINT "flags_resultId_results_id_fk" FOREIGN KEY ("resultId") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hints" ADD CONSTRAINT "hints_resultId_results_id_fk" FOREIGN KEY ("resultId") REFERENCES "public"."results"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hints" ADD CONSTRAINT "hints_answerId_answers_id_fk" FOREIGN KEY ("answerId") REFERENCES "public"."answers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hints" ADD CONSTRAINT "hints_optionId_options_id_fk" FOREIGN KEY ("optionId") REFERENCES "public"."options"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "options" ADD CONSTRAINT "options_questionId_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categoriesOnQuestions" ADD CONSTRAINT "categoriesOnQuestions_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categoriesOnQuestions" ADD CONSTRAINT "categoriesOnQuestions_questionId_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categoriesOnResults" ADD CONSTRAINT "categoriesOnResults_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categoriesOnResults" ADD CONSTRAINT "categoriesOnResults_resultId_results_id_fk" FOREIGN KEY ("resultId") REFERENCES "public"."results"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questionsOnResults" ADD CONSTRAINT "questionsOnResults_questionId_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questionsOnResults" ADD CONSTRAINT "questionsOnResults_resultId_results_id_fk" FOREIGN KEY ("resultId") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;