CREATE TYPE "public"."customer_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."plan" AS ENUM('basic', 'professional', 'premium');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'admin' NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" varchar(320),
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "coupons" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"discountPercentage" integer NOT NULL,
	"maxUses" integer,
	"currentUses" integer DEFAULT 0 NOT NULL,
	"expiresAt" timestamp,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" varchar(320),
	CONSTRAINT "coupons_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"name" varchar(255) NOT NULL,
	"plan" "plan" DEFAULT 'basic' NOT NULL,
	"status" "customer_status" DEFAULT 'pending' NOT NULL,
	"mapsGenerated" integer DEFAULT 0 NOT NULL,
	"paymentMethod" varchar(50),
	"paymentId" varchar(255),
	"amount" numeric(10, 2),
	"currency" varchar(3) DEFAULT 'BRL',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"approvedAt" timestamp,
	CONSTRAINT "customers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"mapId" integer NOT NULL,
	"sectionType" varchar(50) NOT NULL,
	"sectionTitle" varchar(255) NOT NULL,
	"sectionContent" text NOT NULL,
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "map_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"subscriptionId" integer NOT NULL,
	"customerId" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"birthDate" date NOT NULL,
	"mapData" jsonb NOT NULL,
	"pdfUrl" varchar(1024),
	"pdfKey" varchar(1024),
	"generatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "numerology_maps" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerId" integer NOT NULL,
	"email" varchar(320) NOT NULL,
	"name" varchar(255) NOT NULL,
	"birthDate" varchar(50) NOT NULL,
	"chartData" jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerId" integer NOT NULL,
	"email" varchar(320) NOT NULL,
	"plan" "plan" NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'BRL',
	"status" varchar(50) NOT NULL,
	"paymentMethod" varchar(50),
	"paymentId" varchar(255),
	"couponCode" varchar(50),
	"discountAmount" numeric(10, 2) DEFAULT '0',
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"completedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "renascimento" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerId" integer NOT NULL,
	"email" varchar(320) NOT NULL,
	"hasFactoGrave" boolean DEFAULT false NOT NULL,
	"factoGraveType" varchar(100),
	"notes" text,
	"realizacao" integer,
	"realizacaoNumber" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"updatedBy" varchar(320)
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"data" jsonb NOT NULL,
	"generatedBy" varchar(320),
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerId" integer NOT NULL,
	"email" varchar(320) NOT NULL,
	"plan" varchar(50) NOT NULL,
	"planPrice" numeric(10, 2) NOT NULL,
	"mapsLimit" integer NOT NULL,
	"mapsGenerated" integer DEFAULT 0 NOT NULL,
	"paymentStatus" varchar(50) NOT NULL,
	"infinetepayOrderId" varchar(255),
	"infinetepayNsu" varchar(255),
	"infinetepayAut" varchar(255),
	"cardBrand" varchar(50),
	"paymentMethod" varchar(50),
	"installments" integer DEFAULT 1,
	"activatedAt" timestamp,
	"expiresAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscriptions_customerId_unique" UNIQUE("customerId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" "role" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
