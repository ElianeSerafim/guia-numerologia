-- Database Backup - Bússola Numerológica
-- Generated: 2026-02-02T17:07:43.590Z
-- Source: TiDB Cloud (Manus)

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Table structure for admins
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(320) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=60001;

-- Data for admins
INSERT INTO `admins` (`id`, `email`, `name`, `role`, `isActive`, `createdAt`, `createdBy`, `updatedAt`) VALUES (1, 'eliane@artwebcreative.com.br', 'Eliane Serafim', 'admin', 1, '2026-01-20 00:08:20', 'system', '2026-01-25 13:23:12');

-- Table structure for subscriptions
DROP TABLE IF EXISTS `subscriptions`;
CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `plan` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'navegador',
  `maps_limit` int(11) NOT NULL DEFAULT '1',
  `maps_generated` int(11) NOT NULL DEFAULT '0',
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=30001;

-- Data for subscriptions
INSERT INTO `subscriptions` (`id`, `email`, `plan`, `maps_limit`, `maps_generated`, `status`, `expires_at`, `created_at`, `updated_at`) VALUES (1, 'eliane@artwebcreative.com.br', 'iluminado', 2147483647, 0, 'approved', '2036-01-20 04:43:54', '2026-01-20 04:43:54', '2026-01-20 04:57:55');

SET FOREIGN_KEY_CHECKS = 1;
