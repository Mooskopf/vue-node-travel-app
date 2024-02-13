export function hasNumber(str: string): boolean {
    return /\d/.test(str);
}

export function isValidColor(clr: string) {
    return clr === "blue" || clr === "yellow" || clr === "green"
}

export function validateEmail(email: string): RegExpMatchArray | null {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export function validatePassword(password: string): boolean {

    return /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password) &&
        password.length > 8;
}

export function isValidStarRange(stars: number): boolean {
    return stars % 1 === 0 && stars >= 1 && stars <= 5
}