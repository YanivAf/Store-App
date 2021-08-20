async const exampleGetFunction = (): void => {
    try {
    const exampleGet = await axios.get(`/example/`);
    
    } catch (error) {
        console.error(error.message);
    }
}

