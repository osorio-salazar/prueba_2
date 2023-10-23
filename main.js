async function loadRandomUsers(){
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0]; // El primer usuario en la lista (aleatorio)
        return user;
    } catch (error) {
        console.error('Error al obtener los datos del usuario', error);
        throw error;
    }
}

function displayUserData(user) {
    document.getElementById('user-name').textContent = `${user.name.title} ${user.name.first} ${user.name.last}`;
    document.getElementById('user-location').textContent = `${user.location.street.number}, ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`;
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-birthdate').textContent = user.dob.date.substring(0, 10);
    document.getElementById('user-age').textContent = user.dob.age;
    document.getElementById('user-phone').textContent = user.phone;
    document.getElementById('user-photo').src = user.picture.large
} 

function refreshUserCard() {
    loadRandomUsers()
    .then(user => {
        displayUserData(user);
    })
    .catch(error => {
        document.getElementById('user-name').textContent = 'Error al cargar los datos';
    });
}

window.addEventListener('load', refreshUserCard);

document.getElementById('refresh-button').addEventListener('click', refreshUserCard);
