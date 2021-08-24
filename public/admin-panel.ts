async function adminPanel() {
    try {
        const adminPanelUser = await axios.get('/user/adminPanel');

    } catch (error) {
        console.error(error.message);
    }
}

adminPanel();