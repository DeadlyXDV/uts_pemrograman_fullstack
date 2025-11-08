-- Marcelo Jonathan Holle - 411222083
-- Database untuk Nusantara Flix - Platform Streaming Lokal

-- Membuat database
CREATE DATABASE IF NOT EXISTS nusantara_flix;
USE nusantara_flix;

-- Tabel untuk menyimpan data media (Film dan Series)
CREATE TABLE IF NOT EXISTS media (
    id_media INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    tipe ENUM('Film', 'Series') NOT NULL,
    tahun_rilis YEAR NOT NULL,
    genre VARCHAR(100) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
