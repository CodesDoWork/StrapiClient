export const getCookie = (name: string): string => getCookies()[name];

export const removeCookie = (name: string) => setCookie(name, "", -100);

export const setCookie = (name: string, value: string, expirationDays: number) => {
    const millisOfADay = 86_400_000;
    const expirationDate = new Date(Date.now() + expirationDays * millisOfADay);
    const cookie = {
        [name]: value,
        expires: expirationDate.toUTCString(),
        path: "/",
        sameSite: "Strict",
        Secure: true,
    };

    document.cookie = Object.entries(cookie)
        .map(([key, value]) => `${key}=${value}`)
        .join(";");
};

const getCookies = (): Record<string, string> =>
    document.cookie.split("; ").reduce((cookies, cookie) => {
        const parts = cookie.split("=");
        return { ...cookies, [parts[0]]: parts[1] };
    }, {} as Record<string, string>);
