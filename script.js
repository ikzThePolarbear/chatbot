const chatData = {
    "Halo": "Silahkan masukkan informasi yang ingin Anda cari:\n1. Informasi Produk\n2. Bantuan Teknis\n3. Status Pengiriman\n4. Kebijakan Pengembalian\n5. Pertanyaan Lainnya",
    "1": {
        "Pesan": "Apa jenis produk yang Anda cari?\n1. Elektronik\n2. Fashion",
        "1": {
            "Pesan": "Apa kategori elektronik yang Anda minati?\n1. Smartphone\n2. Laptop",
            "1": {
                "Pesan": "Merek smartphone apa yang Anda cari?\n1. Apple\n2. Samsung",
                "1": {
                    "Pesan": "Model apa yang Anda cari?\n1. iPhone 13",
                    "1": "iPhone 13 tersedia dalam beberapa model: Mini, Standard, dan Pro."
                },
                "2": {
                    "Pesan": "Model apa yang Anda cari?\n1. Galaxy S21",
                    "1": "Galaxy S21 memiliki varian 5G dan Ultra."
                }
            },
            "2": {
                "Pesan": "Apa merek laptop yang Anda inginkan?\n1. Dell",
                "1": {
                    "Pesan": "Apakah Anda mencari model gaming atau bisnis?\n1. Gaming\n2. Bisnis",
                    "1": "Laptop gaming Dell tersedia dalam seri G dan Alienware.",
                    "2": "Laptop bisnis Dell tersedia dalam seri Latitude dan XPS."
                }
            }
        },
        "2": "Fashion hanya tersedia di toko tertentu. Silakan kunjungi situs lain untuk pilihan fashion."
    },
    "2": {
        "Pesan": "Jenis perangkat apa yang Anda butuhkan bantuan?\n1. Laptop\n2. Smartphone",
        "1": {
            "Pesan": "Apa masalah yang Anda alami?\n1. Tidak bisa mengisi daya\n2. Laptop lambat",
            "1": "Pastikan kabel charger terpasang dengan benar. Cobalah untuk membersihkan port daya.",
            "2": "Cobalah untuk membersihkan file cache dan pastikan RAM cukup untuk kebutuhan aplikasi Anda."
        },
        "2": {
            "Pesan": "Apa masalah yang Anda alami?\n1. Layar tidak responsif\n2. Wi-Fi tidak terhubung",
            "1": "Matikan smartphone Anda selama beberapa detik, lalu hidupkan kembali. Jika masih bermasalah, coba mode aman.",
            "2": "Periksa pengaturan Wi-Fi, pastikan sinyal tersedia dan reset pengaturan jaringan jika perlu."
        }
    },
    "3": {
        "Pesan": "Apakah Anda ingin memeriksa status pengiriman atau mengubah pesanan?\n1. Memeriksa status pengiriman\n2. Mengubah pesanan",
        "1": {
            "Pesan": "Masukkan nomor pesanan Anda.",
            "Status pengiriman": "Status pengiriman Anda adalah [status]."
        },
        "2": {
            "Pesan": "Apa yang ingin Anda ubah?\n1. Alamat pengiriman\n2. Jumlah produk",
            "1": "Silakan berikan alamat pengiriman baru Anda.",
            "2": "Pesanan Anda telah diperbarui. Cek kembali total biaya Anda."
        }
    },
    "4": {
        "Pesan": "Apa yang ingin Anda ketahui tentang kebijakan pengembalian?\n1. Pengembalian produk\n2. Pengembalian dana",
        "1": {
            "Pesan": "Apakah produk sudah dibuka atau belum?\n1. Belum\n2. Sudah",
            "1": "Anda dapat mengembalikan produk dalam 30 hari setelah pembelian jika belum dibuka.",
            "2": "Produk yang sudah dibuka bisa dikembalikan dalam waktu 15 hari, dengan syarat tertentu."
        },
        "2": {
            "Pesan": "Apa alasan Anda mengajukan pengembalian dana?\n1. Produk rusak\n2. Tidak sesuai deskripsi",
            "1": "Pengembalian dana akan diproses dalam waktu 7 hari kerja jika produk terbukti rusak.",
            "2": "Anda bisa mengajukan pengembalian dana jika produk tidak sesuai dengan deskripsi dalam 14 hari."
        }
    },
    "5": {
        "Pesan": "Apakah ada pertanyaan lain yang bisa kami bantu?\n1. Informasi diskon\n2. Informasi garansi",
        "1": "Diskon saat ini bisa Anda cek di bagian promosi atau saat checkout.",
        "2": {
            "Pesan": "Apa yang ingin Anda ketahui tentang garansi?\n1. Masa garansi\n2. Perbaikan dalam masa garansi",
            "1": "Produk ini memiliki garansi 1 tahun untuk kerusakan pabrik.",
            "2": "Anda bisa mengajukan perbaikan dengan membawa produk ke pusat layanan resmi kami."
        }
    }
};

