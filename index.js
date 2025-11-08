// Marcelo Jonathan Holle - 411222083
// Nusantara Flix - Platform Streaming Lokal
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'nusantara_flix'
}).promise();

app.use(cors());
app.use(express.json());

// ====== READ - Semua Media ======
app.get('/api/media', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM media ORDER BY id_media DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Kesalahan Server', error: err.message });
  }
});

// ====== READ - Media Berdasarkan ID ======
app.get('/api/media/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM media WHERE id_media = ?', [req.params.id]);
    if (rows.length > 0) res.json(rows[0]);
    else res.status(404).json({ message: 'Media tidak ditemukan' });
  } catch {
    res.status(500).json({ message: 'Kesalahan Server' });
  }
});

// ====== CREATE - Tambah Media Baru ======
app.post('/api/media', async (req, res) => {
  const { judul, tipe, tahun_rilis, genre } = req.body;
  
  if (!judul || !tipe || !tahun_rilis || !genre) {
    return res.status(400).json({ message: 'Judul, Tipe, Tahun Rilis, dan Genre harus diisi' });
  }
  
  try {
    const [result] = await db.query(
      'INSERT INTO media (judul, tipe, tahun_rilis, genre) VALUES (?, ?, ?, ?)', 
      [judul, tipe, tahun_rilis, genre]
    );
    res.status(201).json({ 
      id_media: result.insertId, 
      judul, 
      tipe, 
      tahun_rilis, 
      genre
    });
  } catch (err) {
    res.status(500).json({ message: 'Kesalahan Server', error: err.message });
  }
});

// ====== UPDATE - Perbarui Data Media ======
app.put('/api/media/:id', async (req, res) => {
  const { judul, tipe, tahun_rilis, genre } = req.body;
  const id_media = req.params.id;
  
  try {
    const [result] = await db.query(
      'UPDATE media SET judul = ?, tipe = ?, tahun_rilis = ?, genre = ? WHERE id_media = ?', 
      [judul, tipe, tahun_rilis, genre, id_media]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Media tidak ditemukan' });
    }
    
    res.status(200).json({ 
      message: 'Data media berhasil diperbarui',
      data: {
        id_media: id_media,
        judul: judul,
        tipe: tipe,
        tahun_rilis: tahun_rilis,
        genre: genre
      }
    });
  } catch (err) {
    console.error('Error saat memperbarui media:', err);
    res.status(500).json({ 
      message: 'Kesalahan Server',
      error: err.message 
    });
  }
});

// ====== DELETE - Hapus Media ======
app.delete('/api/media/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM media WHERE id_media = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Media tidak ditemukan' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Kesalahan Server', error: err.message });
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
