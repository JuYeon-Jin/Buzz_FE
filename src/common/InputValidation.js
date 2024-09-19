/**
 * 입력값을 검증을 위한 규칙을 정의합니다.
 *
 * @param {string} input - 사용자가 입력한 값
 * @returns {boolean} - 정규 표현식에 맞는지 여부
 */
const validationRules = {
    username: (input) => /^[a-z0-9\-_]+$/.test(input),
    password: (input) => /^[a-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^`{|}~]+$/.test(input),
    name: (input) => /^[a-z0-9가-힣]+$/.test(input),
};


/**
 * 입력값과 해당 타입을 기준으로 유효성 검사를 수행합니다.
 *
 * @param {string} input - 사용자가 입력한 값
 * @param {string} type - 검증할 유형
 * @returns {boolean} - 입력값이 해당 유형의 검증을 통과하는지 여부
 */
export const validateInput = (input, type) => {
    const validator = validationRules[type];
    if (validator) {
        return validator(input);
    }
    return false;
};


/**
 * 입력값의 길이를 검증합니다.
 *
 * @param {string} input - 입력값
 * @param {number} minLength - 최소 길이
 * @param {number} maxLength - 최대 길이
 * @returns {boolean} - 입력값이 최소 길이 이상, 최대 길이 이하인지 여부
 */
export const validateLength = (input, minLength, maxLength) => {
    return input.length >= minLength && input.length <= maxLength;
};


/**
 * 두 값이 동일한지 확인합니다.
 *
 * @param {string} value1 - 첫 번째 값
 * @param {string} value2 - 두 번째 값
 * @returns {boolean} - 두 값이 동일한지 여부
 */
export const areValuesEqual = (value1, value2) => {
    return value1 === value2;
};


/**
 * 동일한 문자가 3번 이상 연속으로 있는지 확인합니다.
 *
 * @param {string} input - 입력값
 * @returns {boolean} - 동일한 문자가 3번 이상 연속으로 있는지 여부
 */
export const hasConsecutiveChars = (input) => {
    const regex = /(.)\1\1/;
    return regex.test(input);
};


// TODO 비밀번호가 ID 와 동일한 문자가 있는지 체크합니다.
