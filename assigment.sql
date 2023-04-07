-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 16, 2022 at 10:24 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assigment`
--

-- --------------------------------------------------------

--
-- Table structure for table `accommodation`
--

CREATE TABLE `accommodation` (
  `ID` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accommodation`
--

INSERT INTO `accommodation` (`ID`, `name`, `type`, `location`, `longitude`, `latitude`, `description`) VALUES
(1, 'Pikes Peak Inn', 'hotel', 'Colorado', -104.913, 38.8578, 'A nice place to stay'),
(2, 'Fireside Inn', 'BandB', 'Colorado', -106.045, 39.4821, 'A nice place to stay'),
(3, 'Fawlty Towers', 'hotel', 'Torquay', -3.4963, 50.4601, 'Classy hotel with charming owner'),
(4, 'The Boar Inn', 'pub', 'Hampshire', -1, 51, 'A nice place to stay'),
(5, 'The Dales Inn', 'pub', 'Yorkshire', -2.0462, 54.1465, 'A nice place to stay'),
(6, 'Jurys Inn', 'hotel', 'Hampshire', -1.401, 50.9106, 'A nice place to stay'),
(7, 'Premier Inn', 'hotel', 'Hampshire', -1.3985, 50.9071, 'A nice place to stay'),
(8, 'Hollands Wood', 'campsite', 'Hampshire', -1.57, 50.83, 'A nice place to stay'),
(9, 'Ashurst', 'campsite', 'Hampshire', -1.53, 50.887, 'A nice place to stay'),
(10, 'Hotel Mirto', 'hotel', 'Greece', 22.5023, 40.105, 'A nice place to stay');

-- --------------------------------------------------------

--
-- Table structure for table `acc_bookings`
--

CREATE TABLE `acc_bookings` (
  `ID` int(11) NOT NULL,
  `accID` int(11) DEFAULT NULL,
  `thedate` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `npeople` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `acc_dates`
--

CREATE TABLE `acc_dates` (
  `ID` int(11) NOT NULL,
  `accID` int(11) DEFAULT NULL,
  `thedate` int(11) DEFAULT NULL,
  `availability` int(11) DEFAULT 20
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `acc_dates`
--

INSERT INTO `acc_dates` (`ID`, `accID`, `thedate`, `availability`) VALUES
(1, 1, 220601, 20),
(2, 1, 220602, 20),
(3, 1, 220603, 20),
(4, 2, 220601, 20),
(5, 2, 220602, 20),
(6, 2, 220603, 20),
(7, 3, 220601, 20),
(8, 3, 220602, 20),
(9, 3, 220603, 20),
(10, 4, 220601, 20),
(11, 4, 220602, 20),
(12, 4, 220603, 20),
(13, 5, 220601, 20),
(14, 5, 220602, 20),
(15, 5, 220603, 20),
(16, 6, 220601, 20),
(17, 6, 220602, 20),
(18, 6, 220603, 20),
(19, 7, 220601, 20),
(20, 7, 220602, 20),
(21, 7, 220603, 20),
(22, 8, 220601, 20),
(23, 8, 220602, 20),
(24, 8, 220603, 20),
(25, 9, 220601, 20),
(26, 0, 220602, 20),
(27, 9, 220603, 0),
(28, 10, 220601, 20),
(29, 10, 220602, 20),
(30, 10, 220603, 20);

-- --------------------------------------------------------

--
-- Table structure for table `acc_users`
--

CREATE TABLE `acc_users` (
  `ID` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `admin` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `acc_users`
--

INSERT INTO `acc_users` (`ID`, `username`, `password`, `admin`) VALUES
(1, 'admin', 'admin123', 1),
(2, 'tim', 'tim123', 0),
(3, 'kate', 'kate123', 0),
(4, 'visithampshire', 'vh123', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accommodation`
--
ALTER TABLE `accommodation`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `acc_bookings`
--
ALTER TABLE `acc_bookings`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `acc_dates`
--
ALTER TABLE `acc_dates`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `acc_users`
--
ALTER TABLE `acc_users`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accommodation`
--
ALTER TABLE `accommodation`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `acc_bookings`
--
ALTER TABLE `acc_bookings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `acc_dates`
--
ALTER TABLE `acc_dates`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `acc_users`
--
ALTER TABLE `acc_users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
