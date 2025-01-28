


export const generateVerificationCode = (): string => {
    const code = Math.random() * 10000
    return code.toFixed(0)
}