async function adminPanel() {
    try {
        const adminPanelUser = await axios.get('/user/admin/adminPanel');
        console.log(adminPanelUser);   

    } catch (error) {
        console.error(error.message);
    }
}

adminPanel();