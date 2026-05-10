// Toggle Auth Modal
function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.toggle('show');
}

// Switch antara Login dan Register
function switchTab(tabName) {
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// LOGIN
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Login berhasil!');
            displayProfile(user);
            toggleAuthModal();
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
});

// REGISTER
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fullname = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Password tidak cocok!');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // Simpan profil ke Realtime Database
            firebase.database().ref('users/' + user.uid).set({
                fullname: fullname,
                email: email,
                createdAt: new Date().toISOString()
            });
            
            alert('Akun berhasil dibuat! Silakan login.');
            switchTab('login');
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
});

// Display Profile
function displayProfile(user) {
    firebase.database().ref('users/' + user.uid).once('value', (snapshot) => {
        const data = snapshot.val();
        
        document.getElementById('profileName').textContent = data.fullname;
        document.getElementById('profileEmail').textContent = user.email;
        document.getElementById('profileDate').textContent = new Date(data.createdAt).toLocaleDateString('id-ID');
        
        // Tampilkan profile tab
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById('profileTab').classList.add('active');
        
        // Update button di header
        document.getElementById('headerAuthBtn').textContent = data.fullname.split(' ')[0];
        document.getElementById('headerAuthBtn').onclick = toggleAuthModal;
    });
}

// LOGOUT
function logout() {
    firebase.auth().signOut().then(() => {
        alert('Logout berhasil');
        document.getElementById('headerAuthBtn').textContent = 'SIGNING';
        toggleAuthModal();
        location.reload();
    });
}

// Check status login saat page load
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        displayProfile(user);
    }
});