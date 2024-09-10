export const validateToken = async () => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const response = await fetch('http://localhost:8080/validateToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();
            return result;

        } catch (error) {
            console.error('토큰 검증 중 오류 발생:', error);
            return false;
        }
    } else {
        console.log('토큰이 없습니다.');
        return false;
    }
};
