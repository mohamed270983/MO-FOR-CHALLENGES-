let users = JSON.parse(localStorage.getItem('users')) || [];
let teams = JSON.parse(localStorage.getItem('teams')) || [];
let players = JSON.parse(localStorage.getItem('players')) || [];

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

function registerUser() {
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (username && email && password) {
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            document.getElementById('regMessage').textContent = 'Username already exists!';
        } else {
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            document.getElementById('regMessage').textContent = 'Account created successfully!';
            showToast('Account created successfully!');
        }
    } else {
        document.getElementById('regMessage').textContent = 'Please fill out all fields.';
    }
}

function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username && password) {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            document.getElementById('loginMessage').textContent = 'Login successful!';
            showToast('Login successful!');
        } else {
            document.getElementById('loginMessage').textContent = 'Invalid username or password.';
        }
    } else {
        document.getElementById('loginMessage').textContent = 'Please fill out all fields.';
    }
}

function addTeam() {
    const teamName = document.getElementById('teamName').value;
    if (teamName) {
        teams.push(teamName);
        localStorage.setItem('teams', JSON.stringify(teams));
        document.getElementById('teamName').value = '';
        showToast('Team added successfully!');
        updateTeamList();
    } else {
        showToast('Please enter a team name.');
    }
}

function updateTeamList() {
    const teamList = document.getElementById('teamList');
    teamList.innerHTML = '';
    teams.forEach(team => {
        const li = document.createElement('li');
        li.textContent = team;
        teamList.appendChild(li);
    });
}

function addPlayer() {
    const playerName = document.getElementById('playerName').value;
    const playerPrice = document.getElementById('playerPrice').value;

    if (playerName && playerPrice) {
        players.push({ name: playerName, price: playerPrice });
        localStorage.setItem('players', JSON.stringify(players));
        document.getElementById('playerName').value = '';
        document.getElementById('playerPrice').value = '';
        showToast('Player added successfully!');
        updatePlayerList();
    } else {
        showToast('Please fill out all fields.');
    }
}

function updatePlayerList() {
    const playerList = document.getElementById('playerList');
    const viewPlayerList = document.getElementById('viewPlayerList');
    playerList.innerHTML = '';
    viewPlayerList.innerHTML = '';
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player.name} - $${player.price}M`;
        playerList.appendChild(li.cloneNode(true));
        viewPlayerList.appendChild(li.cloneNode(true));
    });
}

window.onload = () => {
    updateTeamList();
    updatePlayerList();
};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch((err) => console.log('Service Worker registration failed:', err));
}