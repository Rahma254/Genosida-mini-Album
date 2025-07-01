import supabase from "./supabase.js";

const video = document.getElementById('video');
const title = document.getElementById('title');
const likeBtn = document.getElementById('like-btn');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment');
const commentsDiv = document.getElementById('comments');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

const songs = [
  { title: "Pelukan Senja", url: "https://vgchzuqtrmohyzojvngw.supabase.co/storage/v1/object/public/seleniumplatformassets/Pelukan%20Senja%20%20-%20Song%20Writer%20-%20Nabila%20Ahmad_HD.mp4" },
  { title: "Langit Sendu", url: "https://vgchzuqtrmohyzojvngw.supabase.co/storage/v1/object/public/seleniumplatformassets/Langit%20Sendu%20-%20Song%20Writer%20-%20Nabila%20Ahmad.mp4" },
  { title: "Hening Cinta", url: "https://vgchzuqtrmohyzojvngw.supabase.co/storage/v1/object/public/seleniumplatformassets/Hening%20Cinta%20-%20Nabila%20Ahmad.mp4" },
  { title: "Rindu Malam", url: "https://vgchzuqtrmohyzojvngw.supabase.co/storage/v1/object/public/seleniumplatformassets/Rindu%20Malam%20-%20Nabila%20Ahmad.mp4" },
  { title: "Bulan Terakhir", url: "https://vgchzuqtrmohyzojvngw.supabase.co/storage/v1/object/public/seleniumplatformassets/Bulan%20Terakhir%20-%20Nabila%20Ahmad.mp4" },
  { title: "Menanti Pagi", url: "https://vgchzuqtrmohyzojvngw.supabase.co/storage/v1/object/public/seleniumplatformassets/Menanti%20Pagi%20-%20Nabila%20Ahmad.mp4" },
  { title: "Bayang Senja", url: "https://vgchzuqtrmohyzojvngw.supabase.co/storage/v1/object/public/seleniumplatformassets/Bayang%20Senja%20-%20Nabila%20Ahmad.mp4" },
];

let currentSong = 0;

function loadSong(index) {
  const song = songs[index];
  title.innerText = song.title;
  video.src = song.url;
  loadComments(song.title);
}
loadSong(currentSong);

// Navigasi
nextBtn?.addEventListener('click', () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
});
prevBtn?.addEventListener('click', () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
});

// Like
likeBtn.addEventListener('click', async () => {
  const { error } = await supabase.from('likes').insert([{ song: title.innerText }]);
  if (error) return alert('Gagal like.');
  alert('Liked!');
});

// Komentar
commentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = commentInput.value.trim();
  if (!text) return;
  await supabase.from('comments').insert([{ song: title.innerText, text }]);
  commentInput.value = '';
  loadComments(title.innerText);
});

async function loadComments(song) {
  const { data } = await supabase.from('comments').select('*').eq('song', song);
  commentsDiv.innerHTML = data.map(d => `<p>💬 ${d.text}</p>`).join('');
}
