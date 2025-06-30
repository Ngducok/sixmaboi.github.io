
function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = '/webshop/index.html';
}

const infoBtn = document.querySelector('.sidebar-item i.bx-user')?.parentElement;
if (infoBtn) {
    infoBtn.addEventListener('click', function() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.name) {
            window.location.href = '/dashboard/dashboard.html';
        }
    });
}

const updateForm = document.querySelector('.user-update-form');
if (updateForm) {
    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let user = JSON.parse(localStorage.getItem('user') || '{}');
        const balance = updateForm.querySelector('.input-balance').value;
        const orders = updateForm.querySelector('.input-orders').value;
        const deposit = updateForm.querySelector('.input-deposit').value;
        const accounts = updateForm.querySelector('.input-accounts').value;
        if (balance) user.balance = parseInt(balance);
        if (orders) user.orders = parseInt(orders);
        if (deposit) user.deposit = parseInt(deposit);
        if (accounts) user.accounts = parseInt(accounts);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.reload();
    });
}

window.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.name) {
        window.location.href = '/webshop/index.html';
        return;
    }
    document.querySelectorAll('.summary-value')[0].textContent = (user.balance || 0).toLocaleString() + 'đ';
    document.querySelectorAll('.summary-value')[1].textContent = (user.orders || 0) + ' đơn';
    document.querySelectorAll('.summary-value')[2].textContent = (user.deposit || 0).toLocaleString() + 'đ';
    document.querySelectorAll('.summary-value')[3].textContent = (user.accounts || 0) + ' acc';
    const nameEl = document.querySelector('.user-name');
    const balanceEl = document.querySelector('.user-balance');
    if (nameEl) nameEl.textContent = user.name;
    if (balanceEl) balanceEl.textContent = 'Số dư: ' + (user.balance || 0).toLocaleString() + 'đ';
});

const sidebarItems = document.querySelectorAll('.sidebar-item');
const tabContents = document.querySelectorAll('.tab-content');

sidebarItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
        sidebarItems.forEach(i => i.classList.remove('active'));
        tabContents.forEach(c => c.style.display = 'none');
        item.classList.add('active');
        if (item.classList.contains('personal-info')) {
            document.querySelector('.personal-info-content').style.display = '';
        } else if (item.classList.contains('change-password')) {
            document.querySelector('.change-password-content').style.display = '';
        }
    });
}); 