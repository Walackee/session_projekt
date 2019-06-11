-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2019. Jún 09. 09:19
-- Kiszolgáló verziója: 10.1.39-MariaDB
-- PHP verzió: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `session_projekt`
--
CREATE DATABASE IF NOT EXISTS `session_projekt` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `session_projekt`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `password` varchar(80) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`) VALUES
(43, 'student@test.com', '$2b$10$yl6wM4Cq4Q1dtp/DymzNDOHIfwLz4OaVbpElScnt5wveWlcKNCMq6', 'student'),
(44, 'teacher@test.com', '$2b$10$oQtXTauTGUj05V3XCDt/P.0ga66Jhq.JGCuWNFqngAddsfAFAdPrO', 'teacher'),
(45, 'admin@test.com', '$2b$10$z.bmI2tFYzSWrWpA4lNiNOXV75DDdazY65PJxIiJnTefAEH3ltwgm', 'admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