// Variabel untuk menyimpan konteks pertanyaan saat ini
let currentContext = chatData;

// Fungsi untuk menampilkan pesan di chat box
function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Fungsi untuk mencari jawaban berdasarkan input pengguna
function getResponse(userInput) {
    userInput = userInput.toLowerCase().trim();

    if (userInput === "selesai" || userInput === "keluar") {
        currentContext = chatData; // Reset context
        return "Terima kasih telah menghubungi kami. Jika ada pertanyaan lebih lanjut, jangan ragu untuk menghubungi lagi. Selamat beraktivitas!";
    }

    const keys = Object.keys(currentContext);

    // Jika input adalah angka, kita ubah menjadi kunci yang sesuai
    if (!isNaN(userInput) && keys[parseInt(userInput) - 1]) {
        userInput = keys[parseInt(userInput) - 1];
    }

    // Cek apakah input pengguna cocok dengan kunci dalam konteks saat ini
    for (let key in currentContext) {
        if (key.toLowerCase() === userInput) {
            const nextContext = currentContext[key];

            // Periksa apakah nextContext adalah objek
            if (typeof nextContext === 'object') {
                currentContext = nextContext; // Pindah ke konteks berikutnya
                return nextContext.Pesan || "Pilih salah satu opsi berikut:\n" + Object.keys(currentContext).map((key, index) => `${index + 1}. ${key}`).join('\n');
            } else {
                currentContext = chatData; // Reset ke chatData
                return nextContext; // Kembalikan respon akhir
            }
        }
    }

    currentContext = chatData; // Reset ke chatData jika tidak ada kecocokan
    return "Maaf, saya tidak mengerti pertanyaan Anda. Coba pertanyaan lain atau periksa pilihan yang tersedia.";
}

// Event listener untuk tombol kirim dan tombol Enter
document.getElementById('send-btn').addEventListener('click', function() {
    processUserInput();
});

document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        processUserInput();
    }
});

function processUserInput() {
    const userInputField = document.getElementById('user-input');
    const userInput = userInputField.value.trim();

    if (userInput !== "") {
        displayMessage(userInput, 'user');
        const botResponse = getResponse(userInput);
        displayMessage(botResponse, 'bot');
        userInputField.value = ''; // Kosongkan input setelah dikirim
    }
}

// Fungsi untuk reset chat
function resetChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; // Hapus semua pesan di chat box
    currentContext = chatData; // Reset konteks ke awal
    displayMessage("Halo! Ada yang bisa saya bantu?", 'bot'); // Tampilkan pesan selamat datang lagi
}

// Event listener untuk tombol reset
document.getElementById('reset-btn').addEventListener('click', resetChat);


// Mulai chatbot dengan pesan selamat datang
window.onload = function() {
    displayMessage("Halo! Ada yang bisa saya bantu?", 'bot');
};
