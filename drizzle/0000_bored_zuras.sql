CREATE TABLE `admins` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` varchar(50) NOT NULL DEFAULT 'admin',
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`createdBy` varchar(320),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admins_id` PRIMARY KEY(`id`),
	CONSTRAINT `admins_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `coupons` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`code` varchar(50) NOT NULL,
	`discountPercentage` int NOT NULL,
	`maxUses` int,
	`currentUses` int NOT NULL DEFAULT 0,
	`expiresAt` timestamp,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`createdBy` varchar(320),
	CONSTRAINT `coupons_id` PRIMARY KEY(`id`),
	CONSTRAINT `coupons_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255) NOT NULL,
	`plan` varchar(20) NOT NULL DEFAULT 'basic',
	`status` varchar(20) NOT NULL DEFAULT 'pending',
	`mapsGenerated` int NOT NULL DEFAULT 0,
	`paymentMethod` varchar(50),
	`paymentId` varchar(255),
	`amount` decimal(10,2),
	`currency` varchar(3) DEFAULT 'BRL',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`approvedAt` timestamp,
	CONSTRAINT `customers_id` PRIMARY KEY(`id`),
	CONSTRAINT `customers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`mapId` int NOT NULL,
	`sectionType` varchar(50) NOT NULL,
	`sectionTitle` varchar(255) NOT NULL,
	`sectionContent` text NOT NULL,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `map_history` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`subscriptionId` int NOT NULL,
	`customerId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`birthDate` date NOT NULL,
	`mapData` json NOT NULL,
	`pdfUrl` varchar(1024),
	`pdfKey` varchar(1024),
	`generatedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `map_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `numerology_maps` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`customerId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255) NOT NULL,
	`birthDate` varchar(50) NOT NULL,
	`chartData` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `numerology_maps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payment_history` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`customerId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`plan` varchar(20) NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`currency` varchar(3) DEFAULT 'BRL',
	`status` varchar(50) NOT NULL,
	`paymentMethod` varchar(50),
	`paymentId` varchar(255),
	`couponCode` varchar(50),
	`discountAmount` decimal(10,2) DEFAULT '0',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `payment_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `renascimento` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`customerId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`hasFactoGrave` boolean NOT NULL DEFAULT false,
	`factoGraveType` varchar(100),
	`notes` text,
	`realizacao` int,
	`realizacaoNumber` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedBy` varchar(320),
	CONSTRAINT `renascimento_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`type` varchar(50) NOT NULL,
	`data` json NOT NULL,
	`generatedBy` varchar(320),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`customerId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`plan` varchar(50) NOT NULL,
	`planPrice` decimal(10,2) NOT NULL,
	`mapsLimit` int NOT NULL,
	`mapsGenerated` int NOT NULL DEFAULT 0,
	`paymentStatus` varchar(50) NOT NULL,
	`infinetepayOrderId` varchar(255),
	`infinetepayNsu` varchar(255),
	`infinetepayAut` varchar(255),
	`cardBrand` varchar(50),
	`paymentMethod` varchar(50),
	`installments` int DEFAULT 1,
	`activatedAt` timestamp,
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscriptions_customerId_unique` UNIQUE(`customerId`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` varchar(20) NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
