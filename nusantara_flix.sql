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
    INDEX idx_tipe (tipe),
    INDEX idx_tahun_rilis (tahun_rilis),
    INDEX idx_genre (genre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert data contoh
INSERT INTO media (judul, tipe, tahun_rilis, genre) VALUES
('Pengabdi Setan 2: Communion', 'Film', 2022, 'Horror, Thriller'),
('Gundala', 'Film', 2019, 'Action, Superhero'),
('Keluarga Cemara', 'Film', 2019, 'Drama, Keluarga'),
('The Big 4', 'Film', 2022, 'Action, Comedy'),
('Rentang Kisah', 'Series', 2020, 'Drama, Romance'),
('Gadis Kretek', 'Series', 2023, 'Drama, Romance'),
('Perempuan Tanah Jahanam', 'Film', 2019, 'Horror'),
('Seperti Dendam, Rindu Harus Dibayar Tuntas', 'Film', 2021, 'Action, Thriller'),
('Ali & Ratu Ratu Queens', 'Film', 2021, 'Drama, Comedy'),
('Imperfect: Karier, Cinta & Timbangan', 'Series', 2019, 'Drama, Romance');

-- Query untuk melihat semua data
SELECT * FROM media;

-- Query untuk melihat hanya Film
SELECT * FROM media WHERE tipe = 'Film' ORDER BY tahun_rilis DESC;

-- Query untuk melihat hanya Series
SELECT * FROM media WHERE tipe = 'Series' ORDER BY tahun_rilis DESC;

-- Query untuk mencari media berdasarkan genre
SELECT * FROM media WHERE genre LIKE '%Horror%';

-- Query untuk update data media (contoh use case dari soal)
-- UPDATE media SET tahun_rilis = 2023, genre = 'Horror, Mystery' WHERE id_media = 1;
