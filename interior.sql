-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 18, 2025 at 04:42 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `interior`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `product_hex_id` bigint UNSIGNED NOT NULL,
  `size_id` bigint UNSIGNED NOT NULL,
  `quantity` smallint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `id` bigint UNSIGNED NOT NULL,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_hex_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `galleries`
--

INSERT INTO `galleries` (`id`, `image_path`, `product_hex_id`, `created_at`, `updated_at`) VALUES
(60, 'assets/img/products/AkXC7gB9ab_1740978319.webp', 44, NULL, NULL),
(61, 'assets/img/products/X3mz34GiEB_1740978319.jpg', 44, NULL, NULL),
(62, 'assets/img/products/nEKYLYaxsN_1740978319.jpg', 44, NULL, NULL),
(63, 'assets/img/products/g9uFFbaGiV_1741864153.webp', 51, NULL, NULL),
(64, 'assets/img/products/AkXC7gB9ab_1740978319.webp', 45, NULL, NULL),
(65, 'assets/img/products/X3mz34GiEB_1740978319.jpg', 46, NULL, NULL),
(66, 'assets/img/products/AkXC7gB9ab_1740978319.webp', 47, NULL, NULL),
(67, 'assets/img/products/nEKYLYaxsN_1740978319.jpg', 48, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2014_10_12_100000_create_password_resets_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2024_09_18_111513_alter_to_users_table', 1),
(7, '2024_10_04_021108_create_permission_tables', 1),
(8, '2024_11_09_121911_add_google_id_to_users_table', 1),
(9, '2024_12_22_051009_create_sets_table', 1),
(10, '2024_12_22_051019_create_setcategories_table', 1),
(11, '2024_12_22_051022_create_products_table', 1),
(12, '2024_12_22_051026_create_product_hex_table', 1),
(13, '2024_12_22_051030_create_product_sizes_table', 1),
(14, '2024_12_22_051034_create_galleries_table', 1),
(15, '2024_12_27_064100_create_order_table', 2),
(16, '2024_12_27_064107_create_order_detail_table', 2),
(17, '2024_12_27_064147_create_cart_table', 2),
(18, '2024_12_27_070211_create_cart_table', 3),
(19, '2024_12_27_075352_create_order_detail_table', 4),
(20, '2024_12_27_091639_create_review_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 3),
(2, 'App\\Models\\User', 4),
(2, 'App\\Models\\User', 5),
(2, 'App\\Models\\User', 6),
(2, 'App\\Models\\User', 7),
(2, 'App\\Models\\User', 8),
(2, 'App\\Models\\User', 9),
(2, 'App\\Models\\User', 10),
(2, 'App\\Models\\User', 11),
(2, 'App\\Models\\User', 12),
(2, 'App\\Models\\User', 13),
(2, 'App\\Models\\User', 14),
(2, 'App\\Models\\User', 15),
(2, 'App\\Models\\User', 16),
(2, 'App\\Models\\User', 17),
(2, 'App\\Models\\User', 18),
(2, 'App\\Models\\User', 19),
(2, 'App\\Models\\User', 20),
(2, 'App\\Models\\User', 21),
(2, 'App\\Models\\User', 22),
(2, 'App\\Models\\User', 23),
(2, 'App\\Models\\User', 24),
(2, 'App\\Models\\User', 25),
(2, 'App\\Models\\User', 26),
(2, 'App\\Models\\User', 27),
(2, 'App\\Models\\User', 28),
(2, 'App\\Models\\User', 29),
(2, 'App\\Models\\User', 30),
(2, 'App\\Models\\User', 31),
(2, 'App\\Models\\User', 32),
(2, 'App\\Models\\User', 33),
(2, 'App\\Models\\User', 34),
(2, 'App\\Models\\User', 35),
(2, 'App\\Models\\User', 36),
(2, 'App\\Models\\User', 37),
(2, 'App\\Models\\User', 38),
(2, 'App\\Models\\User', 39),
(2, 'App\\Models\\User', 40),
(2, 'App\\Models\\User', 41),
(2, 'App\\Models\\User', 42),
(2, 'App\\Models\\User', 43),
(2, 'App\\Models\\User', 44),
(2, 'App\\Models\\User', 45),
(2, 'App\\Models\\User', 46),
(2, 'App\\Models\\User', 47),
(2, 'App\\Models\\User', 48),
(2, 'App\\Models\\User', 49),
(2, 'App\\Models\\User', 50),
(2, 'App\\Models\\User', 51),
(2, 'App\\Models\\User', 52),
(2, 'App\\Models\\User', 53),
(2, 'App\\Models\\User', 54),
(2, 'App\\Models\\User', 55),
(2, 'App\\Models\\User', 56),
(2, 'App\\Models\\User', 57),
(2, 'App\\Models\\User', 58),
(2, 'App\\Models\\User', 59),
(2, 'App\\Models\\User', 60),
(2, 'App\\Models\\User', 61),
(2, 'App\\Models\\User', 62),
(2, 'App\\Models\\User', 63),
(2, 'App\\Models\\User', 64),
(2, 'App\\Models\\User', 65),
(2, 'App\\Models\\User', 66),
(2, 'App\\Models\\User', 67),
(2, 'App\\Models\\User', 68),
(2, 'App\\Models\\User', 69),
(2, 'App\\Models\\User', 70),
(2, 'App\\Models\\User', 71),
(2, 'App\\Models\\User', 72),
(2, 'App\\Models\\User', 73),
(2, 'App\\Models\\User', 74);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `total_price` bigint UNSIGNED NOT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_method` smallint UNSIGNED NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `shipping_fee` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `code`, `user_id`, `total_price`, `note`, `user_name`, `phone`, `address`, `payment_method`, `status`, `message`, `shipping_fee`, `created_at`, `updated_at`) VALUES
(2, 'MB1P1735286955JX', 1, 40446000, 'Giao hàng nhanh nhất có thể.', 'Nguyễn Văn A', '0972842548', '123 Đường ABC, Quận 1, TP.HCM', 0, 1, 'Cảm ơn đã phục vụ!', 0.00, NULL, NULL),
(3, 'MB1P1735287093YV', 1, 40446000, 'Giao hàng nhanh nhất có thể.', 'Nguyễn Văn A', '0972842548', '123 Đường ABC, Quận 1, TP.HCM', 0, 5, 'Cảm ơn đã phục vụ!', 0.00, '2024-04-18 17:18:00', NULL),
(4, 'DT-DVL-676E796C85FBE', 68, 6932500, 'Rerum veritatis rerum illum error facere distinctio dolorum accusamus.', 'Murphy Schowalter Sr.', '+1 (409) 542-3713', '260 Ottilie Hollow\nNew Linda, NE 03807', 1, 2, 'Excepturi minima consequatur laborum animi quae sed.', 10108.00, '2024-12-15 02:54:52', '2024-12-27 02:54:52'),
(5, 'DT-DVL-676E796C8FA09', 68, 27510509, 'Officia accusantium ut similique illum.', 'Cleo Kling', '1-484-771-9244', '88181 Jess Alley Suite 332\nMarcelinohaven, IL 32114-8165', 0, 5, 'Nisi vero est inventore illo quam aut.', 11738.00, '2024-12-01 02:54:52', '2024-12-27 02:54:52'),
(6, 'DT-DVL-676E796C91902', 13, 34589732, 'Ex eligendi eos aut aliquam.', 'Elisha Schaefer', '+1-726-236-4539', '896 Emmerich Circles Suite 199\nAdalineborough, TX 97562-6037', 0, 3, 'Ea est optio voluptas aut quia et.', 13258.00, '2024-11-28 02:54:52', '2024-12-27 02:54:52'),
(7, 'DT-DVL-676E796C92C21', 49, 2044729, 'Neque rerum modi qui deleniti delectus et laboriosam.', 'Mr. Hermann Kilback DVM', '+1-726-496-1932', '72012 Zack Falls Suite 384\nNew Garnet, AK 86124-9406', 1, 1, 'Sapiente error qui rerum dolorum.', 10792.00, '2024-12-02 02:54:52', '2024-12-27 02:54:52'),
(8, 'DT-DVL-676E796C93F64', 11, 49015603, 'Laudantium eius est non maiores numquam corrupti iure.', 'Dr. Adalberto Gerlach Jr.', '+1.573.561.1522', '393 Diana Run\nStoltenbergborough, VT 03515-1694', 0, 5, 'In aliquid aliquid reprehenderit eos.', 13621.00, '2024-12-05 02:54:52', '2024-12-27 02:54:52'),
(9, 'DT-DVL-676E796C952C5', 25, 6205664, 'Et at consequatur id quae et deserunt ipsum omnis.', 'Lucas Mosciski', '+1-831-388-6448', '374 Dooley Mission Suite 445\nWest Mollie, DC 75787-1638', 2, 2, 'Dignissimos sit ratione vitae ad animi exercitationem.', 14881.00, '2024-12-09 02:54:52', '2024-12-27 02:54:52'),
(10, 'DT-DVL-676E796C9642D', 42, 4193570, 'Aut laboriosam ea distinctio.', 'Shana Paucek IV', '270.408.6196', '8657 Harvey Parks Apt. 660\nNorth Pamelahaven, WV 10290', 2, 1, 'Ut minus eaque distinctio ducimus.', 17472.00, '2024-11-29 02:54:52', '2024-12-27 02:54:52'),
(11, 'DT-DVL-676E796C97A25', 36, 40741385, 'Necessitatibus nemo recusandae suscipit eligendi commodi delectus.', 'Edythe Crooks DVM', '1-430-472-7893', '31393 Maya Park\nKarianneberg, DE 80641', 0, 1, 'Sit et voluptas praesentium atque.', 11210.00, '2024-12-27 02:54:52', '2024-12-27 02:54:52'),
(12, 'DT-DVL-676E796C98C33', 41, 14970514, 'Nulla soluta similique similique culpa mollitia.', 'Mrs. Bernice Gutkowski', '+1.315.493.8842', '285 Haley Cliff\nNorth Lilianaside, NH 20333', 0, 3, 'Eligendi dolores aliquid iste officia quia temporibus veniam.', 10256.00, '2024-12-04 02:54:52', '2024-12-27 02:54:52'),
(13, 'DT-DVL-676E796C9A97E', 41, 30364158, 'Sequi a dolorum fugit a possimus veniam explicabo.', 'Keegan Murphy', '623.729.3458', '95250 Helmer Overpass\nWest Kielhaven, KY 10438-9075', 0, 4, 'Optio aut minima aliquam.', 10495.00, '2024-11-27 02:54:52', '2024-12-27 02:54:52'),
(14, 'DT-DVL-676E796C9C84D', 57, 46017654, 'Beatae et aperiam deleniti laudantium animi facere.', 'Dr. Watson Mueller DVM', '1-313-681-9118', '668 Judson Grove\nEmmerichmouth, AK 47271', 0, 5, 'Natus rerum voluptatem officiis nemo est voluptas eveniet.', 12641.00, '2024-12-23 02:54:52', '2024-12-27 02:54:52'),
(15, 'DT-DVL-676E796C9E4FB', 41, 74953605, 'Architecto expedita et nihil culpa accusantium fugiat dolor.', 'Christian Krajcik', '1-870-553-2029', '6114 Rempel Drives Suite 618\nVeumside, OH 16931-4810', 0, 4, 'Quaerat id beatae placeat consequatur enim quas.', 17678.00, '2024-12-18 02:54:52', '2024-12-27 02:54:52'),
(16, 'DT-DVL-676E796CA0303', 66, 16015735, 'Expedita ducimus maiores rerum corrupti magnam voluptatibus qui.', 'Immanuel Pacocha IV', '(360) 774-4563', '4924 McCullough Viaduct\nLoganmouth, MT 09749', 2, 4, 'Maiores reprehenderit et a et enim.', 19814.00, '2024-11-29 02:54:52', '2024-12-27 02:54:52'),
(17, 'DT-DVL-676E796CA1F3E', 26, 10344546, 'Aut consequatur est cupiditate et dicta quia ad.', 'Dillon Lueilwitz', '(435) 564-4207', '192 Krystel Flat Suite 917\nGersonbury, VA 79140-0785', 1, 5, 'Aut libero sapiente officia modi eaque rem.', 16429.00, '2024-12-18 02:54:52', '2024-12-27 02:54:52'),
(18, 'DT-DVL-676E796CA3ACD', 28, 5216761, 'Consequuntur ut et expedita aut itaque tenetur quo.', 'Dallin DuBuque', '+1-718-743-8289', '2082 Wilderman Prairie Suite 693\nNorth Domenickfort, FL 75571-2175', 1, 3, 'Sint corporis quos amet vitae veniam nam et.', 17599.00, '2024-12-11 02:54:52', '2024-12-27 02:54:52'),
(19, 'DT-DVL-676E796CA4E7D', 23, 10342773, 'Id eum itaque quae tempore quasi.', 'Moises Nolan III', '1-872-641-2149', '8813 Ruecker Prairie\nNorth Manuelaport, MN 17393', 1, 2, 'Consectetur assumenda autem quidem nulla excepturi officiis.', 11103.00, '2024-11-30 02:54:52', '2024-12-27 02:54:52'),
(20, 'DT-DVL-676E796CA5C90', 49, 11645818, 'Praesentium adipisci et odio.', 'Raul Bergstrom', '(551) 438-7071', '5495 Kunze Falls Suite 141\nKohlerbury, MA 25879-0314', 2, 2, 'Esse assumenda sunt rerum perferendis illo.', 12380.00, '2024-12-10 02:54:52', '2024-12-27 02:54:52'),
(21, 'DT-DVL-676E796CA6B33', 66, 7297433, 'Rerum eum voluptatem corrupti magni adipisci rerum.', 'Tracey Schiller', '+1 (724) 874-8459', '17480 Willie Mission\nNorth Lysanne, IA 21285-1496', 2, 2, 'Placeat labore explicabo impedit iusto.', 11502.00, '2024-12-05 02:54:52', '2024-12-27 02:54:52'),
(22, 'DT-DVL-676E796CA7BD2', 5, 15145528, 'Enim eos ut eaque expedita.', 'Prof. Theron Abshire II', '1-940-487-3546', '1406 Von Ways Apt. 889\nLake Kenny, NY 92555', 2, 1, 'Totam deleniti rerum beatae ipsa non ex.', 18551.00, '2024-12-24 02:54:52', '2024-12-27 02:54:52'),
(23, 'DT-DVL-676E796CA9356', 66, 32852058, 'Eligendi et suscipit ut.', 'Hal West', '+1.719.854.0951', '82774 Carmelo Plaza Apt. 652\nEast Jayne, CA 32952-3083', 2, 1, 'Cupiditate quod rem consequatur incidunt voluptatem vel.', 17306.00, '2024-12-23 02:54:52', '2024-12-27 02:54:52'),
(25, 'MB1P1742049651LX', 1, 260000, '', 'admin', '0944433346', '123 Đường ABC, Quận 1, HN', 1, 0, '', 20000.00, NULL, NULL),
(26, 'MB1P1742050229GU', 1, 140000, '', 'admin', '0972843355', '123 Đường ABC, Quận 1, HN', 1, 0, '', 20000.00, NULL, NULL),
(27, 'MB1P1742050297OE', 1, 20222, '', 'admin', '0972843355', '123 Đường ABC, Quận 1, HN', 1, 0, '', 20000.00, NULL, NULL),
(28, 'MB1P1742050397RP', 1, 20222, '', 'admin', '0972843355', '123 Đường ABC, Quận 1, HN', 1, 0, '', 20000.00, NULL, NULL),
(29, 'MB1P1742050998MH', 1, 140000, '', 'admin', '0972843355', '123 Đường ABC, Quận 1, HN', 1, 0, '', 20000.00, NULL, NULL),
(30, 'MB1P1742051067WY', 1, 20444, '', 'admin', '0972843355', '123 Đường ABC, Quận 1, HN', 1, 0, '', 20000.00, NULL, NULL),
(31, 'MB1P1742051334YN', 1, 20222, '', 'admin', '0972843355', '123 Đường ABC, Quận 1, HN', 0, 5, '', 20000.00, NULL, NULL),
(32, 'MB1P1742270505TG', 1, 140000, '', 'admin', '0972843355', '123 Đường ABC, Quận 1, HN', 1, 0, '', 20000.00, NULL, NULL),
(33, 'MB1P1742270877VW', 1, 140000, '', 'admin', '0972843355', '123 Đường ABC, Quận 1, HN', 1, 0, '', 20000.00, NULL, NULL),
(34, 'MB1P1742271524ZH', 1, 15720000, '', 'admin', '0972843355', '123 Đường ABC, Quận 1, HN', 0, 1, '', 20000.00, NULL, NULL),
(35, 'MB1P1742271903VX', 1, 140000, '', 'admin', '0972843355', '123 Đường ABC, Quận 1, HN', 1, 0, '', 20000.00, '2025-03-17 21:25:03', '2025-03-17 21:25:03'),
(36, 'MB1P1742271930MJ', 1, 7870000, '', 'admin', '0972843355', '123 Đường ABC, Quận 1, HN', 0, 5, '', 20000.00, '2025-03-17 21:25:30', '2025-03-17 21:25:30');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_hex_id` bigint UNSIGNED NOT NULL,
  `discount` int DEFAULT NULL,
  `size_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `price` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_hex_id`, `discount`, `size_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(47, 3, 44, 20, 46, 2, 10000, NULL, NULL),
(48, 3, 48, NULL, 48, 2, 15000, NULL, NULL),
(50, 25, 45, NULL, 46, 2, 120000, NULL, NULL),
(51, 26, 45, NULL, 46, 1, 120000, NULL, NULL),
(52, 27, 51, NULL, 47, 1, 222, NULL, NULL),
(53, 28, 51, NULL, 47, 1, 222, NULL, NULL),
(54, 29, 45, NULL, 46, 1, 120000, NULL, NULL),
(55, 30, 51, NULL, 47, 2, 222, NULL, NULL),
(56, 31, 51, NULL, 47, 1, 222, NULL, NULL),
(57, 32, 45, NULL, 46, 1, 120000, NULL, NULL),
(58, 33, 45, NULL, 46, 1, 120000, NULL, NULL),
(59, 34, 44, NULL, 41, 2, 7850000, NULL, NULL),
(60, 35, 45, NULL, 46, 1, 120000, NULL, NULL),
(61, 36, 44, NULL, 41, 1, 7850000, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('admin@gmail.com', '$2y$12$iEhcgCfk.2joee13PwhGk.1/bro.4O8j/APT0lOGBCBaxYuy6/PGy', '2025-01-11 06:15:31');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'manage users', 'web', '2024-12-27 02:42:03', '2024-12-27 02:42:03'),
(2, 'view content', 'web', '2024-12-27 02:42:03', '2024-12-27 02:42:03');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'authToken', '82f6222f961ac74404f444e4de1b7db5c3ed7407602580b64b664ad3d636656c', '[\"*\"]', '2024-12-27 01:21:44', NULL, '2024-12-23 01:43:34', '2024-12-27 01:21:44'),
(2, 'App\\Models\\User', 1, 'authToken', 'e764c1652a2f162984a44e52883944a7472687eb1b54a9d8adfbdefc32de0a3e', '[\"*\"]', NULL, NULL, '2025-02-10 20:37:42', '2025-02-10 20:37:42'),
(3, 'App\\Models\\User', 1, 'authToken', '0ca69c755bb09d48092772f28f6c65dbed26873096ba958ebf83a072db22d223', '[\"*\"]', NULL, NULL, '2025-02-10 20:39:37', '2025-02-10 20:39:37'),
(4, 'App\\Models\\User', 1, 'authToken', 'cf8e1751b29cb4e4dd2bd52942be55a9c62953e4a8ae6d4cf1974546d1006307', '[\"*\"]', NULL, NULL, '2025-02-10 20:52:58', '2025-02-10 20:52:58'),
(5, 'App\\Models\\User', 1, 'authToken', '38eadfd3a9306bbfa9e19552c0e1cc991b86d80711a02f495557b4847629927a', '[\"*\"]', NULL, NULL, '2025-03-05 20:07:33', '2025-03-05 20:07:33'),
(6, 'App\\Models\\User', 1, 'authToken', 'c67ff7b897f8f60715b108002c58b6d5a8d698c49d416b8999ca9ef9ad2b3470', '[\"*\"]', NULL, NULL, '2025-03-12 03:06:40', '2025-03-12 03:06:40'),
(7, 'App\\Models\\User', 1, 'authToken', '0476c8b76e7c2c7e6be9eff0cf85fd32f999b1f73f07da62c35848959bf70238', '[\"*\"]', NULL, NULL, '2025-03-12 03:40:58', '2025-03-12 03:40:58');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `discount` int DEFAULT NULL,
  `set_category_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `info`, `description`, `discount`, `set_category_id`, `created_at`, `updated_at`) VALUES
(48, 'Bàn Ăn Cao Cấp Calliope LHBA02 – Mặt Đá Ceramic Sang Trọng', NULL, NULL, NULL, 3, NULL, NULL),
(49, 'Bàn Trà Đôi Chiếc Lá LHBTDC - Bàn Trà Gỗ MDF Vân Óc Chó Sang Trọng', NULL, NULL, 20, 3, NULL, NULL),
(50, 'Bàn Trà Đôi LHBT03 - Thiết Kế Hiện Đại Với Mặt Đá Ceramic Và Kính Cao Cấp', NULL, NULL, NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_hex`
--

CREATE TABLE `product_hex` (
  `id` bigint UNSIGNED NOT NULL,
  `hex_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_hex`
--

INSERT INTO `product_hex` (`id`, `hex_code`, `product_id`, `created_at`, `updated_at`) VALUES
(44, 'LHBA02', 48, NULL, NULL),
(45, 'LHBT03 ', 49, NULL, NULL),
(46, 'LHBT07', 49, NULL, NULL),
(47, 'LHBT08 ', 49, NULL, NULL),
(48, 'LHBT00', 49, NULL, NULL),
(51, 'R381', 50, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_sizes`
--

CREATE TABLE `product_sizes` (
  `id` bigint UNSIGNED NOT NULL,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `product_hex_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_sizes`
--

INSERT INTO `product_sizes` (`id`, `size`, `price`, `stock`, `product_hex_id`, `created_at`, `updated_at`) VALUES
(41, '1400*800*750', 7850000, 4, 44, NULL, NULL),
(42, '20x30', 20000, 5, 48, NULL, NULL),
(43, '30x40', 9990000, 5, 46, NULL, NULL),
(46, '20X30 CANVAS', 150000, 22, 45, NULL, NULL),
(47, '30x40', 222, 222, 51, NULL, NULL),
(48, '20X60 CANVAS', 150000, 22, 48, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `rating` int NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', NULL, NULL),
(2, 'member', 'web', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `setcategories`
--

CREATE TABLE `setcategories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `set_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `setcategories`
--

INSERT INTO `setcategories` (`id`, `name`, `set_id`, `created_at`, `updated_at`) VALUES
(1, 'Bàn Trang Điểm', 1, NULL, NULL),
(3, 'Bàn Ăn Cao Cấp', 2, NULL, NULL),
(5, 'Bàn Sân Vườn', 3, NULL, NULL),
(6, 'Bàn Nhôm Đúc', 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sets`
--

CREATE TABLE `sets` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sets`
--

INSERT INTO `sets` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Nội thất phòng ngủ', NULL, NULL),
(2, 'Nội thất phòng bếp', NULL, NULL),
(3, 'Nội thất ngoài trời', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avt_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `phone`, `address`, `avt_url`, `google_id`) VALUES
(1, 'admin', 'admin@gmail.com', NULL, '$2y$12$S3mQf/3FOhH3ckGR0DLuFet1eebvB90jW9W/s0UI4kBRdoTnmEpP2', 'd7330d612f668b64be4d7c73d7b02a05c377014106a4f2c82a81632f8f1d686e', NULL, '2025-03-17 01:52:43', '0972843355', '123 Đường ABC, Quận 1, HN', 'https://th.bing.com/th/id/OIP.uH87AuhxWgRr9AyXhGPaEgHaHW?w=178&h=180&c=7&r=0&o=5&pid=1.7', NULL),
(2, 'Trever Koss', 'nguyenhoathpt03@gmail.com', NULL, '$2y$12$bFl6qi2FeJGB71vBupr4fej.t75v6a9SPPgVxVtEZ8Yi5rehtCOgu', NULL, '2024-11-22 06:19:23', '2025-03-17 01:51:51', '+1-708-626-6150', NULL, NULL, NULL),
(3, 'Carlos Cronin DVM', 'xking@example.net', NULL, '$2y$12$9ZoqcvieCabypji3jzGmF.zGWzCm.zGMxmVkAuGrMOKitukku.MNy', NULL, '2024-11-29 05:05:21', '2024-12-27 02:46:50', '+1-858-639-4342', NULL, NULL, NULL),
(4, 'Austin Zboncak', 'demarco.price@example.org', NULL, '$2y$12$3oNhDKgvlXKfMh91.ZDxqO6BWFn0xdMtVF3AuJCqjeT6kwBdsm/4G', NULL, '2024-12-20 12:54:26', '2024-12-27 02:46:50', '(717) 544-0637', NULL, NULL, NULL),
(5, 'Noemy Bosco', 'wisoky.dennis@example.com', NULL, '$2y$12$EaG9oh0HYPqha5gapPyo6.iqgbbK53BVLqtAzPC8Xb6Zi.TPEiv7G', NULL, '2024-11-13 15:59:45', '2024-12-27 02:46:50', '320.250.7047', NULL, NULL, NULL),
(6, 'Devyn Nitzsche', 'dortha83@example.com', NULL, '$2y$12$Cg7ay.Kx7g7/8sBUa787l.xFth0lcthUmSWkC83gdDqi/iimJcFsy', NULL, '2024-11-01 17:33:08', '2024-12-27 02:46:51', '+1-810-529-1457', NULL, NULL, NULL),
(7, 'Fay Effertz', 'ehaag@example.com', NULL, '$2y$12$citEY9fjDoFy6llGlHxF8u4gcTbusFTdiaL6GtPUDpQBo0UZa8CNK', NULL, '2024-12-24 00:07:58', '2024-12-27 02:47:07', '+1-458-233-5163', NULL, NULL, NULL),
(8, 'Joanne Vandervort Jr.', 'angelita02@example.net', NULL, '$2y$12$7MRT9iGcjRKZy2/bAoAhieB0Yldj1sJL7vElk2gHyejoIYy7b1RKm', NULL, '2024-12-14 20:44:30', '2024-12-27 02:47:07', '1-763-485-3550', NULL, NULL, NULL),
(9, 'Dr. Luna Weber', 'javonte81@example.net', NULL, '$2y$12$ZST9em4P.69Jfj4wA.e3UOiUqSXQEpJQA4lSvr/A0Y8.credpuSke', NULL, '2024-12-16 23:28:54', '2024-12-27 02:47:08', '+18472818367', NULL, NULL, NULL),
(10, 'Miles Schaden MD', 'cordell11@example.org', NULL, '$2y$12$S.QV26R0c4HBt7fjat5HjO9cGCwNBhRN3Xg0NSA3eKglc2X8nFt.G', NULL, '2024-11-30 10:03:34', '2024-12-27 02:47:08', '(276) 709-3311', NULL, NULL, NULL),
(11, 'Name Stark', 'fhand@example.com', NULL, '$2y$12$f3dpuSQ4eAaUp59JE6t06.vdmJk4.OVJqXa7Olfdu9fUE790B.u6G', NULL, '2024-10-31 08:04:11', '2024-12-27 02:47:08', '620-266-2352', NULL, NULL, NULL),
(12, 'Leland Donnelly I', 'fabiola77@example.org', NULL, '$2y$12$YlHpWnDiaU9//6gbZvzI7Oadqq5KoOgT.74HnBeYBqmit9HtekivO', NULL, '2024-12-04 12:23:54', '2024-12-27 02:47:08', '662.626.1245', NULL, NULL, NULL),
(13, 'Moses Leannon', 'schaefer.kelton@example.net', NULL, '$2y$12$HwVCpMITjBGb/NXZAr914e4aQGf3nNwL8oHi0QmtapiL.sc1Xy5Ia', NULL, '2024-12-13 11:29:08', '2024-12-27 02:47:09', '+17314133622', NULL, NULL, NULL),
(14, 'Nikko Botsford', 'morton06@example.net', NULL, '$2y$12$08xwDaFO.od2errumlYKDejC8JDkqNvn7lLPPXQQ9qnJ5CcA/WB96', NULL, '2024-10-11 06:25:19', '2024-12-27 02:47:09', '262-703-1287', NULL, NULL, NULL),
(15, 'Jamar Pacocha', 'turner.kristin@example.net', NULL, '$2y$12$3JKlrK.H3RKBQChx8HDAFu1T3GgEaLkmPImyt3UuipYvblV2Lmzdi', NULL, '2024-10-21 19:21:47', '2024-12-27 02:47:09', '662-831-3545', NULL, NULL, NULL),
(16, 'Maryjane Homenick', 'idaniel@example.com', NULL, '$2y$12$P.43RfywfK1ErmdSpd.wZOt3uANe442/vomdTA7gbGHdJyLtKySAe', NULL, '2024-11-26 12:30:12', '2024-12-27 02:47:09', '(660) 515-8820', NULL, NULL, NULL),
(17, 'Emmalee Hauck', 'nschmeler@example.net', NULL, '$2y$12$Xois4EED9Y6q7pcbXpZTNeNpWmJpLssem95RdJ0/3iSW3kJdjlbD.', NULL, '2024-12-22 05:03:08', '2024-12-27 02:47:10', '+1-515-474-0307', NULL, NULL, NULL),
(18, 'Marcos Rogahn', 'kunde.juvenal@example.net', NULL, '$2y$12$OLtCuqg30oaxmhOwcMghDO87MzaRS2wCgbGs359tiP9BislY3MDBK', NULL, '2024-12-10 04:46:45', '2024-12-27 02:47:10', '(283) 917-2235', NULL, NULL, NULL),
(19, 'Miss Daphne Brown II', 'demario71@example.com', NULL, '$2y$12$aSz5wCeXdSGTGG6RtmeQkuVnABERm3ZG/5YVD5FwEGWoLBKVFJo..', NULL, '2024-11-19 10:33:50', '2024-12-27 02:47:10', '+1-857-741-8069', NULL, NULL, NULL),
(20, 'Joseph Dickens', 'hilma37@example.org', NULL, '$2y$12$Kl2tZP7V018SXjhXfn1vV.04XVblRoW81WQljQBH1Exr6aDEc7Wu2', NULL, '2024-12-19 21:36:04', '2024-12-27 02:47:11', '708.310.4436', NULL, NULL, NULL),
(21, 'Theron Dibbert', 'wintheiser.brionna@example.net', NULL, '$2y$12$pNOuN.TAeOBMLeWcMqIdpeHRQZi0yvx2P9EBfCO0DNi9j14l7LWo6', NULL, '2024-11-24 08:48:39', '2024-12-27 02:47:11', '+14073343056', NULL, NULL, NULL),
(22, 'Loren Kris', 'zulauf.keara@example.net', NULL, '$2y$12$kBdCRmG1kVKIWY4hYsH2WuAfJXCTv3G83Gh1Eh2HPJWozGAN97rsC', NULL, '2024-11-14 13:05:46', '2024-12-27 02:47:11', '571.412.6344', NULL, NULL, NULL),
(23, 'Dr. Dayna Gutkowski PhD', 'delmer.mcdermott@example.org', NULL, '$2y$12$iG2fiNth91KPKffjeiTcDew/LTjwoCi2pgcygh1gfb1CbvjscTN7K', NULL, '2024-10-31 08:13:54', '2024-12-27 02:47:11', '1-341-641-7437', NULL, NULL, NULL),
(24, 'Dr. Joan Lang DVM', 'wolff.reece@example.net', NULL, '$2y$12$qYYaXwBi0GDtYPDyHZczrujWDmT8e8syJOLfsLSN3aMmnmxeQm0kO', NULL, '2024-12-03 22:39:52', '2024-12-27 02:48:12', '1-360-343-3553', NULL, NULL, NULL),
(25, 'Marilou Hickle', 'jacobson.justen@example.net', NULL, '$2y$12$rvM.f6w5HRucYd3AhIBN9ude5wdbV2o1Mlo2JrNRs/AFZPk0opuse', NULL, '2024-11-22 23:51:52', '2024-12-27 02:48:13', '+1 (919) 732-5206', NULL, NULL, NULL),
(26, 'Lourdes West', 'ustoltenberg@example.net', NULL, '$2y$12$iD2Js0nf54S6NnRLkFmDD.rDOg3eAjwfYF9/5ai6qr9u3hEFENraq', NULL, '2024-10-29 13:55:19', '2024-12-27 02:48:13', '1-332-996-9783', NULL, NULL, NULL),
(27, 'Otis Cummerata', 'ngreen@example.org', NULL, '$2y$12$GYRE4QqWqCceUq.U/7g.JOAzYvVqY/ElZo6QtZGmYHTGStgdZqxEW', NULL, '2024-10-29 20:59:57', '2024-12-27 02:48:13', '(808) 290-7275', NULL, NULL, NULL),
(28, 'Marcelo Huel', 'abagail.raynor@example.com', NULL, '$2y$12$KVyk2uAdxA1X.5cyVgrQl.f846voVW.DR8hjPkDfHlu.BCIinqHhS', NULL, '2024-11-07 19:07:24', '2024-12-27 02:48:13', '+1-812-307-6799', NULL, NULL, NULL),
(29, 'Solon Gusikowski', 'zechariah10@example.com', NULL, '$2y$12$VjOJFBpd9i1zJS9exrl6Hu7nwTxzb1wONZyL8Rbyy1TSSEsuMC6XS', NULL, '2024-12-25 07:30:46', '2024-12-27 02:48:14', '+13412014035', NULL, NULL, NULL),
(30, 'Amelie Moore', 'jeramy24@example.com', NULL, '$2y$12$p/HPLqOso0lwb6RA9/16Z.6wPDVBEHDCvELIMs8o95WH9wCGuEqnm', NULL, '2024-11-14 14:23:19', '2024-12-27 02:48:14', '(515) 716-7391', NULL, NULL, NULL),
(31, 'Cathrine Schinner', 'sauer.nikita@example.com', NULL, '$2y$12$0D9UIwHOlVZNaS4Rmaxwj.BxYE/34sz1WsWht.PeSI97NVYZMpNG6', NULL, '2024-10-09 15:39:01', '2024-12-27 02:48:14', '+1.269.275.7347', NULL, NULL, NULL),
(32, 'Ms. Carissa Smitham Jr.', 'wterry@example.org', NULL, '$2y$12$kdnm6mWlpSst4YwNkHqWt.1uMKR4uCA8eBDYUz3DfNU.brNiJT0Cu', NULL, '2024-11-03 23:47:19', '2024-12-27 02:48:15', '(283) 665-2670', NULL, NULL, NULL),
(33, 'Alivia Rohan DDS', 'scot.wehner@example.net', NULL, '$2y$12$Q7ihj1Rz3An.FKOooVyohO1MXI7hE2jpW/VRE6HXFdRjX5kEqH02C', NULL, '2024-10-18 12:44:34', '2024-12-27 02:48:15', '1-754-928-7776', NULL, NULL, NULL),
(34, 'Philip Wintheiser III', 'harvey.aliya@example.net', NULL, '$2y$12$qMILvrMzGFIe4b.FX/NAAeykriEA1NHZzXbSZ3Ft42azmCC9HO9uW', NULL, '2024-12-09 20:59:20', '2024-12-27 02:48:15', '820-350-5247', NULL, NULL, NULL),
(35, 'Lera Oberbrunner', 'owiza@example.com', NULL, '$2y$12$qhGQIdNNZhXnOkOrY9QVwOS8XQHhDtcB6ifVG2rSGxE8T3KuBkzm.', NULL, '2024-11-21 20:09:47', '2024-12-27 02:48:15', '(857) 452-1159', NULL, NULL, NULL),
(36, 'Mr. Demarco Koelpin Jr.', 'qprohaska@example.net', NULL, '$2y$12$Ic6Bfu5mfxRlrGGqsyhMOu0A3in71ob6f8VDrnNz06YjpScK5A/6m', NULL, '2024-10-14 16:42:47', '2024-12-27 02:48:16', '1-607-271-5574', NULL, NULL, NULL),
(37, 'Mr. Jacques Strosin', 'pstroman@example.org', NULL, '$2y$12$APGL9vaBREM5ooL3AmtHOuJgQpAB1UKcLEG4pqMdg2aW5z0s11rJ.', NULL, '2024-10-20 02:06:34', '2024-12-27 02:48:16', '757.428.5017', NULL, NULL, NULL),
(38, 'Sister West', 'dubuque.alize@example.com', NULL, '$2y$12$KP7lwBzYToV2vDs.W1QC.uBZdlRtB4P/TUqxmr.sCf9TPSfg3uTVm', NULL, '2024-12-20 20:59:07', '2024-12-27 02:48:16', '(310) 217-0669', NULL, NULL, NULL),
(39, 'Else Emmerich', 'ernie.sporer@example.com', NULL, '$2y$12$4QvTjZ6SwaBomV6WytQz0eIWL32J50RbPrcKdDyr4i7I9RuIKmXVy', NULL, '2024-12-11 10:09:11', '2024-12-27 02:48:16', '678.542.7047', NULL, NULL, NULL),
(40, 'Cristopher Hessel', 'lwatsica@example.org', NULL, '$2y$12$xNGnRhDcOU0dutrboiy8IOwo1yat84NZmgf8ZXSPszppsO/OjObIi', NULL, '2024-12-20 20:34:52', '2024-12-27 02:48:17', '+1 (202) 710-7636', NULL, NULL, NULL),
(41, 'Wendy Roberts', 'predovic.twila@example.com', NULL, '$2y$12$9qCUNzIsLyr3fMp6etl48u92GmEJA/0GtnmR7SRh6QoXz.c8dkuWS', NULL, '2024-11-07 08:04:23', '2024-12-27 02:48:17', '+13612337715', NULL, NULL, NULL),
(42, 'Dr. Lonie Gislason Jr.', 'lbeahan@example.org', NULL, '$2y$12$k8B3X8l1Xq1TtMIRI7tmve8OgzGUJ/3.zgkVz9MdeQ6bffeiqb56y', NULL, '2024-11-02 11:21:39', '2024-12-27 02:48:17', '+1-850-773-2935', NULL, NULL, NULL),
(43, 'Mauricio Smith', 'kvolkman@example.com', NULL, '$2y$12$PIqPsupu0D4rSxErXUhRmuvQUSLiZC2KAQ.0XPi7nSD.iYj1wJVVq', NULL, '2024-10-22 04:37:44', '2024-12-27 02:48:17', '+1-586-302-2981', NULL, NULL, NULL),
(44, 'Reuben Lubowitz', 'mathew.mueller@example.net', NULL, '$2y$12$WGlGT8L.NdXulPdywNMwpe4c2emOQpd/FWZ4q/m5bZo9J7u9iJ/zu', NULL, '2024-10-26 22:25:56', '2024-12-27 02:48:18', '+1.210.748.6354', NULL, NULL, NULL),
(45, 'Estefania Paucek', 'lucie27@example.net', NULL, '$2y$12$cKGqVUyorQMZNOs9naoRV.pk7CoevKekABGMOjt7pxs5bTJSU0cMi', NULL, '2024-10-10 22:01:21', '2024-12-27 02:48:18', '(351) 809-9419', NULL, NULL, NULL),
(46, 'Graham Kunde', 'nbayer@example.com', NULL, '$2y$12$nCqDLCa4c5PeI8hNEQbdc.QmRHd45cJxuGkHgot.86bdGgyzpBr6i', NULL, '2024-12-12 19:25:13', '2024-12-27 02:48:18', '+1-408-499-6419', NULL, NULL, NULL),
(47, 'Mrs. Teagan Watsica', 'wunsch.brady@example.net', NULL, '$2y$12$PMOv.bmidj7jIq5yss8XSeWTtpVWvnk9tMziUwXZBceb08tRbRCL6', NULL, '2024-12-22 16:15:06', '2024-12-27 02:48:19', '+1.480.270.5844', NULL, NULL, NULL),
(48, 'Mr. Jeffry Weissnat Jr.', 'kdaniel@example.org', NULL, '$2y$12$ugjJHZfFD1ePKoEGJK1elO59EoRAo.h.zDpI960ZV9YO1STlBcM2i', NULL, '2024-10-11 00:19:11', '2024-12-27 02:48:19', '+1 (959) 243-1542', NULL, NULL, NULL),
(49, 'Ms. Helene Carter', 'frank.gutmann@example.com', NULL, '$2y$12$WrMQGgIPs5E3.tJ93/Bxle2JR8oFbFatmZQnNBU9ABagwk.VpLSqu', NULL, '2024-11-03 05:03:42', '2024-12-27 02:48:19', '+1-651-344-3009', NULL, NULL, NULL),
(50, 'Ines Braun', 'marlon.simonis@example.com', NULL, '$2y$12$tcb6dKRAtdWDQMcewvutYul4VGYw2oeaROOpRJKt/VhlHkYeLsuHG', NULL, '2024-12-02 02:22:46', '2024-12-27 02:48:19', '(432) 745-6109', NULL, NULL, NULL),
(51, 'Kyra Aufderhar', 'roxane54@example.org', NULL, '$2y$12$UXF7cfsVkuzoDWQam4X.0elhh9tC2ASk3LjA0yPB7x5Yd94jh0mDi', NULL, '2024-11-29 23:03:48', '2024-12-27 02:48:20', '+1 (828) 922-1942', NULL, NULL, NULL),
(52, 'Nicholaus Nitzsche', 'kianna33@example.org', NULL, '$2y$12$wwwrkGQ8gcGRwLngSH4WyOwmOaeDDakQZJNi9WOKnfqofKzNR7cQG', NULL, '2024-12-02 06:12:50', '2024-12-27 02:48:20', '+13852665149', NULL, NULL, NULL),
(53, 'Dr. Carmen McGlynn MD', 'bogan.solon@example.net', NULL, '$2y$12$D3T/2SU3rn6erpyJFQNVi.M4OHOh9e8pNMfZXFsEM1EZh3dolNJhK', NULL, '2024-11-25 08:53:12', '2024-12-27 02:48:20', '+1.859.397.6138', NULL, NULL, NULL),
(54, 'Jannie Wisozk', 'alexa74@example.net', NULL, '$2y$12$UVHW.JYa7C/v/d91YkAiiemEFfyKiYSlDwJCcyayjgoDbXHmi747a', NULL, '2024-10-12 18:45:24', '2024-12-27 02:48:20', '1-651-770-3034', NULL, NULL, NULL),
(55, 'Nathen Fahey', 'jchamplin@example.com', NULL, '$2y$12$Jvdnq1NMX5qz.KaoGW2LMuEUXKwexN9vJvC.A7fCyC6cDDkcSYSHy', NULL, '2024-10-28 10:34:57', '2024-12-27 02:48:21', '1-989-722-7530', NULL, NULL, NULL),
(56, 'Florencio Becker', 'jennifer00@example.com', NULL, '$2y$12$2a5ngLssHLlUS7qVxspNOOL0W.eYABDfLXkv9zMSSm4VALMSMQ1vy', NULL, '2024-12-21 02:37:36', '2024-12-27 02:48:21', '+12393823534', NULL, NULL, NULL),
(57, 'Bryce Mraz II', 'jbernhard@example.org', NULL, '$2y$12$oGcQP6Gi6JWXr8OQjMnG7usoBjO2H1s6NZFwwX6mNcKVbktUUm676', NULL, '2024-12-16 17:21:19', '2024-12-27 02:48:21', '435.854.0299', NULL, NULL, NULL),
(58, 'Zachary Nader II', 'ulindgren@example.net', NULL, '$2y$12$3AUafxy6lK5jG808UCVUyO1g3Xk3eViYIRtcUl7vCERrFgTBHMh0i', NULL, '2024-11-19 06:54:35', '2024-12-27 02:48:22', '331.810.0080', NULL, NULL, NULL),
(59, 'Mr. Rene Gottlieb PhD', 'whitney.nolan@example.com', NULL, '$2y$12$fzLAFoRVHDWdLeByHFjM7OBiyJxS4xiPUhlQorRghhejmjIig3l66', NULL, '2024-12-18 03:22:40', '2024-12-27 02:48:22', '662.878.8758', NULL, NULL, NULL),
(60, 'Muhammad Beahan', 'harber.lempi@example.org', NULL, '$2y$12$IIP1FqARDJDNwESyHTabz.8LVnT/FL4.pwsE.sXvjZW1YmFz2QLkO', NULL, '2024-11-04 19:20:02', '2024-12-27 02:48:22', '1-754-553-6821', NULL, NULL, NULL),
(61, 'Imani Hills', 'marisa.ernser@example.net', NULL, '$2y$12$avuFP72.t6vTJlCWMDz1QeSG.MXSia3IjX2Cx./GBmliW8qwLZVX2', NULL, '2024-10-24 06:57:20', '2024-12-27 02:48:22', '+1.562.664.0608', NULL, NULL, NULL),
(62, 'Cassidy Braun', 'earnest.aufderhar@example.com', NULL, '$2y$12$OzQ1gJn4bUjSoF0I3x6oteQ3gDsQPt.eALt.rdPjU.HEHRgbYkZLW', NULL, '2024-10-20 20:20:57', '2024-12-27 02:48:23', '+1-256-702-0914', NULL, NULL, NULL),
(63, 'Tyson Willms', 'volkman.ronny@example.org', NULL, '$2y$12$zSxpA2oC/aX.OZCko6TwxONcTKFPxCSa8hp2.HxlNUEUL.1XJw3Oy', NULL, '2024-12-02 12:43:03', '2024-12-27 02:48:23', '+16572926733', NULL, NULL, NULL),
(64, 'Bryana Hyatt', 'ottis78@example.org', NULL, '$2y$12$PNImKZvDYKjV5.jc/kHoculmKQI3J5h1Lj53RtJ1YBOAAIC5tfcBm', NULL, '2024-12-21 17:11:29', '2024-12-27 02:48:23', '623.850.3556', NULL, NULL, NULL),
(65, 'Prof. Freeda Hahn', 'carmel.wiza@example.org', NULL, '$2y$12$98yDUlMsG/v6WkiR5KhJuOPy6wlGraitnEDK/RC0FXIQxNh.CvitC', NULL, '2024-11-12 16:42:43', '2024-12-27 02:48:24', '1-531-796-7992', NULL, NULL, NULL),
(66, 'Ofelia Stroman II', 'harber.samanta@example.org', NULL, '$2y$12$iYfbs0rXwlN7vFvr0Fjn6.6AMpRi8/082.tZ1Xz6U52SGOuXNgLj2', NULL, '2024-12-02 09:17:32', '2024-12-27 02:48:24', '(360) 278-3613', NULL, NULL, NULL),
(67, 'Prof. Giovanna Emmerich Sr.', 'odessa.mann@example.net', NULL, '$2y$12$allmhaLZoy9ITCMXvYeEa.b/t.0vev/PM5rmLAjNfkz5Ppf8LyiEG', NULL, '2024-10-27 15:45:14', '2024-12-27 02:48:24', '1-848-546-0641', NULL, NULL, NULL),
(68, 'Michel Langosh', 'johan.cole@example.com', NULL, '$2y$12$dGlV47h5C8Ia6gHtwOKbXun6mj7iEgyE270LUaRoF/w4Lo4aXKHRe', NULL, '2024-11-14 04:30:24', '2024-12-27 02:48:24', '+1-908-492-9962', NULL, NULL, NULL),
(69, 'Juston Daniel', 'louie.williamson@example.com', NULL, '$2y$12$gqG99WiKv66Swht6AuyPH.9R.WXJ.qpJOnJFOm/a3vju3zegFNtFS', NULL, '2024-12-01 19:47:24', '2024-12-27 02:48:25', '(458) 633-0438', NULL, NULL, NULL),
(70, 'Stacy Pagac', 'von.ivy@example.org', NULL, '$2y$12$iyCVXICQzwoWgrDT6H1BhO1HkoEVg/7IEBPxL/ST9n9XAAhTpNdCy', NULL, '2024-10-16 08:06:58', '2024-12-27 02:48:25', '(765) 251-8214', NULL, NULL, NULL),
(71, 'Ted Keeling IV', 'julio.towne@example.net', NULL, '$2y$12$fwB0tafMHwPK.mLtVkfccOqnkKza1Bzt/eSPjGLZn3NHBZojLKmxe', NULL, '2024-10-15 15:15:44', '2024-12-27 02:48:25', '1-208-783-2567', NULL, NULL, NULL),
(72, 'Alycia Dach II', 'verna16@example.org', NULL, '$2y$12$1D3JwUsWTuBtzzb1AsRB6uq2rWri9H3F99pqkL.vj2cCLNbxpuQWW', NULL, '2024-12-17 06:40:15', '2024-12-27 02:48:25', '352.817.9813', NULL, NULL, NULL),
(73, 'Keshawn Abernathy', 'gust.conn@example.com', NULL, '$2y$12$w78NjO.mhh65Bo02seYdi.5.wkKPKADZVSy2NkEg/DZvRlTOISnLe', NULL, '2024-12-06 15:46:44', '2024-12-27 02:48:26', '(614) 821-9270', NULL, NULL, NULL),
(74, 'sep', 'sep21th03@gmail.com', NULL, '$2y$12$erMu0dyQu213OFIO6sSwBOyoflK2s110dkV6wtUollexcmxyJwCei', 'df9725c677712082fedf473e4c2620430e5434ccc54cba75bbe0380a0d8c70b6', '2025-03-17 00:47:49', '2025-03-17 00:47:49', '0972843435', 'TN', 'https://ui-avatars.com/api/?name=sep&background=random', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_product_hex_id_foreign` (`product_hex_id`),
  ADD KEY `carts_size_id_foreign` (`size_id`),
  ADD KEY `carts_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `galleries_product_hex_id_foreign` (`product_hex_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_code_unique` (`code`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_details_order_id_foreign` (`order_id`),
  ADD KEY `order_details_size_id_foreign` (`size_id`),
  ADD KEY `order_details_product_hex_id_foreign` (`product_hex_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_set_category_id_foreign` (`set_category_id`);

--
-- Indexes for table `product_hex`
--
ALTER TABLE `product_hex`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_hex_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_sizes_product_hex_id_foreign` (`product_hex_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_product_id_index` (`product_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `setcategories`
--
ALTER TABLE `setcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `setcategories_set_id_foreign` (`set_id`);

--
-- Indexes for table `sets`
--
ALTER TABLE `sets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_google_id_unique` (`google_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `product_hex`
--
ALTER TABLE `product_hex`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `setcategories`
--
ALTER TABLE `setcategories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sets`
--
ALTER TABLE `sets`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_product_hex_id_foreign` FOREIGN KEY (`product_hex_id`) REFERENCES `product_hex` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_size_id_foreign` FOREIGN KEY (`size_id`) REFERENCES `product_sizes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `galleries`
--
ALTER TABLE `galleries`
  ADD CONSTRAINT `galleries_product_hex_id_foreign` FOREIGN KEY (`product_hex_id`) REFERENCES `product_hex` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_product_hex_id_foreign` FOREIGN KEY (`product_hex_id`) REFERENCES `product_hex` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_size_id_foreign` FOREIGN KEY (`size_id`) REFERENCES `product_sizes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_set_category_id_foreign` FOREIGN KEY (`set_category_id`) REFERENCES `setcategories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_hex`
--
ALTER TABLE `product_hex`
  ADD CONSTRAINT `product_hex_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD CONSTRAINT `product_sizes_product_hex_id_foreign` FOREIGN KEY (`product_hex_id`) REFERENCES `product_hex` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `setcategories`
--
ALTER TABLE `setcategories`
  ADD CONSTRAINT `setcategories_set_id_foreign` FOREIGN KEY (`set_id`) REFERENCES `sets` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
