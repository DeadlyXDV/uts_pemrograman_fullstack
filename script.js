// Marcelo Jonathan Holle - 411222083
// Nusantara Flix - Platform Streaming Lokal
const API_URL = 'http://localhost:3000/api/media';
const mediaTableBody = document.getElementById('mediaTableBody');
const mediaModal = new bootstrap.Modal(document.getElementById('mediaModal'));
const mediaForm = document.getElementById('mediaForm');
const mediaIdInput = document.getElementById('mediaId');
const modalTitle = document.getElementById('mediaModalLabel');
const alertMessage = document.getElementById('alertMessage');

async function fetchMedia() {
  try {
    const response = await fetch(API_URL);
    const mediaList = await response.json();
    renderMedia(mediaList);
  } catch {
    mediaTableBody.innerHTML = '<tr><td colspan="9" class="text-danger text-center">Gagal memuat data.</td></tr>';
  }
}

function renderMedia(mediaList) {
  mediaTableBody.innerHTML = '';
  if (!mediaList.length) {
    return mediaTableBody.innerHTML = '<tr><td colspan="6" class="text-center">Belum ada data media</td></tr>';
  }
  
  mediaList.forEach(media => {
    const row = mediaTableBody.insertRow();
    row.insertCell().textContent = media.id_media;
    row.insertCell().textContent = media.judul;
    
    // Badge untuk tipe media
    const tipeCell = row.insertCell();
    const badgeClass = media.tipe === 'Film' ? 'badge-film' : 'badge-series';
    tipeCell.innerHTML = `<span class="badge ${badgeClass}">${media.tipe}</span>`;
    
    row.insertCell().textContent = media.tahun_rilis;
    row.insertCell().textContent = media.genre;
    
    const action = row.insertCell();
    action.innerHTML = `
      <button class="btn btn-sm btn-warning me-1" onclick='prepareEdit(${JSON.stringify(media)})'>
        ✏️ Edit
      </button>
      <button class="btn btn-sm btn-danger" onclick="deleteMedia(${media.id_media}, '${escapeHtml(media.judul)}')">
        🗑️ Hapus
      </button>`;
  });
}

mediaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = mediaIdInput.value;
  
  const data = {
    judul: document.getElementById('judul').value,
    tipe: document.getElementById('tipe').value,
    tahun_rilis: parseInt(document.getElementById('tahun_rilis').value),
    genre: document.getElementById('genre').value
  };
  
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;
  
  try {
    const response = await fetch(url, { 
      method, 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(data) 
    });
    
    if (!response.ok) {
      const error = await response.json();
      return showAlert(error.message || 'Gagal menyimpan data!', 'danger');
    }
    
    showAlert(id ? 'Data media berhasil diperbarui! 🎉' : 'Media baru berhasil ditambahkan! 🎉', 'success');
    mediaModal.hide();
    fetchMedia();
  } catch (error) {
    showAlert('Terjadi kesalahan saat menyimpan data', 'danger');
  }
});

function prepareCreate() {
  modalTitle.textContent = '➕ Tambah Media Baru';
  mediaForm.reset();
  mediaIdInput.value = '';
}

function prepareEdit(media) {
  modalTitle.textContent = '✏️ Edit Data Media';
  mediaIdInput.value = media.id_media;
  document.getElementById('judul').value = media.judul;
  document.getElementById('tipe').value = media.tipe;
  document.getElementById('tahun_rilis').value = media.tahun_rilis;
  document.getElementById('genre').value = media.genre;
  mediaModal.show();
}

async function deleteMedia(id, judul) {
  if (!confirm(`Apakah Anda yakin ingin menghapus "${judul}" dari katalog?`)) return;
  
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (response.status === 204) {
      showAlert('Media berhasil dihapus dari katalog! 🗑️', 'warning');
      fetchMedia();
    } else {
      showAlert('Gagal menghapus media', 'danger');
    }
  } catch (error) {
    showAlert('Terjadi kesalahan saat menghapus data', 'danger');
  }
}

function showAlert(msg, type) {
  alertMessage.textContent = msg;
  alertMessage.className = `alert alert-${type}`;
  alertMessage.classList.remove('d-none');
  setTimeout(() => alertMessage.classList.add('d-none'), 3000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', fetchMedia);